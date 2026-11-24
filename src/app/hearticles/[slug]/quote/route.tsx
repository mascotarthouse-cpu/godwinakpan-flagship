import { ImageResponse } from "next/og";

/** A shareable quote card (1200 × 1200): the quote, the ::: mark and the address. Black, white and Disrupt Red only. */
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const q = (new URL(req.url).searchParams.get("q") || "").replace(/\s+/g, " ").trim().slice(0, 280);
  const size = q.length > 180 ? 52 : q.length > 100 ? 64 : 80;
  const dot = (x: number, y: number) => <div key={`${x}${y}`} style={{ position: "absolute", left: x, top: y, width: 16, height: 16, borderRadius: 8, background: "#D62828" }} />;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0A0A0C", color: "#FFFFFF", padding: 96, fontFamily: "sans-serif" }}>
        <div style={{ position: "relative", width: 80, height: 56, display: "flex" }}>{[0, 32, 64].flatMap((x) => [dot(x, 0), dot(x, 40)])}</div>
        <div style={{ fontSize: size, lineHeight: 1.12, letterSpacing: -1.5, fontWeight: 600, display: "flex" }}>“{q || "Purpose over pleasure."}”</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 34, fontWeight: 600 }}>Godwin Akpan</span>
          <span style={{ fontSize: 26, color: "rgba(255,255,255,0.55)" }}>Hearticles · godwinakpan.si</span>
        </div>
      </div>
    ),
    { width: 1200, height: 1200 },
  );
}
