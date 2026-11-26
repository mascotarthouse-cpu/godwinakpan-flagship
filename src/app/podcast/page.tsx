import type { Metadata } from "next";
import Colons from "@/components/Colons";
import EpisodeList from "@/components/EpisodeRow";
import NewsletterBlock from "@/components/NewsletterBlock";
import PageHero from "@/components/PageHero";
import SampleTag from "@/components/SampleTag";
import { podcast, site } from "@/lib/seed";

export const metadata: Metadata = {
  title: { absolute: `${podcast.name} | Godwin Akpan` },
  description: podcast.line,
  alternates: { canonical: "/podcast" },
};

export default function Podcast() {
  const ld = { "@context": "https://schema.org", "@type": "PodcastSeries", name: podcast.name, description: podcast.line, url: `${site.url}/podcast`, author: { "@type": "Person", name: "Godwin Akpan", url: site.url } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero eyebrow="Podcast" words={podcast.name.split(" ")} line={podcast.line} />
      <section className="wrap pb-16">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-2 text-ash">Listen on</span>
          {podcast.platforms.map(([l, h]) => h
            ? <a key={l} href={h} target="_blank" rel="noreferrer" className="btn border border-eagle/15 hover:border-eagle">{l}</a>
            : <span key={l} className="btn border border-dashed border-eagle/20 text-ash">{l} · soon</span>)}
          {podcast.sample && <SampleTag className="ml-2" />}
        </div>
      </section>
      <section className="wrap pb-28 sm:pb-36">
        <Colons label="Episodes" className="mb-8 text-red" />
        <EpisodeList />
      </section>
      <NewsletterBlock title="Get each episode first." />
    </>
  );
}
