import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/seed";
import Colons from "./Colons";

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function PostCard({ p, big = false }: { p: Post; big?: boolean }) {
  return (
    <Link href={`/ideas/${p.slug}`} className="group block">
      <div className={`relative overflow-hidden rounded-[22px] bg-paper ${big ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        {p.cover ? (
          <Image src={p.cover} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition-transform duration-1000 ease-expo group-hover:scale-105" unoptimized={p.cover.startsWith("http")} />
        ) : (
          <div className="absolute inset-0 flex items-end bg-eagle p-6"><Colons w={56} className="text-red" /></div>
        )}
        {p.source === "medium" && <span className="absolute left-4 top-4 rounded-full bg-sky px-3 py-1 text-xs font-semibold text-eagle">Medium</span>}
      </div>
      <div className="mt-5 flex gap-3 text-xs font-medium uppercase tracking-[0.14em] text-ash">
        <span className="text-red">{p.category}</span><span>{p.readMinutes} min</span>
      </div>
      <h3 className={`display mt-2 ${big ? "text-h2" : "text-2xl"} leading-tight transition-colors group-hover:text-red`}>{p.title}</h3>
      {big && <p className="mt-3 max-w-xl text-lg text-ash">{p.excerpt}</p>}
    </Link>
  );
}
