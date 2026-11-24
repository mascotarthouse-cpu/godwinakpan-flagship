import Link from "next/link";
import Colons from "./Colons";
import type { Settings } from "@/lib/content";

export default function Footer({ s }: { s: Settings }) {
  const year = new Date().getFullYear();
  const cols = [
    { title: "Head · Ideas", links: [["Hearticles", "/hearticles"], ["The book", "/book"], ["Newsletter", "/newsletter"], ["The Stage", "/stage"]] },
    { title: "Heart · Impact", links: [["Purpose over pleasure", "/impact"], ["Ifiok Beyond Design", "/impact/ibd"], ["THE SHIFT", "/impact/the-shift"], ["Dorathy Akpan Foundation", "/impact/dorathy-akpan-foundation"]] },
    { title: "Hand · Work", links: [["Brand strategy", "/work?d=Brand"], ["Monitoring & Evaluation", "/work?d=M%26E"], ["Mascot Arthouse", "/about#ventures"], ["About", "/about"]] },
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
        </div>
        <div className="mt-12"><Link href="/contact" className="btn-light">Start a conversation</Link></div>
        <div className="mt-16 flex flex-col justify-between gap-2 text-xs text-sky/40 sm:flex-row">
          <p>© {year} Barr. Godwin Akpan. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-4">
            <Link href="/stage#press" className="link-u hover:text-sky">Press</Link>
            <Link href="/legal" className="link-u hover:text-sky">Legal</Link>
            <a href="/rss.xml" className="link-u hover:text-sky">RSS</a>
            <a href="/llms.txt" className="link-u hover:text-sky">llms.txt</a>
            <span>Head · Heart · Hand</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
