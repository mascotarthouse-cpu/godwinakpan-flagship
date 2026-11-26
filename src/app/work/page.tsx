import type { Metadata } from "next";
import Link from "next/link";
import Colons from "@/components/Colons";
import NextChapter from "@/components/NextChapter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Voices from "@/components/Voices";
import WorkGrid from "@/components/WorkGrid";
import { getProjects, getSettings } from "@/lib/content";
import { companies, offers } from "@/lib/seed";

export const metadata: Metadata = {
  title: { absolute: "Brand strategist in Nigeria | Godwin Akpan" },
  description: "Make: three ways to work with Godwin Akpan. Disruptive brand transformation, institutional and nation branding, and leadership in the creative economy.",
  alternates: { canonical: "/work" },
};
export const revalidate = 300;

const tones = ["bg-eagle text-sky", "bg-paper text-eagle", "bg-red text-sky"];

export default async function Work() {
  const [projects, s] = await Promise.all([getProjects(), getSettings()]);
  const ld = offers.map((o) => ({ "@context": "https://schema.org", "@type": "Service", name: o.title, description: o.who, areaServed: "Africa", provider: { "@type": "Person", name: "Godwin Akpan", url: s.url } }));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero eyebrow="Work" words={["Make."]} line="Brand strategist in Nigeria, building brands for founders, institutions and nations." />

      <section id="offers" className="wrap scroll-mt-24 pb-24 sm:pb-36">
        <Colons label="How I can help" className="mb-10 text-red" />
        <div className="grid gap-4 lg:grid-cols-3">
          {offers.map((o, i) => (
            <Reveal key={o.slug} delay={i * 0.08} className="h-full">
              <div id={o.slug} className={`flex h-full scroll-mt-24 flex-col justify-between gap-10 rounded-[28px] p-8 sm:p-10 ${tones[i]}`}>
                <div>
                  <span className="eyebrow opacity-70">0{i + 1}</span>
                  <h2 className="display mt-6 text-h3 leading-tight">{o.title}</h2>
                  <p className="mt-4 opacity-75">{o.who}</p>
                  <ul className="mt-8 space-y-3 border-t border-current/15 pt-6 text-sm">
                    {o.gets.map((x) => <li key={x} className="flex gap-3"><span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${i === 2 ? "bg-sky" : "bg-red"}`} />{x}</li>)}
                  </ul>
                  {"also" in o && (
                    <p className="mt-6 text-sm opacity-75">Also: {o.also.map(([l, h], j) => <span key={h}>{j ? " · " : ""}<Link href={h} className="link-u">{l}</Link></span>)}</p>
                  )}
                </div>
                <Link href={`/contact?intent=${encodeURIComponent(o.intent)}`} className={`${i === 1 ? "btn-dark" : "btn-light"} w-fit`}>{o.start} <span aria-hidden>→</span></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="ventures" className="scroll-mt-24 bg-obsidian text-sky">
        <div className="wrap py-24 sm:py-36">
          <Colons label="Ventures" className="mb-10 text-red" />
          <ul className="border-t border-sky/10">
            {companies.map((c) => {
              const inner = (
                <>
                  <span className="eyebrow text-sky/50 sm:col-span-3">{c.since}</span>
                  <span className="display text-h3 sm:col-span-5">{c.name}</span>
                  <span className="text-sky/60 sm:col-span-4">{c.line}</span>
                </>
              );
              const cls = "grid gap-2 border-b border-sky/10 py-8 sm:grid-cols-12 sm:items-baseline";
              return <li key={c.name}>{c.url ? <a href={c.url} target="_blank" rel="noreferrer" className={`${cls} transition-colors hover:text-red`}>{inner}</a> : <div className={cls}>{inner}</div>}</li>;
            })}
          </ul>
        </div>
      </section>

      {projects.length > 0 && (
        <div id="cases" className="scroll-mt-24 pt-24 sm:pt-36">
          <div className="wrap mb-10"><Colons label="Case studies" className="text-red" /></div>
          <WorkGrid projects={projects} />
        </div>
      )}

      <Voices page="work" />

      <section className="wrap mt-28 grid gap-10 border-t border-eagle/10 py-24 sm:mt-40 sm:py-32 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <Colons label="On stage" className="mb-6 text-red" />
          <p className="display text-h2">Masterclasses, workshops and keynotes.</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 lg:col-span-5 lg:justify-end">
          <Link href="/speaking" className="btn-dark">Speaking <span aria-hidden>→</span></Link>
        </div>
      </section>
      <NextChapter from="/work" />
    </>
  );
}
