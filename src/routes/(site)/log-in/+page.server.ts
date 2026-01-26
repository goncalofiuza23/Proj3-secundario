// // src/routes/login/+page.server.ts
// import { fail, redirect, type Cookies } from '@sveltejs/kit';
// import type { Actions } from './$types.js';
// import bcrypt from 'bcryptjs';
// import { db } from '$lib/server/db';
// import { user as userTable } from '$lib/server/db/schema';
// import { eq } from 'drizzle-orm';
// import type { PageServerLoad } from './$types.js';
// import { superValidate } from 'sveltekit-superforms';
// import { zod4 } from 'sveltekit-superforms/adapters';
// import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth.js';
// import { loginSchema } from '../../../validation-schemas/login.js';


// export const load: PageServerLoad = async () => {
//     const form = await superValidate(zod4(loginSchema));
//     return { form };
// };

// export const actions: Actions = {
//     default: async ({ cookies, request }: { cookies: Cookies; request: Request }) => {

//         const form = await superValidate(request, zod4(loginSchema));
//         if (!form.valid) return fail(400, { form });

//         const { username, password } = form.data;

//         const [user] = await db.select().from(userTable).where(eq(userTable.username, username)).limit(1);
//         if (!user) return fail(400, { form, message: 'Username ou password incorretos' });

//         const ok = await bcrypt.compare(password, (user as any).passwordHash ?? (user as any).password);
//         if (!ok) return fail(400, { form, message: 'Username ou password incorretos' });

//         if ((user as any).isAdmin !== 1) return fail(403, { form, message: 'Sem permissões' });

//         const token = generateSessionToken();
//         const session = await createSession(token, user.id);
//         setSessionTokenCookie(cookies, token, session.expiresAt);

//         throw redirect(303, '/backoffice');

//     }
// };

import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';

import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { loginSchema } from '../../../validation-schemas/login.js';

import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';

export const load: PageServerLoad = async () => {
    const form = await superValidate(zod4(loginSchema));
    return { form };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event.request, zod4(loginSchema));
        if (!form.valid) return fail(400, { form });

        const { username, password } = form.data;

        const [user] = await db.select().from(userTable).where(eq(userTable.username, username)).limit(1);
        if (!user) return fail(400, { form, message: 'Username ou password incorretos' });

        const hash = (user as any).passwordHash ?? (user as any).password;
        const ok = await bcrypt.compare(password, hash);
        if (!ok) return fail(400, { form, message: 'Username ou password incorretos' });

        if ((user as any).isAdmin !== 1) return fail(403, { form, message: 'Sem permissões' });

        const token = generateSessionToken();
        const session = await createSession(token, user.id);

        setSessionTokenCookie(event.cookies, token, session.expiresAt);

        const next = event.url.searchParams.get('next');
        throw redirect(303, next || '/backoffice');
    }
};