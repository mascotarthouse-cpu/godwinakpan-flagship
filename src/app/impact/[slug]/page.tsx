import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import Colons from "@/components/Colons";
import Kinetic from "@/components/Kinetic";
import Reveal from "@/components/Reveal";
import MentorshipForm from "@/components/MentorshipForm";
import { initiatives, site } from "@/lib/seed";

export function generateStaticParams() {
  return initiatives.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const x = initiatives.find((i) => i.slug === slug);
  if (!x) return {};
  return { title: { absolute: `${x.name} | Godwin Akpan` }, description: x.line, alternates: { canonical: `/impact/${x.slug}` } };
}

export default async function Initiative({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = initiatives.find((i) => i.slug === slug);
  if (!x) notFound();
  const others = initiatives.filter((i) => i.slug !== slug);
  const about = x.about ? sanitizeHtml(await marked.parse(x.about)) : "";
  const org = { "@context": "https://schema.org", "@type": "Organization", name: x.name, description: x.line, url: `${site.url}/impact/${x.slug}`, founder: { "@type": "Person", name: "Godwin Akpan", url: site.url } };
  const ld = x.slug === "the-shift" ? [org, { "@context": "https://schema.org", "@type": "Event", name: "THE SHIFT", description: x.line, location: { "@type": "Place", name: "Uyo, Nigeria" }, organizer: { "@type": "Person", name: "Godwin Akpan" } }] : org;
  const isIbd = x.slug === "ibd";
  const cta = `/contact?intent=Partnership&about=${encodeURIComponent(x.name)}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="wrap grid gap-12 pb-20 pt-32 sm:pt-44 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <p><Link href="/impact" className="link-u text-sm text-ash">← Impact</Link></p>
          <Colons label={x.since} className="mb-8 mt-10 text-red" />
          <Kinetic words={x.name.split(" ")} className="display text-hero" />
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-md text-xl text-ash">{x.line}</p>
            <Link href={isIbd ? "#apply" : cta} className="btn-dark mt-10">{isIbd ? "Apply for mentorship" : x.cta} <span aria-hidden>→</span></Link>
          </Reveal>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-paper lg:col-span-5 lg:col-start-8">
          {/* TODO: Replace with Google Drive asset -> event / community photo for this initiative */}
          <Image src={x.image} alt="" fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="wrap grid gap-12 py-24 sm:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><p className="eyebrow text-ash">The mission</p></Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          {about ? (
            <div className="prose-g" dangerouslySetInnerHTML={{ __html: about }} />
          ) : (
            // TODO: write the story for this initiative in src/lib/seed.ts (initiatives → about)
            <p className="display text-h3 leading-snug">{x.line} <span className="text-ash">The full story is coming soon.</span></p>
          )}
        </div>
      </section>

      {isIbd && (
        <section id="apply" className="scroll-mt-20 bg-paper">
          <div className="wrap grid gap-10 py-24 sm:py-36 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Colons label="Mentorship" className="mb-6 text-red" />
              <h2 className="display text-h2">Apply for free creative mentoring.</h2>
              <p className="mt-4 max-w-md text-xl text-ash">Tell us what you create and where you want to go. We read every application.</p>
            </Reveal>
            <div className="lg:col-span-6 lg:col-start-7"><MentorshipForm /></div>
          </div>
        </section>
      )}

      <section className="bg-obsidian text-sky">
        <div className="wrap py-24 sm:py-36">
          <Colons label="More impact" className="mb-10 text-red" />
          <ul className="border-t border-sky/10">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/impact/${o.slug}`} className="group grid gap-2 border-b border-sky/10 py-8 sm:grid-cols-12 sm:items-baseline">
                  <span className="eyebrow text-sky/50 sm:col-span-3">{o.since}</span>
                  <span className="display text-h3 transition-transform duration-700 ease-expo group-hover:translate-x-2 sm:col-span-6">{o.name}</span>
                  <span className="text-sky/60 sm:col-span-3">{o.line}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
