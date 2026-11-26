import Link from "next/link";
import Colons from "./Colons";
import { thoughts } from "@/lib/seed";

/** One thought per card, swiped sideways. Each has its own page to share. */
export default function DeepThoughts({ limit }: { limit?: number }) {
  const list = limit ? thoughts.slice(0, limit) : thoughts;
  if (!list.length) return null;
  return (
    <section className="bg-obsidian py-24 text-sky sm:py-32">
      <div className="wrap mb-10 flex items-end justify-between gap-6">
        <div>
          <Colons label="Deep Thoughts" className="mb-5 text-red" />
          <p className="text-sky/60">Swipe. Keep the one that stays with you.</p>
        </div>
      </div>
      <ul className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:px-[max(1.5rem,calc((100vw-80rem)/2))]">
        {list.map((t) => (
          <li key={t.slug} className="w-[82vw] max-w-md shrink-0 snap-center">
            <Link href={`/hearticles/deep-thoughts/${t.slug}`} className="group flex aspect-[4/5] flex-col justify-between rounded-[28px] bg-sky p-8 text-eagle">
              <Colons w={36} className="text-red" />
              <p className="display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight transition-colors group-hover:text-red">{t.text}</p>
              <span className="text-sm text-ash">Share this thought →</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
