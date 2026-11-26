"use client";
import { useMemo, useState } from "react";

const SLOTS = ["10:00", "12:00", "15:00", "17:00"];

/** Request a call: pick a weekday and time (Lagos time). Lands in /admin → Inquiries until a booking calendar is connected. */
export default function CallRequest() {
  const days = useMemo(() => {
    const out: Date[] = [];
    const d = new Date();
    while (out.length < 10) { d.setDate(d.getDate() + 1); if (d.getDay() % 6) out.push(new Date(d)); }
    return out;
  }, []);
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const label = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (day === null || !slot) return;
    setState("sending");
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const when = `${label(days[day])}, ${slot} (Lagos time)`;
    const res = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...f, intent: "Call request", message: `Call request: ${when}. ${f.topic || ""}` }) }).catch(() => null);
    setState(res?.ok ? "sent" : "error");
  }

  if (state === "sent") return <p className="display text-h3">Requested. We&apos;ll confirm by email.</p>;
  const chip = (on: boolean) => `btn shrink-0 border px-4 py-2 ${on ? "border-red bg-red text-sky" : "border-eagle/15 hover:border-eagle"}`;
  const field = "w-full border-b border-eagle/20 bg-transparent py-3 outline-none placeholder:text-ash/60 focus:border-red";
  return (
    <form onSubmit={submit}>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {days.map((d, i) => <button key={i} type="button" onClick={() => setDay(i)} aria-pressed={day === i} className={chip(day === i)}>{label(d)}</button>)}
      </div>
      {day !== null && (
        <div className="mt-3 flex flex-wrap gap-2">
          {SLOTS.map((s) => <button key={s} type="button" onClick={() => setSlot(s)} aria-pressed={slot === s} className={chip(slot === s)}>{s}</button>)}
        </div>
      )}
      {slot && (
        <div className="mt-4 grid gap-1">
          <input name="name" required placeholder="Your name" className={field} autoComplete="name" />
          <input name="email" type="email" required placeholder="Email" className={field} autoComplete="email" />
          <input name="topic" placeholder="What should we talk about?" className={field} />
          <input name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <button disabled={state === "sending"} className="btn-dark mt-6 w-fit">{state === "sending" ? "Sending…" : "Request this time"} <span aria-hidden>→</span></button>
          {state === "error" && <p className="text-sm text-red" role="alert">That didn&apos;t send. Please try again.</p>}
        </div>
      )}
    </form>
  );
}
