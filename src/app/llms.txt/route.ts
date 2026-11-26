import { getPosts } from "@/lib/content";
import { companies, initiatives, offers, site, topics } from "@/lib/seed";

export const revalidate = 3600;

/** A plain-text profile for AI assistants (llmstxt.org). */
export async function GET() {
  const posts = (await getPosts()).slice(0, 20);
  const u = site.url;
  const txt = `# ${site.title}

> ${site.description}

${site.descriptor}, based in ${site.location}. ${site.heroLine} Philosophy: ${site.philosophy}

## Main pages
- [Story](${u}/story): who Godwin is, credentials and education
- [Work](${u}/work): ${offers.map((o) => o.title).join("; ")}. Ventures: ${companies.map((c) => c.name).join(", ")}
- [Impact](${u}/impact): ${initiatives.map((i) => i.name).join(", ")}
- [Hearticles](${u}/hearticles): essays and Deep Thoughts
- [Speaking](${u}/speaking): keynotes on ${topics.map((t) => t.title).join("; ")}
- [Let's talk](${u}/contact)

## Hearticles
${posts.map((p) => `- [${p.title}](${p.canonicalUrl || `${u}/hearticles/${p.slug}`}): ${p.excerpt}`).join("\n")}
`;
  return new Response(txt, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
