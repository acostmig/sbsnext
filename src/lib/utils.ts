import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "SBSNext",
  legal: "SBSNext LLC",
  tagline: "AI, Test Automation & Full-Stack Development",
  description:
    "SBSNext is a senior engineering firm delivering production AI (RAG, agents, copilots), Playwright test automation, and Next.js full-stack applications. No account managers, no junior bench — just engineers who finish.",
  shortDescription:
    "Senior engineers shipping production AI, Playwright test automation, and Next.js applications.",
  url: "https://sbsnext.com",
  phone: "(551) 294-4913",
  phoneHref: "tel:+15512944913",
  phoneE164: "+1-551-294-4913",
  email: "info@sbsnext.com",
  linkedin: "https://www.linkedin.com/company/sbsnext",
  github: "https://github.com/acostmig/sbsnext",
  twitter: "@sbsnext",
  founder: "Miguel Acosta-Quinones",
  foundingDate: "2023",
  addressCountry: "US",
  addressRegion: "NJ",
  keywords: [
    "AI engineering",
    "AI consulting",
    "Production RAG",
    "LLM agents",
    "AI agent enablement",
    "Machine learning",
    "Test automation",
    "Playwright automation",
    "QA engineering",
    "Test architecture",
    "Full-stack development",
    "Next.js development",
    "React 19",
    "TypeScript",
    "Edge computing",
    "Cloudflare Workers",
    "Vercel",
    "Domain copilots",
    "Chatbots",
    "Software consulting",
    "SBSNext",
  ],
} as const;

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
