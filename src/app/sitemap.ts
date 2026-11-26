import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/content";
import { initiatives, products, site, thoughts } from "@/lib/seed";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Rooms first, then the side doors. /admin and /ask are never listed.
  const main = ["", "/story", "/work", "/impact", "/hearticles", "/speaking", "/contact"];
  const quiet = ["/shop", "/subscribe", "/press", "/privacy", "/terms"];
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  return [
    ...main.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p ? 0.8 : 1 })),
    ...quiet.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: 0.4 })),
    ...posts.filter((p) => p.source === "native").map((p) => ({ url: `${site.url}/hearticles/${p.slug}`, lastModified: p.publishAt, priority: 0.6 })),
    ...thoughts.map((t) => ({ url: `${site.url}/hearticles/deep-thoughts/${t.slug}`, priority: 0.4 })),
    ...initiatives.map((i) => ({ url: `${site.url}/impact/${i.slug}`, priority: 0.6 })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: 0.5 })),
    ...products.map((p) => ({ url: `${site.url}/shop/${p.slug}`, priority: 0.5 })),
  ];
}
