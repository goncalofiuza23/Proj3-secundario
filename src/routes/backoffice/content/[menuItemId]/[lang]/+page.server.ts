// src/routes/backoffice/content/[menuItemId]/[lang]/+page.server.ts
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import {
    menuItem,
    menuItemRow,
    menuItemContent,
    contentLang,
    contentBlockType,
    contentCol,
    rowCols
} from '$lib/server/db/schema';
import { and, asc, eq, max } from 'drizzle-orm';
import z from 'zod/v4';

type Lang = (typeof contentLang.enumValues)[number];
type BlockType = (typeof contentBlockType.enumValues)[number];
type Col = (typeof contentCol.enumValues)[number]; // 'left' | 'right'
type RowCols = (typeof rowCols.enumValues)[number]; // '1' | '2'

const LangSchema = z.enum(contentLang.enumValues);
const TypeSchema = z.enum(contentBlockType.enumValues);
const ColSchema = z.enum(contentCol.enumValues);
const RowColsSchema = z.enum(rowCols.enumValues);

function parseId(raw: string | undefined) {
    const id = Number(raw);
    if (!Number.isFinite(id) || id <= 0) throw error(400, 'Invalid id');
    return id;
}

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

async function resequenceColOrders(tx: Tx, rowId: number, col: Col) {
    const rows = await tx
        .select({ id: menuItemContent.id })
        .from(menuItemContent)
        .where(and(eq(menuItemContent.rowId, rowId), eq(menuItemContent.col, col)))
        .orderBy(asc(menuItemContent.colOrder), asc(menuItemContent.id));

    for (let i = 0; i < rows.length; i++) {
        await tx
            .update(menuItemContent)
            .set({ colOrder: i, updatedAt: new Date() })
            .where(eq(menuItemContent.id, rows[i].id));
    }
}

async function resequenceRowIndexes(tx: Tx, menuItemId: number, lang: Lang) {
    const rows = await tx
        .select({ id: menuItemRow.id })
        .from(menuItemRow)
        .where(and(eq(menuItemRow.menuItemId, menuItemId), eq(menuItemRow.lang, lang)))
        .orderBy(asc(menuItemRow.rowIndex), asc(menuItemRow.id));

    for (let i = 0; i < rows.length; i++) {
        await tx
            .update(menuItemRow)
            .set({ rowIndex: i, updatedAt: new Date() })
            .where(eq(menuItemRow.id, rows[i].id));
    }
}

const TableSchema = z.object({
    columns: z.array(z.string()),
    rows: z.array(z.array(z.string()))
});

export const load: PageServerLoad = async ({ params, locals }) => {
    if (!locals.user || locals.user.isAdmin !== 1) throw redirect(303, '/log-in');

    const menuItemId = parseId(params.menuItemId);
    const lang = LangSchema.parse(params.lang) as Lang;

    const [item] = await db
        .select({
            id: menuItem.id,
            titlePt: menuItem.titlePt,
            titleEn: menuItem.titleEn,
            href: menuItem.href
        })
        .from(menuItem)
        .where(eq(menuItem.id, menuItemId))
        .limit(1);

    if (!item) throw error(404, 'Menu not found');

    const rowsDb = await db
        .select({
            id: menuItemRow.id,
            rowIndex: menuItemRow.rowIndex,
            cols: menuItemRow.cols
        })
        .from(menuItemRow)
        .where(and(eq(menuItemRow.menuItemId, menuItemId), eq(menuItemRow.lang, lang)))
        .orderBy(asc(menuItemRow.rowIndex), asc(menuItemRow.id));

    const blocksDb = await db
        .select({
            id: menuItemContent.id,
            rowId: menuItemContent.rowId,
            col: menuItemContent.col,
            colOrder: menuItemContent.colOrder,
            type: menuItemContent.type,
            titleText: menuItemContent.titleText,
            textValue: menuItemContent.textValue,
            imageMime: menuItemContent.imageMime,
            imageName: menuItemContent.imageName,
            tableData: menuItemContent.tableData
        })
        .from(menuItemContent)
        .where(and(eq(menuItemContent.menuItemId, menuItemId), eq(menuItemContent.lang, lang)))
        .orderBy(
            asc(menuItemContent.rowId),
            asc(menuItemContent.col),
            asc(menuItemContent.colOrder),
            asc(menuItemContent.id)
        );

    // agrupar por rowId
    const byRow = new Map<number, typeof blocksDb>();
    for (const b of blocksDb) {
        const rid = b.rowId;
        const arr = byRow.get(rid);
        if (arr) arr.push(b);
        else byRow.set(rid, [b]);
    }

    const rows = rowsDb.map((r) => {
        const rowBlocks = byRow.get(r.id) ?? [];

        const leftBlocks = rowBlocks
            .filter((b) => b.col === 'left')
            .sort((a, b) => (a.colOrder ?? 0) - (b.colOrder ?? 0));

        const rightBlocks = rowBlocks
            .filter((b) => b.col === 'right')
            .sort((a, b) => (a.colOrder ?? 0) - (b.colOrder ?? 0));

        return {
            id: r.id,
            rowIndex: r.rowIndex,
            cols: r.cols,
            leftBlocks,
            rightBlocks
        };
    });

    return { menu: item, lang, rows };
};

export const actions: Actions = {
    // ✅ criar linha 1col ou 2col
    addRow: async ({ request, params, locals }) => {
        if (!locals.user || locals.user.isAdmin !== 1) throw redirect(303, '/log-in');

        const menuItemId = parseId(params.menuItemId);
        const lang = LangSchema.parse(params.lang) as Lang;

        const fd = await request.formData();
        const colsParsed = RowColsSchema.safeParse(fd.get('cols'));
        if (!colsParsed.success) return fail(400, { message: 'cols inválido' });

        const cols = colsParsed.data as RowCols;

        const [m] = await db
            .select({ m: max(menuItemRow.rowIndex) })
            .from(menuItemRow)
            .where(and(eq(menuItemRow.menuItemId, menuItemId), eq(menuItemRow.lang, lang)));

        const nextIndex = (m?.m ?? -1) + 1;

        const [row] = await db
            .insert(menuItemRow)
            .values({
                menuItemId,
                lang,
                rowIndex: nextIndex,
                cols,
                updatedAt: new Date()
            })
            .returning({
                id: menuItemRow.id,
                rowIndex: menuItemRow.rowIndex,
                cols: menuItemRow.cols
            });

        return { success: true, row };
    },

    // ✅ mover LINHAS por drag & drop
    reorderRows: async ({ request, params, locals }) => {
        if (!locals.user || locals.user.isAdmin !== 1) throw redirect(303, '/log-in');

        const menuItemId = parseId(params.menuItemId);
        const lang = LangSchema.parse(params.lang) as Lang;

        const fd = await request.formData();

        const ids = fd
            .getAll('orderedRowIds')
            .map((v) => Number(v))
            .filter((n) => Number.isFinite(n) && n > 0);

        if (ids.length === 0) return fail(400, { message: 'orderedRowIds vazio' });

        await db.transaction(async (tx) => {
            const existing = await tx
                .select({ id: menuItemRow.id })
                .from(menuItemRow)
                .where(and(eq(menuItemRow.menuItemId, menuItemId), eq(menuItemRow.lang, lang)));

            const allowed = new Set(existing.map((r) => r.id));

            // se preferires permitir reorder parcial, remove esta linha
            if (existing.length !== ids.length) throw error(400, 'orderedRowIds incompleto');

            if (!ids.every((id) => allowed.has(id))) throw error(400, 'IDs inválidos para este menu/lang');

            for (let i = 0; i < ids.length; i++) {
                await tx
                    .update(menuItemRow)
                    .set({ rowIndex: i, updatedAt: new Date() })
                    .where(eq(menuItemRow.id, ids[i]));
            }

            await resequenceRowIndexes(tx, menuItemId, lang);
        });

        return { success: true };
    },

    // ✅ apagar linha inteira (a "caixa")
    deleteRow: async ({ request, params, locals }) => {
        if (!locals.user || locals.user.isAdmin !== 1) throw redirect(303, '/log-in');

        const menuItemId = parseId(params.menuItemId);
        const lang = LangSchema.parse(params.lang) as Lang;

        const fd = await request.formData();
        const rowId = Number(fd.get('rowId'));
        if (!Number.isFinite(rowId) || rowId <= 0) return fail(400, { message: 'rowId inválido' });

        await db.transaction(async (tx) => {
            await tx
                .delete(menuItemRow)
                .where(
                    and(eq(menuItemRow.id, rowId), eq(menuItemRow.menuItemId, menuItemId), eq(menuItemRow.lang, lang))
                );

            await resequenceRowIndexes(tx, menuItemId, lang);
        });

        return { success: true, deletedRowId: rowId };
    },

    // ✅ adicionar bloco numa row/col
    add: async ({ request, params, locals }) => {
        if (!locals.user || locals.user.isAdmin !== 1) throw redirect(303, '/log-in');

        const menuItemId = parseId(params.menuItemId);
        const lang = LangSchema.parse(params.lang) as Lang;

        const fd = await request.formData();

        const typeParsed = TypeSchema.safeParse(fd.get('type'));
        if (!typeParsed.success) return fail(400, { message: 'type inválido' });
        const type = typeParsed.data as BlockType;

        const rowId = Number(fd.get('rowId'));
        if (!Number.isFinite(rowId) || rowId <= 0) return fail(400, { message: 'rowId inválido' });

        const colParsed = ColSchema.safeParse(fd.get('col'));
        if (!colParsed.success) return fail(400, { message: 'col inválido' });
        const col = colParsed.data as Col;

        const [row] = await db
            .select({ cols: menuItemRow.cols })
            .from(menuItemRow)
            .where(and(eq(menuItemRow.id, rowId), eq(menuItemRow.menuItemId, menuItemId), eq(menuItemRow.lang, lang)))
            .limit(1);

        if (!row) return fail(404, { message: 'Row não encontrada' });
        if (row.cols === '1' && col === 'right') return fail(400, { message: 'Row 1 coluna não tem right' });

        const [m] = await db
            .select({ m: max(menuItemContent.colOrder) })
            .from(menuItemContent)
            .where(and(eq(menuItemContent.rowId, rowId), eq(menuItemContent.col, col)));

        const nextOrder = (m?.m ?? -1) + 1;

        const [block] = await db
            .insert(menuItemContent)
            .values({
                menuItemId,
                lang,
                rowId,
                col,
                colOrder: nextOrder,
                type,
                titleText: type === 'title' ? 'Novo título' : null,
                textValue: type === 'text' ? '' : null,
                tableData: type === 'table' ? { columns: ['Coluna 1'], rows: [['']] } : null,
                updatedAt: new Date()
            })
            .returning({
                id: menuItemContent.id,
                rowId: menuItemContent.rowId,
                col: menuItemContent.col,
                colOrder: menuItemContent.colOrder,
                type: menuItemContent.type,
                titleText: menuItemContent.titleText,
                textValue: menuItemContent.textValue,
                imageName: menuItemContent.imageName,
                imageMime: menuItemContent.imageMime,
                tableData: menuItemContent.tableData
            });

        return { success: true, block };
    },

    // ✅ apagar bloco
    delete: async ({ request, params, locals }) => {
        if (!locals.user || locals.user.isAdmin !== 1) throw redirect(303, '/log-in');

        const menuItemId = parseId(params.menuItemId);
        const lang = LangSchema.parse(params.lang) as Lang;

        const fd = await request.formData();
        const blockId = Number(fd.get('blockId'));
        if (!Number.isFinite(blockId) || blockId <= 0) return fail(400, { message: 'blockId inválido' });

        await db.transaction(async (tx) => {
            const [b] = await tx
                .select({ rowId: menuItemContent.rowId, col: menuItemContent.col })
                .from(menuItemContent)
                .where(and(eq(menuItemContent.id, blockId), eq(menuItemContent.menuItemId, menuItemId), eq(menuItemContent.lang, lang)))
                .limit(1);

            await tx
                .delete(menuItemContent)
                .where(and(eq(menuItemContent.id, blockId), eq(menuItemContent.menuItemId, menuItemId), eq(menuItemContent.lang, lang)));

            if (b) await resequenceColOrders(tx, b.rowId, b.col);
        });

        return { success: true, deletedId: blockId };
    },

    // ✅ reorder por coluna dentro da row
    reorder: async ({ request, params, locals }) => {
        if (!locals.user || locals.user.isAdmin !== 1) throw redirect(303, '/log-in');

        const menuItemId = parseId(params.menuItemId);
        const lang = LangSchema.parse(params.lang) as Lang;

        const fd = await request.formData();

        const rowId = Number(fd.get('rowId'));
        if (!Number.isFinite(rowId) || rowId <= 0) return fail(400, { message: 'rowId inválido' });

        const colParsed = ColSchema.safeParse(fd.get('col'));
        if (!colParsed.success) return fail(400, { message: 'col inválido' });
        const col = colParsed.data as Col;

        const ids = fd
            .getAll('orderedIds')
            .map((v) => Number(v))
            .filter((n) => Number.isFinite(n) && n > 0);

        if (ids.length === 0) return fail(400, { message: 'orderedIds vazio' });

        await db.transaction(async (tx) => {
            const existing = await tx
                .select({ id: menuItemContent.id })
                .from(menuItemContent)
                .where(
                    and(
                        eq(menuItemContent.menuItemId, menuItemId),
                        eq(menuItemContent.lang, lang),
                        eq(menuItemContent.rowId, rowId),
                        eq(menuItemContent.col, col)
                    )
                );

            const allowed = new Set(existing.map((r) => r.id));
            if (!ids.every((id) => allowed.has(id))) throw error(400, 'IDs inválidos para esta coluna');

            for (let i = 0; i < ids.length; i++) {
                await tx
                    .update(menuItemContent)
                    .set({ colOrder: i, updatedAt: new Date() })
                    .where(eq(menuItemContent.id, ids[i]));
            }

            await resequenceColOrders(tx, rowId, col);
        });

        return { success: true };
    },

    updateTitle: async ({ request, params, locals }) => {
        if (!locals.user || locals.user.isAdmin !== 1) throw redirect(303, '/log-in');
        const menuItemId = parseId(params.menuItemId);
        const lang = LangSchema.parse(params.lang) as Lang;

        const fd = await request.formData();
        const blockId = Number(fd.get('blockId'));
        if (!Number.isFinite(blockId) || blockId <= 0) return fail(400, { message: 'blockId inválido' });

        const titleText = String(fd.get('titleText') ?? '').trim();

        await db
            .update(menuItemContent)
            .set({ titleText, updatedAt: new Date() })
            .where(and(eq(menuItemContent.id, blockId), eq(menuItemContent.menuItemId, menuItemId), eq(menuItemContent.lang, lang)));

        return { success: true };
    },

    updateText: async ({ request, params, locals }) => {
        if (!locals.user || locals.user.isAdmin !== 1) throw redirect(303, '/log-in');
        const menuItemId = parseId(params.menuItemId);
        const lang = LangSchema.parse(params.lang) as Lang;

        const fd = await request.formData();
        const blockId = Number(fd.get('blockId'));
        if (!Number.isFinite(blockId) || blockId <= 0) return fail(400, { message: 'blockId inválido' });

        const textValue = String(fd.get('textValue') ?? '');

        await db
            .update(menuItemContent)
            .set({ textValue, updatedAt: new Date() })
            .where(and(eq(menuItemContent.id, blockId), eq(menuItemContent.menuItemId, menuItemId), eq(menuItemContent.lang, lang)));

        return { success: true };
    },

    updateImage: async ({ request, params, locals }) => {
        if (!locals.user || locals.user.isAdmin !== 1) throw redirect(303, '/log-in');
        const menuItemId = parseId(params.menuItemId);
        const lang = LangSchema.parse(params.lang) as Lang;

        const fd = await request.formData();
        const blockId = Number(fd.get('blockId'));
        if (!Number.isFinite(blockId) || blockId <= 0) return fail(400, { message: 'blockId inválido' });

        const file = fd.get('image');
        if (!(file instanceof File) || file.size === 0) return fail(400, { message: 'Imagem inválida' });

        const imageData = Buffer.from(await file.arrayBuffer());

        await db
            .update(menuItemContent)
            .set({
                imageData,
                imageMime: file.type,
                imageName: file.name,
                updatedAt: new Date()
            })
            .where(and(eq(menuItemContent.id, blockId), eq(menuItemContent.menuItemId, menuItemId), eq(menuItemContent.lang, lang)));

        return { success: true };
    },

    updateTable: async ({ request, params, locals }) => {
        if (!locals.user || locals.user.isAdmin !== 1) throw redirect(303, '/log-in');
        const menuItemId = parseId(params.menuItemId);
        const lang = LangSchema.parse(params.lang) as Lang;

        const fd = await request.formData();
        const blockId = Number(fd.get('blockId'));
        if (!Number.isFinite(blockId) || blockId <= 0) return fail(400, { message: 'blockId inválido' });

        const raw = String(fd.get('tableData') ?? '');
        let tableData: unknown;
        try {
            tableData = JSON.parse(raw);
        } catch {
            return fail(400, { message: 'tableData inválido (JSON)' });
        }

        const parsed = TableSchema.safeParse(tableData);
        if (!parsed.success) return fail(400, { message: 'Formato de tabela inválido' });

        await db
            .update(menuItemContent)
            .set({ tableData: parsed.data as any, updatedAt: new Date() })
            .where(and(eq(menuItemContent.id, blockId), eq(menuItemContent.menuItemId, menuItemId), eq(menuItemContent.lang, lang)));

        return { success: true };
    }
};
