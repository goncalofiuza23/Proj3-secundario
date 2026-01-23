import z from "zod/v4";


export const loginSchema = z.object({
    username: z.string().min(1, { message: 'Especifique o username' }).max(50, { message: 'O username não pode ter mais de 50 caracteres' }),
    password: z.string().min(1, { message: 'Especifique a password' }).max(100, { message: 'A password não pode ter mais de 100 caracteres' })
});