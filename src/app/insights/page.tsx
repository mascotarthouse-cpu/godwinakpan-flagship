import type { Metadata } from "next";
import InsightsList from "@/components/InsightsList";
import PageHero from "@/components/PageHero";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description: "Essays on disruptive strategy, brand architecture, leadership, and M&E and governance.",
  alternates: { canonical: "/insights" },
};
export const revalidate = 600;

export default async function Insights() {
  const posts = await getPosts();
  return (
    <>
      <PageHero eyebrow="Journal & essays" words={["Insights."]} line="Short essays. Sharp ideas. Written here and on Medium." />
      <InsightsList posts={posts} />
    </>
  );
}
