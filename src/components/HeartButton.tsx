"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** The number stays hidden until it is big enough to help: a low count would make the work look small. */
const SHOW_FROM = 25;

/** "Felt this": optimistic, one per visitor per Hearticle (remembered here, enforced on the server). */
export default function HeartButton({ slug }: { slug: string }) {
  const key = `felt:${slug}`;
  const [count, setCount] = useState<number | null>(null);
  const [felt, setFelt] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    try { setFelt(localStorage.getItem(key) === "1"); } catch {}
    fetch(`/api/hearts?slug=${encodeURIComponent(slug)}`).then((r) => r.json()).then((d) => setCount(d.count ?? 0)).catch(() => setCount(0));
  }, [key, slug]);

  async function tap() {
    if (felt) return;
    setFelt(true);
    setPulse((p) => p + 1);
    setCount((c) => (c ?? 0) + 1); // optimistic
    try { localStorage.setItem(key, "1"); } catch {}
    const r = await fetch("/api/hearts", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slug }) }).catch(() => null);
    const d = await r?.json().catch(() => null);
    if (d?.count != null) setCount(d.count);
  }

  const showNumber = count != null && count >= SHOW_FROM;
  return (
    <button onClick={tap} aria-pressed={felt} aria-label={felt ? "You felt this" : "Felt this"} className={`group inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-semibold transition-colors ${felt ? "border-red bg-red text-sky" : "border-eagle/15 hover:border-red"}`}>
      <motion.svg key={pulse} width="18" height="18" viewBox="0 0 24 24" aria-hidden initial={{ scale: 1 }} animate={pulse ? { scale: [1, 1.45, 0.9, 1.15, 1] } : {}} transition={{ duration: 0.6 }}>
        <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.7 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z" fill={felt ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" />
      </motion.svg>
      <span>{felt ? "You felt this" : "Felt this"}</span>
      {showNumber && <span className={felt ? "text-sky/80" : "text-ash"}>{count!.toLocaleString("en-GB")}</span>}
    </button>
  );
}
