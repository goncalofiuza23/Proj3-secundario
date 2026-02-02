import type { Session, User } from '$lib/server/db/schema';

declare global {
	namespace App {
		interface Locals {
			user: Pick<User, 'id' | 'username' | 'isAdmin'> | null;
			session: Session | null;
			lang: 'pt' | 'en';
		}
	}
}

export { };
