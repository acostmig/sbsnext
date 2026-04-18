import type { Metadata } from "next";
import { SITE } from "@/lib/utils";

type BuildMetaArgs = {
  title: string;
  description: string;
  path?: string;
  keywords?: readonly string[];
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  noIndex = false,
}: BuildMetaArgs): Metadata {
  const url = `${SITE.url}${path}`;
  const resolvedKeywords = keywords ? [...keywords] : [...SITE.keywords];

  return {
    title,
    description,
    keywords: resolvedKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title,
      description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      creator: SITE.twitter,
      title,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.legal,
    alternateName: SITE.name,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/images/logo-512x512.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE.url}/images/logo-512x512.png`,
    description: SITE.description,
    foundingDate: SITE.foundingDate,
    founder: {
      "@type": "Person",
      name: SITE.founder,
    },
    email: SITE.email,
    telephone: SITE.phoneE164,
    sameAs: [SITE.linkedin, SITE.github],
    address: {
      "@type": "PostalAddress",
      addressCountry: SITE.addressCountry,
      addressRegion: SITE.addressRegion,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phoneE164,
        email: SITE.email,
        contactType: "sales",
        areaServed: ["US", "CA"],
        availableLanguage: ["English", "Spanish"],
      },
      {
        "@type": "ContactPoint",
        telephone: SITE.phoneE164,
        email: SITE.email,
        contactType: "customer support",
        areaServed: ["US", "CA"],
        availableLanguage: ["English", "Spanish"],
      },
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Retrieval-Augmented Generation",
      "Large Language Models",
      "AI Agents",
      "Test Automation",
      "Playwright",
      "Quality Assurance",
      "Full-Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "Edge Computing",
      "Cloudflare Workers",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-US",
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#business`,
    name: SITE.legal,
    url: SITE.url,
    image: `${SITE.url}/images/logo-512x512.png`,
    logo: `${SITE.url}/images/logo-512x512.png`,
    priceRange: "$$$",
    telephone: SITE.phoneE164,
    email: SITE.email,
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: SITE.addressCountry,
      addressRegion: SITE.addressRegion,
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    serviceType: [
      "AI Engineering",
      "Test Automation",
      "Full-Stack Development",
      "AI Agent Enablement",
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function serviceSchema(args: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    serviceType: args.serviceType,
    description: args.description,
    url: `${SITE.url}${args.path}`,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Software and product teams",
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/about/#miguel`,
    name: SITE.founder,
    jobTitle: "Founder & Principal Engineer",
    worksFor: { "@id": `${SITE.url}/#organization` },
    url: `${SITE.url}/about/`,
    sameAs: [SITE.linkedin, SITE.github],
    knowsAbout: [
      "AI Engineering",
      "Test Automation",
      "Full-Stack Development",
      "Software Architecture",
    ],
  };
}

export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
