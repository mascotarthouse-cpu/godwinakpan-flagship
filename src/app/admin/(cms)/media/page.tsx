import { getMedia } from "@/lib/content";
import { resetMedia, saveMedia } from "../../actions";
import { Card, Saved, Title, input } from "../ui";

export default async function Media({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [{ saved }, m] = await Promise.all([searchParams, getMedia()]);
  return (
    <>
      <Title>Media</Title>
      <p className="-mt-4 mb-8 max-w-xl text-ash">Swap any photo on the site. Upload a file, or paste a link (for example a Google Drive or Cloudinary URL).</p>
      <Saved show={saved} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(m).map(([slot, a]) => (
          <Card key={slot} className="p-3 sm:p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.url} alt={a.alt} className="aspect-[4/5] w-full rounded-xl bg-paper object-cover" />
            <form action={saveMedia} className="mt-3 space-y-2 px-1 pb-1">
              <p className="display">{a.label}</p>
              <input type="hidden" name="slot" value={slot} />
              <input type="hidden" name="label" value={a.label} />
              <input name="alt" defaultValue={a.alt} placeholder="Description (alt text)" className={`${input} py-2 text-sm`} />
              <input name="url" placeholder="…or paste image URL" className={`${input} py-2 text-sm`} />
              <input type="file" name="file" accept="image/*" className="w-full text-xs" />
              <div className="flex items-center justify-between pt-1">
                <button className="btn-dark px-4 py-2 text-xs">Replace</button>
              </div>
            </form>
            <form action={resetMedia} className="px-1"><input type="hidden" name="slot" value={slot} /><button className="text-xs text-ash hover:text-red">Reset to default</button></form>
          </Card>
        ))}
      </div>
    </>
  );
}
