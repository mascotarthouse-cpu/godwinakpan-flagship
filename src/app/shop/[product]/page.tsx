import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import Colons from "@/components/Colons";
import Kinetic from "@/components/Kinetic";
import Reveal from "@/components/Reveal";
import SignupForm from "@/components/SignupForm";
import { products, site } from "@/lib/seed";

export function generateStaticParams() {
  return products.map((p) => ({ product: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
  const { product } = await params;
  const p = products.find((x) => x.slug === product);
  if (!p) return {};
  return { title: { absolute: `${p.title} | Shop` }, description: `${p.title} by Barr. Godwin Akpan. ${p.promise}`, alternates: { canonical: `/shop/${p.slug}` } };
}

export default async function Product({ params }: { params: Promise<{ product: string }> }) {
  const { product } = await params;
  const p = products.find((x) => x.slug === product);
  if (!p) notFound();
  const free = p.kind === "Free";
  const about = sanitizeHtml(await marked.parse(p.about));
  const ld = {
    "@context": "https://schema.org", "@type": "Product", name: p.title, description: p.promise, url: `${site.url}/shop/${p.slug}`,
    image: p.cover ? `${site.url}${p.cover}` : undefined, brand: { "@type": "Person", name: "Godwin Akpan" },
    ...(p.price || free ? { offers: { "@type": "Offer", price: free ? "0" : p.price.replace(/[^\d.]/g, ""), priceCurrency: "NGN", url: p.buyUrl || `${site.url}/shop/${p.slug}` } } : {}),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="wrap grid gap-12 pb-20 pt-32 sm:pt-44 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p><Link href="/shop" className="link-u text-sm text-ash">← Shop</Link></p>
          <Colons label={p.kind} className="mb-8 mt-10 text-red" />
          <Kinetic words={p.title.split(" ")} className="display text-hero" />
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-md text-xl text-ash">{p.promise}</p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              {free ? null : p.buyUrl ? (
                <a href={p.buyUrl} target="_blank" rel="noreferrer" className="btn-dark">{p.buyLabel}{p.price ? ` · ${p.price}` : ""} <span aria-hidden>→</span></a>
              ) : (
                <span className="rounded-full border border-dashed border-eagle/25 px-4 py-2 text-sm text-ash">Available soon</span>
              )}
              {p.kind === "Books" && <a href="#free" className="link-u text-sm font-semibold">Free first chapter</a>}
            </div>
          </Reveal>
        </div>
        <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-[22px] bg-eagle text-sky lg:col-span-4 lg:col-start-9">
          {p.cover ? (
            <Image src={p.cover} alt={`${p.title} cover`} fill priority sizes="(min-width:1024px) 30vw, 80vw" className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col justify-between p-8"><Colons w={48} className="text-red" /><span className="display text-4xl leading-tight">{p.title}</span></div>
          )}
        </div>
      </section>

      <section className="wrap grid gap-12 py-24 sm:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><p className="eyebrow text-ash">About</p></Reveal>
        <div className="prose-g lg:col-span-7 lg:col-start-6" dangerouslySetInnerHTML={{ __html: about }} />
      </section>

      {(free || p.kind === "Books") && (
        <section id="free" className="scroll-mt-20 bg-obsidian text-sky">
          <div className="wrap grid gap-10 py-24 sm:py-36 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-6">
              <Colons label="Free" className="mb-6 text-red" />
              <h2 className="display text-h2">{free ? "Get it free." : "Read the first chapter."}</h2>
              <p className="mt-4 max-w-md text-xl text-sky/60">Straight to your inbox.</p>
            </Reveal>
            <div className="lg:col-span-6"><SignupForm intent={free ? "Free download" : "Book chapter"} cta="Send it" dark about={p.title} /></div>
          </div>
        </section>
      )}
    </>
  );
}
