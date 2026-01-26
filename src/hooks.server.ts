// import type { Handle } from '@sveltejs/kit';
// import * as auth from '$lib/server/auth.js';

// export const handle: Handle = async ({ event, resolve }) => {
// 	const sessionToken = event.cookies.get(auth.sessionCookieName);

// 	if (!sessionToken) {
// 		event.locals.user = null;
// 		event.locals.session = null;
// 		return resolve(event);
// 	}

// 	const { session, user } = await auth.validateSessionToken(sessionToken);

// 	if (session) {
// 		auth.setSessionTokenCookie(event.cookies, sessionToken, session.expiresAt);
// 	} else {
// 		auth.deleteSessionTokenCookie(event.cookies);
// 	}

// 	event.locals.user = user;
// 	event.locals.session = session;

// 	return resolve(event);
// };

// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event.cookies, sessionToken, session.expiresAt);
		event.locals.user = user;
		event.locals.session = session;
	} else {
		auth.deleteSessionTokenCookie(event.cookies);
		event.locals.user = null;
		event.locals.session = null;
	}

	return resolve(event);
};
