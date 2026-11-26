import type { Metadata } from "next";
import Link from "next/link";
import Colons from "@/components/Colons";
import DeepThoughts from "@/components/DeepThoughts";
import EpisodeList from "@/components/EpisodeRow";
import Reel from "@/components/Reel";
import { SERIES, seriesSlug } from "@/lib/seed";
import InsightsList from "@/components/InsightsList";
import NewsletterBlock from "@/components/NewsletterBlock";
import NextChapter from "@/components/NextChapter";
import PageHero from "@/components/PageHero";
import { getMedia, getPosts, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Hearticles by Godwin Akpan" },
  description: "Hearticles: short essays by Barr. Godwin Akpan on disruptive branding, technology, how things work, and deep thoughts.",
  alternates: { canonical: "/hearticles" },
};
export const revalidate = 600;

export default async function Hearticles() {
  const [posts, s, m] = await Promise.all([getPosts(), getSettings(), getMedia()]);
  const ld = { "@context": "https://schema.org", "@type": "Blog", name: "Hearticles", url: `${s.url}/hearticles`, author: { "@type": "Person", name: "Godwin Akpan", url: s.url } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero eyebrow="Hearticles" words={["Hearticles."]} line="Articles with a heart. Short essays, sharp ideas. Written here first, then on Medium." />
      <nav aria-label="Hearticles" className="wrap -mt-6 mb-14 flex flex-wrap items-center gap-2">
        {[["Read", "#read"], ["Listen", "#listen"], ["Watch", "#watch"]].map(([l, h], i) => (
          <a key={h} href={h} className={`btn border ${i ? "border-eagle/15 hover:border-eagle" : "border-eagle bg-eagle text-sky"}`}>{l}</a>
        ))}
        <span className="mx-2 hidden h-6 w-px bg-eagle/15 sm:block" />
        {SERIES.map((x) => <Link key={x} href={`/hearticles/${seriesSlug(x)}`} className="btn border border-transparent px-4 py-2 text-sm hover:border-eagle/20">{x}</Link>)}
      </nav>
      <div id="read" className="scroll-mt-24"><InsightsList posts={posts.filter((p) => p.category !== "Deep Thoughts")} /></div>
      <DeepThoughts />
      <section id="listen" className="wrap scroll-mt-24 py-24 sm:py-32">
        <div className="mb-10 flex items-end justify-between gap-6">
          <Colons label="Listen · Podcast" className="text-red" />
          <Link href="/podcast" className="link-u text-sm font-semibold">All episodes</Link>
        </div>
        <EpisodeList limit={3} />
      </section>
      <div id="watch" className="scroll-mt-24"><Reel url={s.reelUrl} poster={m.reel.url} alt={m.reel.alt} /></div>
      <NewsletterBlock />
      <NextChapter from="/hearticles" />
    </>
  );
}
