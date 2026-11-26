import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import Colons from "@/components/Colons";
import { fmtDate } from "@/components/PostCard";
import SampleTag from "@/components/SampleTag";
import { releases } from "@/lib/seed";

export function generateStaticParams() {
  return releases.map((r) => ({ slug: r.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = releases.find((x) => x.slug === slug);
  return r ? { title: { absolute: `${r.title} | Press` }, alternates: { canonical: `/press/${r.slug}` } } : {};
}

export default async function Release({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = releases.find((x) => x.slug === slug);
  if (!r) notFound();
  const html = sanitizeHtml(await marked.parse(r.body));
  return (
    <article className="wrap max-w-3xl pb-28 pt-36 sm:pt-48">
      <Link href="/press" className="link-u text-sm text-ash">← Press</Link>
      <Colons label={`Press release · ${fmtDate(r.date)}`} className="mb-6 mt-10 text-red" />
      <h1 className="display text-h2">{r.title} {r.sample && <SampleTag className="ml-1" />}</h1>
      <div className="prose-g mt-12" dangerouslySetInnerHTML={{ __html: html }} />
      <p className="mt-12 text-ash">Media enquiries: <Link href="/contact?intent=Press" className="link-u text-eagle">Let&apos;s talk</Link></p>
    </article>
  );
}
