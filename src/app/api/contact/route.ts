import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { intents } from "@/lib/seed";

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  if (b.company_website) return NextResponse.json({ ok: true }); // honeypot
  const name = String(b.name || "").trim().slice(0, 120);
  const email = String(b.email || "").trim().slice(0, 200);
  const message = String(b.message || "").trim().slice(0, 5000);
  const organisation = String(b.organisation || "").trim().slice(0, 200);
  const intent = intents.find((i) => i === b.intent) || "Brand Advisory";
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !message) {
    return NextResponse.json({ error: "Please add your name, a valid email and a message." }, { status: 400 });
  }

  let saved = false;
  if (db) {
    try {
      await db.insert(schema.inquiries).values({ intent, name, email, organisation, message });
      saved = true;
    } catch (e) {
      console.error("inquiry insert failed", e);
    }
  }

  let mailed = false;
  if (process.env.RESEND_API_KEY) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM || "Website <onboarding@resend.dev>",
        to: [process.env.INQUIRY_TO || "godwin-akpan@outlook.com"],
        reply_to: email,
        subject: `New ${intent} inquiry from ${name}`,
        text: `${intent}\n\nName: ${name}\nEmail: ${email}\nOrganisation: ${organisation || "-"}\n\n${message}`,
      }),
    }).catch(() => null);
    mailed = !!r?.ok;
  }

  if (!saved && !mailed) return NextResponse.json({ error: "We couldn't send that just now. Please email godwin-akpan@outlook.com." }, { status: 503 });
  return NextResponse.json({ ok: true });
}
