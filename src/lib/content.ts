import "server-only";
import { and, asc, desc, eq, lte } from "drizzle-orm";
import { db, schema } from "@/db";
import * as seed from "./seed";
import { fetchMedium } from "./medium";
import type { Post, Project } from "./seed";

export type Settings = typeof seed.site & { blogMode: "both" | "native" | "medium" };

export async function getSettings(): Promise<Settings> {
  const base: Settings = { ...seed.site, blogMode: "both" };
  if (!db) return base;
  try {
    const row = await db.query.siteSettings.findFirst({ where: eq(schema.siteSettings.key, "site") });
    return { ...base, ...((row?.value as Partial<Settings>) ?? {}) };
  } catch {
    return base;
  }
}

export async function getMedia() {
  const out = { ...seed.media };
  if (!db) return out;
  try {
    const rows = await db.select().from(schema.mediaAssets);
    for (const r of rows) out[r.slot] = { label: r.label, url: r.url, alt: r.alt };
  } catch {}
  return out;
}

export async function getProjects(): Promise<Project[]> {
  if (!db) return seed.projects;
  try {
    const rows = await db.select().from(schema.projects).where(eq(schema.projects.published, true)).orderBy(asc(schema.projects.order));
    return rows.length ? (rows as unknown as Project[]) : seed.projects;
  } catch {
    return seed.projects;
  }
}

const toPost = (r: typeof schema.posts.$inferSelect): Post => ({
  ...r,
  source: r.source as Post["source"],
  status: r.status as Post["status"],
  publishAt: r.publishAt.toISOString(),
});

/** Native posts plus Medium posts, newest first. Scheduled posts appear once their time passes. */
export async function getPosts(): Promise<Post[]> {
  const settings = await getSettings();
  let native: Post[] = [];
  let medium: Post[] = [];

  if (db) {
    try {
      const rows = await db
        .select()
        .from(schema.posts)
        .where(and(lte(schema.posts.publishAt, new Date()), eq(schema.posts.status, "published")))
        .orderBy(desc(schema.posts.publishAt));
      const scheduled = await db
        .select()
        .from(schema.posts)
        .where(and(lte(schema.posts.publishAt, new Date()), eq(schema.posts.status, "scheduled")));
      const all = [...rows, ...scheduled].map(toPost);
      native = all.filter((p) => p.source === "native");
      medium = all.filter((p) => p.source === "medium");
    } catch {
      native = seed.posts;
    }
  } else {
    native = seed.posts;
  }

  // No cached Medium posts yet: read the feed live (cached 30 min).
  if (!medium.length && settings.blogMode !== "native") {
    try {
      medium = await fetchMedium(settings.medium);
    } catch {}
  }

  const list =
    settings.blogMode === "native" ? native : settings.blogMode === "medium" ? medium : [...native, ...medium];
  return list.sort((a, b) => +new Date(b.publishAt) - +new Date(a.publishAt));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}
