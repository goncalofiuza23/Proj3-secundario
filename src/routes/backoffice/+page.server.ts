import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { session as sessionTable, user as userTable } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

import type { Cookies } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import type { Payment } from '$lib/types/menu.js';

export const load: PageServerLoad = async ({ cookies }: { cookies: Cookies }) => {
    const sessionId = cookies.get('session_id');
    if (!sessionId) {
        throw redirect(303, '/log-in');
    }

    // Verifica se a sessão existe e obtém o utilizador
    const sessionResult = await db
        .select()
        .from(sessionTable)
        .where(eq(sessionTable.id, sessionId))
        .limit(1);

    const session = sessionResult[0];
    if (!session) {
        throw redirect(303, '/log-in');
    }

    // Busca o utilizador associado à sessão
    const userResult = await db
        .select()
        .from(userTable)
        .where(eq(userTable.id, session.userId))
        .limit(1);

    const user = userResult[0];

    // Só permite acesso a admins
    if (!user || user.isAdmin !== 1) {
        throw redirect(303, '/log-in');
    }

    const payments: Payment[] = [{
        id: '33',
        amount: 3545,
        status: "pending",
        email: "example@example.com"
    }]

    // Podes devolver dados do utilizador se quiseres
    return { user, payments };
};
