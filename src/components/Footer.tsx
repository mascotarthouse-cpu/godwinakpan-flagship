import Link from "next/link";
import Colons from "./Colons";
import type { Settings } from "@/lib/content";

export default function Footer({ s }: { s: Settings }) {
  const year = new Date().getFullYear();
  // Podcast joins this list at five episodes.
  const cols = [
    { title: "Explore", links: [["Story", "/story"], ["Work", "/work"], ["Impact", "/impact"], ["Hearticles", "/hearticles"]] },
    { title: "More", links: [["Speaking", "/speaking"], ["Mentorship", "/mentorship"], ["Press", "/press"], ["Subscribe", "/subscribe"], ["Shop", "/shop"]] },
    { title: "Follow", links: s.socials.map((x) => [x.label, x.href]) },
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
        <div className="mt-12"><Link href="/contact" className="btn-light">Let&apos;s talk</Link></div>
        <div className="mt-16 flex flex-col justify-between gap-2 text-xs text-sky/40 sm:flex-row">
          <p>© {year} Barr. Godwin Akpan. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-4">
            <Link href="/privacy" className="link-u hover:text-sky">Privacy</Link>
            <Link href="/terms" className="link-u hover:text-sky">Terms</Link>
            <a href="/rss.xml" className="link-u hover:text-sky">RSS</a>
            <a href="/llms.txt" className="link-u hover:text-sky">llms.txt</a>
            
          </p>
        </div>
      </div>
    </footer>
  );
}
