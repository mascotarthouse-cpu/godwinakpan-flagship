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
        <div className="mt-14 flex max-w-lg flex-col gap-5 rounded-[28px] bg-eagle p-8 text-sky">
          <p className="eyebrow text-sky/60">Prefer WhatsApp?</p>
          <p className="display text-h3">Get each new Hearticle on WhatsApp.</p>
          <a href={s.whatsappChannel || `${s.whatsapp}?text=${encodeURIComponent("Please add me to Hearticles updates.")}`} target="_blank" rel="noreferrer" className="btn-light w-fit">
            {s.whatsappChannel ? "Follow the WhatsApp Channel" : "Join on WhatsApp"} <span aria-hidden>→</span>
          </a>
        </div>
        <p className="mt-10 text-ash">Want to see what you&apos;d get? <Link href="/hearticles" className="link-u text-eagle">Read the latest Hearticles</Link>.</p>
      </section>
    </>
  );
}
