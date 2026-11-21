import Image from "next/image";
import type { Metadata } from "next";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import Colons from "@/components/Colons";
import Kinetic from "@/components/Kinetic";
import Reveal from "@/components/Reveal";
import SignupForm from "@/components/SignupForm";
import { book, site } from "@/lib/seed";

export const metadata: Metadata = {
  title: "The book",
  description: `${book.title} by Barr. Godwin Akpan. ${book.promise}`,
  alternates: { canonical: "/book" },
};

export default async function Book() {
  const about = sanitizeHtml(await marked.parse(book.about));
  const ld = { "@context": "https://schema.org", "@type": "Book", name: book.title, description: book.promise, url: `${site.url}/book`, image: book.cover ? `${site.url}${book.cover}` : undefined, author: { "@type": "Person", name: "Godwin Akpan", url: site.url } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="wrap grid gap-12 pb-20 pt-32 sm:pt-44 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Colons label="The book" className="mb-8 text-red" />
          <Kinetic words={book.title.split(" ")} className="display text-hero" />
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-md text-xl text-ash">{book.promise}</p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              {book.buyUrl ? (
                <a href={book.buyUrl} target="_blank" rel="noreferrer" className="btn-dark">{book.buyLabel} <span aria-hidden>→</span></a>
              ) : (
                <span className="rounded-full border border-dashed border-eagle/25 px-4 py-2 text-sm text-ash">Buy link coming soon</span>
              )}
              <a href="#chapter" className="link-u text-sm font-semibold">Free first chapter</a>
            </div>
          </Reveal>
        </div>
        <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-[22px] bg-eagle text-sky lg:col-span-4 lg:col-start-9">
          {book.cover ? (
            <Image src={book.cover} alt={`${book.title} book cover`} fill priority sizes="(min-width:1024px) 30vw, 80vw" className="object-cover" />
          ) : (
            // TODO: add the cover image in src/lib/seed.ts (book.cover)
            <div className="absolute inset-0 flex flex-col justify-between p-8"><Colons w={48} className="text-red" /><span className="display text-4xl leading-tight">{book.title}</span></div>
          )}
        </div>
      </section>

      <section className="wrap grid gap-12 py-24 sm:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><p className="eyebrow text-ash">About the book</p></Reveal>
        <div className="prose-g lg:col-span-7 lg:col-start-6" dangerouslySetInnerHTML={{ __html: about }} />
      </section>

      <section id="chapter" className="scroll-mt-20 bg-obsidian text-sky">
        <div className="wrap grid gap-10 py-24 sm:py-36 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <Colons label="Free" className="mb-6 text-red" />
            <h2 className="display text-h2">Read the first chapter.</h2>
            <p className="mt-4 max-w-md text-xl text-sky/60">Straight to your inbox, with Random Deep Thoughts: one idea a week.</p>
          </Reveal>
          <div className="lg:col-span-6"><SignupForm intent="Book chapter" cta="Send it" dark /></div>
        </div>
      </section>
    </>
  );
}
