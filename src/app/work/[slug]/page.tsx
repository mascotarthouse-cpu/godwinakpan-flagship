import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import Kinetic from "@/components/Kinetic";
import Reveal from "@/components/Reveal";
import { getProjects } from "@/lib/content";

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

  return (
    <>
      <section className="wrap pb-16 pt-32 sm:pt-44">
        <p><Link href="/work#cases" className="link-u text-sm text-ash">← Work</Link></p>
        <Colons label={[p.client, p.year].filter(Boolean).join(" · ")} className="mb-8 mt-10 text-red" />
        <Kinetic words={p.title.split(" ")} className="display max-w-5xl text-hero" />
      </section>

      <div className={`relative mx-2 aspect-[16/9] max-h-[80svh] overflow-hidden rounded-[28px] sm:mx-4 bg-eagle text-sky`}>
        {p.image ? (
          <Image src={p.image} alt={p.title} fill priority sizes="100vw" className="object-cover" />
        ) : (
          // TODO: Replace with project photography from Drive (add in /admin → Projects)
          <div className="absolute inset-0 flex items-end p-8 sm:p-12"><Colons w={64} className="text-red" /></div>
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
                  </div>
      </section>

      <Link href={`/contact?intent=${encodeURIComponent("Brand transformation")}&about=${encodeURIComponent(`a project like ${p.title}`)}`} className="group block bg-obsidian text-sky">
        <div className="wrap py-24 sm:py-32">
          <Colons label="Want results like these?" className="mb-6 text-red" />
          <p className="display text-mega transition-transform duration-700 ease-expo group-hover:translate-x-3">Let&apos;s talk <span aria-hidden className="text-red">→</span></p>
        </div>
      </Link>
    </>
  );
}
