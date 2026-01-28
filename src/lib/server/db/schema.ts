// import { pgTable, text, timestamp, serial, integer } from 'drizzle-orm/pg-core';

// export const user = pgTable('user', {
// 	id: text('id').primaryKey(),
// 	username: text('username').notNull().unique(),
// 	password: text('password').notNull(),
// 	isAdmin: integer('is_admin').notNull().default(0),
// });

// export const session = pgTable('session', {
// 	id: text('id').primaryKey(),
// 	userId: text('user_id')
// 		.notNull()
// 		.references(() => user.id),
// 	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
// });

// export const menuItem = pgTable('menu_item', {
// 	id: serial('id').primaryKey(),
// 	title: text('title').notNull(),
// 	href: text('href').notNull(),
// 	section: text('section').notNull(),
// 	imageUrl: text('image_url').notNull(),
// 	order: integer('order').default(0),
// });

// export type Session = typeof session.$inferSelect;
// export type User = typeof user.$inferSelect;
// export type MenuItem = typeof menuItem.$inferSelect;

import { pgTable, text, timestamp, serial, integer, customType, boolean } from 'drizzle-orm/pg-core';

const byteaType = customType<{ data: Buffer; driverData: Buffer }>({
	dataType() {
		return 'bytea';
	}
});

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
	isAdmin: integer('is_admin').notNull().default(0),
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const menuItem = pgTable('menu_item', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	href: text('href').notNull(),
	section: text('section').notNull(),
	order: integer('order').default(0),
	imageData: byteaType('image_data').notNull(),
	imageMime: text('image_mime').notNull(),
	imageName: text('image_name').notNull(),
	isVisible: boolean('is_visible').notNull().default(true)
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type MenuItem = typeof menuItem.$inferSelect;