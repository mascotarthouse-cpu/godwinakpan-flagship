import { NextResponse } from "next/server";
import { addHeart, heartCount, visitorId } from "@/lib/engage";

const valid = (s: unknown): s is string => typeof s === "string" && /^[a-z0-9-]{1,120}$/.test(s);
const ipOf = (req: Request) => req.headers.get("x-nf-client-connection-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";

export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get("slug");
  if (!valid(slug)) return NextResponse.json({ error: "Unknown Hearticle." }, { status: 400 });
  return NextResponse.json({ count: await heartCount(slug) }, { headers: { "cache-control": "no-store" } });
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!valid(b?.slug)) return NextResponse.json({ error: "Unknown Hearticle." }, { status: 400 });
  try {
    const count = await addHeart(b.slug, visitorId(ipOf(req), req.headers.get("user-agent") || "", b.slug));
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "Couldn't save that just now." }, { status: 503 });
  }
}
