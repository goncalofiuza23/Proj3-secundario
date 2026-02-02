import { db } from '$lib/server/db';
import { menuItem } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
    const id = Number(params.id);
    if (!Number.isFinite(id)) throw error(400, 'Id inválido');

    const [row] = await db
        .select({
            imageData: menuItem.imageData,
            imageMime: menuItem.imageMime
        })
        .from(menuItem)
        .where(eq(menuItem.id, id))
        .limit(1);

    if (!row?.imageData || !row.imageMime) throw error(404, 'Imagem não encontrada');

    const bytes = Buffer.isBuffer(row.imageData)
        ? row.imageData
        : Buffer.from(row.imageData as any);

    return new Response(bytes, {
        headers: {
            'Content-Type': row.imageMime,
            'Cache-Control': 'public, max-age=86400'
        }
    });
};
