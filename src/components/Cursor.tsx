"use client";
import { useEffect, useRef } from "react";

/** Small dot that trails the pointer and grows over links. Fine pointers only. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const el = ref.current!;
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement;
      const hot = !!t.closest("a,button,[data-cursor]");
      el.dataset.hot = hot ? "1" : "";
      el.style.opacity = "1";
    };
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", move);
    document.addEventListener("pointerleave", () => (el.style.opacity = "0"));
    loop();
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(raf); document.documentElement.classList.remove("has-cursor"); };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 rounded-full bg-sky opacity-0 mix-blend-difference transition-[width,height] duration-300 ease-expo data-[hot='1']:h-14 data-[hot='1']:w-14"
    />
  );
}
