"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Item = { type: string; title: string; text: string; href: string };

function useIndex(active: boolean) {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    if (active && !items.length) fetch("/search.json").then((r) => r.json()).then(setItems).catch(() => {});
  }, [active, items.length]);
  return items;
}

function rank(items: Item[], q: string) {
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
}

/** One Ask field: instant results from the site, then (later) Ifiok's answer, then a human. */
export function AskPanel({ onDone, autoFocus = true, initial = "" }: { onDone?: () => void; autoFocus?: boolean; initial?: string }) {
  const router = useRouter();
  const items = useIndex(true);
  const [q, setQ] = useState(initial);
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (autoFocus) setTimeout(() => input.current?.focus(), 30); }, [autoFocus]);
  const results = useMemo(() => rank(items, q), [q, items]);
  const go = (href: string) => { onDone?.(); router.push(href); };
  const talk = `/contact${q ? `?about=${encodeURIComponent(q)}` : ""}`;

  return (
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
        placeholder="Ask anything"
        aria-label="Ask"
        className="display w-full border-b border-eagle/20 bg-transparent py-4 text-[clamp(1.6rem,4vw,2.4rem)] outline-none placeholder:text-ash/60 focus:border-red"
      />
      <ul className="mt-4">
        {results.map((r, i) => (
          <li key={`${r.type}-${r.href}-${r.title}`}>
            <Link href={r.href} onClick={onDone} className={`flex items-baseline justify-between gap-6 border-b border-eagle/10 py-4 text-lg transition-colors hover:text-red ${i === sel ? "text-red" : ""}`}>
              <span>{r.title}</span>
              <span className="eyebrow shrink-0 text-ash">{r.type}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="py-8 text-lg text-ash">
        {q && !results.length ? "Nothing on the site answers that yet. " : "Didn't find it? "}
        <Link href={talk} onClick={onDone} className="link-u text-eagle">Ask Godwin directly</Link>
      </p>
    </div>
  );
}

/** The Ask icon in the header (Ctrl or Cmd + K, or /). */
export default function Search() {
  const [open, setOpen] = useState(false);

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
    const l = (window as unknown as { lenis?: { stop(): void; start(): void } }).lenis;
    l?.stop();
    return () => l?.start();
  }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-full" aria-label="Ask (Ctrl or Cmd + K)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-y-auto bg-sky/95 px-4 pt-[14vh] text-eagle backdrop-blur-xl"
            role="dialog" aria-modal="true" aria-label="Ask"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <AskPanel onDone={() => setOpen(false)} />
            <p className="mx-auto max-w-2xl text-sm text-ash">Ctrl or Cmd + K opens this anywhere. Esc closes it.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
