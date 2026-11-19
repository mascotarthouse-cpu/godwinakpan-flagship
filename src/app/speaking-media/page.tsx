import Link from "next/link";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import PageHero from "@/components/PageHero";
import Parallax from "@/components/Parallax";
import Reel from "@/components/Reel";
import Reveal from "@/components/Reveal";
import { getMedia, getSettings } from "@/lib/content";
import { topics } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Speaking & Media",
  description: "Keynotes, press kit, official portraits and media appearances for event organisers, boards and press.",
  alternates: { canonical: "/speaking-media" },
};
export const revalidate = 300;

export default async function Speaking() {
  const [s, m] = await Promise.all([getSettings(), getMedia()]);
  const press = [m.portrait, m.hero, m.head, m.speaking];
  return (
    <>
      <PageHero eyebrow="Keynotes, press & multimedia" words={["Bring", "the", "room", "to", "its", "feet."]} />
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

      <section className="wrap py-24 sm:py-36">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Colons label="Press kit" className="mb-5 text-red" />
            <h2 className="display text-h2">Official portraits.</h2>
          </div>
          {/* TODO: Point to the Drive press-kit folder or a zipped kit uploaded in /admin */}
          <a href="https://drive.google.com/drive/folders/1U--sGhvPAWdS3XLlbkkv9V9lZit_jcrd" target="_blank" rel="noreferrer" className="btn-ghost w-fit">Download press kit</a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {press.map((p, i) => (
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
            <Colons label="Media" className="mb-5 text-red" />
            <h2 className="display text-h2">Interviews & appearances.</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {/* TODO: Add podcast and media appearances in /admin when available */}
            <p className="text-xl text-sky/60">Podcast and press appearances will appear here. For interviews, reach the team directly.</p>
            <Link href="/contact?intent=Media%2FPress" className="btn-light mt-8">Press enquiries <span aria-hidden>→</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
