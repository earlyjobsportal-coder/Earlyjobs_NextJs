import type { MetadataRoute } from "next";
import { headers } from "next/headers";

function hostname(headerList: Headers) {
  const raw = (headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "").split(",")[0].trim();
  return raw.replace(/:\d+$/, "").toLowerCase();
}

/** Shared public crawl policy: indexable pages open, app/API routes closed. */
const publicDisallow = ["/api/"];

type RobotsRule = {
  userAgent: string | string[];
  allow?: string | string[];
  disallow?: string | string[];
};

function rule(userAgent: string | string[]): RobotsRule {
  return {
    userAgent,
    allow: "/",
    disallow: publicDisallow,
  };
}

/**
 * Production robots.txt arranged for:
 * - SEO: Google / Bing / Apple classic crawlers
 * - AEO / GEO: AI *search & citation* bots (retrieval) explicitly allowed
 * - AI training bots explicitly allowed (brand + job content discoverability in models)
 *
 * Training vs retrieval are separate tokens (e.g. GPTBot ≠ OAI-SearchBot;
 * Google-Extended ≠ Googlebot / AI Overviews ranking).
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = hostname(await headers());
  const production = host === "www.earlyjobs.ai" || host === "earlyjobs.ai";

  if (!production) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      // ——— Classic SEO crawlers ———
      rule("Googlebot"),
      rule("Googlebot-Image"),
      rule("Googlebot-News"),
      rule("Bingbot"),
      rule("DuckDuckBot"),
      rule("Applebot"),

      // ——— AEO / GEO: AI search & citation (retrieval) ———
      // OpenAI ChatGPT search / browsing
      rule("OAI-SearchBot"),
      rule("ChatGPT-User"),
      // Anthropic Claude search / fetch
      rule("Claude-SearchBot"),
      rule("Claude-User"),
      // Perplexity, You.com, etc.
      rule("PerplexityBot"),
      rule("YouBot"),
      rule("Amazonbot"),
      rule("meta-externalagent"),

      // ——— AI training / grounding product tokens ———
      // Allowed so EarlyJobs jobs & brand can appear in model knowledge.
      // Opt out later with Disallow if policy changes (does not hurt Google Search SEO).
      rule("GPTBot"),
      rule("ClaudeBot"),
      rule("Google-Extended"),
      rule("Applebot-Extended"),
      rule("CCBot"),
      rule("Bytespider"),
      rule("anthropic-ai"),
      rule("cohere-ai"),

      // ——— Default for everything else ———
      rule("*"),
    ],
    sitemap: "https://www.earlyjobs.ai/sitemap.xml",
    host: "https://www.earlyjobs.ai",
  };
}
