export type ServiceItem = {
  id?: string;
  title: string;
  text: string;
  cta?: string;
  comingSoon?: boolean;
};

export type ServiceSection = {
  id: string;
  title: string;
  description: string;
  content: ServiceItem[];
};

export const services: ServiceSection[] = [
  {
    id: "ai-section",
    title: "AI Engineering",
    description:
      "Production AI — not demos. We ship RAG, agent workflows, and domain copilots with the evals, tracing, and guardrails that keep them reliable after launch.",
    content: [
      {
        title: "Retrieval-Augmented Generation (RAG)",
        text: "Vector-backed knowledge systems grounded in your documents, tickets, and databases. Faithfulness evals, citation rendering, and hallucination monitoring so answers stay trustworthy past the demo.",
      },
      {
        title: "Agents & Workflows",
        text: "Multi-step agents that execute real work — not chat toys. Tool orchestration, tracing, cost and latency SLOs, and guardrails that keep them from going off the rails in production.",
      },
      {
        id: "chat",
        title: "Domain Copilots",
        text: "Embedded assistants for support, sales, and engineering productivity. Our own site's chatbot is a live example — ask it anything about SBSNext.",
        cta: "Try the chatbot",
      },
      {
        title: "Typical engagement",
        text: "A 10–14 week pilot that replaces one real workflow — measurable outcome, production deploy, knowledge transfer. Not a slideware strategy deck.",
      },
    ],
  },
  {
    id: "test-section",
    title: "Test Automation",
    description:
      "Playwright-first test systems engineered for reliability at scale. Self-healing locators, AI-generated cases, sandboxed per-commit runs — so tests stop being the thing that slows you down.",
    content: [
      {
        title: "Playwright Architecture",
        text: "Accessibility-tree locators, component-level isolation, and flaky-test detection baked in. We design frameworks any engineer on your team can extend without calling us back.",
      },
      {
        title: "AI-Generated Test Cases",
        text: "Read a user story, generate permutation-rich test cases, push them straight into Azure DevOps or Jira. We built this pattern for a biBERK (Berkshire Hathaway) rating engine: 200+ permutations across 20+ API calls, all automated.",
      },
      {
        title: "Sandboxed Per-Commit Testing",
        text: "Containerized application-under-test runs locally and on every commit. Developers get real feedback before merge — not a two-day wait for a flaky CI suite.",
      },
      {
        title: "API-Heavy Testing Pyramid",
        text: "Broad API coverage at lower cost than UI testing. Other test strategies reuse the data setup for seamless integration and less duplication.",
      },
      {
        title: "Performance & Load",
        text: "JMeter and Artillery with automated baselines and anomaly detection. Critical regressions block the release; noise gets handled at configurable thresholds.",
      },
      {
        title: "Turnarounds",
        text: "We've taken flaky, distrusted automation suites and rebuilt them into release-blocking systems teams rely on — including NBA streaming tests and insurance-domain UI portals.",
      },
    ],
  },
  {
    id: "dev-section",
    title: "Full-Stack Development",
    description:
      "Next.js 15, React 19, TypeScript end-to-end, edge deploys on Vercel or Cloudflare. Clean architecture your team will want to keep working in — not a handoff that rots in six months.",
    content: [
      {
        title: "Modern Web & APIs",
        text: "Next.js App Router with React Server Components, tRPC for type-safe APIs, Drizzle for the data layer. Server components where they help, client where they're needed — not cargo-culted.",
      },
      {
        title: "Edge & Cloud",
        text: "Deploy to Vercel, Cloudflare Workers, AWS, or Azure. We choose based on your latency, cost, and compliance constraints — not because we're certified in one.",
      },
      {
        title: "Enterprise Backends",
        text: "C# / .NET and Python when the workload calls for it. IaC'd pipelines in Azure DevOps or GitHub Actions, Kubernetes when it's the right tool, not before.",
      },
      {
        title: "Codebases that age well",
        text: "Typed end-to-end, tested, documented where it matters. We leave your team with something they can extend without us — that's the point.",
      },
    ],
  },
  {
    id: "agents-section",
    title: "AI Agent Enablement",
    description:
      "Your team is using AI coding tools and getting generic output. We turn those tools into senior teammates — agents that know your codebase, your standards, and your workflow, so your engineers move 5–10x faster.",
    content: [
      {
        title: "Agent Architecture Audit",
        text: "We review how your team actually uses AI coding tools today — where they help, where they hallucinate, where engineers have given up. You leave with a concrete roadmap, not a framework diagram.",
      },
      {
        title: "Custom Agents for Your Workflow",
        text: "Review agents, migration agents, test generators, deployment assistants — each tuned to your stack, your conventions, and the specific problems your team hits weekly. No generic prompts.",
      },
      {
        title: "Guardrails & Context Engineering",
        text: "The difference between a useful agent and a dangerous one is context and constraints. We design both — codebase maps the AI actually reads, pre-action checks, post-action verifications.",
      },
      {
        title: "Tool Integration",
        text: "Connect AI tools to Jira, Postgres, observability stacks, your internal APIs. Context is the multiplier — an agent with access to your real data stops guessing and starts executing.",
      },
      {
        title: "Team Enablement",
        text: "We don't just build the agents and disappear. Your engineers learn to author, debug, and evolve their own — so the system compounds after we're gone.",
      },
      {
        title: "Proof of concept",
        text: "This website — copy, components, chatbot, worker, deploys — was built end-to-end using the same patterns we deploy for clients. We use what we sell.",
      },
    ],
  },
];

export const clientLogos = [
  "NBA",
  "Hitachi Solutions",
  "John Deere",
  "Berkshire Hathaway",
  "Medical Mutual of Ohio",
  "Tranquility AI",
  "Centric Consulting",
  "Gemini",
] as const;
