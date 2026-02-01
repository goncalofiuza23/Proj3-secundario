// src/routes/backoffice/content/[menuItemId]/[lang]/+page.server.ts
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { menuItem, menuItemContent, contentLang, contentBlockType } from '$lib/server/db/schema';
import { and, asc, eq, max } from 'drizzle-orm';
import z from 'zod/v4';

type Lang = (typeof contentLang.enumValues)[number];
type BlockType = (typeof contentBlockType.enumValues)[number];

const LangSchema = z.enum(contentLang.enumValues);
const TypeSchema = z.enum(contentBlockType.enumValues);

function parseId(raw: string | undefined) {
    const id = Number(raw);
    if (!Number.isFinite(id) || id <= 0) throw error(400, 'Invalid id');
    return id;
}

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

async function resequenceSortOrders(tx: Tx, menuItemId: number, lang: Lang) {
    const rows = await tx
        .select({ id: menuItemContent.id })
        .from(menuItemContent)
        .where(and(eq(menuItemContent.menuItemId, menuItemId), eq(menuItemContent.lang, lang)))
        .orderBy(asc(menuItemContent.sortOrder), asc(menuItemContent.id));

    for (let i = 0; i < rows.length; i++) {
        await tx
            .update(menuItemContent)
            .set({ sortOrder: i, updatedAt: new Date() })
            .where(eq(menuItemContent.id, rows[i].id));
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

    const blocks = await db
        .select({
            id: menuItemContent.id,
            type: menuItemContent.type,
            sortOrder: menuItemContent.sortOrder,
            titleText: menuItemContent.titleText,
            textValue: menuItemContent.textValue,
            imageMime: menuItemContent.imageMime,
            imageName: menuItemContent.imageName,
            tableData: menuItemContent.tableData
        })
        .from(menuItemContent)
        .where(and(eq(menuItemContent.menuItemId, menuItemId), eq(menuItemContent.lang, lang)))
        .orderBy(asc(menuItemContent.sortOrder), asc(menuItemContent.id));

    return { menu: item, lang, blocks };
};

export const actions: Actions = {
    add: async ({ request, params, locals }) => {
        if (!locals.user || locals.user.isAdmin !== 1) throw redirect(303, '/log-in');

        const menuItemId = parseId(params.menuItemId);
        const lang = LangSchema.parse(params.lang) as Lang;

        const fd = await request.formData();
        const typeParsed = TypeSchema.safeParse(fd.get('type'));
        if (!typeParsed.success) return fail(400, { message: 'Tipo inválido' });

        const type = typeParsed.data as BlockType;

        const [m] = await db
            .select({ m: max(menuItemContent.sortOrder) })
            .from(menuItemContent)
            .where(and(eq(menuItemContent.menuItemId, menuItemId), eq(menuItemContent.lang, lang)));

        const nextOrder = (m?.m ?? -1) + 1;

        const [block] = await db
            .insert(menuItemContent)
            .values({
                menuItemId,
                lang,
                type,
                sortOrder: nextOrder,
                titleText: type === 'title' ? 'Novo título' : null,
                textValue: type === 'text' ? '' : null,
                tableData: type === 'table' ? { columns: ['Coluna 1'], rows: [['']] } : null,
                updatedAt: new Date()
            })
            .returning({
                id: menuItemContent.id,
                type: menuItemContent.type,
                sortOrder: menuItemContent.sortOrder,
                titleText: menuItemContent.titleText,
                textValue: menuItemContent.textValue,
                imageName: menuItemContent.imageName,
                imageMime: menuItemContent.imageMime,
                tableData: menuItemContent.tableData
            });

        return { success: true, block };
    },


    delete: async ({ request, params, locals }) => {
        if (!locals.user || locals.user.isAdmin !== 1) throw redirect(303, '/log-in');

        const menuItemId = parseId(params.menuItemId);
        const lang = LangSchema.parse(params.lang) as Lang;

        const fd = await request.formData();
        const blockId = Number(fd.get('blockId'));
        if (!Number.isFinite(blockId) || blockId <= 0) return fail(400, { message: 'blockId inválido' });

        await db.transaction(async (tx) => {
            await tx
                .delete(menuItemContent)
                .where(
                    and(
                        eq(menuItemContent.id, blockId),
                        eq(menuItemContent.menuItemId, menuItemId),
                        eq(menuItemContent.lang, lang)
                    )
                );

            await resequenceSortOrders(tx, menuItemId, lang);
        });

        return { success: true, deletedId: blockId };
    },

    reorder: async ({ request, params, locals }) => {
        if (!locals.user || locals.user.isAdmin !== 1) throw redirect(303, '/log-in');

        const menuItemId = parseId(params.menuItemId);
        const lang = LangSchema.parse(params.lang) as Lang;

        const fd = await request.formData();
        const ids = fd
            .getAll('orderedIds')
            .map((v) => Number(v))
            .filter((n) => Number.isFinite(n) && n > 0);

        if (ids.length === 0) return fail(400, { message: 'orderedIds vazio' });

        await db.transaction(async (tx) => {
            for (let i = 0; i < ids.length; i++) {
                await tx
                    .update(menuItemContent)
                    .set({ sortOrder: i, updatedAt: new Date() })
                    .where(
                        and(
                            eq(menuItemContent.id, ids[i]),
                            eq(menuItemContent.menuItemId, menuItemId),
                            eq(menuItemContent.lang, lang)
                        )
                    );
            }
            await resequenceSortOrders(tx, menuItemId, lang);
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
            .where(
                and(
                    eq(menuItemContent.id, blockId),
                    eq(menuItemContent.menuItemId, menuItemId),
                    eq(menuItemContent.lang, lang),
                    eq(menuItemContent.type, 'title')
                )
            );

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
            .where(
                and(
                    eq(menuItemContent.id, blockId),
                    eq(menuItemContent.menuItemId, menuItemId),
                    eq(menuItemContent.lang, lang),
                    eq(menuItemContent.type, 'text')
                )
            );

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
            .where(
                and(
                    eq(menuItemContent.id, blockId),
                    eq(menuItemContent.menuItemId, menuItemId),
                    eq(menuItemContent.lang, lang),
                    eq(menuItemContent.type, 'image')
                )
            );

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
            .where(
                and(
                    eq(menuItemContent.id, blockId),
                    eq(menuItemContent.menuItemId, menuItemId),
                    eq(menuItemContent.lang, lang),
                    eq(menuItemContent.type, 'table')
                )
            );

        return { success: true };
    }
};