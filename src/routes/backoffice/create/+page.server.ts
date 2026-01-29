import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { menuSchema } from '../../../validation-schemas/menu';
import { slugify } from '$lib/utils/slugify';

import { db } from '$lib/server/db';
import { menuItem } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
    const form = await superValidate(zod4(menuSchema));
    return { form };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event.request, zod4(menuSchema), { allowFiles: true });
        if (!form.valid) return fail(400, { form });

        const slug = form.data.slug?.trim() ? form.data.slug : slugify(form.data.titlePt);

        const file = form.data.image as File;
        const imageData = Buffer.from(await file.arrayBuffer());
        const imageMime = file.type;
        const imageName = file.name;

        await db.insert(menuItem).values({
            titlePt: form.data.titlePt,
            titleEn: form.data.titleEn,
            href: slug,
            section: form.data.section,
            order: 0,
            imageData,
            imageMime,
            imageName
        });

        throw redirect(303, '/backoffice');
    }
};
