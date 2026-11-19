import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content";
import { site } from "@/lib/seed";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/about", "/work", "/initiatives", "/speaking-media", "/insights", "/contact"];
  const posts = (await getPosts()).filter((p) => p.source === "native");
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p ? 0.8 : 1 })),
    ...posts.map((p) => ({ url: `${site.url}/insights/${p.slug}`, lastModified: p.publishAt, priority: 0.6 })),
  ];
}
