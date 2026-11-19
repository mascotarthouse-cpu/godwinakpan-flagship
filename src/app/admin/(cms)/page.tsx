import Link from "next/link";
import { count, desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { lastSync } from "@/lib/medium-sync";
import { Card, Title } from "./ui";

export default async function Overview() {
  let stats = { posts: 0, medium: 0, newInq: 0 };
  let recent: (typeof schema.inquiries.$inferSelect)[] = [];
  let sync: Awaited<ReturnType<typeof lastSync>> = null;
  if (db) {
    const [p, m, n] = await Promise.all([
      db.select({ c: count() }).from(schema.posts).where(eq(schema.posts.source, "native")),
      db.select({ c: count() }).from(schema.posts).where(eq(schema.posts.source, "medium")),
      db.select({ c: count() }).from(schema.inquiries).where(eq(schema.inquiries.status, "new")),
    ]);
    stats = { posts: p[0].c, medium: m[0].c, newInq: n[0].c };
    recent = await db.select().from(schema.inquiries).orderBy(desc(schema.inquiries.createdAt)).limit(5);
    sync = await lastSync();
  }
  return (
    <>
      <Title action={<Link href="/admin/posts/new" className="btn-dark">New insight</Link>}>Good to see you.</Title>
      <div className="grid gap-4 sm:grid-cols-3">
        {[["Journal posts", stats.posts, "/admin/posts"], ["Medium posts", stats.medium, "/admin/medium"], ["New inquiries", stats.newInq, "/admin/inquiries"]].map(([l, v, h]) => (
          <Link key={String(l)} href={String(h)}><Card className="transition-colors hover:border-eagle"><p className="text-sm text-ash">{l}</p><p className="display mt-2 text-5xl">{v}</p></Card></Link>
        ))}
      </div>
      <Card className="mt-6">
        <div className="mb-4 flex items-center justify-between"><h2 className="display text-xl">Latest inquiries</h2><Link href="/admin/inquiries" className="text-sm text-ash">All</Link></div>
        {recent.length ? (
          <ul className="divide-y divide-eagle/10">
            {recent.map((r) => (
              <li key={r.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm"><span><b>{r.name}</b> · {r.intent}</span><span className="text-ash">{r.createdAt.toLocaleDateString("en-GB")}</span></li>
            ))}
          </ul>
        ) : <p className="text-sm text-ash">No inquiries yet.</p>}
      </Card>
      <p className="mt-6 text-sm text-ash">Medium last synced: {sync ? new Date(sync.at).toLocaleString("en-GB") : "never"}</p>
    </>
  );
}
