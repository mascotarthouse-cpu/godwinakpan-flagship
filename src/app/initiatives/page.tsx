import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { initiatives } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Initiatives",
  description: "Ifiok Beyond Design, THE SHIFT and the Dorathy Akpan Foundation: building people, not just brands.",
  alternates: { canonical: "/initiatives" },
};

const accents = ["text-red", "text-flight", "text-growth"];

export default function Initiatives() {
  return (
    <>
      <PageHero eyebrow="Ecosystem & social impact" words={["Build", "people.", "Not", "just", "brands."]} />
      {initiatives.map((x, i) => (
        <section key={x.slug} id={x.slug} className={`scroll-mt-20 ${i % 2 ? "bg-sky" : "bg-obsidian text-sky"}`}>
          <div className="wrap grid items-center gap-10 py-24 sm:py-36 lg:grid-cols-12">
            <div className={`relative aspect-[4/5] overflow-hidden rounded-[28px] lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
              {/* TODO: Replace with Google Drive asset -> event / community photo for this initiative */}
              <Image src={x.image} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1" : "lg:col-start-7"}`}>
              <Reveal>
                <Colons label={x.since} className={`mb-6 ${accents[i]}`} />
                <h2 className="display text-h2">{x.name}</h2>
                <p className={`mt-6 max-w-md text-xl ${i % 2 ? "text-ash" : "text-sky/60"}`}>{x.line}</p>
                <Link href={`/contact?intent=${encodeURIComponent("Media/Press")}&about=${encodeURIComponent(x.name)}`} className={`${i % 2 ? "btn-dark" : "btn-light"} mt-10`}>
                  {x.cta} <span aria-hidden>→</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
