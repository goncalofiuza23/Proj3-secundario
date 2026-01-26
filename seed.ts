import { db } from './src/lib/server/db';
import { user } from './src/lib/server/db/schema';
import { hash } from 'bcryptjs';

async function main() {
    console.log('🌱 A verificar base de dados...');


    const passwordHash = await hash('adminProjeto3', 10);
    const userId = crypto.randomUUID();

    try {
        await db.insert(user).values({
            id: userId,
            username: 'admin',
            password: passwordHash,
            isAdmin: 1
        });
        console.log('✅ SUCESSO! Admin criado.');
    } catch (error: any) {
        if (error.code === '23505') {
            console.log('⚠️ O utilizador "admin" já existe na base de dados.');
        } else {
            console.error('❌ Erro inesperado:', error);
        }
    }

    process.exit(0);
}

main();