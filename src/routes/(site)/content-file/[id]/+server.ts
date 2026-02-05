import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { menuItemContent } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params }) => {
    const id = Number(params.id);
    if (!Number.isFinite(id) || id <= 0) throw error(400, 'Invalid id');

    const [row] = await db
        .select({
            fileData: menuItemContent.fileData,
            fileMime: menuItemContent.fileMime,
            fileName: menuItemContent.fileName
        })
        .from(menuItemContent)
        .where(eq(menuItemContent.id, id))
        .limit(1);

    if (!row) throw error(404, 'Not found');
    if (!row.fileData) throw error(404, 'File not found');

    const mime = row.fileMime ?? 'application/octet-stream';
    const filename = row.fileName ?? `file-${id}`;

    const u8 =
        row.fileData instanceof Uint8Array
            ? row.fileData
            : new Uint8Array(row.fileData as unknown as ArrayBuffer);

    const ab = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);

    return new Response(ab as BodyInit, {
        headers: {
            'content-type': mime,
            'content-disposition': `attachment; filename="${filename.replace(/"/g, '')}"; filename*=UTF-8''${encodeURIComponent(
                filename
            )}`
        }
    });
};