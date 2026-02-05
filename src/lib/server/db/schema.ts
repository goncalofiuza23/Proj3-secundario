import {
	pgTable,
	text,
	timestamp,
	serial,
	integer,
	customType,
	boolean,
	pgEnum,
	jsonb
} from 'drizzle-orm/pg-core';

const byteaType = customType<{ data: Buffer; driverData: Buffer }>({
	dataType() {
		return 'bytea';
	}
});

export const contentLang = pgEnum('content_lang', ['pt', 'en'] as const);

export const contentBlockType = pgEnum('content_block_type', [
	'title',
	'subtitle',
	'text',
	'boxText',
	'image',
	'table',
	'file'
] as const);

export const rowCols = pgEnum('menu_item_row_cols', ['1', '2']);
export const contentCol = pgEnum('content_col', ['full', 'left', 'right']);

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
	isAdmin: integer('is_admin').notNull().default(0)
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
	titlePt: text('title_pt').notNull(),
	titleEn: text('title_en').notNull(),
	href: text('href').notNull(),
	section: text('section').notNull(),
	order: integer('order').default(0),
	imageData: byteaType('image_data').notNull(),
	imageMime: text('image_mime').notNull(),
	imageName: text('image_name').notNull(),
	isVisible: boolean('is_visible').notNull().default(true)
});

export const menuItemContent = pgTable('menu_item_content', {
	id: serial('id').primaryKey(),

	menuItemId: integer('menu_item_id')
		.notNull()
		.references(() => menuItem.id, { onDelete: 'cascade' }),

	lang: contentLang('lang').notNull(),
	type: contentBlockType('type').notNull(),

	rowId: integer('row_id')
		.notNull()
		.references(() => menuItemRow.id, { onDelete: 'cascade' }),

	col: contentCol('col').notNull().default('full'),
	colOrder: integer('col_order').notNull().default(0),

	titleText: text('title_text'),

	textValue: text('text_value'),

	imageData: byteaType('image_data'),
	imageMime: text('image_mime'),
	imageName: text('image_name'),
	imageWidth: integer('image_width').default(100),
	imageAlign: text('image_align').default('center'),

	tableData: jsonb('table_data'),

	fileData: byteaType('file_data'),
	fileMime: text('file_mime'),
	fileName: text('file_name'),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const menuItemRow = pgTable('menu_item_row', {
	id: serial('id').primaryKey(),

	menuItemId: integer('menu_item_id')
		.notNull()
		.references(() => menuItem.id, { onDelete: 'cascade' }),

	lang: contentLang('lang').notNull(),
	rowIndex: integer('row_index').notNull(),
	cols: rowCols('cols').notNull().default('1'),

	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type MenuItem = typeof menuItem.$inferSelect;
export type MenuItemContent = typeof menuItemContent.$inferSelect;
export type MenuItemRow = typeof menuItemRow.$inferSelect;