import { NextResponse } from "next/server";
import { buildIndex } from "@/lib/search-index";

export const revalidate = 600;

export async function GET() {
  return NextResponse.json(await buildIndex());
}
