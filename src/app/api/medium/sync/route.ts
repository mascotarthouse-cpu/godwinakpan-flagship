import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { syncMedium } from "@/lib/medium-sync";

// Called by the scheduled Netlify function (netlify/functions/medium-cron.mts).
export async function POST(req: Request) {
  if (!process.env.CRON_SECRET || req.headers.get("x-cron-secret") !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  try {
    const r = await syncMedium();
    revalidatePath("/insights");
    revalidatePath("/");
    return NextResponse.json(r);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
