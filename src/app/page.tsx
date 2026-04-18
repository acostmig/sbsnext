import { Bot, Code2, FlaskConical, Sparkles, Workflow } from "lucide-react";
import Script from "next/script";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { clientLogos } from "@/content/services";
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  jsonLdScript,
} from "@/lib/seo";
import { SITE } from "@/lib/utils";

export const metadata = buildMetadata({
  title: `${SITE.name} — ${SITE.tagline}`,
  description:
    "SBSNext ships production AI (RAG, agents, copilots), Playwright test automation, and Next.js full-stack applications. Senior engineers, direct access, no account managers.",
  path: "/",
});

const homeFaqs = [
  {
    q: "What does SBSNext do?",
    a: "SBSNext delivers four engineering practices: AI engineering (RAG, agents, domain copilots), test automation (Playwright, AI-generated tests, sandboxed per-commit runs), full-stack development (Next.js 15, React 19, TypeScript, edge deploys), and AI agent enablement for engineering teams.",
  },
  {
    q: "How are you different from other consulting firms?",
    a: "No account managers, no junior bench, no half-finished pilots. You work directly with the senior engineers doing the work. Our typical first engagement is a 10–14 week deployment that replaces one real workflow — production deploy, measurable outcome, knowledge transfer.",
  },
  {
    q: "What AI services do you offer?",
    a: "Retrieval-augmented generation (RAG) grounded in your documents and data, multi-step agent workflows with tool orchestration, domain copilots for support/sales/engineering, and AI agent enablement that turns coding tools into senior teammates. We include evals, tracing, cost/latency SLOs, and guardrails on every engagement.",
  },
  {
    q: "What test automation stack do you use?",
    a: "Playwright-first. Accessibility-tree locators, self-healing tests, AI-generated test cases pushed to Azure DevOps or Jira, sandboxed per-commit runs, API-heavy pyramid, and performance baselines with JMeter and Artillery. We've rebuilt flaky suites into release-blocking systems for NBA streaming and biBERK (Berkshire Hathaway).",
  },
  {
    q: "Do you work with startups or enterprises?",
    a: "Both. We've delivered for NBA, Berkshire Hathaway companies, John Deere, Medical Mutual of Ohio, Hitachi Solutions, Tranquility AI, Centric Consulting, and Gemini. We're opinionated about fit — if we're not the right team, we'll say so early.",
  },
  {
    q: "Where are you based and who do you serve?",
    a: "SBSNext is US-based (New Jersey). We serve clients across the United States and Canada, remote-first, with English and Spanish working languages.",
  },
];

export default function HomePage() {
  return (
    <>
      <Script
        id="ld-home-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([{ name: "Home", path: "/" }]),
        )}
      />
      <Script
        id="ld-home-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={jsonLdScript(faqSchema(homeFaqs))}
      />

      <Hero />

      <section
        aria-labelledby="services-heading"
        className="container-tight py-20 md:py-28"
      >
        <div className="max-w-2xl">
          <div className="text-sm font-medium text-accent">What we do</div>
          <h2
            id="services-heading"
            className="mt-2 text-3xl md:text-4xl"
          >
            Four practices. One standard.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Senior engineering delivered directly. No account managers, no
            junior teams learning on your budget, no half-finished pilots.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <ServiceCard
            icon={<Sparkles className="h-5 w-5" />}
            title="AI Engineering"
            description="Production RAG, agent workflows, and domain copilots — with evals, tracing, and guardrails that keep them reliable past launch. Typical first engagement: 10–14 week pilot replacing a real workflow."
            href="/services/#ai-section"
          />
          <ServiceCard
            icon={<FlaskConical className="h-5 w-5" />}
            title="Test Automation"
            description="Playwright-first systems with self-healing locators, AI-generated test cases, and sandboxed per-commit runs. API-heavy pyramid, flaky-test detection, performance baselines on every change."
            href="/services/#test-section"
            delay={0.08}
          />
          <ServiceCard
            icon={<Code2 className="h-5 w-5" />}
            title="Full-Stack Development"
            description="Next.js 15 App Router, React 19, TypeScript end-to-end, edge deploys on Vercel or Cloudflare. Clean codebases your team will want to keep working in."
            href="/services/#dev-section"
            delay={0.16}
          />
          <ServiceCard
            icon={<Workflow className="h-5 w-5" />}
            title="AI Agent Enablement"
            description="Your AI coding tools, turned into senior teammates. Custom agents, guardrails, and context engineering so your engineers move 5–10x faster and stop getting generic output."
            href="/services/#agents-section"
            delay={0.24}
          />
        </div>
      </section>

      <section
        aria-labelledby="clients-heading"
        className="border-y border-border bg-muted/40"
      >
        <div className="container-tight py-14">
          <h2
            id="clients-heading"
            className="text-center text-xs uppercase tracking-wider text-muted-foreground"
          >
            Delivered for
          </h2>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 list-none">
            {clientLogos.map((logo) => (
              <li
                key={logo}
                className="text-sm md:text-base font-medium text-muted-foreground/80"
              >
                {logo}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="container-tight py-20 md:py-24"
      >
        <div className="max-w-2xl">
          <div className="text-sm font-medium text-accent">FAQ</div>
          <h2 id="faq-heading" className="mt-2 text-3xl md:text-4xl">
            Questions we get a lot.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {homeFaqs.map((item) => (
            <article
              key={item.q}
              className="rounded-lg border border-border bg-background p-6"
            >
              <h3 className="font-semibold">{item.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.a}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-tight py-20 md:py-28">
        <div className="rounded-xl border border-border bg-muted/40 p-8 md:p-14 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-background border border-border">
            <Bot className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-2xl md:text-3xl">
            Skip the discovery call. Ask our bot anything.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Our chatbot knows what we do, how we work, and who we've worked
            with. Built with the same stack we'd build for you — ask it how.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/chat/">Start chatting</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services/">See all services</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
