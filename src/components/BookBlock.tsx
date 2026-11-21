import Image from "next/image";
import Link from "next/link";
import Colons from "./Colons";
import Reveal from "./Reveal";
import { book } from "@/lib/seed";

/** The book as one section on Ideas, linking to /book. */
export default function BookBlock() {
  return (
    <section className="wrap grid items-center gap-12 py-24 sm:py-36 lg:grid-cols-12">
      <div className="relative mx-auto aspect-[2/3] w-full max-w-xs overflow-hidden rounded-[22px] bg-eagle text-sky lg:col-span-4">
        {book.cover ? (
          <Image src={book.cover} alt={`${book.title} book cover`} fill sizes="(min-width:1024px) 25vw, 70vw" className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-between p-7"><Colons w={40} className="text-red" /><span className="display text-3xl leading-tight">{book.title}</span></div>
        )}
      </div>
      <Reveal className="lg:col-span-7 lg:col-start-6">
        <Colons label="The book" className="mb-6 text-red" />
        <h2 className="display text-h2">{book.title}</h2>
        <p className="mt-6 max-w-lg text-xl text-ash">{book.promise}</p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link href="/book" className="btn-dark">Read the first chapter <span aria-hidden>→</span></Link>
          {book.buyUrl && <a href={book.buyUrl} target="_blank" rel="noreferrer" className="link-u text-sm font-semibold">{book.buyLabel}</a>}
        </div>
      </Reveal>
    </section>
  );
}
