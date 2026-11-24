"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { db, schema } from "@/db";
import { COOKIE, checkCredentials, sign, verify } from "@/lib/auth";
import { syncMedium } from "@/lib/medium-sync";
import { saveUpload } from "@/lib/storage";
import { getSettings } from "@/lib/content";
import { setupDatabase } from "@/db/setup";
import { setAudio } from "@/lib/engage";

async function guard() {
  const ok = await verify((await cookies()).get(COOKIE)?.value);
  if (!ok) redirect("/admin/login");
  if (!db) throw new Error("No database connected. Add DATABASE_URL in Netlify.");
  return db;
}
const refresh = () => ["/", "/hearticles", "/impact", "/work", "/about", "/stage", "/contact"].forEach((p) => revalidatePath(p));
const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

export async function login(_: unknown, f: FormData) {
  if (!checkCredentials(str(f, "email"), String(f.get("password") ?? ""))) {
    await new Promise((r) => setTimeout(r, 600));
    return { email: str(f, "email"), error: process.env.ADMIN_EMAIL ? "Wrong email or password." : "Admin login isn't set up yet. Add ADMIN_EMAIL and ADMIN_PASSWORD in Netlify." };
  }
  (await cookies()).set(COOKIE, await sign(str(f, "email")), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 14 });
  redirect(str(f, "next").startsWith("/admin") ? str(f, "next") : "/admin");
}

export async function logout() {
  (await cookies()).delete(COOKIE);
  redirect("/admin/login");
}

async function maybeUpload(f: FormData, key: string, fallback: string) {
  const file = f.get(key);
  if (file instanceof File && file.size > 0) return saveUpload(file);
  return fallback;
}

export async function savePost(f: FormData) {
  const d = await guard();
  const id = Number(f.get("id") || 0);
  const title = str(f, "title") || "Untitled";
  const body = str(f, "body");
  const status = str(f, "status") || "draft";
  const values = {
    title,
    slug: slugify(str(f, "slug") || title),
    excerpt: str(f, "excerpt"),
    body,
    category: str(f, "category") || "Brand Architecture",
    tags: str(f, "tags").split(",").map((t) => t.trim()).filter(Boolean),
    cover: await maybeUpload(f, "coverFile", str(f, "cover")),
    status,
    publishAt: str(f, "publishAt") ? new Date(str(f, "publishAt")) : new Date(),
    readMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 220)),
    source: "native",
    updatedAt: new Date(),
  };
  let newId = id;
  if (id) await d.update(schema.posts).set(values).where(eq(schema.posts.id, id));
  else newId = (await d.insert(schema.posts).values(values).returning({ id: schema.posts.id }))[0].id;
  await setAudio(values.slug, await maybeUpload(f, "audioFile", str(f, "audioUrl")));
  refresh();
  revalidatePath(`/hearticles/${values.slug}`);
  redirect(`/admin/posts/${newId}?saved=1`);
}

export async function deletePost(f: FormData) {
  const d = await guard();
  await d.delete(schema.posts).where(eq(schema.posts.id, Number(f.get("id"))));
  refresh();
  redirect("/admin/posts");
}

export async function runMediumSync() {
  await guard();
  let count = -1;
  try {
    count = (await syncMedium()).count;
  } catch (e) {
    console.error("medium sync failed", e);
  }
  refresh();
  redirect(count < 0 ? "/admin/medium?failed=1" : `/admin/medium?synced=${count}`);
}

async function getOverrides(): Promise<Record<string, unknown>> {
  if (!db) return {};
  const r = await db.query.siteSettings.findFirst({ where: eq(schema.siteSettings.key, "site") });
  return (r?.value as Record<string, unknown>) ?? {};
}

async function putSetting(key: string, value: unknown) {
  const d = await guard();
  await d.insert(schema.siteSettings).values({ key, value }).onConflictDoUpdate({ target: schema.siteSettings.key, set: { value, updatedAt: sql`now()` } });
}

export async function saveMediumSettings(f: FormData) {
  await putSetting("site", { ...(await getOverrides()), medium: str(f, "medium").replace(/^@/, ""), blogMode: str(f, "blogMode") || "both" });
  refresh();
  redirect("/admin/medium?saved=1");
}

export async function saveSiteSettings(f: FormData) {
  const cur = await getSettings();
  await putSetting("site", {
    ...(await getOverrides()),
    reelUrl: str(f, "reelUrl"),
    email: str(f, "email") || cur.email,
    phone: str(f, "phone") || cur.phone,
    location: str(f, "location") || cur.location,
    philosophy: str(f, "philosophy") || cur.philosophy,
    descriptor: str(f, "descriptor") || cur.descriptor,
    socials: cur.socials.map((s) => ({ ...s, href: str(f, `social_${s.label}`) || s.href })),
  });
  refresh();
  redirect("/admin/settings?saved=1");
}

export async function saveMedia(f: FormData) {
  const d = await guard();
  const slot = str(f, "slot");
  const url = await maybeUpload(f, "file", str(f, "url"));
  if (!slot || !url) redirect("/admin/media");
  const existing = await d.select().from(schema.mediaAssets).where(eq(schema.mediaAssets.slot, slot));
  const values = { slot, label: str(f, "label") || slot, url, alt: str(f, "alt"), updatedAt: new Date() };
  if (existing[0]) await d.update(schema.mediaAssets).set(values).where(eq(schema.mediaAssets.slot, slot));
  else await d.insert(schema.mediaAssets).values(values);
  refresh();
  redirect("/admin/media?saved=1");
}

export async function resetMedia(f: FormData) {
  const d = await guard();
  await d.delete(schema.mediaAssets).where(eq(schema.mediaAssets.slot, str(f, "slot")));
  refresh();
  redirect("/admin/media");
}

export async function saveProject(f: FormData) {
  const d = await guard();
  const id = Number(f.get("id") || 0);
  const title = str(f, "title");
  if (!title) redirect("/admin/projects");
  const values = {
    title,
    slug: slugify(title),
    client: str(f, "client"),
    discipline: str(f, "discipline") === "M&E" ? "M&E" : "Brand",
    year: str(f, "year"),
    summary: str(f, "summary"),
    result: str(f, "result"),
    image: await maybeUpload(f, "file", str(f, "image")),
    order: Number(f.get("order") || 0),
    published: f.get("published") === "on",
  };
  if (id) await d.update(schema.projects).set(values).where(eq(schema.projects.id, id));
  else await d.insert(schema.projects).values(values);
  refresh();
  redirect("/admin/projects?saved=1");
}

export async function deleteProject(f: FormData) {
  const d = await guard();
  await d.delete(schema.projects).where(eq(schema.projects.id, Number(f.get("id"))));
  refresh();
  redirect("/admin/projects");
}

export async function setInquiryStatus(f: FormData) {
  const d = await guard();
  await d.update(schema.inquiries).set({ status: str(f, "status") }).where(eq(schema.inquiries.id, Number(f.get("id"))));
  revalidatePath("/admin/inquiries");
}

export async function runSetup() {
  const ok = await verify((await cookies()).get(COOKIE)?.value);
  if (!ok) redirect("/admin/login");
  await setupDatabase();
  refresh();
  redirect("/admin?ready=1");
}
