import z from "zod/v4";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const sections = ['servicos_globais', 'servicos_alunos', 'servicos_docentes'] as const;

export const menuSchema = z.object({
    titlePt: z.
        string()
        .trim()
        .min(1, { message: 'Especifique o título PT' })
        .max(25, {
            message: 'O título PT não pode ter mais de 25 caracteres'
        }),

    titleEn: z
        .string()
        .trim()
        .min(1, { message: 'Especifique o título EN' })
        .max(25, {
            message: 'O título EN não pode ter mais de 25 caracteres'
        }),

    image: z
        .instanceof(File, { message: 'Selecione uma imagem' })
        .refine((f) => f.size > 0, { message: 'Selecione uma imagem' })
        .refine((f) => f.size <= MAX_IMAGE_BYTES, { message: 'A imagem não pode ultrapassar 5MB' })
        .refine((f) => ALLOWED_IMAGE_TYPES.has(f.type), {
            message: 'Formato inválido. Use JPG, PNG, WEBP ou GIF'
        }),

    slug: z
        .string()
        .trim()
        .toLowerCase()
        .regex(SLUG_REGEX, {
            message:
                'O slug deve conter apenas letras minúsculas e números, podendo usar "-" como separador (ex: menu-teste).'
        })
        .max(50, { message: 'O slug do menu não pode ter mais de 50 caracteres' }),
    section: z.enum(sections, { message: 'Selecione uma secção válida' }),
    isVisible: z.coerce.boolean().default(true)
});