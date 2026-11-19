import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { CATEGORIES } from "@/lib/seed";
import { deletePost, savePost } from "../../../actions";
import Editor from "./Editor";
import { Card, Saved, Title, input, label } from "../../ui";

const local = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

export default async function EditPost({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const [{ id }, { saved }] = await Promise.all([params, searchParams]);
  const isNew = id === "new";
  const p = !isNew && db ? (await db.select().from(schema.posts).where(eq(schema.posts.id, Number(id))))[0] : undefined;
  if (!isNew && !p) notFound();
  return (
    <>
      <Title action={p && p.status !== "draft" ? <a href={`/insights/${p.slug}`} target="_blank" className="btn-ghost">View ↗</a> : null}>{isNew ? "New insight" : "Edit insight"}</Title>
      <Saved show={saved} />
      <form action={savePost} className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <input type="hidden" name="id" value={p?.id ?? ""} />
        <div className="space-y-4">
          <input name="title" defaultValue={p?.title} placeholder="Title" required className="display w-full bg-transparent text-4xl outline-none placeholder:text-ash/40" />
          <textarea name="excerpt" defaultValue={p?.excerpt} rows={2} placeholder="One-line summary" className={`${input} resize-none`} />
          <Editor initial={p?.body ?? ""} />
        </div>
        <div className="space-y-4">
          <Card className="space-y-4">
            <div>
              <label className={label}>Status</label>
              <select name="status" defaultValue={p?.status ?? "draft"} className={input}>
                <option value="draft">Draft</option>
                <option value="published">Publish</option>
                <option value="scheduled">Schedule</option>
              </select>
            </div>
            <div>
              <label className={label}>Publish date & time</label>
              <input type="datetime-local" name="publishAt" defaultValue={local(p?.publishAt ?? new Date())} className={input} />
              <p className="mt-1 text-xs text-ash">A future date keeps it hidden until then.</p>
            </div>
            <button className="btn-dark w-full justify-center">Save</button>
          </Card>
          <Card className="space-y-4">
            <div>
              <label className={label}>Category</label>
              <select name="category" defaultValue={p?.category} className={input}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
            </div>
            <div><label className={label}>Tags (comma separated)</label><input name="tags" defaultValue={p?.tags.join(", ")} className={input} /></div>
            <div><label className={label}>URL slug</label><input name="slug" defaultValue={p?.slug} placeholder="auto from title" className={input} /></div>
            <div>
              <label className={label}>Cover image or video still</label>
              {p?.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.cover} alt="" className="mb-2 aspect-video w-full rounded-lg object-cover" />
              )}
              <input type="hidden" name="cover" value={p?.cover ?? ""} />
              <input type="file" name="coverFile" accept="image/*,video/*" className="w-full text-sm" />
            </div>
          </Card>
        </div>
      </form>
      {p && (
        <form action={deletePost} className="mt-10"><input type="hidden" name="id" value={p.id} /><button className="text-sm text-red">Delete this post</button></form>
      )}
    </>
  );
}
