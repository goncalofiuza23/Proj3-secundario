import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	throw redirect(303, '/log-in');
};

export const actions: Actions = {
	default: async ({ cookies }) => {
		const token = cookies.get(auth.sessionCookieName);

		if (token) {
			const { session } = await auth.validateSessionToken(token);

			if (session) {
				await db.delete(table.session).where(eq(table.session.id, session.id));
			}

			auth.deleteSessionTokenCookie(cookies);
		}

		cookies.delete('session_id', { path: '/' });

		throw redirect(303, '/log-in');
	}
};