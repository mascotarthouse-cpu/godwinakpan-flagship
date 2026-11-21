import "server-only";
import { sql } from "drizzle-orm";
import { db, schema } from "./index";
import { posts, projects } from "@/lib/seed";

// Creates the tables (if missing) and copies the built-in content in. Safe to run more than once.
const STATEMENTS: string[] = [
  "CREATE TABLE IF NOT EXISTS \"inquiries\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"intent\" text NOT NULL,\n\t\"name\" text NOT NULL,\n\t\"email\" text NOT NULL,\n\t\"organisation\" text DEFAULT '' NOT NULL,\n\t\"message\" text NOT NULL,\n\t\"status\" text DEFAULT 'new' NOT NULL,\n\t\"created_at\" timestamp with time zone DEFAULT now() NOT NULL\n);",
  "CREATE TABLE IF NOT EXISTS \"media_assets\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"slot\" text NOT NULL,\n\t\"label\" text NOT NULL,\n\t\"url\" text NOT NULL,\n\t\"alt\" text DEFAULT '' NOT NULL,\n\t\"updated_at\" timestamp with time zone DEFAULT now() NOT NULL\n);",
  "CREATE TABLE IF NOT EXISTS \"posts\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"slug\" text NOT NULL,\n\t\"title\" text NOT NULL,\n\t\"excerpt\" text DEFAULT '' NOT NULL,\n\t\"body\" text DEFAULT '' NOT NULL,\n\t\"cover\" text DEFAULT '' NOT NULL,\n\t\"category\" text DEFAULT 'Brand Architecture' NOT NULL,\n\t\"tags\" jsonb DEFAULT '[]'::jsonb NOT NULL,\n\t\"source\" text DEFAULT 'native' NOT NULL,\n\t\"canonical_url\" text DEFAULT '' NOT NULL,\n\t\"status\" text DEFAULT 'draft' NOT NULL,\n\t\"publish_at\" timestamp with time zone DEFAULT now() NOT NULL,\n\t\"read_minutes\" integer DEFAULT 3 NOT NULL,\n\t\"created_at\" timestamp with time zone DEFAULT now() NOT NULL,\n\t\"updated_at\" timestamp with time zone DEFAULT now() NOT NULL\n);",
  "CREATE TABLE IF NOT EXISTS \"projects\" (\n\t\"id\" serial PRIMARY KEY NOT NULL,\n\t\"slug\" text NOT NULL,\n\t\"title\" text NOT NULL,\n\t\"client\" text DEFAULT '' NOT NULL,\n\t\"discipline\" text DEFAULT 'Brand' NOT NULL,\n\t\"year\" text DEFAULT '' NOT NULL,\n\t\"summary\" text DEFAULT '' NOT NULL,\n\t\"result\" text DEFAULT '' NOT NULL,\n\t\"image\" text DEFAULT '' NOT NULL,\n\t\"order\" integer DEFAULT 0 NOT NULL,\n\t\"published\" boolean DEFAULT true NOT NULL\n);",
  "CREATE TABLE IF NOT EXISTS \"site_settings\" (\n\t\"key\" text PRIMARY KEY NOT NULL,\n\t\"value\" jsonb NOT NULL,\n\t\"updated_at\" timestamp with time zone DEFAULT now() NOT NULL\n);",
  "CREATE UNIQUE INDEX IF NOT EXISTS \"posts_slug_idx\" ON \"posts\" USING btree (\"slug\");"
];

export async function databaseReady() {
  if (!db) return false;
  try {
    await db.execute(sql`select 1 from posts limit 1`);
    return true;
  } catch {
    return false;
  }
}

export async function setupDatabase() {
  if (!db) throw new Error("No database connected.");
  // On Netlify Database the tables come from netlify/database/migrations (the app user can't run DDL).
  // Elsewhere (local Postgres, Neon) create them here.
  if (!(await databaseReady())) {
    for (const s of STATEMENTS) await db.execute(sql.raw(s));
  }
  for (const p of posts) {
    await db.insert(schema.posts).values({ ...p, publishAt: new Date(p.publishAt) }).onConflictDoNothing();
  }
  const existing = await db.select({ id: schema.projects.id }).from(schema.projects).limit(1);
  if (!existing.length) await db.insert(schema.projects).values(projects.map((p, i) => ({ ...p, order: i })));
}

let ensuring: Promise<void> | null = null;
/** Creates tables + starter content the first time the site talks to an empty database. */
export function ensureDatabase(): Promise<void> {
  if (!db) return Promise.resolve();
  if (!ensuring) {
    ensuring = (async () => {
      if (!(await databaseReady())) {
        await setupDatabase();
        return;
      }
      // Tables exist (e.g. created by Netlify migrations): add starter content if still empty.
      const any = await db!.select({ id: schema.posts.id }).from(schema.posts).limit(1);
      if (!any.length) await setupDatabase();
    })().catch((e) => {
      ensuring = null;
      console.error("database setup failed", e);
    });
  }
  return ensuring;
}
