"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Colons from "./Colons";

type Card = { title: string; kicker: string; line: string; href: string; tone: "dark" | "light" | "red" };

const tones = {
  dark: "bg-eagle text-sky",
  light: "bg-paper text-eagle",
  red: "bg-red text-sky",
};

/** Horizontal showcase pinned on desktop; native swipe on mobile. */
export default function Showcase({ title, cards }: { title: string; cards: Card[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const dist = () => t.scrollWidth - window.innerWidth + 48;
      gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="overflow-hidden bg-sky py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
      <div className="wrap mb-10 flex items-end justify-between gap-6 lg:mb-14">
        <div>
          <Colons label="Selected impact" className="mb-5 text-red" />
          <h2 className="display text-h2">{title}</h2>
        </div>
        <Link href="/work" className="link-u hidden text-sm font-semibold sm:block">All work</Link>
      </div>
      <div className="no-scrollbar overflow-x-auto lg:overflow-visible">
        <div ref={track} className="flex w-max gap-4 px-4 sm:gap-6 sm:px-8 lg:px-12">
          {cards.map((c, i) => (
            <Link
              key={c.title}
              href={c.href}
              className={`group relative flex h-[62vh] max-h-[640px] min-h-[420px] w-[82vw] flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:w-[60vw] sm:p-10 lg:w-[44vw] ${tones[c.tone]}`}
            >
              <div className="flex items-start justify-between">
                <span className="eyebrow opacity-70">{c.kicker}</span>
                <span className="display text-sm opacity-50">0{i + 1}</span>
              </div>
              <span aria-hidden className="pointer-events-none absolute -right-6 bottom-10 opacity-[0.08] transition-transform duration-1000 ease-expo group-hover:-translate-y-4"><Colons w={300} /></span>
              <div className="relative">
                <h3 className="display text-h2">{c.title}</h3>
                <p className="mt-4 max-w-sm text-lg opacity-75">{c.line}</p>
                <span className="mt-8 inline-flex h-12 w-12 items-center justify-center rounded-full border border-current transition-all duration-500 ease-expo group-hover:w-24">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
