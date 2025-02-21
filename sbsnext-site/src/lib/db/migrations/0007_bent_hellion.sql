CREATE TABLE "UserContact" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"userId" uuid NOT NULL,
	"name" varchar(64),
	"email" varchar(64),
	"phone" varchar(64)
);
--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "createdAt" timestamp DEFAULT NOW();
UPDATE "User" SET "createdAt" = NOW() WHERE "createdAt" IS NULL;
ALTER TABLE "User" ALTER COLUMN "createdAt" SET NOT NULL;
ALTER TABLE "UserContact" ADD CONSTRAINT "UserContact_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN "email";