import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import Heart from "@/components/Heart";
import SampleTag from "@/components/SampleTag";
import Share from "@/components/Share";
import { episodes, podcast, site } from "@/lib/seed";

export function generateStaticParams() {
  return episodes.map((e) => ({ episode: e.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ episode: string }> }): Promise<Metadata> {
  const { episode } = await params;
  const e = episodes.find((x) => x.slug === episode);
  if (!e) return {};
  return { title: { absolute: `${e.title} | ${podcast.name}` }, description: e.summary, alternates: { canonical: `/podcast/${e.slug}` } };
}

export default async function Episode({ params }: { params: Promise<{ episode: string }> }) {
  const { episode } = await params;
  const i = episodes.findIndex((x) => x.slug === episode);
  if (i < 0) notFound();
  const e = episodes[i];
  const next = episodes[(i + 1) % episodes.length];
  const ld = { "@context": "https://schema.org", "@type": "PodcastEpisode", name: e.title, episodeNumber: e.n, description: e.summary, url: `${site.url}/podcast/${e.slug}`, partOfSeries: { "@type": "PodcastSeries", name: podcast.name, url: `${site.url}/podcast` } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="wrap max-w-4xl pb-14 pt-36 sm:pt-48">
        <Link href="/podcast" className="link-u text-sm text-ash">← {podcast.name}</Link>
        <Colons label={`Episode ${e.n} · ${e.minutes} min`} className="mb-6 mt-10 text-red" />
        <h1 className="display text-hero">{e.title}</h1>
        <p className="mt-6 text-xl text-ash">{e.summary} {e.sample && <SampleTag className="ml-1" />}</p>
        <div className="mt-10 rounded-[28px] bg-eagle p-6 text-sky sm:p-8">
          {e.audioUrl ? (
            <audio controls preload="none" src={e.audioUrl} className="w-full" />
          ) : (
            <div className="flex items-center gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <div className="flex-1">
                <div className="h-1.5 overflow-hidden rounded-full bg-sky/15"><div className="h-full w-1/3 bg-red" /></div>
                <p className="mt-3 text-sm text-sky/60">Sample player. Audio arrives with the first real episode.</p>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="wrap max-w-4xl pb-20">
        <p className="eyebrow mb-4 text-ash">Show notes & transcript</p>
        <p className="text-xl text-graphite">{e.notes}</p>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-eagle/10 pt-8">
          <Share path={`/podcast/${e.slug}`} title={e.title} />
          <Heart id={`ep-${e.slug}`} />
        </div>
      </section>
      {next.slug !== e.slug && (
        <Link href={`/podcast/${next.slug}`} className="group block bg-obsidian text-sky">
          <div className="wrap py-20 sm:py-28">
            <Colons label="Next episode" className="mb-6 text-red" />
            <p className="display text-h2 transition-transform duration-700 ease-expo group-hover:translate-x-3">{next.title}</p>
          </div>
        </Link>
      )}
    </>
  );
}
