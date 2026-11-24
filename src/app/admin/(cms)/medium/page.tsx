import { desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { getSettings } from "@/lib/content";
import { lastSync } from "@/lib/medium-sync";
import { runMediumSync, saveMediumSettings } from "../../actions";
import { Card, Saved, Title, input, label } from "../ui";

export default async function Medium({ searchParams }: { searchParams: Promise<{ saved?: string; synced?: string; failed?: string }> }) {
  const [{ saved, synced, failed }, s] = await Promise.all([searchParams, getSettings()]);
  const sync = await lastSync().catch(() => null);
  const rows = db ? await db.select().from(schema.posts).where(eq(schema.posts.source, "medium")).orderBy(desc(schema.posts.publishAt)).limit(20) : [];
  return (
    <>
      <Title action={<form action={runMediumSync}><button className="btn-dark">Sync now</button></form>}>Medium sync</Title>
      <Saved show={saved} />
      <Saved show={synced} text={`Synced ${synced} posts from Medium.`} />
      {failed && <p className="mb-6 rounded-xl bg-red/10 px-4 py-3 text-sm font-medium text-red">Couldn&apos;t reach Medium. Check the handle and try again in a minute.</p>}
      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <Card>
          <form action={saveMediumSettings} className="space-y-4">
            <div><label className={label}>Medium handle</label><input name="medium" defaultValue={`@${s.medium}`} className={input} /></div>
            <div>
              <label className={label}>Show on /hearticles</label>
              <select name="blogMode" defaultValue={s.blogMode} className={input}>
                <option value="both">Journal + Medium</option>
                <option value="native">Journal only</option>
                <option value="medium">Medium only</option>
              </select>
            </div>
            <button className="btn-dark">Save</button>
          </form>
          <p className="mt-6 text-xs text-ash">Syncs automatically every 6 hours. Last sync: {sync ? `${new Date(sync.at).toLocaleString("en-GB")} (${sync.count} posts)` : "never"}. Medium posts link back to Medium as the original.</p>
        </Card>
        <Card className="p-0 sm:p-0">
          {rows.length ? (
            <ul className="divide-y divide-eagle/10">
              {rows.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 sm:px-6">
                  <span className="min-w-0"><span className="display block truncate">{p.title}</span><span className="text-sm text-ash">{p.publishAt.toLocaleDateString("en-GB")} · {p.category}</span></span>
                  <a href={p.canonicalUrl} target="_blank" rel="noreferrer" className="text-sm text-ash">Medium ↗</a>
                </li>
              ))}
            </ul>
          ) : <p className="p-6 text-sm text-ash">No Medium posts cached yet. Press Sync now.</p>}
        </Card>
      </div>
    </>
  );
}
