import type { Metadata } from "next";
import BookBlock from "@/components/BookBlock";
import InsightsList from "@/components/InsightsList";
import NewsletterBlock from "@/components/NewsletterBlock";
import PageHero from "@/components/PageHero";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hearticles: Essays",
  description: "Essays and short thoughts by Barr. Godwin Akpan on disruptive strategy, brand architecture, leadership, and M&E and governance.",
  alternates: { canonical: "/hearticles" },
};
export const revalidate = 600;

export default async function Hearticles() {
  const posts = await getPosts();
  return (
    <>
      <PageHero eyebrow="03 · Hearticles · Essays" words={["Hearticles."]} line="Written from the heart. Long-form essays and Sparks, here first and on Medium." />
      <InsightsList posts={posts} />
      <BookBlock />
      <NewsletterBlock />
    </>
  );
}
