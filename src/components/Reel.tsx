"use client";
import Image from "next/image";
import { useState } from "react";
import Colons from "./Colons";

function embed(url: string) {
  const yt = /(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/.exec(url)?.[1];
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&modestbranding=1`;
  const vm = /vimeo\.com\/(\d+)/.exec(url)?.[1];
  if (vm) return `https://player.vimeo.com/video/${vm}?autoplay=1&title=0&byline=0`;
  return "";
}

/** Cinematic reel. Poster with a single play control; loads the player only on click. */
export default function Reel({ url, poster, alt }: { url: string; poster: string; alt: string }) {
  const [playing, setPlaying] = useState(false);
  const src = embed(url);
  return (
    <section className="bg-obsidian px-2 pb-2 text-sky sm:px-4 sm:pb-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] sm:aspect-video">
        {playing && src ? (
          <iframe src={src} title="Keynote reel" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full" />
        ) : (
          <>
            {/* TODO: Replace poster with a keynote stage still, and add the reel link in /admin → Settings */}
            <Image src={poster} alt={alt} fill sizes="100vw" className="object-cover object-[center_20%] opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-12">
              <div>
                <Colons label="Keynote reel" className="mb-4 text-red" />
                <p className="display text-h2">On stage.</p>
                <p className="mt-2 text-sky/60">{src ? "2 minutes. Sound on." : "Reel coming soon."}</p>
              </div>
              <button
                onClick={() => src && setPlaying(true)}
                disabled={!src}
                className="group flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-sky text-eagle transition-all duration-500 ease-expo hover:scale-110 hover:bg-red hover:text-sky disabled:opacity-40 sm:h-32 sm:w-32"
                aria-label="Play keynote reel"
              >
                <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor" aria-hidden><path d="M0 0l22 13L0 26z" /></svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
