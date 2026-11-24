import { NextResponse } from "next/server";
import { getPosts, getProjects } from "@/lib/content";
import { book, companies, initiatives, practices, topics } from "@/lib/seed";

export const revalidate = 600;

/** The index behind the ⌘K search: only published pages and content. */
export async function GET() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  const pages: [string, string, string][] = [
    ["Hearticles", "/hearticles", "Essays sparks insights Medium writing ideas"],
    ["The Legacy", "/impact", "Impact purpose over pleasure initiatives community events mentorship"],
    ["The Craft", "/work", "Brand strategy M&E monitoring evaluation case studies"],
    ["The Man", "/about", "About story credentials education ventures Mascot Arthouse Ecohaven CV"],
    ["The Stage", "/stage", "Speaking keynotes talks booking press kit coverage"],
    ["Disrupt", "/contact", "Contact start a conversation advisory speaking press email"],
    ["The book", "/book", "Book chapter read buy"],
    ["Press", "/stage#press", "Press kit portraits media interviews"],
    ["Newsletter", "/newsletter", "Subscribe email"],
  ];
  const items = [
    ...pages.map(([title, href, text]) => ({ type: "Page", title, href, text })),
    ...posts.map((p) => ({ type: "Hearticle", title: p.title, href: `/hearticles/${p.slug}`, text: `${p.excerpt} ${p.category} ${p.tags.join(" ")}` })),
    ...initiatives.map((i) => ({ type: "Impact", title: i.name, href: `/impact/${i.slug}`, text: `${i.short} ${i.line}` })),
    ...practices.map((p) => ({ type: "Practice", title: p.title, href: `/work?d=${encodeURIComponent(p.key)}`, text: `${p.line} ${p.includes.join(" ")}` })),
    ...projects.map((p) => ({ type: "Work", title: p.title, href: `/work/${p.slug}`, text: `${p.client} ${p.summary}` })),
    ...topics.map((t) => ({ type: "Talk", title: t.title, href: "/stage", text: t.line })),
    ...companies.map((c) => ({ type: "Venture", title: c.name, href: "/about#ventures", text: c.line })),
    { type: "Book", title: book.title, href: "/book", text: book.promise },
  ];
  return NextResponse.json(items);
}
