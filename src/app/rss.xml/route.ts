import { getPosts } from "@/lib/content";
import { site } from "@/lib/seed";

export const revalidate = 3600;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const posts = await getPosts();
  const items = posts
    .map((p) => {
      const link = p.canonicalUrl || `${site.url}/hearticles/${p.slug}`;
      return `<item><title>${esc(p.title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${new Date(p.publishAt).toUTCString()}</pubDate><description>${esc(p.excerpt)}</description><category>${esc(p.category)}</category></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Hearticles by Godwin Akpan</title><link>${site.url}/hearticles</link><description>${esc(site.description)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
