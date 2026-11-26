"use client";
import { useState } from "react";

/** Ifiok Beyond Design mentorship application. Lands in /admin → Inquiries. */
export default function MentorshipForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data, intent: "Mentorship application" }) }).catch(() => null);
    setState(res?.ok ? "sent" : "error");
  }
  const field = "w-full border-b border-eagle/20 bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-ash/60 focus:border-red";
  if (state === "sent") return <p className="display text-h3">Application received. We&apos;ll be in touch.</p>;
  return (
    <form onSubmit={submit}>
      <input name="name" required placeholder="Your name" className={field} autoComplete="name" />
      <input name="email" type="email" required placeholder="Email" className={field} autoComplete="email" />
      <input name="organisation" placeholder="What you create (design, film, music…)" className={field} />
      <textarea name="message" required rows={4} placeholder="Where you are now, and what you want to learn" className={`${field} resize-none`} />
      <input name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button disabled={state === "sending"} className="btn-dark mt-10">{state === "sending" ? "Sending…" : "Apply"} <span aria-hidden>→</span></button>
      {state === "error" && <p className="mt-4 text-sm text-red" role="alert">That didn&apos;t send. Please try again.</p>}
    </form>
  );
}
