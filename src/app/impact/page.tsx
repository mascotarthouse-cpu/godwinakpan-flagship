import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import Kinetic from "@/components/Kinetic";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import NextChapter from "@/components/NextChapter";
import Voices from "@/components/Voices";
import SampleTag from "@/components/SampleTag";
import { impactNumbers, initiatives } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Impact",
  description: "Ripple: Ifiok Beyond Design, THE SHIFT, the Dorathy Akpan Foundation and RebrandNigeria. Building people, not just brands.",
  alternates: { canonical: "/impact" },
};

const accents = ["text-red", "text-flight", "text-growth", "text-red"];

export default function Impact() {
  return (
    <>
      <PageHero eyebrow="Impact" words={["Ripple."]} line="Building people, not just brands. Purpose over pleasure." />
      {impactNumbers.length > 0 && (
        <section className="wrap grid grid-cols-2 gap-x-6 gap-y-14 pb-24 lg:grid-cols-4">
          {impactNumbers.map((n) => (
            <div key={n.label}>
              <p className="display text-[clamp(3rem,6vw,5.5rem)] leading-none">{n.value}</p>
              <p className="mt-3 text-ash">{n.label}</p>
              <p className="mt-1 text-xs text-ash/70">As of {n.asOf} {n.sample && <SampleTag className="ml-1" />}</p>
            </div>
          ))}
        </section>
      )}
      {initiatives.map((x, i) => (
        <section key={x.slug} id={x.slug} className={`scroll-mt-20 ${i % 2 ? "bg-sky" : "bg-obsidian text-sky"}`}>
          <div className="wrap grid items-center gap-10 py-24 sm:py-36 lg:grid-cols-12">
            <Link href={`/impact/${x.slug}`} className={`group relative block aspect-[4/5] overflow-hidden rounded-[28px] lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
              {/* TODO: Replace with Google Drive asset -> event / community photo for this initiative */}
              <Image src={x.image} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover transition-transform duration-1000 ease-expo group-hover:scale-105" />
            </Link>
            <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1" : "lg:col-start-7"}`}>
              <Reveal>
                <Colons label={x.since} className={`mb-6 ${accents[i]}`} />
                <h2 className="display text-h2"><Link href={`/impact/${x.slug}`} className="transition-colors hover:text-red">{x.name}</Link></h2>
                <p className={`mt-6 max-w-md text-xl ${i % 2 ? "text-ash" : "text-sky/60"}`}>{x.line}</p>
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <Link href={`/contact?intent=Partnership&about=${encodeURIComponent(x.name)}`} className={i % 2 ? "btn-dark" : "btn-light"}>
                    {x.cta} <span aria-hidden>→</span>
                  </Link>
                  <Link href={`/impact/${x.slug}`} className="link-u text-sm font-semibold">Explore {x.short}</Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}
      <Voices page="impact" />
      <section className="wrap flex flex-col items-start gap-8 py-28 sm:py-40">
        <Colons label="Back a cause" className="text-red" />
        <Kinetic as="h2" words={["Partner.", "Sponsor.", "Show", "up."]} className="display text-mega" accentLast />
        <Link href="/contact?intent=Partnership" className="btn-dark">Let&apos;s talk <span aria-hidden>→</span></Link>
      </section>
      <NextChapter from="/impact" />
    </>
  );
}
