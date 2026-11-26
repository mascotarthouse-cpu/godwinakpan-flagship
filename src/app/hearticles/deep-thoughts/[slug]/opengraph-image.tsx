import { ImageResponse } from "next/og";
import { thoughts } from "@/lib/seed";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "A Deep Thought from Godwin Akpan";

export function generateStaticParams() {
  return thoughts.map((t) => ({ slug: t.slug }));
}

/** Each Deep Thought gets its own share image: black, white and Disrupt Red. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = thoughts.find((x) => x.slug === slug);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#000", color: "#fff", padding: 80 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ width: 14, height: 14, borderRadius: 7, background: "#D62828" }} />)}
        </div>
        <div style={{ fontSize: (t?.text.length ?? 0) > 60 ? 64 : 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{t?.text ?? "Hearticles"}</div>
        <div style={{ fontSize: 28, color: "#8B9DB3" }}>Godwin Akpan · Hearticles</div>
      </div>
    ),
    size,
  );
}
