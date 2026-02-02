import { db } from '$lib/server/db';
import { menuItemContent } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function guessMime(name?: string | null) {
    const n = (name ?? '').toLowerCase();
    if (n.endsWith('.png')) return 'image/png';
    if (n.endsWith('.jpg') || n.endsWith('.jpeg')) return 'image/jpeg';
    if (n.endsWith('.webp')) return 'image/webp';
    if (n.endsWith('.gif')) return 'image/gif';
    if (n.endsWith('.svg')) return 'image/svg+xml';
    return 'application/octet-stream';
}

export const GET: RequestHandler = async ({ params }) => {
    const id = Number(params.id);
    if (!Number.isFinite(id) || id <= 0) throw error(400, 'Invalid id');

    const [row] = await db
        .select({
            imageData: menuItemContent.imageData,
            imageMime: menuItemContent.imageMime,
            imageName: menuItemContent.imageName
        })
        .from(menuItemContent)
        .where(eq(menuItemContent.id, id))
        .limit(1);

    if (!row?.imageData) throw error(404, 'Image not found');

    const v: unknown = row.imageData;

    let buf: Buffer;
    if (Buffer.isBuffer(v)) buf = v;
    else if (v instanceof Uint8Array) buf = Buffer.from(v);
    else if (v instanceof ArrayBuffer) buf = Buffer.from(v);
    else if (typeof v === 'string') buf = Buffer.from(v); // (se algum dia vier string)
    else buf = Buffer.from(v as any);

    const mime =
        (typeof row.imageMime === 'string' && row.imageMime.trim())
            ? row.imageMime
            : guessMime(row.imageName);

    const bytes = Uint8Array.from(buf);

    return new Response(bytes, {
        headers: {
            'Content-Type': mime,
            'Cache-Control': 'no-store'
        }
    });
};
