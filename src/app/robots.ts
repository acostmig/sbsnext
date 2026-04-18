import type { MetadataRoute } from "next";
import { SITE } from "@/lib/utils";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/chat/", "/api/"],
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
