"use client";
import { useState } from "react";

export default function OrderForm({ product }: { product: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const d = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...d, intent: "Order", message: `Order: ${product}. Phone: ${d.phone || "-"}` }) }).catch(() => null);
    setState(res?.ok ? "sent" : "error");
  }
  const field = "w-full border-b border-eagle/20 bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-ash/60 focus:border-red";
  if (state === "sent") return <p className="display mt-10 text-h3">Order received. Your payment link is on its way.</p>;
  return (
    <form onSubmit={submit} className="mt-8">
      <input name="name" required placeholder="Full name" className={field} autoComplete="name" />
      <input name="email" type="email" required placeholder="Email" className={field} autoComplete="email" />
      <input name="phone" placeholder="Phone or WhatsApp (optional)" className={field} autoComplete="tel" />
      <input name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button disabled={state === "sending"} className="btn-dark mt-10">{state === "sending" ? "Placing…" : "Place order"} <span aria-hidden>→</span></button>
      {state === "error" && <p className="mt-4 text-sm text-red" role="alert">That didn&apos;t go through. Please try again.</p>}
    </form>
  );
}
