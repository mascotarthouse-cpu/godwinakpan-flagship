import { NextResponse } from "next/server";
import { getPosts, getProjects } from "@/lib/content";
import { companies, initiatives, offers, products, thoughts, topics } from "@/lib/seed";

export const revalidate = 600;

/** The index behind Ask: only published pages and content. */
export async function GET() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  const pages: [string, string, string][] = [
    ["Story", "/story", "About Godwin Akpan Hi-Story biography credentials education"],
    ["Work", "/work", "Make hire brand strategy offers case studies ventures Mascot Arthouse"],
    ["Impact", "/impact", "Ripple initiatives community cause partner"],
    ["Hearticles", "/hearticles", "Articles essays writing Deep Thoughts Medium"],
    ["Speaking", "/speaking", "Keynotes talks masterclasses workshops events booking"],
    ["Let's talk", "/contact", "Contact hire email WhatsApp"],
    ["Mentorship", "/impact/ibd#apply", "Ifiok Beyond Design apply mentoring creatives"],
    ["Shop", "/shop", "Books Brand Bible courses tools"],
    ["Press", "/press", "Press kit portraits media interviews"],
    ["Subscribe", "/subscribe", "Newsletter email WhatsApp Channel"],
  ];
  const items = [
    ...pages.map(([title, href, text]) => ({ type: "Page", title, href, text })),
    ...posts.map((p) => ({ type: "Hearticle", title: p.title, href: `/hearticles/${p.slug}`, text: `${p.excerpt} ${p.category} ${p.tags.join(" ")}` })),
    ...thoughts.map((t) => ({ type: "Deep Thought", title: t.text, href: `/hearticles/deep-thoughts/${t.slug}`, text: "" })),
    ...initiatives.map((i) => ({ type: "Impact", title: i.name, href: `/impact/${i.slug}`, text: `${i.short} ${i.line}` })),
    ...offers.map((o) => ({ type: "Offer", title: o.title, href: `/work#${o.slug}`, text: `${o.who} ${o.gets.join(" ")}` })),
    ...projects.map((p) => ({ type: "Case study", title: p.title, href: `/work/${p.slug}`, text: `${p.client} ${p.summary}` })),
    ...topics.map((t) => ({ type: "Talk", title: t.title, href: "/speaking", text: t.line })),
    ...companies.map((c) => ({ type: "Venture", title: c.name, href: "/work#ventures", text: c.line })),
    ...products.map((p) => ({ type: "Shop", title: p.title, href: `/shop/${p.slug}`, text: p.promise })),
  ];
  return NextResponse.json(items);
}
