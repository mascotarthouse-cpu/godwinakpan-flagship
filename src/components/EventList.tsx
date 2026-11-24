import Colons from "./Colons";
import { events } from "@/lib/seed";

/** Upcoming events (past dates hide themselves). Pass an initiative slug to show only its events. Renders nothing when empty. */
export default function EventList({ initiative, dark = false }: { initiative?: string; dark?: boolean }) {
  const today = new Date(new Date().toDateString());
  const list = events
    .filter((e) => new Date(e.date) >= today && (!initiative || e.initiative === initiative))
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  if (!list.length) return null;
  const line = dark ? "border-sky/10" : "border-eagle/10";
  return (
    <section className={dark ? "bg-obsidian text-sky" : ""}>
      <div className="wrap py-24 sm:py-32">
        <Colons label="Next up" className="mb-10 text-red" />
        <ul className={`border-t ${line}`}>
          {list.map((e) => {
            const d = new Date(e.date);
            const inner = (
              <>
                <span className="display text-4xl leading-none sm:col-span-2">{d.getDate()}<span className={`mt-1 block font-body text-sm ${dark ? "text-sky/50" : "text-ash"}`}>{d.toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span></span>
                <span className="display text-h3 sm:col-span-6">{e.title}</span>
                <span className={`sm:col-span-4 ${dark ? "text-sky/60" : "text-ash"}`}>{e.place}{e.url ? " · Register ↗" : ""}</span>
              </>
            );
            const cls = `grid gap-2 border-b ${line} py-6 sm:grid-cols-12 sm:items-center`;
            return <li key={`${e.title}${e.date}`}>{e.url ? <a href={e.url} target="_blank" rel="noreferrer" className={`${cls} transition-colors hover:text-red`}>{inner}</a> : <div className={cls}>{inner}</div>}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}
