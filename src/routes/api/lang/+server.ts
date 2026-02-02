import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function normalizeLang(raw: unknown): 'pt' | 'en' | null {
    if (typeof raw !== 'string') return null;

    const v = raw.trim().toLowerCase();

    if (v === 'pt' || v.startsWith('pt-') || v.startsWith('pt_')) return 'pt';

    if (v === 'en' || v.startsWith('en-') || v.startsWith('en_')) return 'en';

    return null;
}

export const POST: RequestHandler = async ({ request, cookies, url }) => {
    let langRaw: unknown;

    if (url.searchParams.has('lang')) {
        langRaw = url.searchParams.get('lang');
    } else {
        const ct = request.headers.get('content-type') ?? '';

        if (ct.includes('application/json')) {
            const body = await request.json().catch(() => ({}));
            langRaw = (body as any)?.lang;
        } else {
            const fd = await request.formData().catch(() => null);
            langRaw = fd?.get('lang');
        }
    }

    const lang = normalizeLang(langRaw);
    if (!lang) throw error(400, 'Invalid lang');

    cookies.set('lang', lang, {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 365
    });

    return json({ success: true, lang });
};
