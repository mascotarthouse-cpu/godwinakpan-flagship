import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SignupForm from "@/components/SignupForm";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Get every new Hearticle from Barr. Godwin Akpan by email or on WhatsApp.",
  alternates: { canonical: "/subscribe" },
};
export const revalidate = 300;

export default async function Subscribe() {
  const s = await getSettings();
  return (
    <>
      <PageHero eyebrow="Subscribe" words={["Get", "the", "next", "one", "first."]} line="New Hearticles and Deep Thoughts, by email. Two minutes to read. No noise." />
      <section className="wrap pb-28 sm:pb-40">
        <SignupForm intent="Newsletter" />
        {s.whatsappChannel && (
          <p className="mt-8 text-lg">Prefer WhatsApp? <a href={s.whatsappChannel} target="_blank" rel="noreferrer" className="link-u font-semibold">Follow the WhatsApp Channel</a></p>
        )}
        <p className="mt-10 text-ash">Want to see what you&apos;d get? <Link href="/hearticles" className="link-u text-eagle">Read the latest Hearticles</Link>.</p>
      </section>
    </>
  );
}
