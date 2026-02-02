import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { menuItem, menuItemRow, menuItemContent } from '$lib/server/db/schema';
import { and, asc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
    const slug = params.slug;

    const [menu] = await db
        .select({
            id: menuItem.id,
            titlePt: menuItem.titlePt,
            titleEn: menuItem.titleEn,
            href: menuItem.href,
            section: menuItem.section,
            isVisible: menuItem.isVisible
        })
        .from(menuItem)
        .where(eq(menuItem.href, slug))
        .limit(1);

    if (!menu || !menu.isVisible) throw error(404, 'Página não encontrada');

    const lang = (locals.lang ?? 'pt') as 'pt' | 'en';

    const rowsDb = await db
        .select({
            id: menuItemRow.id,
            rowIndex: menuItemRow.rowIndex,
            cols: menuItemRow.cols
        })
        .from(menuItemRow)
        .where(and(eq(menuItemRow.menuItemId, menu.id), eq(menuItemRow.lang, lang)))
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
            imageName: menuItemContent.imageName,
            imageMime: menuItemContent.imageMime,
            tableData: menuItemContent.tableData
        })
        .from(menuItemContent)
        .where(and(eq(menuItemContent.menuItemId, menu.id), eq(menuItemContent.lang, lang)))
        .orderBy(
            asc(menuItemContent.rowId),
            asc(menuItemContent.col),
            asc(menuItemContent.colOrder),
            asc(menuItemContent.id)
        );

    const byRow = new Map<number, typeof blocksDb>();
    for (const b of blocksDb) {
        const arr = byRow.get(b.rowId);
        if (arr) arr.push(b);
        else byRow.set(b.rowId, [b]);
    }

    const rows = rowsDb.map((r) => {
        const rowBlocks = byRow.get(r.id) ?? [];
        return {
            id: r.id,
            rowIndex: r.rowIndex,
            cols: r.cols,
            leftBlocks: rowBlocks.filter((b) => b.col === 'left'),
            rightBlocks: rowBlocks.filter((b) => b.col === 'right')
        };
    });

    return { menu, lang, rows };
};
