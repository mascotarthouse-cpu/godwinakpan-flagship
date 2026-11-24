import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { archive, rank } from "@/lib/archive";

/**
 * "Ask the archive": answers a visitor's question only from Godwin's published pages, with a link
 * to the page behind each sentence. It never speaks as Godwin and never answers beyond the archive.
 * Needs ANTHROPIC_API_KEY in Netlify. Without it, the visitor still gets the matching pages.
 */
const SYSTEM = `You answer questions about Barr. Godwin Akpan using ONLY the documents provided, which are pages from his website.
Rules:
- Use only facts in the documents. If they do not answer the question, reply exactly: NOT_IN_ARCHIVE
- Write in the third person about Godwin ("Godwin believes…"). Never write as Godwin, never use "I" as him, never invent quotes.
- Give no legal, financial, medical or personal advice. For a personal situation, suggest starting a conversation with Godwin.
- Two to four short sentences, plain language, no headings or lists.`;

type Cite = { title: string; href: string };

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const q = String(body?.q ?? "").trim().slice(0, 300);
  if (q.length < 3) return NextResponse.json({ error: "Ask a question of at least a few words." }, { status: 400 });

  const sources = rank(await archive(), q);
  const links: Cite[] = sources.map((s) => ({ title: s.title, href: s.href }));
  if (!sources.length) return NextResponse.json({ answer: "", sources: [], found: false });
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ answer: "", sources: links, found: true });

  const client = new Anthropic();
  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 2000,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: [
            ...sources.map((s) => ({
              type: "document" as const,
              source: { type: "text" as const, media_type: "text/plain" as const, data: s.text },
              title: s.title,
              citations: { enabled: true },
            })),
            { type: "text" as const, text: `Question from a website visitor: ${q}` },
          ],
        },
      ],
    });

    if (response.stop_reason === "refusal") return NextResponse.json({ answer: "", sources: links, found: true });

    // Keep only the text, and link each cited page once, in the order it is first used.
    let answer = "";
    const cited: Cite[] = [];
    for (const block of response.content) {
      if (block.type !== "text") continue;
      answer += block.text;
      for (const c of block.citations ?? []) {
        if (!("document_index" in c)) continue;
        const s = sources[c.document_index];
        if (s && !cited.some((x) => x.href === s.href)) cited.push({ title: s.title, href: s.href });
      }
    }
    answer = answer.trim();
    if (!answer || answer.includes("NOT_IN_ARCHIVE")) return NextResponse.json({ answer: "", sources: links, found: false });
    return NextResponse.json({ answer, sources: cited.length ? cited : links, found: true });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) console.error("ask: rate limited");
    else if (error instanceof Anthropic.APIError) console.error(`ask: API error ${error.status}`, error.message);
    else console.error("ask failed", error);
    // Fall back to the matching pages rather than a dead end.
    return NextResponse.json({ answer: "", sources: links, found: true });
  }
}
