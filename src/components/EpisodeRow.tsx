import Link from "next/link";
import { episodes } from "@/lib/seed";
import SampleTag from "./SampleTag";

export default function EpisodeList({ limit, dark = false }: { limit?: number; dark?: boolean }) {
  const list = limit ? episodes.slice(0, limit) : episodes;
  return (
    <ul className={`border-t ${dark ? "border-sky/10" : "border-eagle/10"}`}>
      {list.map((e) => (
        <li key={e.slug}>
          <Link href={`/podcast/${e.slug}`} className={`group grid gap-2 border-b py-7 sm:grid-cols-12 sm:items-baseline ${dark ? "border-sky/10" : "border-eagle/10"}`}>
            <span className="text-sm text-red sm:col-span-1">Ep {e.n}</span>
            <span className="display text-h3 transition-transform duration-700 ease-expo group-hover:translate-x-2 sm:col-span-6">{e.title}</span>
            <span className={`sm:col-span-4 ${dark ? "text-sky/60" : "text-ash"}`}>{e.summary}</span>
            <span className={`text-sm sm:col-span-1 sm:text-right ${dark ? "text-sky/50" : "text-ash"}`}>{e.minutes} min {e.sample && <SampleTag className="sm:mt-1" />}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
