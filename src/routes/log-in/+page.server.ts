// src/routes/login/+page.server.ts
import { fail, redirect, type Cookies } from '@sveltejs/kit';
import type { Actions } from './$types';
import bcrypt from 'bcryptjs';
import { db } from '$lib/server/db';
import { user as userTable, session as sessionTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { loginSchema } from '../../validation-schemas/login.js';
import { zod, zod4 } from 'sveltekit-superforms/adapters';


export const load: PageServerLoad = async () => {
    const form = await superValidate(zod4(loginSchema));
    return { form };
};

export const actions: Actions = {
    default: async ({ cookies, request }: { cookies: Cookies; request: Request }) => {
        const data = await request.formData();
        const username = data.get('username') as string;
        const password = data.get('password') as string;

        const result = await db
            .select()
            .from(userTable)
            .where(eq(userTable.username, username))
            .limit(1);

        const user = result[0];

        if (!user) {
            return fail(400, { message: 'Username ou password incorretos' });
        }

        const passwordValida = await bcrypt.compare(password, user.password);

        if (!passwordValida) {
            return fail(400, { message: 'Username ou password incorretos' });
        }

        // Cria uma nova sessão na base de dados
        const sessionId = randomUUID();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h
        await db.insert(sessionTable).values({
            id: sessionId,
            userId: user.id,
            expiresAt
        });

        cookies.set('session_id', sessionId, {
            path: '/',
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24
        });

        throw redirect(303, '/backoffice');
    }
};