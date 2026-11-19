import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { Card, Title } from "../ui";

export default async function Posts() {
  const rows = db ? await db.select().from(schema.posts).where(eq(schema.posts.source, "native")).orderBy(desc(schema.posts.publishAt)) : [];
  const badge = (s: string, at: Date) =>
    s === "published" ? (at > new Date() ? "Scheduled" : "Live") : s === "scheduled" ? (at > new Date() ? "Scheduled" : "Live") : "Draft";
  return (
    <>
      <Title action={<Link href="/admin/posts/new" className="btn-dark">New insight</Link>}>Insights</Title>
      <Card className="p-0 sm:p-0">
        {rows.length ? (
          <ul className="divide-y divide-eagle/10">
            {rows.map((p) => {
              const b = badge(p.status, p.publishAt);
              return (
                <li key={p.id}>
                  <Link href={`/admin/posts/${p.id}`} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-paper sm:px-6">
                    <span className="min-w-0"><span className="display block truncate text-lg">{p.title}</span><span className="text-sm text-ash">{p.category} · {p.publishAt.toLocaleDateString("en-GB")}</span></span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${b === "Live" ? "bg-growth/10 text-growth" : b === "Scheduled" ? "bg-flight/10 text-flight" : "bg-paper text-ash"}`}>{b}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : <p className="p-6 text-sm text-ash">No posts yet. Write your first insight.</p>}
      </Card>
    </>
  );
}
