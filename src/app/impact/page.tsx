import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import EventList from "@/components/EventList";
import Kinetic from "@/components/Kinetic";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { initiatives } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Impact",
  description: "Purpose over pleasure: Ifiok Beyond Design, THE SHIFT and the Dorathy Akpan Foundation. Building people, not just brands.",
  alternates: { canonical: "/impact" },
};

const accents = ["text-red", "text-flight", "text-growth"];

export default function Impact() {
  return (
    <>
      <PageHero eyebrow="05 · The Legacy · Impact" words={["Build", "people.", "Not", "just", "brands."]} />
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
      <EventList dark />
      <section className="wrap flex flex-col items-start gap-8 py-28 sm:py-40">
        <Colons label="Get involved" className="text-red" />
        <Kinetic as="h2" words={["Partner.", "Sponsor.", "Show", "up."]} className="display text-mega" accentLast />
        <Link href="/contact?intent=Partnership" className="btn-dark">Start a conversation <span aria-hidden>→</span></Link>
      </section>
    </>
  );
}
