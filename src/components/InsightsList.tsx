"use client";
import Link from "next/link";
import { useState } from "react";
import Colons from "./Colons";
import PostCard from "./PostCard";
import { CATEGORIES, SPARK, type Post } from "@/lib/seed";

type Format = "all" | "long" | "sparks";

/** Hearticles: Long-form essays and Sparks (short thoughts) in one journal, with a format switch. */
export default function InsightsList({ posts }: { posts: Post[] }) {
  const [format, setFormat] = useState<Format>("all");
  const [cat, setCat] = useState<string>("All");
  const [src, setSrc] = useState<"all" | "native" | "medium">("all");
  const isSpark = (p: Post) => p.category === SPARK;
  const hasSparks = posts.some(isSpark);
  const hasMedium = posts.some((p) => p.source === "medium");
  // Topic tabs only once the archive is deep enough to fill them; until then they make it look empty.
  const showTopics = posts.length > 30;

  const pool = posts.filter((p) => (format === "all" || (format === "sparks" ? isSpark(p) : !isSpark(p))) && (cat === "All" || p.category === cat) && (src === "all" || p.source === src));
  const essays = pool.filter((p) => !isSpark(p));
  const sparks = pool.filter(isSpark);
  const [first, ...rest] = essays;
  const tab = (on: boolean) => `rounded-full px-4 py-2 font-medium transition-colors ${on ? "bg-sky shadow-sm" : "text-ash"}`;

  return (
    <section className="wrap pb-28 sm:pb-40">
      <div className={`mb-14 flex flex-col gap-4 border-b border-eagle/10 pb-6 lg:flex-row lg:items-center lg:justify-between ${!showTopics && !hasMedium && !hasSparks ? "hidden" : ""}`}>
        <div className="flex flex-wrap items-center gap-3">
          {hasSparks && (
            <div className="flex w-fit rounded-full bg-paper p-1 text-sm" role="tablist" aria-label="Format">
              {([["all", "All"], ["long", "Long-form"], ["sparks", "Sparks"]] as const).map(([k, l]) => (
                <button key={k} role="tab" aria-selected={format === k} onClick={() => setFormat(k)} className={tab(format === k)}>{l}</button>
              ))}
            </div>
          )}
          <div className="no-scrollbar flex gap-2 overflow-x-auto" role="tablist" aria-label="Topic">
            {showTopics && ["All", ...CATEGORIES.filter((c) => c !== SPARK)].map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`btn shrink-0 border px-5 py-2.5 ${cat === c ? "border-eagle bg-eagle text-sky" : "border-transparent hover:border-eagle/20"}`}>{c}</button>
            ))}
          </div>
        </div>
        {hasMedium && (
          <div className="flex w-fit rounded-full bg-paper p-1 text-sm" role="tablist" aria-label="Source">
            {(["all", "native", "medium"] as const).map((s) => (
              <button key={s} role="tab" aria-selected={src === s} onClick={() => setSrc(s)} className={tab(src === s)}>
                {s === "all" ? "All" : s === "native" ? "On this site" : "Medium"}
              </button>
            ))}
          </div>
        )}
      </div>

      {!first && !sparks.length && <p className="display py-20 text-h3 text-ash">Nothing here yet.</p>}

      {first && (
        <>
          <PostCard p={first} big />
          {rest.length > 0 && (
            <div className="mt-20 grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => <PostCard key={p.slug} p={p} />)}
            </div>
          )}
        </>
      )}

      {sparks.length > 0 && (
        <div className={first ? "mt-28" : ""}>
          <Colons label="Sparks · Random Deep Thoughts" className="mb-10 text-red" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sparks.map((s, i) => (
              <Link key={s.slug} href={`/hearticles/${s.slug}`} className={`group flex min-h-[260px] flex-col justify-between rounded-[28px] p-8 transition-transform duration-700 ease-expo hover:-translate-y-1 ${i % 3 === 1 ? "bg-red text-sky" : i % 3 === 2 ? "bg-paper text-eagle" : "bg-eagle text-sky"}`}>
                <Colons w={28} className={i % 3 === 1 ? "text-sky" : "text-red"} />
                <p className="display text-2xl leading-snug">“{s.excerpt || s.title}”</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
