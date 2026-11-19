import Colons from "./Colons";
import Kinetic from "./Kinetic";
import Reveal from "./Reveal";

export default function PageHero({ eyebrow, words, line }: { eyebrow: string; words: string[]; line?: string }) {
  return (
    <section className="wrap pb-16 pt-36 sm:pb-24 sm:pt-48">
      <Colons label={eyebrow} className="mb-8 text-red" />
      <Kinetic words={words} className="display max-w-5xl text-hero" />
      {line && (
        <Reveal delay={0.4}>
          <p className="mt-8 max-w-xl text-xl text-ash">{line}</p>
        </Reveal>
      )}
    </section>
  );
}
