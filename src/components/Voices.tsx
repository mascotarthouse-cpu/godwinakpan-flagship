import Image from "next/image";
import Colons from "./Colons";
import { voices } from "@/lib/seed";

/** Testimonials for one page. Each voice appears once, where it proves the most. Hidden when there are none. */
export default function Voices({ page }: { page: (typeof voices)[number]["page"] }) {
  const list = voices.filter((v) => v.page === page);
  if (!list.length) return null;
  return (
    <section className="wrap py-24 sm:py-36">
      <Colons label="Voices" className="mb-10 text-red" />
      <div className="grid gap-16 lg:grid-cols-2">
        {list.map((v) => (
          <figure key={v.name}>
            <blockquote className="display text-h3 leading-snug">&ldquo;{v.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 flex items-center gap-4">
              {v.photo && <span className="relative h-12 w-12 overflow-hidden rounded-full bg-paper"><Image src={v.photo} alt="" fill sizes="48px" className="object-cover" /></span>}
              <span><b>{v.name}</b><br /><span className="text-ash">{v.role}</span></span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
