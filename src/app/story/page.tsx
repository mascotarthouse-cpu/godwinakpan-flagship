import Image from "next/image";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import Kinetic from "@/components/Kinetic";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import Timeline from "@/components/Timeline";
import NextChapter from "@/components/NextChapter";
import Voices from "@/components/Voices";
import { getMedia, getSettings } from "@/lib/content";
import { boards, roles, timeline } from "@/lib/seed";

export const metadata: Metadata = {
  title: { absolute: "About Godwin Akpan" },
  description: "Hi-Story: from a pencil in Calabar to Mascot Arthouse. The story, purpose and credentials of Barr. Godwin Akpan, Disruptive Brand Architect.",
  alternates: { canonical: "/story" },
};
export const revalidate = 300;

export default async function Story() {
  const [m, s] = await Promise.all([getMedia(), getSettings()]);
  const ld = { "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: { "@type": "Person", name: "Godwin Akpan", url: s.url, sameAs: s.socials.map((x) => x.href) } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="wrap grid gap-12 pb-20 pt-32 sm:pt-44 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <Colons label="Story" className="mb-8 text-red" />
          <Kinetic words={["Hi-Story."]} className="display text-hero" />
          <h1 className="mt-6 text-xl text-ash">About Godwin Akpan: the man, the mandate, the method.</h1>
          {s.resumeUrl && <a href={s.resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost mt-8 w-fit">Download profile</a>}
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-eagle lg:col-span-5 lg:col-start-8">
          {/* TODO: Replace with Google Drive asset -> "Official Portrait" (swap in /admin → Media → portrait) */}
          <Image src={m.portrait.url} alt={m.portrait.alt} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-top" />
        </div>
      </section>

      <section className="wrap grid gap-12 py-24 sm:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-ash">The man</p>
        </Reveal>
        <div className="space-y-8 lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="display text-h3 leading-snug">
              It started with a pencil in Calabar. <span className="text-ash">Ase Ndise Ano Pencil.</span>
            </p>
          </Reveal>
          <Reveal>
            <p className="text-xl text-graphite">
              In 2004 that pencil became Mascot Arthouse, a brand strategy and design studio. Two decades on, Godwin builds brands to build lives,
              for founders, institutions and nations across Africa.
            </p>
          </Reveal>
          <Reveal>
            <p className="text-xl text-graphite">One rule runs through all of it: purpose over pleasure.</p>
          </Reveal>
        </div>
      </section>

      <section className="wrap grid gap-4 sm:grid-cols-2">
        <Parallax src={m.head.url} alt={m.head.alt} className="aspect-[4/5] rounded-[28px] bg-paper" position="center 20%" sizes="(min-width:640px) 50vw, 100vw" />
        <Parallax src={m.hand.url} alt={m.hand.alt} className="aspect-[4/5] rounded-[28px] bg-paper sm:mt-24" sizes="(min-width:640px) 50vw, 100vw" />
      </section>

      <section className="wrap grid gap-12 py-24 sm:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><p className="eyebrow text-ash">The mandate</p></Reveal>
        <ul className="divide-y divide-eagle/10 border-y border-eagle/10 lg:col-span-7 lg:col-start-6">
          {roles.map((r, i) => (
            <Reveal key={r} delay={i * 0.04}>
              <li className="display flex items-baseline gap-6 py-5 text-xl sm:text-2xl">
                <span className="text-sm text-red">0{i + 1}</span>{r}
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {boards.length > 0 && (
        <section className="wrap grid gap-12 pb-24 sm:pb-36 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><p className="eyebrow text-ash">Boards & advisory</p></Reveal>
          <ul className="divide-y divide-eagle/10 border-y border-eagle/10 lg:col-span-7 lg:col-start-6">
            {boards.map((b) => (
              <li key={b.title} className="grid gap-1 py-5 sm:grid-cols-4"><span className="text-ash">{b.when}</span><span className="sm:col-span-3"><b>{b.title}</b> <span className="text-ash">{b.detail}</span></span></li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-obsidian py-24 text-sky sm:py-36">
        <div className="wrap">
          <Colons label="The method · Learning" className="mb-6 text-red" />
          <h2 className="display text-h2">Always a student.</h2>
        </div>
        <Timeline items={timeline} />
      </section>

      <Voices page="story" />
      <section className="wrap flex flex-col items-start gap-8 py-28 sm:py-40">
        <Kinetic as="h2" words={["Purpose", "over", "pleasure."]} className="display text-mega" accentLast />
      </section>
      <NextChapter from="/story" />
    </>
  );
}
