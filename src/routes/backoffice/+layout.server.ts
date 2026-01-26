import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async ({ locals, url }) => {
    if (!locals.user) throw redirect(303, `/log-in?next=${encodeURIComponent(url.pathname)}`);
    if (locals.user.isAdmin !== 1) throw redirect(303, '/log-in');
    return {};
};