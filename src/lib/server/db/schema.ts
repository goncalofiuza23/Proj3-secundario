// src/lib/server/db/schema.ts
import { pgTable, text, timestamp, serial, integer } from 'drizzle-orm/pg-core';

// Tabela de Utilizadores (Admin)
export const user = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
	isAdmin: integer('is_admin').notNull().default(0),
});

// Tabela de Sessões (Login)
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
	imageUrl: text('image_url').notNull(),
	order: integer('order').default(0)
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type MenuItem = typeof menuItem.$inferSelect;