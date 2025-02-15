ALTER TABLE "Document" ALTER COLUMN "userId" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "clientIP" varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN "password";