import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import Colons from "@/components/Colons";
import NewsletterBlock from "@/components/NewsletterBlock";
import PageHero from "@/components/PageHero";
import Share from "@/components/Share";
import Heart from "@/components/Heart";
import SampleTag from "@/components/SampleTag";
import { SERIES, seriesSamples, seriesSlug, site } from "@/lib/seed";
import PostCard, { fmtDate } from "@/components/PostCard";
import { getPost, getPosts } from "@/lib/content";

/** Every series has a hub. Until it holds three pieces, sample ideas fill the rest. */
async function getSeries(slug: string) {
  const name = SERIES.find((x) => seriesSlug(x) === slug);
  if (!name) return null;
  const list = (await getPosts()).filter((p) => p.category === name);
  return { name, list, samples: (seriesSamples[name] ?? []).slice(0, Math.max(0, 3 - list.length)) };
}

export const revalidate = 600;

export async function generateStaticParams() {
  return (await getPosts()).filter((p) => p.source === "native").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const series = await getSeries(slug);
  if (series) return { title: { absolute: `${series.name} | Hearticles` }, alternates: { canonical: `/hearticles/${slug}` } };
  const p = await getPost(slug);
  if (!p) return {};
  return {
    title: { absolute: `${p.title} | Hearticles` },
    description: p.excerpt,
    alternates: { canonical: p.canonicalUrl || `/hearticles/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.publishAt, images: p.cover ? [p.cover] : ["/og.png"] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const series = await getSeries(slug);
  if (series) {
    return (
      <>
        <PageHero eyebrow="Hearticles · Series" words={series.name.split(" ")} />
        <section className="wrap grid gap-x-6 gap-y-16 pb-28 md:grid-cols-2 lg:grid-cols-3">
          {series.list.map((x) => <PostCard key={x.slug} p={x} />)}
          {series.samples.map((t) => (
            <div key={t}>
              <div className="flex aspect-[4/3] items-end rounded-[22px] bg-eagle p-6"><Colons w={56} className="text-red" /></div>
              <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-red">{series.name} <SampleTag className="ml-1 text-ash" /></p>
              <h3 className="display mt-2 text-2xl leading-tight">{t}</h3>
              <p className="mt-2 text-ash">Coming soon.</p>
            </div>
          ))}
        </section>
        <NewsletterBlock />
      </>
    );
  }
  const all = await getPosts();
  const p = all.find((x) => x.slug === slug);
  if (!p) notFound();
  const html = p.source === "medium" ? p.body : sanitizeHtml(await marked.parse(p.body), { allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2"]), allowedAttributes: { a: ["href", "target", "rel"], img: ["src", "alt"] } });
  const more = all.filter((x) => x.slug !== slug).slice(0, 3);
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: p.title, datePublished: p.publishAt, author: { "@type": "Person", name: "Godwin Akpan", url: site.url }, description: p.excerpt, isPartOf: { "@type": "Blog", name: "Hearticles" } };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className="wrap max-w-4xl pb-14 pt-36 sm:pt-48">
        <Link href="/hearticles" className="link-u text-sm text-ash">← Hearticles</Link>
        <div className="mt-10 flex flex-wrap gap-4 text-xs font-medium uppercase tracking-[0.14em] text-ash">
          <span className="text-red">{p.category}</span><span>{fmtDate(p.publishAt)}</span><span>{p.readMinutes} min read</span>
          {p.source === "medium" && <span>Medium</span>}
        </div>
        <h1 className="display mt-5 text-hero">{p.title}</h1>
        <p className="mt-6 text-xl text-ash">{p.excerpt}</p>
      </header>
      {p.cover && (
        <div className="relative mx-2 aspect-[16/9] max-h-[80svh] overflow-hidden rounded-[28px] sm:mx-4">
          <Image src={p.cover} alt="" fill priority sizes="100vw" className="object-cover object-[center_25%]" unoptimized={p.cover.startsWith("http")} />
        </div>
      )}
      <div className="wrap max-w-3xl py-20">
        <div className="prose-g" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="mt-16 flex flex-col gap-6 border-t border-eagle/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-6"><Heart id={p.slug} /><Share path={`/hearticles/${p.slug}`} title={p.title} /></div>
          <div className="flex flex-wrap items-center gap-4">
            {p.canonicalUrl && <a href={p.canonicalUrl} target="_blank" rel="noreferrer" className="link-u text-sm">Read on Medium ↗</a>}
            <Link href={`/contact?about=${encodeURIComponent(`"${p.title}"`)}`} className="btn-dark w-fit">Reply to Godwin →</Link>
          </div>
        </div>
      </div>
      <NewsletterBlock title="Get the next one first." />
      {more.length > 0 && (
        <section className="bg-paper py-24">
          <div className="wrap">
            <p className="display mb-12 text-h3">Next read.</p>
            <div className="grid gap-12 md:grid-cols-3 md:gap-6">{more.map((x) => <PostCard key={x.slug} p={x} />)}</div>
          </div>
        </section>
      )}
    </article>
  );
}
