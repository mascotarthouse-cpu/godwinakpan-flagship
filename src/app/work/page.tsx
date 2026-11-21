import type { Metadata } from "next";
import Link from "next/link";
import Colons from "@/components/Colons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import WorkGrid from "@/components/WorkGrid";
import { getProjects } from "@/lib/content";
import { entryOffer, practices } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Work",
  description: "Two practices: brand strategy, and monitoring and evaluation for public sector and infrastructure. Selected case studies.",
  alternates: { canonical: "/work" },
};
export const revalidate = 300;

export default async function Work({ searchParams }: { searchParams: Promise<{ d?: string }> }) {
  const [{ d }, projects] = await Promise.all([searchParams, getProjects()]);
  return (
    <>
      <PageHero eyebrow="Hand · Brand & M&E" words={["Work", "that", "moves."]} line="Two practices, one discipline: name the real problem, then deliver." />

      <section className="wrap grid gap-4 pb-24 sm:grid-cols-2 sm:pb-36">
        {practices.map((p, i) => (
          <Reveal key={p.key} delay={i * 0.08}>
            <Link href={`/work?d=${encodeURIComponent(p.key)}#cases`} className={`group flex h-full flex-col justify-between gap-12 rounded-[28px] p-8 sm:p-10 ${i ? "bg-paper text-eagle" : "bg-eagle text-sky"}`}>
              <div>
                <Colons label={`0${i + 1} · Practice`} className={i ? "mb-6 text-flight" : "mb-6 text-red"} />
                <h2 className="display text-h2">{p.title}</h2>
                <p className="mt-4 max-w-sm text-lg opacity-75">{p.line}</p>
              </div>
              <ul className="space-y-2 border-t border-current/15 pt-6 text-sm">
                {p.includes.map((x) => <li key={x} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />{x}</li>)}
              </ul>
            </Link>
          </Reveal>
        ))}
      </section>

      <section className="bg-obsidian text-sky">
        <div className="wrap grid gap-10 py-24 sm:py-36 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Colons label="Where to start" className="mb-6 text-red" />
            <h2 className="display text-h2">{entryOffer.title}</h2>
            <p className="mt-6 max-w-lg text-xl text-sky/60">{entryOffer.line}</p>
          </Reveal>
          <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <Link href="/contact?intent=Brand%20Advisory&about=a%20brand%20audit" className="btn-light">Book a brand audit <span aria-hidden>→</span></Link>
          </div>
        </div>
      </section>

      <div id="cases" className="scroll-mt-24 pt-24 sm:pt-36">
        <div className="wrap mb-10"><Colons label="Selected work" className="text-red" /></div>
        <WorkGrid projects={projects} initial={d === "Brand" || d === "M&E" ? d : "All"} />
      </div>

      <section className="wrap mt-28 grid gap-10 border-t border-eagle/10 py-24 sm:mt-40 sm:py-32 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <Colons label="On stage" className="mb-6 text-red" />
          <p className="display text-h2">Bring the room to its feet.</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 lg:col-span-5 lg:justify-end">
          <Link href="/speaking" className="btn-dark">Speaking <span aria-hidden>→</span></Link>
          <Link href="/contact" className="link-u text-sm font-semibold">Start a conversation</Link>
        </div>
      </section>
    </>
  );
}
