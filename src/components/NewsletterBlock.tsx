import Colons from "./Colons";
import Reveal from "./Reveal";
import SignupForm from "./SignupForm";

export default function NewsletterBlock({ title = "Random Deep Thoughts." }: { title?: string }) {
  return (
    <section className="bg-obsidian text-sky">
      <div className="wrap grid gap-10 py-24 sm:py-36 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-6">
          <Colons label="Newsletter" className="mb-6 text-red" />
          <h2 className="display text-h2">{title}</h2>
          <p className="mt-4 max-w-md text-xl text-sky/60">One idea a week. Two minutes to read.</p>
        </Reveal>
        <div className="lg:col-span-6"><SignupForm intent="Newsletter" dark /></div>
      </div>
    </section>
  );
}
