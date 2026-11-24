import { getPosts } from "@/lib/content";
import { companies, initiatives, practices, site, topics } from "@/lib/seed";

export const revalidate = 3600;

/** A plain-text profile for AI assistants (llmstxt.org). */
export async function GET() {
  const posts = (await getPosts()).slice(0, 20);
  const u = site.url;
  const txt = `# ${site.title}

> ${site.description}

${site.descriptor}, based in ${site.location}. Philosophy: ${site.philosophy} Brand motif: ::: Head · Heart · Hand.

## Main pages
- [Hearticles](${u}/hearticles): essays (long-form) and Sparks (short thoughts)
- [The Legacy](${u}/impact): ${initiatives.map((i) => i.name).join(", ")}
- [The Craft](${u}/work): ${practices.map((p) => p.title).join(" and ")}
- [The Man](${u}/about): story, credentials and ventures (${companies.map((c) => c.name).join(", ")})
- [The Stage](${u}/stage): keynotes, press kit and coverage. Talks: ${topics.map((t) => t.title).join("; ")}
- [Contact](${u}/contact)

## Hearticles
${posts.map((p) => `- [${p.title}](${p.canonicalUrl || `${u}/hearticles/${p.slug}`}): ${p.excerpt}`).join("\n")}
`;
  return new Response(txt, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
