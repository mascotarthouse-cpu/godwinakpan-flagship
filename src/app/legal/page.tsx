import type { Metadata } from "next";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import PageHero from "@/components/PageHero";
import { legal } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Legal",
  description: "Privacy and terms of use for godwinakpan.si.",
  alternates: { canonical: "/legal" },
};

export default async function Legal() {
  const [privacy, terms] = await Promise.all([marked.parse(legal.privacy), marked.parse(legal.terms)]);
  return (
    <>
      <PageHero eyebrow="Legal" words={["Privacy", "&", "terms."]} />
      <section className="wrap max-w-3xl pb-28 sm:pb-40">
        <div className="prose-g">
          <h2 id="privacy">Privacy</h2>
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(privacy) }} />
          <h2 id="terms">Terms of use</h2>
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(terms) }} />
        </div>
      </section>
    </>
  );
}
