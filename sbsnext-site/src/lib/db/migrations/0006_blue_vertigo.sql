ALTER TABLE "Document" RENAME COLUMN "text" TO "kind";--> statement-breakpoint
ALTER TABLE "Document" ADD COLUMN "codeLanguage" varchar;