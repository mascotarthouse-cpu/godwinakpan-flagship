import { asc } from "drizzle-orm";
import { db, schema } from "@/db";
import { deleteProject, saveProject } from "../../actions";
import { Card, Saved, Title, input, label } from "../ui";

type Row = Partial<typeof schema.projects.$inferSelect>;

function ProjectForm({ p }: { p: Row }) {
  return (
    <form action={saveProject} className="grid gap-3 sm:grid-cols-2">
      <input type="hidden" name="id" value={p.id ?? ""} />
      <div><label className={label}>Title</label><input name="title" defaultValue={p.title} required className={input} /></div>
      <div><label className={label}>Client</label><input name="client" defaultValue={p.client} className={input} /></div>
      <div><label className={label}>Discipline</label><select name="discipline" defaultValue={p.discipline ?? "Brand"} className={input}><option value="Brand">Brand Strategy & Design</option><option value="M&E">Monitoring & Evaluation</option></select></div>
      <div className="grid grid-cols-2 gap-3"><div><label className={label}>Year</label><input name="year" defaultValue={p.year} className={input} /></div><div><label className={label}>Order</label><input name="order" type="number" defaultValue={p.order ?? 0} className={input} /></div></div>
      <div className="sm:col-span-2"><label className={label}>Summary</label><input name="summary" defaultValue={p.summary} className={input} /></div>
      <div className="sm:col-span-2"><label className={label}>Result</label><input name="result" defaultValue={p.result} className={input} /></div>
      <div><label className={label}>Image URL</label><input name="image" defaultValue={p.image} className={input} /></div>
      <div><label className={label}>…or upload</label><input type="file" name="file" accept="image/*" className="w-full pt-3 text-sm" /></div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="published" defaultChecked={p.published ?? true} /> Show on site</label>
      <div className="flex justify-end"><button className="btn-dark">{p.id ? "Save" : "Add project"}</button></div>
    </form>
  );
}

export default async function Projects({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const rows = db ? await db.select().from(schema.projects).orderBy(asc(schema.projects.order)) : [];
  return (
    <>
      <Title>Work</Title>
      <Saved show={saved} />
      <div className="space-y-4">
        {rows.map((p) => (
          <details key={p.id} className="group rounded-2xl border border-eagle/10 bg-sky">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5"><span className="display text-lg">{p.title}</span><span className="text-sm text-ash">{p.discipline}{p.published ? "" : " · hidden"}</span></summary>
            <div className="border-t border-eagle/10 p-5">
              <ProjectForm p={p} />
              <form action={deleteProject} className="mt-4"><input type="hidden" name="id" value={p.id} /><button className="text-sm text-red">Delete</button></form>
            </div>
          </details>
        ))}
        <Card><p className="display mb-4 text-xl">Add a project</p><ProjectForm p={{}} /></Card>
      </div>
    </>
  );
}
