import Link from "next/link";
import type { Metadata } from "next";
import Colons from "@/components/Colons";
import PageHero from "@/components/PageHero";
import { products } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Shop",
  description: "Books, courses and tools by Barr. Godwin Akpan, including the Brand Bible.",
  alternates: { canonical: "/shop" },
};

const KINDS = ["Free", "Books", "Courses", "Tools", "Merch"] as const;

export default function Shop() {
  // Empty chips stay hidden.
  const kinds = KINDS.filter((k) => products.some((p) => p.kind === k));
  return (
    <>
      <PageHero eyebrow="Shop" words={["Tools", "to", "build", "with."]} />
      <section className="wrap pb-28 sm:pb-40">
        {kinds.map((k) => (
          <div key={k} id={k.toLowerCase()} className="mb-20 scroll-mt-24">
            <Colons label={k} className="mb-8 text-red" />
            <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {products.filter((p) => p.kind === k).map((p) => (
                <li key={p.slug}>
                  <Link href={`/shop/${p.slug}`} className="group block">
                    <div className="flex aspect-[4/5] flex-col justify-between rounded-[22px] bg-eagle p-7 text-sky">
                      <Colons w={40} className="text-red" />
                      <span className="display text-3xl leading-tight transition-transform duration-700 ease-expo group-hover:-translate-y-2">{p.title}</span>
                    </div>
                    <p className="mt-5 text-ash">{p.promise}</p>
                    {p.price && <p className="mt-2 font-semibold">{p.price}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
