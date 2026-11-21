import { NextResponse } from "next/server";
import { getPosts, getProjects } from "@/lib/content";
import { book, companies, initiatives, practices, topics } from "@/lib/seed";

export const revalidate = 600;

/** The index behind the ⌘K search: only published pages and content. */
export async function GET() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  const pages: [string, string, string][] = [
    ["Ideas", "/ideas", "Hearticles essays insights Medium writing"],
    ["Impact", "/impact", "Purpose over pleasure initiatives community"],
    ["Work", "/work", "Brand strategy M&E monitoring evaluation case studies"],
    ["About", "/about", "Story credentials education ventures Mascot Arthouse"],
    ["Speaking", "/speaking", "Keynotes talks events booking"],
    ["Contact", "/contact", "Start a conversation advisory speaking press"],
    ["The book", "/book", "Book chapter read buy"],
    ["Press", "/press", "Press kit portraits media interviews"],
    ["Newsletter", "/newsletter", "Subscribe email"],
  ];
  const items = [
    ...pages.map(([title, href, text]) => ({ type: "Page", title, href, text })),
    ...posts.map((p) => ({ type: "Hearticle", title: p.title, href: `/ideas/${p.slug}`, text: `${p.excerpt} ${p.category} ${p.tags.join(" ")}` })),
    ...initiatives.map((i) => ({ type: "Impact", title: i.name, href: `/impact/${i.slug}`, text: `${i.short} ${i.line}` })),
    ...practices.map((p) => ({ type: "Practice", title: p.title, href: `/work?d=${encodeURIComponent(p.key)}`, text: `${p.line} ${p.includes.join(" ")}` })),
    ...projects.map((p) => ({ type: "Work", title: p.title, href: `/work/${p.slug}`, text: `${p.client} ${p.summary}` })),
    ...topics.map((t) => ({ type: "Talk", title: t.title, href: "/speaking", text: t.line })),
    ...companies.map((c) => ({ type: "Venture", title: c.name, href: "/about#ventures", text: c.line })),
    { type: "Book", title: book.title, href: "/book", text: book.promise },
  ];
  return NextResponse.json(items);
}
