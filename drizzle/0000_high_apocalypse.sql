CREATE TABLE "menu_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"href" text NOT NULL,
	"section" text NOT NULL,
	"order" integer DEFAULT 0,
	"image_data" "bytea" NOT NULL,
	"image_mime" text NOT NULL,
	"image_name" text NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL
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
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;