import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import Kinetic from "@/components/Kinetic";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import Timeline from "@/components/Timeline";
import { getMedia } from "@/lib/content";
import { boards, companies, roles, site, timeline } from "@/lib/seed";

export const metadata: Metadata = {
  title: "About",
  description: "The man, the mandate, the method. From a pencil in Calabar to Mascot Arthouse and M&E oversight across Africa.",
  alternates: { canonical: "/about" },
};
export const revalidate = 300;

export default async function About() {
  const m = await getMedia();
  return (
    <>
      <section className="wrap grid gap-12 pb-20 pt-32 sm:pt-44 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <Colons label="01 · The Man · About" className="mb-8 text-red" />
          <Kinetic words={["The", "man.", "The", "mandate.", "The", "method."]} className="display text-hero" />
          {site.cvUrl && (
            <Reveal delay={0.6}>
              <a href={site.cvUrl} target="_blank" rel="noreferrer" className="btn-ghost mt-10 w-fit">Download profile &amp; CV <span aria-hidden>↓</span></a>
            </Reveal>
          )}
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
              In 2004 that pencil became Mascot Arthouse, a brand strategy and design studio. Two decades on, Godwin builds brands, oversees the
              infrastructure that public money pays for, and advises organisations across Africa.
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

      <section id="ventures" className="wrap scroll-mt-24 pb-24 sm:pb-36">
        <Colons label="Ventures" className="mb-6 text-red" />
        <h2 className="display text-h2">What he built.</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {companies.map((c, i) => (
            <article key={c.name} className={`flex min-h-[340px] flex-col justify-between rounded-[28px] p-8 sm:p-10 ${i % 2 ? "bg-paper text-eagle" : "bg-eagle text-sky"}`}>
              <div className="flex items-start justify-between">
                <span className="eyebrow opacity-70">{c.since}</span>
                <Colons w={36} className="text-red" />
              </div>
              <div>
                <h3 className="display text-h2">{c.name}</h3>
                <p className="mt-3 text-lg opacity-75">{c.line}</p>
                <p className="mt-6 text-sm opacity-60">{c.role}</p>
                {(c.hire || c.url) && (
                  <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-semibold">
                    {c.hire && <Link href={c.hire} className={i % 2 ? "btn-dark" : "btn-light"}>Work with {c.name} <span aria-hidden>→</span></Link>}
                    {c.url && <a href={c.url} target="_blank" rel="noreferrer" className="link-u">Visit ↗</a>}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
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

      <section className="wrap flex flex-col items-start gap-8 py-28 sm:py-40">
        <Kinetic as="h2" words={["Purpose", "over", "pleasure."]} className="display text-mega" accentLast />
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/contact" className="btn-dark">Start a conversation <span aria-hidden>→</span></Link>
          <Link href="/stage#press" className="link-u text-sm font-semibold">Press &amp; media kit</Link>
        </div>
      </section>
    </>
  );
}
