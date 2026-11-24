import "server-only";
import { promises as fs } from "fs";
import path from "path";

const LOCAL = path.join(process.cwd(), ".data", "uploads");
const onNetlify = () => !!(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT);

async function store() {
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: "media", consistency: "strong" });
}

/** Saves an uploaded file and returns its public URL (/api/media/<key>). */
export async function saveUpload(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const key = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  if (onNetlify()) {
    await (await store()).set(key, new Blob([buf]), { metadata: { type: file.type } });
  } else {
    await fs.mkdir(LOCAL, { recursive: true });
    await fs.writeFile(path.join(LOCAL, key), buf);
  }
  return `/api/media/${key}`;
}

export async function readUpload(key: string): Promise<{ body: ArrayBuffer; type: string } | null> {
  const safe = key.replace(/[^a-z0-9.\-]/gi, "");
  if (onNetlify()) {
    const r = await (await store()).getWithMetadata(safe, { type: "arrayBuffer" });
    if (!r) return null;
    return { body: r.data as ArrayBuffer, type: String(r.metadata?.type || "application/octet-stream") };
  }
  try {
    const b = await fs.readFile(path.join(LOCAL, safe));
    const type = ({ webp: "image/webp", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", svg: "image/svg+xml", mp4: "video/mp4", pdf: "application/pdf", mp3: "audio/mpeg", m4a: "audio/mp4" } as Record<string, string>)[safe.split(".").pop() || ""] || "application/octet-stream";
    return { body: b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer, type };
  } catch {
    return null;
  }
}
