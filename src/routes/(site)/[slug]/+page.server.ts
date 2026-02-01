import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { menuItem, menuItemContent } from '$lib/server/db/schema';
import { and, asc, eq } from 'drizzle-orm';

function getLangFromRequest(request: Request): 'pt' | 'en' {
    const h = request.headers.get('accept-language') ?? '';
    // regra simples: se começar por "en", usa EN; senão PT
    return h.toLowerCase().startsWith('en') ? 'en' : 'pt';
}

export const load: PageServerLoad = async ({ params, request }) => {
    const slug = params.slug;

    // 1) buscar menu pelo href (=slug)
    const [menu] = await db
        .select({
            id: menuItem.id,
            titlePt: menuItem.titlePt,
            titleEn: menuItem.titleEn,
            href: menuItem.href,
            isVisible: menuItem.isVisible
        })
        .from(menuItem)
        .where(eq(menuItem.href, slug))
        .limit(1);

    if (!menu) throw error(404, 'Página não encontrada');
    if (!menu.isVisible) throw error(404, 'Página não encontrada');

    // 2) escolher idioma (podes trocar isto depois para cookie/store)
    const lang = getLangFromRequest(request);

    // 3) buscar blocos desse menu + lang
    const blocks = await db
        .select({
            id: menuItemContent.id,
            type: menuItemContent.type,
            sortOrder: menuItemContent.sortOrder,
            titleText: menuItemContent.titleText,
            textValue: menuItemContent.textValue,
            imageName: menuItemContent.imageName,
            imageMime: menuItemContent.imageMime,
            tableData: menuItemContent.tableData
        })
        .from(menuItemContent)
        .where(and(eq(menuItemContent.menuItemId, menu.id), eq(menuItemContent.lang, lang)))
        .orderBy(asc(menuItemContent.sortOrder), asc(menuItemContent.id));

    return { menu, lang, blocks };
};
