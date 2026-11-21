import type { Metadata } from "next";
import BookBlock from "@/components/BookBlock";
import InsightsList from "@/components/InsightsList";
import NewsletterBlock from "@/components/NewsletterBlock";
import PageHero from "@/components/PageHero";
import Reel from "@/components/Reel";
import { getMedia, getPosts, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ideas",
  description: "Hearticles and talks by Barr. Godwin Akpan on disruptive strategy, brand architecture, leadership, and M&E and governance.",
  alternates: { canonical: "/ideas" },
};
export const revalidate = 600;

export default async function Ideas() {
  const [posts, s, m] = await Promise.all([getPosts(), getSettings(), getMedia()]);
  return (
    <>
      <PageHero eyebrow="Head · Hearticles & talks" words={["Ideas."]} line="Hearticles: short essays, sharp ideas. Written here first, and on Medium." />
      <InsightsList posts={posts} />
      <Reel url={s.reelUrl} poster={m.reel.url} alt={m.reel.alt} />
      <BookBlock />
      <NewsletterBlock />
    </>
  );
}
