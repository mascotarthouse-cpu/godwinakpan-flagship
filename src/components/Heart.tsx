"use client";
import { useEffect, useState } from "react";

/** A heart readers can give without signing up. Remembered in their own browser only; no public count. */
export default function Heart({ id }: { id: string }) {
  const key = `heart:${id}`;
  const [on, setOn] = useState(false);
  useEffect(() => { try { setOn(localStorage.getItem(key) === "1"); } catch {} }, [key]);
  const toggle = () => { const v = !on; setOn(v); try { localStorage.setItem(key, v ? "1" : "0"); } catch {} };
  return (
    <button type="button" onClick={toggle} aria-pressed={on} className={`btn border ${on ? "border-red bg-red text-sky" : "border-eagle/15 hover:border-eagle"}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden><path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3.4 5 7 5c2 0 3.3 1.1 5 3 1.7-1.9 3-3 5-3 3.6 0 5.8 3.6 4.5 6.8C19.5 16.4 12 21 12 21z" /></svg>
      {on ? "Hearted" : "Heart"}
    </button>
  );
}
