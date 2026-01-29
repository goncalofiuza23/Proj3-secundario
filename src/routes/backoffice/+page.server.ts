import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { menuItem } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';


export const load: PageServerLoad = async () => {
    const items = await db
        .select({
            id: menuItem.id,
            title: menuItem.titlePt,
            href: menuItem.href,
            section: menuItem.section,
            order: menuItem.order,
            isVisible: menuItem.isVisible
        })
        .from(menuItem)
        .orderBy(asc(menuItem.section), asc(menuItem.order), asc(menuItem.id));

    return { items };
};

export const actions: Actions = {
    toggleVisible: async ({ request }) => {
        const fd = await request.formData();

        const id = Number(fd.get('id'));
        const visibleRaw = String(fd.get('visible') ?? '');

        if (!Number.isFinite(id)) return fail(400, { message: 'ID inválido' });

        const nextVisible = visibleRaw === '1';

        await db.update(menuItem).set({ isVisible: nextVisible }).where(eq(menuItem.id, id));
    },

    delete: async ({ request }) => {
        const fd = await request.formData();
        const id = Number(fd.get('id'));

        if (!Number.isFinite(id)) return fail(400, { message: 'ID inválido' });

        await db.delete(menuItem).where(eq(menuItem.id, id));
    }
};