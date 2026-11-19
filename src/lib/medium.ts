import { XMLParser } from "fast-xml-parser";
import sanitizeHtml from "sanitize-html";
import { CATEGORIES, type Post } from "./seed";

const words = (html: string) => html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

function guessCategory(tags: string[]): string {
  const t = tags.join(" ").toLowerCase();
  if (/(m&e|monitor|evaluat|govern|policy|public)/.test(t)) return "M&E & Governance";
  if (/(lead|purpose|faith|life)/.test(t)) return "Leadership";
  if (/(strategy|disrupt|business|innovation)/.test(t)) return "Disruptive Strategy";
  return CATEGORIES[1];
}

/** Pulls a Medium profile feed and maps it to the site's post shape. */
export async function fetchMedium(handle: string): Promise<Post[]> {
  const clean = handle.replace(/^@/, "").trim();
  if (!clean) return [];
  const res = await fetch(`https://medium.com/feed/@${clean}`, {
    headers: { "User-Agent": "godwinakpan.ng feed reader" },
    next: { revalidate: 1800 },
  });
  if (!res.ok) throw new Error(`Medium returned ${res.status}`);
  const xml = await res.text();
  const data = new XMLParser({ ignoreAttributes: false }).parse(xml);
  let items = data?.rss?.channel?.item ?? [];
  if (!Array.isArray(items)) items = [items];

  return items.map((it: Record<string, unknown>): Post => {
    const raw = String(it["content:encoded"] ?? it.description ?? "");
    const body = sanitizeHtml(raw, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "figure", "figcaption", "h1", "h2"]),
      allowedAttributes: { a: ["href"], img: ["src", "alt"] },
    });
    const cover = /<img[^>]+src="([^"]+)"/.exec(raw)?.[1] ?? "";
    const cats = it.category ? (Array.isArray(it.category) ? it.category : [it.category]).map(String) : [];
    const link = String(it.link ?? "").split("?")[0];
    const slug = "medium-" + (link.split("/").pop() || String(it.guid ?? Math.random())).slice(0, 80);
    const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return {
      slug,
      title: String(it.title ?? "Untitled"),
      excerpt: text.slice(0, 160).replace(/\s\S*$/, "") + "…",
      body,
      cover,
      category: guessCategory(cats),
      tags: cats,
      source: "medium",
      canonicalUrl: link,
      status: "published",
      publishAt: new Date(String(it.pubDate ?? Date.now())).toISOString(),
      readMinutes: Math.max(1, Math.round(words(body) / 220)),
    };
  });
}
