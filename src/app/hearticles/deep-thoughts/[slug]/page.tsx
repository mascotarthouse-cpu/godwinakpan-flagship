import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import Share from "@/components/Share";
import { site, thoughts } from "@/lib/seed";

export function generateStaticParams() {
  return thoughts.map((t) => ({ slug: t.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = thoughts.find((x) => x.slug === slug);
  if (!t) return {};
  return { title: { absolute: `${t.text} | Hearticles` }, description: `A Deep Thought from Godwin Akpan: ${t.text}`, alternates: { canonical: `/hearticles/deep-thoughts/${t.slug}` } };
}

export default async function Thought({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = thoughts.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const t = thoughts[i];
  const next = thoughts[(i + 1) % thoughts.length];
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: t.text, author: { "@type": "Person", name: "Godwin Akpan", url: site.url }, isPartOf: { "@type": "Blog", name: "Hearticles" } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="wrap flex min-h-[80svh] flex-col justify-center gap-10 pb-16 pt-36">
        <Link href="/hearticles" className="link-u w-fit text-sm text-ash">← Hearticles</Link>
        <Colons label="Deep Thoughts" className="text-red" />
        <h1 className="display max-w-5xl text-hero">{t.text}</h1>
        <Share path={`/hearticles/deep-thoughts/${t.slug}`} title={t.text} />
      </section>
      {next.slug !== t.slug && (
        <Link href={`/hearticles/deep-thoughts/${next.slug}`} className="group block bg-obsidian text-sky">
          <div className="wrap py-20 sm:py-28">
            <Colons label="Next thought" className="mb-6 text-red" />
            <p className="display text-h2 transition-transform duration-700 ease-expo group-hover:translate-x-3">{next.text}</p>
          </div>
        </Link>
      )}
    </>
  );
}
