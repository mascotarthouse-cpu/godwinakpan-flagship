"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/seed";
import Colons from "./Colons";

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const list = projects;
  return (
    <section className="wrap">
      <motion.ul layout className="grid gap-x-6 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li key={p.slug} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className={i % 2 ? "md:mt-24" : ""}>
              <Link href={`/work/${p.slug}`} className="group block">
                <div className={`relative aspect-[4/5] overflow-hidden rounded-[28px] bg-eagle text-sky`}>
                  {p.image ? (
                    <Image src={p.image} alt={p.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-1000 ease-expo group-hover:scale-105" />
                  ) : (
                    // TODO: Replace with project photography from Drive (add in /admin → Projects)
                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                      <span className="eyebrow opacity-60">{p.client}</span>
                      <span className="display text-[clamp(2.25rem,4.6vw,4.75rem)] leading-[0.92] [overflow-wrap:anywhere] transition-transform duration-1000 ease-expo group-hover:-translate-y-3">{p.title}</span>
                      <Colons w={44} className="text-red" />
                    </div>
                  )}
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h2 className="display text-2xl">{p.title}</h2>
                    <p className="mt-2 max-w-md text-ash">{p.summary}</p>
                  </div>
                  <span className="eyebrow shrink-0 pt-2 text-ash">{p.year}</span>
                </div>
                {p.result && <p className="mt-4 text-sm font-semibold">{p.result}</p>}
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
