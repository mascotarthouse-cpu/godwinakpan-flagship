import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import Kinetic from "@/components/Kinetic";
import Reveal from "@/components/Reveal";
import { getProjects } from "@/lib/content";
import { testimonials } from "@/lib/seed";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = (await getProjects()).find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, alternates: { canonical: `/work/${p.slug}` } };
}

/** A case study: the mandate (client and summary), the intervention and the result. Edit projects in /admin → Projects. */
export default async function Case({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = await getProjects();
  const i = all.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = all[i];
  const next = all[(i + 1) % all.length];
  const practice = p.discipline === "M&E" ? "Monitoring & Evaluation" : "Brand strategy";

  return (
    <>
      <section className="wrap pb-16 pt-32 sm:pt-44">
        <p><Link href={`/work?d=${encodeURIComponent(p.discipline)}#cases`} className="link-u text-sm text-ash">← {practice}</Link></p>
        <Colons label={[p.client, p.year].filter(Boolean).join(" · ")} className="mb-8 mt-10 text-red" />
        <Kinetic words={p.title.split(" ")} className="display max-w-5xl text-hero" />
      </section>

      <div className={`relative mx-2 aspect-[16/9] max-h-[80svh] overflow-hidden rounded-[28px] sm:mx-4 ${p.discipline === "M&E" ? "bg-paper text-eagle" : "bg-eagle text-sky"}`}>
        {p.image ? (
          <Image src={p.image} alt={p.title} fill priority sizes="100vw" className="object-cover" />
        ) : (
          // TODO: Replace with project photography from Drive (add in /admin → Projects)
          <div className="absolute inset-0 flex items-end p-8 sm:p-12"><Colons w={64} className={p.discipline === "M&E" ? "text-flight" : "text-red"} /></div>
        )}
      </div>

      <section className="wrap grid gap-12 py-24 sm:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><p className="eyebrow text-ash">The mandate</p></Reveal>
        <div className="space-y-10 lg:col-span-7 lg:col-start-6">
          <Reveal><p className="display text-h3 leading-snug">{p.summary}</p></Reveal>
          {p.result && (
            <Reveal>
              <p className="eyebrow mb-3 text-red">The impact</p>
              <p className="text-xl text-graphite">{p.result}</p>
            </Reveal>
          )}
          <Reveal><Link href={`/contact?intent=${p.discipline === "M&E" ? "M%26E%20Consulting" : "Brand%20Advisory"}&about=${encodeURIComponent(p.title)}`} className="btn-dark">Start a similar project <span aria-hidden>→</span></Link></Reveal>
        </div>
      </section>

      {/* Proof at the moment of evaluation: the client's own words, right under the result. */}
      {testimonials[p.slug] && (
        <section className="wrap pb-24 sm:pb-36">
          <figure className="mx-auto max-w-4xl border-l-2 border-red pl-6 sm:pl-10">
            <blockquote className="display text-h3 leading-snug">“{testimonials[p.slug].quote}”</blockquote>
            <figcaption className="mt-6 text-ash">{testimonials[p.slug].name}, {testimonials[p.slug].role}</figcaption>
          </figure>
        </section>
      )}

      {next && next.slug !== p.slug && (
        <Link href={`/work/${next.slug}`} className="group block bg-obsidian text-sky">
          <div className="wrap py-24 sm:py-32">
            <Colons label="Next case" className="mb-6 text-red" />
            <p className="display text-mega transition-transform duration-700 ease-expo group-hover:translate-x-3">{next.title}</p>
          </div>
        </Link>
      )}
    </>
  );
}
