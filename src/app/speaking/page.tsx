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
  title: "Speaking",
  description: "Keynotes by Barr. Godwin Akpan on disruptive strategy, purpose and the future of African brands. Invite Godwin to speak.",
  alternates: { canonical: "/speaking" },
};
export const revalidate = 300;

export default async function Speaking() {
  const [s, m] = await Promise.all([getSettings(), getMedia()]);
  return (
    <>
      <PageHero eyebrow="Hand · Keynotes" words={["Bring", "the", "room", "to", "its", "feet."]} />
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

      <section className="wrap grid gap-10 py-24 sm:py-36 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <Colons label="Organisers & press" className="mb-6 text-red" />
          <p className="display text-h2">Portraits, bio and press kit.</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 lg:col-span-5 lg:justify-end">
          <Link href="/press" className="btn-dark">Press kit <span aria-hidden>→</span></Link>
          <Link href="/contact?intent=Speaking%20Invitation" className="link-u text-sm font-semibold">Invite Godwin to speak</Link>
        </div>
      </section>
    </>
  );
}
