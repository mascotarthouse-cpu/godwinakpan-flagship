import "server-only";
import { createHash } from "crypto";
import { sql } from "drizzle-orm";
import { db } from "@/db";

/**
 * Hearticles engagement: the "Felt this" heart count and audio narration links.
 * Both live in their own small tables, created on first use, so the posts table never changes shape.
 * Without a database everything quietly returns empty and the site still renders.
 */
let ready = false;
async function ensure() {
  if (!db || ready) return !!db;
  await db.execute(sql.raw(`CREATE TABLE IF NOT EXISTS "hearts" ("slug" text NOT NULL, "visitor" text NOT NULL, "created_at" timestamp with time zone DEFAULT now() NOT NULL, PRIMARY KEY ("slug", "visitor"))`));
  await db.execute(sql.raw(`CREATE TABLE IF NOT EXISTS "post_audio" ("slug" text PRIMARY KEY NOT NULL, "url" text NOT NULL, "updated_at" timestamp with time zone DEFAULT now() NOT NULL)`));
  ready = true;
  return true;
}

/** One heart per visitor per Hearticle. The visitor is a one-way hash, so no address is stored. */
export function visitorId(ip: string, ua: string, slug: string) {
  return createHash("sha256").update(`${ip}|${ua}|${slug}|${process.env.AUTH_SECRET || "hearts"}`).digest("hex").slice(0, 32);
}

export async function heartCount(slug: string): Promise<number> {
  try {
    if (!(await ensure())) return 0;
    const r = await db!.execute(sql`select count(*)::int as n from hearts where slug = ${slug}`);
    const rows = ((r as unknown as { rows?: { n: number }[] }).rows ?? (r as unknown as { n: number }[]));
    return Number(rows[0]?.n ?? 0);
  } catch {
    return 0;
  }
}

export async function addHeart(slug: string, visitor: string): Promise<number> {
  if (!(await ensure())) return 0;
  await db!.execute(sql`insert into hearts (slug, visitor) values (${slug}, ${visitor}) on conflict do nothing`);
  return heartCount(slug);
}

export async function getAudio(slug: string): Promise<string> {
  try {
    if (!(await ensure())) return "";
    const r = await db!.execute(sql`select url from post_audio where slug = ${slug} limit 1`);
    const rows = ((r as unknown as { rows?: { url: string }[] }).rows ?? (r as unknown as { url: string }[]));
    return rows[0]?.url ?? "";
  } catch {
    return "";
  }
}

export async function setAudio(slug: string, url: string) {
  if (!(await ensure())) return;
  if (!url) await db!.execute(sql`delete from post_audio where slug = ${slug}`);
  else await db!.execute(sql`insert into post_audio (slug, url) values (${slug}, ${url}) on conflict (slug) do update set url = ${url}, updated_at = now()`);
}
