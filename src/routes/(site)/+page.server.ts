import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { menuItem } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
    const items = await db
        .select({
            id: menuItem.id,
            titlePt: menuItem.titlePt,
            href: menuItem.href,
            section: menuItem.section,
            order: menuItem.order,
            isVisible: menuItem.isVisible
        })
        .from(menuItem)
        .where(eq(menuItem.isVisible, true))
        .orderBy(asc(menuItem.section), asc(menuItem.order), asc(menuItem.id));

    const globalItems = items.filter((i) => i.section === 'servicos_globais');
    const studentItems = items.filter((i) => i.section === 'servicos_alunos');
    const teachersItems = items.filter((i) => i.section === 'servicos_docentes');

    return { globalItems, studentItems, teachersItems };
};
