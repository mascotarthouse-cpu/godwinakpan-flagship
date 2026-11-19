import "server-only";
import { eq, sql } from "drizzle-orm";
import { db, schema } from "@/db";
import { getSettings } from "./content";
import { fetchMedium } from "./medium";

/** Pulls the Medium feed and upserts it into the posts table. */
export async function syncMedium() {
  if (!db) throw new Error("No database connected.");
  const s = await getSettings();
  const items = await fetchMedium(s.medium);
  for (const p of items) {
    await db
      .insert(schema.posts)
      .values({ ...p, publishAt: new Date(p.publishAt) })
      .onConflictDoUpdate({
        target: schema.posts.slug,
        set: { title: p.title, excerpt: p.excerpt, body: p.body, cover: p.cover, tags: p.tags, canonicalUrl: p.canonicalUrl, readMinutes: p.readMinutes, updatedAt: sql`now()` },
      });
  }
  const at = new Date().toISOString();
  await db
    .insert(schema.siteSettings)
    .values({ key: "medium_sync", value: { at, count: items.length } })
    .onConflictDoUpdate({ target: schema.siteSettings.key, set: { value: { at, count: items.length }, updatedAt: sql`now()` } });
  return { count: items.length, at };
}

export async function lastSync() {
  if (!db) return null;
  const r = await db.query.siteSettings.findFirst({ where: eq(schema.siteSettings.key, "medium_sync") });
  return (r?.value as { at: string; count: number }) ?? null;
}
