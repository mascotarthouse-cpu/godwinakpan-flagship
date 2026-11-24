import Link from "next/link";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import PageHero from "@/components/PageHero";
import Parallax from "@/components/Parallax";
import Reel from "@/components/Reel";
import Reveal from "@/components/Reveal";
import { getMedia, getSettings } from "@/lib/content";
import { engagements, topics } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Speaking & Press",
  description: "Keynotes by Barr. Godwin Akpan on disruptive strategy, purpose and the future of African brands. Press kit, official portraits and media enquiries.",
  alternates: { canonical: "/stage" },
};
export const revalidate = 300;

/** The Stage: keynotes, reel, booking and the press kit. A QR code at an event links to /stage?from=<slug>. */
export default async function Stage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const [{ from }, s, m] = await Promise.all([searchParams, getSettings(), getMedia()]);
  const here = engagements.find((e) => e.slug === from);
  const portraits = [m.portrait, m.hero, m.head, m.speaking];
  return (
    <>
      {here && (
        <section className="bg-red text-sky">
          <div className="wrap flex flex-col gap-6 pb-10 pt-28 sm:flex-row sm:items-end sm:justify-between sm:pt-32">
            <div>
              <p className="eyebrow text-sky/70">Thanks for being at {here.event}</p>
              <p className="display mt-3 text-h3">{here.talk}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {here.slidesUrl && <a href={here.slidesUrl} target="_blank" rel="noreferrer" className="btn-light">Get the slides ↓</a>}
              <Link href="/contact?intent=Speaking%20Invitation" className="link-u text-sm font-semibold">Book this talk for your event</Link>
            </div>
          </div>
        </section>
      )}

      <PageHero eyebrow="04 · The Stage · Speaking & press" words={["Bring", "the", "room", "to", "its", "feet."]} />
      <section className="wrap grid gap-4 sm:grid-cols-12">
        {/* TODO: Replace with Google Drive asset -> keynote stage photography */}
        <Parallax src={m.speaking.url} alt={m.speaking.alt} className="aspect-[4/5] rounded-[28px] bg-paper sm:col-span-7 sm:aspect-[7/8]" sizes="(min-width:640px) 58vw, 100vw" />
        <Parallax src={m.head.url} alt={m.head.alt} className="hidden aspect-[4/5] rounded-[28px] bg-paper sm:col-span-5 sm:mt-40 sm:block" position="center 20%" sizes="40vw" />
      </section>

      <section className="wrap py-24 sm:py-36">
        <Colons label="Keynote topics" className="mb-10 text-red" />
        <ul className="border-t border-eagle/10">
          {topics.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05}>
              <li className="group grid gap-2 border-b border-eagle/10 py-8 sm:grid-cols-12 sm:items-baseline">
                <span className="text-sm text-red sm:col-span-1">0{i + 1}</span>
                <p className="display text-h3 transition-transform duration-700 ease-expo group-hover:translate-x-2 sm:col-span-7">{t.title}</p>
                <p className="text-ash sm:col-span-4">{t.line}</p>
              </li>
            </Reveal>
          ))}
        </ul>
        <Link href="/contact?intent=Speaking%20Invitation" className="btn-dark mt-12">Invite Godwin to speak <span aria-hidden>→</span></Link>
      </section>

      <Reel url={s.reelUrl} poster={m.reel.url} alt={m.reel.alt} />

      {engagements.length > 0 && (
        <section className="wrap pt-24 sm:pt-36">
          <Colons label="Recent stages" className="mb-10 text-red" />
          <ul className="border-t border-eagle/10">
            {engagements.map((e) => (
              <li key={e.slug} className="grid gap-1 border-b border-eagle/10 py-6 sm:grid-cols-12 sm:items-baseline">
                <span className="text-ash sm:col-span-3">{e.date}</span>
                <span className="display text-xl sm:col-span-5">{e.talk}</span>
                <span className="text-ash sm:col-span-4">{e.event}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section id="press" className="wrap scroll-mt-24 py-24 sm:py-36">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Colons label="Press kit" className="mb-5 text-red" />
            <h2 className="display text-h2">Official portraits.</h2>
          </div>
          {/* TODO: Point to the Drive press-kit folder or a zipped kit uploaded in /admin */}
          <a href="https://drive.google.com/drive/folders/1U--sGhvPAWdS3XLlbkkv9V9lZit_jcrd" target="_blank" rel="noreferrer" className="btn-ghost w-fit">Download press kit</a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {portraits.map((p, i) => (
            <a key={i} href={p.url} download className="group relative block aspect-[4/5] overflow-hidden rounded-[22px] bg-paper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 ease-expo group-hover:scale-105" />
              <span className="absolute bottom-3 right-3 rounded-full bg-sky px-3 py-1 text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100">Download</span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-obsidian text-sky">
        <div className="wrap grid gap-10 py-24 sm:py-36 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Colons label="Coverage" className="mb-5 text-red" />
            <h2 className="display text-h2">Interviews & appearances.</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {/* TODO: Add podcast episodes, interviews and press appearances when available */}
            <p className="text-xl text-sky/60">Interviews, podcast episodes and press appearances will appear here. For interviews, reach the team directly.</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/contact?intent=Media%2FPress" className="btn-light">Press enquiries <span aria-hidden>→</span></Link>
              <a href={`mailto:${s.email}`} className="link-u break-all text-sky/80">{s.email}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
