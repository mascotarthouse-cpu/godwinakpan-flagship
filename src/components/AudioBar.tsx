"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SPEEDS = [1, 1.25, 1.5, 2];
const fmt = (s: number) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

/** Listen to this Hearticle. Appears after the first scroll; nothing loads until play is pressed. */
export default function AudioBar({ src, title }: { src: string; title: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [shown, setShown] = useState(false);
  const [closed, setClosed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const on = () => scrollY > 200 && setShown(true);
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  function toggle() {
    const a = audio.current!;
    if (a.paused) { a.play().catch(() => {}); } else a.pause();
  }
  function cycleSpeed() {
    const n = (speed + 1) % SPEEDS.length;
    setSpeed(n);
    if (audio.current) audio.current.playbackRate = SPEEDS[n];
  }

  return (
    <>
      <audio ref={audio} src={src} preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDur(e.currentTarget.duration)} />
      <AnimatePresence>
        {shown && !closed && (
          <motion.div
            className="fixed inset-x-2 bottom-2 z-40 mx-auto flex max-w-2xl items-center gap-4 rounded-full bg-eagle py-2 pl-2 pr-4 text-sky shadow-2xl sm:bottom-4"
            initial={{ y: 120 }} animate={{ y: 0 }} exit={{ y: 120 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            role="region" aria-label="Listen to this Hearticle"
          >
            <button onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red">
              {playing ? <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden><rect x="2" y="1" width="3.5" height="12" /><rect x="8.5" y="1" width="3.5" height="12" /></svg>
                : <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden><path d="M0 0l14 8-14 8z" /></svg>}
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Listen: {title}</p>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-sky/15"><div className="h-full bg-red transition-[width]" style={{ width: dur ? `${(t / dur) * 100}%` : "0%" }} /></div>
            </div>
            <span className="hidden text-xs tabular-nums text-sky/60 sm:block">{fmt(t)} / {fmt(dur)}</span>
            <button onClick={cycleSpeed} className="rounded-full px-2 py-1 text-xs font-semibold tabular-nums hover:bg-sky/10" aria-label="Playback speed">{SPEEDS[speed]}×</button>
            <button onClick={() => { audio.current?.pause(); setClosed(true); }} aria-label="Close player" className="text-sky/60 hover:text-sky">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
