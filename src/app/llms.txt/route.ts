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
- [Ideas](${u}/ideas): Hearticles (essays) and talks
- [Impact](${u}/impact): ${initiatives.map((i) => i.name).join(", ")}
- [Work](${u}/work): ${practices.map((p) => p.title).join(" and ")}
- [About](${u}/about): story, credentials and ventures (${companies.map((c) => c.name).join(", ")})
- [Speaking](${u}/speaking): keynotes on ${topics.map((t) => t.title).join("; ")}
- [Contact](${u}/contact)

## Hearticles
${posts.map((p) => `- [${p.title}](${p.canonicalUrl || `${u}/ideas/${p.slug}`}): ${p.excerpt}`).join("\n")}
`;
  return new Response(txt, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
