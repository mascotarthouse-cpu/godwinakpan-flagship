import { readUpload } from "@/lib/storage";

export async function GET(_: Request, { params }: { params: Promise<{ key: string }> }) {
  const f = await readUpload((await params).key);
  if (!f) return new Response("Not found", { status: 404 });
  return new Response(f.body, { headers: { "content-type": f.type, "cache-control": "public, max-age=31536000, immutable" } });
}
