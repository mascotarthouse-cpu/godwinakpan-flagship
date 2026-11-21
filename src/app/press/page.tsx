import Link from "next/link";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import PageHero from "@/components/PageHero";
import { getMedia, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Press",
  description: "Press kit for Barr. Godwin Akpan: official portraits, bio and media enquiries.",
  alternates: { canonical: "/press" },
};
export const revalidate = 300;

export default async function Press() {
  const [s, m] = await Promise.all([getSettings(), getMedia()]);
  const portraits = [m.portrait, m.hero, m.head, m.speaking];
  return (
    <>
      <PageHero eyebrow="Press · Media kit" words={["In", "the", "media."]} line="Official portraits, the press kit, and a direct line for interviews." />

      <section className="wrap pb-24 sm:pb-36">
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
            {/* TODO: Add podcast and media appearances when available */}
            <p className="text-xl text-sky/60">Interviews and press appearances will appear here. For interviews, reach the team directly.</p>
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
