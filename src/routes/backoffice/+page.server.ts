import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { menuItem } from '$lib/server/db/schema';
import { and, asc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';

const SECTIONS = ['servicos_globais', 'servicos_alunos', 'servicos_docentes'] as const;
type Section = (typeof SECTIONS)[number];

function isSection(v: unknown): v is Section {
    return typeof v === 'string' && (SECTIONS as readonly string[]).includes(v);
}

export const load: PageServerLoad = async () => {
    const itemsRaw = await db
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

    const items = itemsRaw
        .filter((i) => isSection(i.section))
        .map((i) => ({
            ...i,
            section: i.section as Section,
            order: i.order ?? 0
        }));

    const globalItems = items.filter((i) => i.section === 'servicos_globais');
    const studentItems = items.filter((i) => i.section === 'servicos_alunos');
    const teacherItems = items.filter((i) => i.section === 'servicos_docentes');

    return { globalItems, studentItems, teacherItems };
};

export const actions: Actions = {
    toggleVisible: async ({ request }) => {
        const fd = await request.formData();

        const id = Number(fd.get('id'));
        const visibleRaw = String(fd.get('visible') ?? '');

        if (!Number.isFinite(id) || id <= 0) return fail(400, { message: 'ID inválido' });

        const nextVisible = visibleRaw === '1';
        await db.update(menuItem).set({ isVisible: nextVisible }).where(eq(menuItem.id, id));

        return { success: true };
    },

    delete: async ({ request }) => {
        const fd = await request.formData();
        const id = Number(fd.get('id'));

        if (!Number.isFinite(id) || id <= 0) return fail(400, { message: 'ID inválido' });

        await db.delete(menuItem).where(eq(menuItem.id, id));
        return { success: true };
    },

    reorderSection: async ({ request }) => {
        const fd = await request.formData();

        const sectionRaw = fd.get('section');
        if (!isSection(sectionRaw)) return fail(400, { message: 'Secção inválida' });

        const ids = fd
            .getAll('orderedIds')
            .map((v) => Number(v))
            .filter((n) => Number.isFinite(n) && n > 0);

        if (ids.length === 0) return fail(400, { message: 'orderedIds vazio' });

        await db.transaction(async (tx) => {
            const existing = await tx
                .select({ id: menuItem.id })
                .from(menuItem)
                .where(eq(menuItem.section, sectionRaw));

            const allowed = new Set(existing.map((r) => r.id));
            if (!ids.every((id) => allowed.has(id))) {
                throw new Error('IDs inválidos para esta secção');
            }

            for (let i = 0; i < ids.length; i++) {
                await tx
                    .update(menuItem)
                    .set({ order: i })
                    .where(and(eq(menuItem.id, ids[i]), eq(menuItem.section, sectionRaw)));
            }
        });

        return { success: true };
    }
};
