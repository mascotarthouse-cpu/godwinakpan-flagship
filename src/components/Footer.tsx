import Link from "next/link";
import Colons from "./Colons";
import type { Settings } from "@/lib/content";

export default function Footer({ s }: { s: Settings }) {
  const year = new Date().getFullYear();
  const cols = [
    { title: "Explore", links: [["About", "/about"], ["Work", "/work"], ["Initiatives", "/initiatives"], ["Speaking & Media", "/speaking-media"], ["Insights", "/insights"]] },
    { title: "Ecosystem", links: [["Mascot Arthouse", "/work?d=Brand"], ["Ifiok Beyond Design", "/initiatives#ibd"], ["THE SHIFT", "/initiatives#the-shift"], ["Dorathy Akpan Foundation", "/initiatives#dorathy-akpan-foundation"]] },
    { title: "Connect", links: s.socials.map((x) => [x.label, x.href]) },
  ];
  return (
    <footer className="bg-obsidian text-sky">
      <div className="wrap pb-10 pt-24 sm:pt-32">
        <Colons className="mb-8 text-red" />
        <p className="display text-mega">{s.mantraWords.slice(0, 2).join(" ")}<br /><span className="text-sky/35">{s.mantraWords.slice(2).join(" ").replace("™", "")}<sup className="align-[0.9em] text-[0.3em]">™</sup></span></p>
        <div className="mt-20 grid gap-12 border-t border-sky/10 pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-lg text-sky/70">{s.philosophy}</p>
            <a href={`mailto:${s.email}`} className="display mt-4 block break-all text-2xl link-u w-fit">{s.email}</a>
            <p className="mt-2 text-sm text-sky/50">{s.location}</p>
          </div>
          {cols.map((c) => (
            <nav key={c.title} className="lg:col-span-2 lg:col-start-auto" aria-label={c.title}>
              <p className="eyebrow mb-4 text-slate">{c.title}</p>
              <ul className="space-y-2 text-sm text-sky/75">
                {c.links.map(([l, h]) => (
                  <li key={l}>
                    {h.startsWith("http") ? <a href={h} target="_blank" rel="noreferrer" className="link-u hover:text-sky">{l}</a> : <Link href={h} className="link-u hover:text-sky">{l}</Link>}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="lg:col-span-2">
            <p className="eyebrow mb-4 text-slate">Start</p>
            <Link href="/contact" className="btn-light">Work with Godwin</Link>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-2 text-xs text-sky/40 sm:flex-row">
          <p>© {year} Barr. Godwin Akpan. All rights reserved.</p>
          <p>Head · Heart · Hand</p>
        </div>
      </div>
    </footer>
  );
}
