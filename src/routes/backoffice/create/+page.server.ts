import { fail, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { zod4 } from 'sveltekit-superforms/adapters';
import { menuSchema } from "../../../validation-schemas/menu";
import type { Cookies } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    const form = await superValidate(zod4(menuSchema));
    return { form };
};

export const actions: Actions = {
    default: async ({ cookies, request }: { cookies: Cookies; request: Request }) => {
        const form = await superValidate(request, zod4(menuSchema), { allowFiles: true });
        if (!form.valid) return fail(400, { form });

        console.log('formulario valido');
        return { form };
    }
}