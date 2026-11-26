import type { Metadata } from "next";
import DeepThoughts from "@/components/DeepThoughts";
import InsightsList from "@/components/InsightsList";
import NewsletterBlock from "@/components/NewsletterBlock";
import NextChapter from "@/components/NextChapter";
import PageHero from "@/components/PageHero";
import { getPosts, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Hearticles by Godwin Akpan" },
  description: "Hearticles: short essays by Barr. Godwin Akpan on disruptive branding, technology, how things work, and deep thoughts.",
  alternates: { canonical: "/hearticles" },
};
export const revalidate = 600;

export default async function Hearticles() {
  const [posts, s] = await Promise.all([getPosts(), getSettings()]);
  const ld = { "@context": "https://schema.org", "@type": "Blog", name: "Hearticles", url: `${s.url}/hearticles`, author: { "@type": "Person", name: "Godwin Akpan", url: s.url } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero eyebrow="Hearticles" words={["Hearticles."]} line="Articles with a heart. Short essays, sharp ideas. Written here first, then on Medium." />
      <InsightsList posts={posts.filter((p) => p.category !== "Deep Thoughts")} />
      <DeepThoughts />
      <NewsletterBlock />
      <NextChapter from="/hearticles" />
    </>
  );
}
