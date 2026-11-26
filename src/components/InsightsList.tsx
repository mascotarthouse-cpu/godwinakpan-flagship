"use client";
import { useState } from "react";
import PostCard from "./PostCard";
import { SERIES, type Post } from "@/lib/seed";

export default function InsightsList({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState<string>("All");
  const [src, setSrc] = useState<"all" | "native" | "medium">("all");
  const list = posts.filter((p) => (cat === "All" || p.category === cat) && (src === "all" || p.source === src));
  const [first, ...rest] = list;
  const hasMedium = posts.some((p) => p.source === "medium");
  // Series chips only for series that hold something, and only once there are two or more.
  const present = SERIES.filter((x) => posts.some((p) => p.category === x));
  const showTopics = present.length > 1;
  return (
    <section className="wrap pb-28 sm:pb-40">
      <div className={`mb-14 flex flex-col gap-4 border-b border-eagle/10 pb-6 lg:flex-row lg:items-center lg:justify-between ${!showTopics && !hasMedium ? "hidden" : ""}`}>
        <div className="no-scrollbar flex gap-2 overflow-x-auto" role="tablist" aria-label="Category">
          {showTopics && ["All", ...present].map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`btn shrink-0 border px-5 py-2.5 ${cat === c ? "border-eagle bg-eagle text-sky" : "border-transparent hover:border-eagle/20"}`}>{c}</button>
          ))}
        </div>
        {hasMedium && (
          <div className="flex w-fit rounded-full bg-paper p-1 text-sm" role="tablist" aria-label="Source">
            {(["all", "native", "medium"] as const).map((s) => (
              <button key={s} role="tab" aria-selected={src === s} onClick={() => setSrc(s)} className={`rounded-full px-4 py-2 font-medium transition-colors ${src === s ? "bg-sky shadow-sm" : "text-ash"}`}>
                {s === "all" ? "All" : s === "native" ? "Hearticles" : "Medium"}
              </button>
            ))}
          </div>
        )}
      </div>
      {!first ? (
        <p className="display py-20 text-h3 text-ash">Nothing here yet.</p>
      ) : (
        <>
          <PostCard p={first} big />
          <div className="mt-20 grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => <PostCard key={p.slug} p={p} />)}
          </div>
        </>
      )}
    </section>
  );
}
