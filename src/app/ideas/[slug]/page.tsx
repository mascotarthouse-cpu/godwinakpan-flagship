import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import Colons from "@/components/Colons";
import NewsletterBlock from "@/components/NewsletterBlock";
import { book } from "@/lib/seed";
import PostCard, { fmtDate } from "@/components/PostCard";
import { getPost, getPosts } from "@/lib/content";

export const revalidate = 600;

export async function generateStaticParams() {
  return (await getPosts()).filter((p) => p.source === "native").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: p.canonicalUrl || `/ideas/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.publishAt, images: p.cover ? [p.cover] : ["/og.png"] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = await getPosts();
  const p = all.find((x) => x.slug === slug);
  if (!p) notFound();
  const html = p.source === "medium" ? p.body : sanitizeHtml(await marked.parse(p.body), { allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2"]), allowedAttributes: { a: ["href", "target", "rel"], img: ["src", "alt"] } });
  const more = all.filter((x) => x.slug !== slug).slice(0, 3);
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: p.title, datePublished: p.publishAt, author: { "@type": "Person", name: "Godwin Akpan" }, description: p.excerpt };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className="wrap max-w-4xl pb-14 pt-36 sm:pt-48">
        <Link href="/ideas" className="link-u text-sm text-ash">← Ideas</Link>
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
          <Colons label="Godwin Akpan" className="text-red" />
          {p.canonicalUrl ? (
            <a href={p.canonicalUrl} target="_blank" rel="noreferrer" className="btn-ghost w-fit">Read on Medium ↗</a>
          ) : (
            <Link href="/contact" className="btn-dark w-fit">Start a conversation →</Link>
          )}
        </div>
      </div>
      <section className="wrap max-w-3xl pb-20">
        <div className="flex flex-col gap-6 rounded-[28px] bg-paper p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <Colons label="Go deeper in the book" className="mb-3 text-red" />
            <p className="display text-2xl">{book.title}</p>
          </div>
          <Link href="/book" className="btn-dark w-fit shrink-0">Read the first chapter →</Link>
        </div>
      </section>
      <NewsletterBlock title="Get the next one first." />
      {more.length > 0 && (
        <section className="bg-paper py-24">
          <div className="wrap">
            <p className="display mb-12 text-h3">Next ideas.</p>
            <div className="grid gap-12 md:grid-cols-3 md:gap-6">{more.map((x) => <PostCard key={x.slug} p={x} />)}</div>
          </div>
        </section>
      )}
    </article>
  );
}
