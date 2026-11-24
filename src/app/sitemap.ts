import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/content";
import { initiatives, site } from "@/lib/seed";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Main doors first, then the quiet pages. /admin is never listed.
  const main = ["", "/hearticles", "/impact", "/work", "/about", "/stage", "/contact"];
  const quiet = ["/book", "/newsletter", "/legal"];
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  return [
    ...main.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p ? 0.8 : 1 })),
    ...quiet.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: 0.4 })),
    ...posts.filter((p) => p.source === "native").map((p) => ({ url: `${site.url}/hearticles/${p.slug}`, lastModified: p.publishAt, priority: 0.6 })),
    ...initiatives.map((i) => ({ url: `${site.url}/impact/${i.slug}`, priority: 0.6 })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: 0.5 })),
  ];
}
