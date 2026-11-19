"use client";
import { useRef } from "react";

/** Minimal milestone scroller: drag, swipe or use the arrows. */
export default function Timeline({ items }: { items: { when: string; title: string; detail: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const go = (d: number) => ref.current?.scrollBy({ left: d * Math.min(420, innerWidth * 0.8), behavior: "smooth" });
  return (
    <div className="mt-14">
      <ol ref={ref} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:px-8 lg:px-12" data-lenis-prevent-wheel>
        {items.map((t, i) => (
          <li key={t.title} className="flex min-h-[300px] w-[78vw] shrink-0 snap-start flex-col justify-between rounded-[22px] border border-sky/10 p-7 transition-colors duration-500 hover:border-red sm:w-[360px]">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-red">{t.when}</span>
              <span className="text-sky/30">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div>
              <p className="display text-2xl leading-tight">{t.title}</p>
              <p className="mt-3 text-sky/55">{t.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="wrap mt-8 flex gap-3">
        {[-1, 1].map((d) => (
          <button key={d} onClick={() => go(d)} aria-label={d < 0 ? "Previous" : "Next"} className="flex h-12 w-12 items-center justify-center rounded-full border border-sky/25 transition-colors hover:border-red hover:bg-red">
            {d < 0 ? "←" : "→"}
          </button>
        ))}
      </div>
    </div>
  );
}
