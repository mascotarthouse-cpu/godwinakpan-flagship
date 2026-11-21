"use client";
import { useState } from "react";

/** Email-only sign-up. Saved through /api/contact, so it appears in /admin → Inquiries. */
export default function SignupForm({ intent, cta = "Subscribe", dark = false }: { intent: "Newsletter" | "Book chapter"; cta?: string; dark?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || "");
    setState("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ intent, email, name: email.split("@")[0] || "Subscriber", message: intent === "Newsletter" ? "Subscribe me to Random Deep Thoughts." : "Send me the first chapter.", company_website: f.get("company_website") }),
    }).catch(() => null);
    setState(res?.ok ? "sent" : "error");
  }

  if (state === "sent") return <p className="display text-h3">{intent === "Newsletter" ? "You're in." : "On its way."}</p>;
  return (
    <form onSubmit={submit} className="flex w-full max-w-lg flex-col gap-3 sm:flex-row">
      <label htmlFor={`su-${intent}`} className="sr-only">Email</label>
      <input id={`su-${intent}`} name="email" type="email" required placeholder="Email address" autoComplete="email"
        className={`min-w-0 flex-1 border-b bg-transparent py-4 text-lg outline-none transition-colors focus:border-red ${dark ? "border-sky/30 placeholder:text-sky/40" : "border-eagle/20 placeholder:text-ash/60"}`} />
      <input name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button disabled={state === "sending"} className={`${dark ? "btn-light" : "btn-dark"} shrink-0`}>{state === "sending" ? "Sending…" : cta} <span aria-hidden>→</span></button>
      {state === "error" && <p className="text-sm text-red sm:basis-full" role="alert">That didn&apos;t send. Please try again.</p>}
    </form>
  );
}
