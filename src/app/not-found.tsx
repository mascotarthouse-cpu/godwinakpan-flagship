import PageHero from "@/components/PageHero";
import { AskPanel } from "@/components/Search";

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" words={["This", "page", "moved", "on."]} line="Ask for what you were looking for, and we'll point you to it." />
      <section className="wrap pb-28 sm:pb-40"><AskPanel autoFocus={false} /></section>
    </>
  );
}
