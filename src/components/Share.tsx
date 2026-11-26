"use client";
import { useState } from "react";

/** Share without signing up: WhatsApp, X, LinkedIn, copy link. */
export default function Share({ path, title }: { path: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window === "undefined" ? path : `${location.origin}${path}`;
  const enc = encodeURIComponent;
  const links = [
    ["WhatsApp", `https://wa.me/?text=${enc(`${title} ${url}`)}`],
    ["X", `https://x.com/intent/post?text=${enc(title)}&url=${enc(url)}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`],
  ];
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      <span className="eyebrow text-ash">Share</span>
      {links.map(([l, h]) => <a key={l} href={h} target="_blank" rel="noreferrer" className="link-u">{l}</a>)}
      <button type="button" className="link-u" onClick={() => navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); })}>
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
