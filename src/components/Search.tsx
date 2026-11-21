"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Item = { type: string; title: string; text: string; href: string };

/** Search the archive (⌘K or /). It only ever points to pages Godwin has published. */
export default function Search() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const typing = /input|textarea|select/i.test((document.activeElement as HTMLElement)?.tagName || "");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === "/" && !typing) { e.preventDefault(); setOpen(true); }
      else if (e.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", on);
    return () => removeEventListener("keydown", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    setQ(""); setSel(0);
    setTimeout(() => input.current?.focus(), 30);
    if (!items.length) fetch("/search.json").then((r) => r.json()).then(setItems).catch(() => {});
    const l = (window as unknown as { lenis?: { stop(): void; start(): void } }).lenis;
    l?.stop();
    return () => l?.start();
  }, [open, items.length]);

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return items.filter((i) => i.type === "Page").slice(0, 8);
    return items
      .map((i) => {
        const t = i.title.toLowerCase(), hay = `${t} ${i.text.toLowerCase()} ${i.type.toLowerCase()}`;
        let score = 0;
        for (const w of terms) { if (t.includes(w)) score += 3; else if (hay.includes(w)) score += 1; else return null; }
        return { ...i, score };
      })
      .filter((x): x is Item & { score: number } => !!x)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [q, items]);

  function go(href: string) { setOpen(false); router.push(href); }

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-full" aria-label="Search the archive (Ctrl or Cmd + K)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-y-auto bg-sky/95 px-4 pt-[14vh] text-eagle backdrop-blur-xl"
            role="dialog" aria-modal="true" aria-label="Search the archive"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <div className="mx-auto max-w-2xl">
              <input
                ref={input}
                value={q}
                onChange={(e) => { setQ(e.target.value); setSel(0); }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
                  if (e.key === "Enter" && results[sel]) go(results[sel].href);
                }}
                placeholder="Search ideas, impact and work"
                aria-label="Search"
                className="display w-full border-b border-eagle/20 bg-transparent py-4 text-[clamp(1.6rem,4vw,2.4rem)] outline-none placeholder:text-ash/60 focus:border-red"
              />
              <ul className="mt-4">
                {results.map((r, i) => (
                  <li key={`${r.type}-${r.href}-${r.title}`}>
                    <Link href={r.href} onClick={() => setOpen(false)} className={`flex items-baseline justify-between gap-6 border-b border-eagle/10 py-4 text-lg transition-colors hover:text-red ${i === sel ? "text-red" : ""}`}>
                      <span>{r.title}</span>
                      <span className="eyebrow shrink-0 text-ash">{r.type}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {q && !results.length && (
                <p className="py-8 text-lg text-ash">
                  Nothing in the archive yet. <Link href="/contact" onClick={() => setOpen(false)} className="link-u text-eagle">Ask Godwin directly</Link>
                </p>
              )}
              <p className="mt-8 text-sm text-ash">Ctrl or Cmd + K opens this anywhere. Esc closes it.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
