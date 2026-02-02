import type { LayoutServerLoad } from './$types';

type Lang = 'pt' | 'en';

export const load: LayoutServerLoad = ({ cookies, request }) => {
    const cookieLang = cookies.get('lang');

    const accept = request.headers.get('accept-language') ?? '';
    const fallback: Lang = accept.toLowerCase().startsWith('en') ? 'en' : 'pt';

    const lang: Lang = cookieLang === 'en' || cookieLang === 'pt' ? cookieLang : fallback;

    return { lang };
};
