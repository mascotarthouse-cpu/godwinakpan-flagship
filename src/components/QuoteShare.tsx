"use client";
import { useEffect, useRef, useState } from "react";

const MAX = 280;

/** Highlight up to 280 characters in a Hearticle to share it as a quote card. */
export default function QuoteShare({ slug, title, children }: { slug: string; title: string; children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState<{ text: string; x: number; y: number } | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => {
      const s = window.getSelection();
      const text = s?.toString().replace(/\s+/g, " ").trim() || "";
      if (!s || !text || text.length > MAX || !box.current?.contains(s.anchorNode)) { setSel(null); setOpen(false); return; }
      const r = s.getRangeAt(0).getBoundingClientRect();
      setSel({ text, x: r.left + r.width / 2, y: r.top });
    };
    document.addEventListener("selectionchange", on);
    return () => document.removeEventListener("selectionchange", on);
  }, []);

  const url = typeof window !== "undefined" ? `${location.origin}/hearticles/${slug}` : "";
  const card = sel ? `/hearticles/${slug}/quote?q=${encodeURIComponent(sel.text)}` : "";
  const line = sel ? `“${sel.text}” — Godwin Akpan` : "";

  async function share() {
    if (!sel) return;
    if (navigator.share) {
      try { await navigator.share({ title, text: line, url }); return; } catch { /* closed by the reader */ }
    }
    setOpen(true);
  }

  return (
    <div ref={box} className="relative">
      {children}
      {sel && (
        <div className="fixed z-50 -translate-x-1/2 -translate-y-full pb-3" style={{ left: sel.x, top: sel.y }} onMouseDown={(e) => e.preventDefault()}>
          <div className="flex items-center gap-1 rounded-full bg-eagle p-1 text-sm font-semibold text-sky shadow-lg">
            {!open ? (
              <button onClick={share} className="rounded-full px-4 py-2 hover:bg-red">Share quote</button>
            ) : (
              <>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" className="rounded-full px-3 py-2 hover:bg-red">LinkedIn</a>
                <a href={`https://x.com/intent/post?text=${encodeURIComponent(line)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" className="rounded-full px-3 py-2 hover:bg-red">X</a>
                <a href={card} target="_blank" rel="noreferrer" className="rounded-full px-3 py-2 hover:bg-red">Quote card</a>
                <button onClick={() => navigator.clipboard?.writeText(`${line}\n${url}`).catch(() => {})} className="rounded-full px-3 py-2 hover:bg-red">Copy</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
