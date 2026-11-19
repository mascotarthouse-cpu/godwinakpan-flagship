"use client";
import { useMemo, useRef, useState } from "react";
import { marked } from "marked";

const tools: [string, string, string][] = [
  ["H", "## ", ""],
  ["B", "**", "**"],
  ["I", "_", "_"],
  ["“", "> ", ""],
  ["•", "- ", ""],
  ["Link", "[", "](https://)"],
];

/** Distraction-free Markdown editor with a live preview. */
export default function Editor({ initial }: { initial: string }) {
  const [v, setV] = useState(initial);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const ref = useRef<HTMLTextAreaElement>(null);
  const html = useMemo(() => (tab === "preview" ? (marked.parse(v) as string) : ""), [v, tab]);
  const words = v.split(/\s+/).filter(Boolean).length;

  function wrap(a: string, b: string) {
    const t = ref.current!;
    const s = t.selectionStart, e = t.selectionEnd;
    const next = v.slice(0, s) + a + v.slice(s, e) + b + v.slice(e);
    setV(next);
    requestAnimationFrame(() => { t.focus(); t.setSelectionRange(s + a.length, e + a.length); });
  }

  return (
    <div className="rounded-2xl border border-eagle/10 bg-sky">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-eagle/10 px-3 py-2">
        <div className="flex gap-1">
          {tools.map(([l, a, b]) => (
            <button key={l} type="button" onClick={() => wrap(a, b)} disabled={tab === "preview"} className="rounded-md px-2.5 py-1.5 text-sm font-semibold text-graphite hover:bg-paper disabled:opacity-30">{l}</button>
          ))}
        </div>
        <div className="flex rounded-full bg-paper p-1 text-xs font-semibold">
          {(["write", "preview"] as const).map((x) => (
            <button key={x} type="button" onClick={() => setTab(x)} className={`rounded-full px-3 py-1 capitalize ${tab === x ? "bg-sky shadow-sm" : "text-ash"}`}>{x}</button>
          ))}
        </div>
      </div>
      <textarea ref={ref} name="body" value={v} onChange={(e) => setV(e.target.value)} placeholder="Write in Markdown…" className={`min-h-[60vh] w-full resize-y bg-transparent p-5 font-body text-lg leading-relaxed outline-none sm:p-8 ${tab === "preview" ? "hidden" : ""}`} />
      {tab === "preview" && <div className="prose-g min-h-[60vh] p-5 sm:p-8" dangerouslySetInnerHTML={{ __html: html }} />}
      <p className="border-t border-eagle/10 px-5 py-2 text-xs text-ash">{words} words · {Math.max(1, Math.round(words / 220))} min read</p>
    </div>
  );
}
