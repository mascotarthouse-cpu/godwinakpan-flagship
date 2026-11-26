import "server-only";
import { getPosts, getProjects } from "./content";
import { companies, episodes, initiatives, offers, products, releases, thoughts, topics } from "./seed";

export type IndexItem = { type: string; title: string; text: string; href: string };

/** Everything Ask searches: only published pages and content. */
export async function buildIndex(): Promise<IndexItem[]> {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  const pages: [string, string, string][] = [
    ["Story", "/story", "About Godwin Akpan Hi-Story biography credentials education Calabar Mascot Arthouse 2004"],
    ["Work", "/work", "Make hire brand strategy offers case studies ventures Mascot Arthouse"],
    ["Impact", "/impact", "Ripple initiatives community cause partner"],
    ["Hearticles", "/hearticles", "Articles essays writing Deep Thoughts Medium"],
    ["Speaking", "/speaking", "Keynotes talks masterclasses workshops events booking"],
    ["Let's talk", "/contact", "Contact hire email WhatsApp book a call"],
    ["Mentorship", "/impact/ibd#apply", "Ifiok Beyond Design apply mentoring creatives free"],
    ["Podcast", "/podcast", "Listen episodes audio"],
    ["Shop", "/shop", "Books Brand Bible courses tools buy"],
    ["Press", "/press", "Press kit portraits media interviews releases"],
    ["Subscribe", "/subscribe", "Newsletter email WhatsApp Channel"],
  ];
  return [
    ...pages.map(([title, href, text]) => ({ type: "Page", title, href, text })),
    ...posts.map((p) => ({ type: "Hearticle", title: p.title, href: `/hearticles/${p.slug}`, text: `${p.excerpt} ${p.category} ${p.tags.join(" ")}` })),
    ...thoughts.map((t) => ({ type: "Deep Thought", title: t.text, href: `/hearticles/deep-thoughts/${t.slug}`, text: "" })),
    ...initiatives.map((i) => ({ type: "Impact", title: i.name, href: `/impact/${i.slug}`, text: `${i.short} ${i.since} ${i.line}` })),
    ...offers.map((o) => ({ type: "Offer", title: o.title, href: `/work#${o.slug}`, text: `${o.who} ${o.gets.join(". ")}. ${o.start}.` })),
    ...projects.map((p) => ({ type: "Case study", title: p.title, href: `/work/${p.slug}`, text: `${p.client}. ${p.summary} ${p.result}` })),
    ...topics.map((t) => ({ type: "Talk", title: t.title, href: "/speaking", text: t.line })),
    ...companies.map((c) => ({ type: "Venture", title: c.name, href: "/work#ventures", text: c.line })),
    ...episodes.map((e) => ({ type: "Episode", title: e.title, href: `/podcast/${e.slug}`, text: e.summary })),
    ...products.map((p) => ({ type: "Shop", title: p.title, href: `/shop/${p.slug}`, text: `${p.promise} ${p.price}` })),
    ...releases.map((r) => ({ type: "Press", title: r.title, href: `/press/${r.slug}`, text: "" })),
  ];
}

export function rank(items: IndexItem[], q: string, n = 10) {
  const terms = q.toLowerCase().split(/[^\p{L}\p{N}&]+/u).filter((w) => w.length > 2);
  return items
    .map((i) => {
      const t = i.title.toLowerCase(), hay = `${t} ${i.text.toLowerCase()} ${i.type.toLowerCase()}`;
      let score = 0;
      for (const w of terms) { if (t.includes(w)) score += 3; else if (hay.includes(w)) score += 1; }
      return { ...i, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}
