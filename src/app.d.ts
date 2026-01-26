// // See https://svelte.dev/docs/kit/types#app.d.ts
// // for information about these interfaces
// declare global {
// 	namespace App {
// 		interface Locals {
// 			user: Pick<User, 'id' | 'username' | 'isAdmin'> | null;
// 			session: Session | null;
// 		}
// 	} // interface Error {}
// 	// interface Locals {}
// } // interface PageData {}
// // interface PageState {}

// // interface Platform {}
// export { };

// NOVO
import type { Session, User } from '$lib/server/db/schema';

declare global {
	namespace App {
		interface Locals {
			user: Pick<User, 'id' | 'username' | 'isAdmin'> | null;
			session: Session | null;
		}
	}
}

export { };
