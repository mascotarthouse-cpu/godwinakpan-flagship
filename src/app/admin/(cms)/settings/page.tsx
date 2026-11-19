import { getSettings } from "@/lib/content";
import { saveSiteSettings } from "../../actions";
import { Card, Saved, Title, input, label } from "../ui";

export default async function Settings({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [{ saved }, s] = await Promise.all([searchParams, getSettings()]);
  return (
    <>
      <Title>Settings</Title>
      <Saved show={saved} />
      <form action={saveSiteSettings} className="grid max-w-3xl gap-6">
        <Card className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className={label}>Keynote reel (YouTube or Vimeo link)</label><input name="reelUrl" defaultValue={s.reelUrl} placeholder="https://youtube.com/watch?v=…" className={input} /></div>
          <div><label className={label}>Descriptor</label><input name="descriptor" defaultValue={s.descriptor} className={input} /></div>
          <div><label className={label}>Philosophy line</label><input name="philosophy" defaultValue={s.philosophy} className={input} /></div>
          <div><label className={label}>Email</label><input name="email" defaultValue={s.email} className={input} /></div>
          <div><label className={label}>Phone</label><input name="phone" defaultValue={s.phone} className={input} /></div>
          <div><label className={label}>Location</label><input name="location" defaultValue={s.location} className={input} /></div>
        </Card>
        <Card className="grid gap-4 sm:grid-cols-2">
          {s.socials.map((x) => (
            <div key={x.label}><label className={label}>{x.label}</label><input name={`social_${x.label}`} defaultValue={x.href} className={input} /></div>
          ))}
        </Card>
        <div><button className="btn-dark">Save settings</button></div>
      </form>
    </>
  );
}
