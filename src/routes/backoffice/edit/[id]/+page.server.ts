import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';
import z from 'zod/v4';

import { db } from '$lib/server/db';
import { menuItem } from '$lib/server/db/schema';
import { menuSchema } from '../../../../validation-schemas/menu';

type MenuForm = z.infer<typeof menuSchema>;
type Section = MenuForm['section'];

const editMenuSchema = menuSchema.extend({
    image: z.instanceof(File).optional()
});

function coerceSection(raw: unknown): Section {
    const parsed = menuSchema.shape.section.safeParse(raw);
    return parsed.success ? parsed.data : 'servicos_globais';
}

export const load: PageServerLoad = async ({ params }) => {
    const id = Number(params.id);
    if (!Number.isFinite(id)) throw error(400, 'ID inválido');

    const [item] = await db
        .select({
            id: menuItem.id,
            title: menuItem.title,
            href: menuItem.href,
            section: menuItem.section,
            isVisible: menuItem.isVisible,
            imageName: menuItem.imageName
        })
        .from(menuItem)
        .where(eq(menuItem.id, id))
        .limit(1);

    if (!item) throw redirect(303, '/backoffice');

    const form = await superValidate(zod4(editMenuSchema), {
        defaults: {
            title: item.title,
            slug: item.href,
            section: coerceSection(item.section),
            isVisible: item.isVisible ?? true
        }
    });

    return { form, item };
};

export const actions: Actions = {
    default: async ({ params, request }) => {
        const id = Number(params.id);
        if (!Number.isFinite(id)) return fail(400, { message: 'ID inválido' });

        const form = await superValidate(request, zod4(editMenuSchema), { allowFiles: true });
        if (!form.valid) return fail(400, { form });

        const update: Record<string, unknown> = {
            title: form.data.title,
            href: form.data.slug,
            section: form.data.section,
            isVisible: form.data.isVisible
        };

        const file = form.data.image as File | undefined;
        if (file && file.size > 0) {
            update.imageData = Buffer.from(await file.arrayBuffer());
            update.imageMime = file.type;
            update.imageName = file.name;
        }

        await db.update(menuItem).set(update).where(eq(menuItem.id, id));

        throw redirect(303, '/backoffice');
    }
};