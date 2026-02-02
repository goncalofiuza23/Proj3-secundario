CREATE TYPE "public"."content_block_type" AS ENUM('title', 'text', 'image', 'table');--> statement-breakpoint
CREATE TYPE "public"."content_col" AS ENUM('full', 'left', 'right');--> statement-breakpoint
CREATE TYPE "public"."content_lang" AS ENUM('pt', 'en');--> statement-breakpoint
CREATE TYPE "public"."menu_item_row_cols" AS ENUM('1', '2');--> statement-breakpoint
CREATE TABLE "menu_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_pt" text NOT NULL,
	"title_en" text NOT NULL,
	"href" text NOT NULL,
	"section" text NOT NULL,
	"order" integer DEFAULT 0,
	"image_data" "bytea" NOT NULL,
	"image_mime" text NOT NULL,
	"image_name" text NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "menu_item_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"menu_item_id" integer NOT NULL,
	"lang" "content_lang" NOT NULL,
	"type" "content_block_type" NOT NULL,
	"row_id" integer NOT NULL,
	"col" "content_col" DEFAULT 'full' NOT NULL,
	"col_order" integer DEFAULT 0 NOT NULL,
	"title_text" text,
	"text_value" text,
	"image_data" "bytea",
	"image_mime" text,
	"image_name" text,
	"table_data" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "menu_item_row" (
	"id" serial PRIMARY KEY NOT NULL,
	"menu_item_id" integer NOT NULL,
	"lang" "content_lang" NOT NULL,
	"row_index" integer NOT NULL,
	"cols" "menu_item_row_cols" DEFAULT '1' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"is_admin" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "menu_item_content" ADD CONSTRAINT "menu_item_content_menu_item_id_menu_item_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_item_content" ADD CONSTRAINT "menu_item_content_row_id_menu_item_row_id_fk" FOREIGN KEY ("row_id") REFERENCES "public"."menu_item_row"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_item_row" ADD CONSTRAINT "menu_item_row_menu_item_id_menu_item_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;