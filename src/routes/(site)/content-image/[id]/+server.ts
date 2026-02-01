import { db } from '$lib/server/db';
import { menuItemContent } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
    const id = Number(params.id);
    if (!Number.isFinite(id) || id <= 0) throw error(400, 'Invalid id');

    const [row] = await db
        .select({
            imageData: menuItemContent.imageData,
            imageMime: menuItemContent.imageMime
        })
        .from(menuItemContent)
        .where(eq(menuItemContent.id, id))
        .limit(1);

    if (!row?.imageData || !row.imageMime) throw error(404, 'Image not found');

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
