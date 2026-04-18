import Script from "next/script";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { ContactDialog } from "@/components/contact-dialog";
import { Button } from "@/components/ui/button";
import {
  breadcrumbSchema,
  buildMetadata,
  jsonLdScript,
  personSchema,
} from "@/lib/seo";
import { SITE } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "About SBSNext — Senior Engineering Without the Agency Layer",
  description:
    "SBSNext is a senior engineering firm led by Miguel Acosta-Quinones. Track record with NBA, Berkshire Hathaway, John Deere, and Hitachi Solutions. No account managers, no junior bench — just the work.",
  path: "/about/",
  keywords: [
    "Miguel Acosta-Quinones",
    "SBSNext founder",
    "Senior software engineer",
    "AI engineering consulting",
    "Test automation architect",
    "Next.js consulting firm",
  ],
});

export default function AboutPage() {
  return (
    <>
      <Script
        id="ld-about-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about/" },
          ]),
        )}
      />
      <Script
        id="ld-about-person"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={jsonLdScript(personSchema())}
      />
      <section className="hero-gradient border-b border-border">
        <div className="container-tight py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="text-sm font-medium text-accent">About</div>
            <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
              We're the engineers you'd hire
              <br />
              <span className="text-muted-foreground">if you could find us.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              SBSNext is a small engineering firm founded by Miguel
              Acosta-Quinones — technical leader, systems architect, and the
              person teams call when their automation is flaky, their AI pilot
              stalled, or their frontend is rotting. No sales layer. No junior
              bench. Just the work.
            </p>
          </div>
        </div>
      </section>

      <section className="container-tight py-16 md:py-20 grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3 prose-custom">
          <h2 className="text-2xl mb-4">How we work</h2>
          <p>
            <strong>Small team, no middle layer.</strong> You work with the
            engineers doing the work. No account managers, no junior staff
            learning on your budget, no handoffs to a team you didn't meet in
            the sales call.
          </p>
          <p className="mt-4">
            <strong>Stack-honest.</strong> We have opinions — Playwright over
            Selenium, Next.js App Router over custom frameworks, edge deploys
            when latency matters — and we'll tell you why. But the goal is
            always the outcome, not our preferences.
          </p>
          <p className="mt-4">
            <strong>We finish.</strong> The industry's full of half-delivered
            pilots and AI demos that never make it to production. Our first
            engagement is almost always a 10–14 week deployment of one real
            thing. If we're not the right fit, we'll say so early.
          </p>
          <p className="mt-4">
            <strong>We use what we sell.</strong> This site, its chatbot, and
            its deploy pipeline are the same patterns we ship for clients.
            Agents on our infrastructure help us move faster — and we teach
            your team to do the same.
          </p>
        </div>

        <aside className="md:col-span-2">
          <div className="rounded-lg border border-border p-6">
            <div className="text-sm font-semibold">Track record</div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">NBA</strong> — Performance
                testing for 1M+ concurrent streamers; UI automation across web,
                iOS, Android unified under a single gherkin abstraction.
              </li>
              <li>
                <strong className="text-foreground">biBERK (Berkshire Hathaway)</strong>{" "}
                — Rating engine automation: 200+ permutations across 20+ API
                calls, all AI-assisted generation into Azure DevOps.
              </li>
              <li>
                <strong className="text-foreground">Hitachi Solutions</strong>{" "}
                — Architected solutions for Fortune 500 clients including John
                Deere and Berkshire Hathaway companies.
              </li>
              <li>
                <strong className="text-foreground">Tranquility AI</strong>{" "}
                — AI systems engineering.
              </li>
              <li>
                <strong className="text-foreground">Medical Mutual of Ohio, Centric Consulting, Gemini</strong>{" "}
                — Quality engineering and delivery leadership at scale.
              </li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="container-tight pb-20">
        <div className="rounded-xl border border-border bg-muted/40 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl">Get in touch</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-sm hover:text-accent">
              <Mail className="h-4 w-4" /> {SITE.email}
            </a>
            <a href={SITE.phoneHref} className="flex items-center gap-3 text-sm hover:text-accent">
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm hover:text-accent">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href={SITE.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm hover:text-accent">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
          <div className="mt-8">
            <ContactDialog trigger={<Button size="lg">Send us a message</Button>} />
          </div>
        </div>
      </section>
    </>
  );
}
