"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Colons from "./Colons";

type Beat = { key: string; word: string; line: string; sub: string; img: { url: string; alt: string } };

/** Apple-style sticky storytelling: the image holds while three short statements scroll past. */
export default function StickyStory({ beats }: { beats: Beat[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-obsidian text-sky" aria-label="Philosophy: Head, Heart, Hand">
      <div className="wrap grid gap-10 py-24 sm:py-36 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-graphite">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={beats[active].key}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image src={beats[active].img.url} alt={beats[active].img.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-5 left-5 flex gap-2">
              {beats.map((b, i) => (
                <span key={b.key} className={`h-1 rounded-full transition-all duration-700 ease-expo ${i === active ? "w-10 bg-red" : "w-4 bg-sky/40"}`} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <Colons label="The philosophy" className="mb-6 text-red lg:mt-[30vh]" />
          {beats.map((b, i) => (
            <div key={b.key} ref={(el) => { refs.current[i] = el; }} data-i={i} className="flex min-h-[55vh] flex-col justify-center py-10 lg:min-h-screen">
              <p className={`display text-mega transition-colors duration-700 ${i === active ? "text-sky" : "text-sky/15"}`}>{b.word}</p>
              <p className="display mt-6 text-h3">{b.line}</p>
              <p className="mt-3 max-w-sm text-sky/55">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
