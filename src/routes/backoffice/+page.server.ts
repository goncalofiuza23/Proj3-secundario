// import { redirect } from '@sveltejs/kit';
// import { db } from '$lib/server/db/index.js';
// import { session as sessionTable, user as userTable } from '$lib/server/db/schema.js';
// import { eq } from 'drizzle-orm';

// import type { Cookies } from '@sveltejs/kit';
// import type { PageServerLoad } from './$types.js';
// import type { Payment } from '$lib/types/menu.js';

// export const load: PageServerLoad = async ({ cookies }: { cookies: Cookies }) => {
//     const sessionId = cookies.get('session_id');
//     if (!sessionId) {
//         throw redirect(303, '/log-in');
//     }

//     // Verifica se a sessão existe e obtém o utilizador
//     const sessionResult = await db
//         .select()
//         .from(sessionTable)
//         .where(eq(sessionTable.id, sessionId))
//         .limit(1);

//     const session = sessionResult[0];
//     if (!session) {
//         throw redirect(303, '/log-in');
//     }

//     // Busca o utilizador associado à sessão
//     const userResult = await db
//         .select()
//         .from(userTable)
//         .where(eq(userTable.id, session.userId))
//         .limit(1);

//     const user = userResult[0];

//     // Só permite acesso a admins
//     if (!user || user.isAdmin !== 1) {
//         throw redirect(303, '/log-in');
//     }

//     const payments: Payment[] = [{
//         id: '33',
//         amount: 3545,
//         status: "pending",
//         email: "example@example.com"
//     }]

//     // Podes devolver dados do utilizador se quiseres
//     return { user, payments };
// };
// ------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------

import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { menuItem } from '$lib/server/db/schema';
import { asc, eq, desc } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';


export const load: PageServerLoad = async () => {
    const items = await db
        .select({
            id: menuItem.id,
            title: menuItem.title,
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