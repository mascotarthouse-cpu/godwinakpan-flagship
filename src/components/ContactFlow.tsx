"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { intents } from "@/lib/seed";

/** Step 1: pick intent. Step 2: details. Step 3: sent. */
export default function ContactFlow({ initialIntent, about }: { initialIntent?: string; about?: string }) {
  const valid = intents.find((i) => i === initialIntent);
  const [intent, setIntent] = useState<string | undefined>(valid);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data, intent }) });
    if (res.ok) setState("sent");
    else { setErr((await res.json().catch(() => ({}))).error || "Something went wrong. Please email instead."); setState("error"); }
  }

  const field = "w-full border-b border-eagle/20 bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-ash/60 focus:border-red";
  return (
    <div className="mt-12">
      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="display text-h2">Received.</p>
            <p className="mt-4 text-xl text-ash">Thank you. Expect a reply within two working days.</p>
          </motion.div>
        ) : (
          <motion.div key="form" exit={{ opacity: 0 }}>
            <p className="eyebrow mb-5 text-ash">01 · What brings you here?</p>
            <div className="flex flex-wrap gap-2">
              {intents.map((i) => (
                <button key={i} type="button" onClick={() => setIntent(i)} aria-pressed={intent === i} className={`btn border ${intent === i ? "border-red bg-red text-sky" : "border-eagle/15 hover:border-eagle"}`}>{i}</button>
              ))}
            </div>
            <AnimatePresence>
              {intent && (
                <motion.form onSubmit={submit} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
                  <p className="eyebrow mb-2 mt-12 text-ash">02 · Tell us more</p>
                  <input name="name" required placeholder="Your name" className={field} autoComplete="name" />
                  <input name="email" type="email" required placeholder="Email" className={field} autoComplete="email" />
                  <input name="organisation" placeholder="Organisation (optional)" className={field} autoComplete="organization" />
                  <textarea name="message" required rows={4} defaultValue={about ? `About ${about}: ` : ""} placeholder={intent === "Speaking Invitation" ? "Event, date, audience" : intent === "Mentorship" ? "Where are you now, and where do you want to be in a year?" : "What are you working on?"} className={`${field} resize-none`} />
                  <input name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                  <button disabled={state === "sending"} className="btn-dark mt-10">{state === "sending" ? "Sending…" : "Send"} <span aria-hidden>→</span></button>
                  {state === "error" && <p className="mt-4 text-sm text-red" role="alert">{err}</p>}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
