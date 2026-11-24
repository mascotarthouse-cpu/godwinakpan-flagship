import "server-only";
import { getPosts, getProjects } from "@/lib/content";
import { book, companies, entryOffer, initiatives, pillars, practices, roles, site, timeline, topics } from "@/lib/seed";

/** One published page of the archive: what "Ask the archive" is allowed to answer from. */
export type Source = { title: string; href: string; text: string };

const plain = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/[#>*_`\[\]()]/g, " ").replace(/\s+/g, " ").trim();

/** Everything Godwin has published on the site, as plain-text sources with their page addresses. */
export async function archive(): Promise<Source[]> {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  return [
    {
      title: "The Man: About Godwin Akpan",
      href: "/about",
      text: `${site.description} ${site.descriptor}, based in ${site.location}. Philosophy: ${site.philosophy} Roles: ${roles.join("; ")}. Timeline: ${timeline.map((t) => `${t.when}: ${t.title} (${t.detail})`).join("; ")}. Ventures: ${companies.map((c) => `${c.name} (${c.line})`).join("; ")}. Head · Heart · Hand: ${pillars.map((p) => `${p.word}: ${p.line} ${p.sub}`).join(" ")}`,
    },
    {
      title: "The Craft: Work",
      href: "/work",
      text: `${practices.map((p) => `${p.title}: ${p.line} Includes ${p.includes.join(", ")}.`).join(" ")} ${entryOffer.title} ${entryOffer.line} To hire Godwin or Mascot Arthouse, start a conversation on the contact page.`,
    },
    ...projects.map((p) => ({ title: `Case study: ${p.title}`, href: `/work/${p.slug}`, text: `${p.title} for ${p.client} (${p.discipline}). ${p.summary} ${p.result}` })),
    { title: "The Stage: Speaking", href: "/stage", text: `Keynote topics: ${topics.map((t) => `${t.title}: ${t.line}`).join("; ")}. To invite Godwin to speak, use the contact page and choose Speaking Invitation.` },
    ...initiatives.map((i) => ({ title: `The Legacy: ${i.name}`, href: `/impact/${i.slug}`, text: `${i.name} (${i.since}). ${i.line} ${i.about || ""}`.trim() })),
    { title: `The book: ${book.title}`, href: "/book", text: `${book.promise} ${plain(book.about)}` },
    ...posts.map((p) => ({ title: `Hearticle: ${p.title}`, href: p.canonicalUrl || `/hearticles/${p.slug}`, text: `${p.excerpt} ${plain(p.body)}`.slice(0, 12000) })),
  ];
}

const STOP = new Set("a an and are as at be but by can do does for from has have how i in is it me my of on or so that the their there this to was what when where which who why will with you your about godwin akpan".split(" "));
const words = (s: string) => s.toLowerCase().split(/[^a-z0-9&]+/).filter((w) => w.length > 2 && !STOP.has(w));

/** The few sources that best match a question (title matches count most). Empty when nothing matches. */
export function rank(sources: Source[], q: string, limit = 5): Source[] {
  const terms = words(q);
  if (!terms.length) return [];
  return sources
    .map((s) => {
      const t = s.title.toLowerCase(), body = s.text.toLowerCase();
      const score = terms.reduce((n, w) => n + (t.includes(w) ? 4 : 0) + (body.includes(w) ? 1 + Math.min(3, body.split(w).length - 2) : 0), 0);
      return { s, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.s);
}
