import pt from './pt.json';
import en from './en.json';

export type Lang = 'pt' | 'en';

const dict = { pt, en } as const;

export function t(lang: Lang, key: string): string {
    const parts = key.split('.');
    let cur: any = dict[lang];

    for (const p of parts) {
        cur = cur?.[p];
    }

    return typeof cur === 'string' ? cur : key;
}
