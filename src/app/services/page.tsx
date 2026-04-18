import Script from "next/script";
import Link from "next/link";
import { ContactDialog } from "@/components/contact-dialog";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";
import {
  breadcrumbSchema,
  buildMetadata,
  jsonLdScript,
  serviceSchema,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services — AI, Test Automation, Full-Stack & Agent Enablement",
  description:
    "Production AI (RAG, agents, domain copilots), Playwright test automation with AI-generated cases, Next.js/React full-stack, and AI agent enablement. Senior engineers. 10–14 week pilots. Real deploys.",
  path: "/services/",
  keywords: [
    "AI consulting services",
    "RAG implementation",
    "LLM agent development",
    "Playwright test automation services",
    "AI-generated test cases",
    "Next.js development services",
    "React 19 consulting",
    "AI agent enablement",
    "Domain copilot development",
    "Edge deployment Cloudflare",
  ],
});

const itemIdToServiceType: Record<string, string> = {
  "ai-section": "Artificial Intelligence Engineering",
  "test-section": "Quality Assurance and Test Automation",
  "dev-section": "Full-Stack Software Development",
  "agents-section": "AI Agent Enablement",
};

export default function ServicesPage() {
  const serviceJsonLd = services.map((s) =>
    serviceSchema({
      name: s.title,
      description: s.description,
      path: `/services/#${s.id}`,
      serviceType: itemIdToServiceType[s.id] ?? s.title,
    }),
  );

  return (
    <>
      <Script
        id="ld-services-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
          ]),
        )}
      />
      {serviceJsonLd.map((schema, i) => (
        <Script
          key={services[i].id}
          id={`ld-service-${services[i].id}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={jsonLdScript(schema)}
        />
      ))}

      <section className="hero-gradient border-b border-border">
        <div className="container-tight py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="text-sm font-medium text-accent">Services</div>
            <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
              Engineering that earns trust.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Four practice areas, one principle: deliver work that survives
              real-world use. Here's where we dig in.
            </p>
            <nav aria-label="Services" className="mt-8 flex flex-wrap gap-2">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-border bg-background px-4 py-1.5 text-sm hover:border-foreground/30 transition"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {services.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className={i % 2 === 1 ? "bg-muted/40 border-y border-border" : ""}
        >
          <div className="container-tight py-20 md:py-24 scroll-mt-20">
            <div className="max-w-2xl">
              <h2
                id={`${section.id}-heading`}
                className="text-3xl md:text-4xl"
              >
                {section.title}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {section.description}
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {section.content.map((item) => (
                <article
                  key={item.title}
                  className="relative rounded-lg border border-border bg-background p-6"
                >
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                  {item.id === "chat" && (
                    <Button asChild size="sm" variant="accent" className="mt-4">
                      <Link href="/chat/">{item.cta}</Link>
                    </Button>
                  )}
                  {item.comingSoon && (
                    <span className="mt-4 inline-block rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      Coming soon
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="container-tight py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl">Ready to build something?</h2>
          <p className="mt-4 text-muted-foreground">
            Tell us about your problem. We'll tell you honestly whether we're
            the right fit.
          </p>
          <div className="mt-8">
            <ContactDialog
              trigger={<Button size="lg">Start the conversation</Button>}
            />
          </div>
        </div>
      </section>
    </>
  );
}
