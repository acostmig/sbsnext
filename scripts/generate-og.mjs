import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, "../public/images/og-default.png");
mkdirSync(dirname(outPath), { recursive: true });

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="50%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    <radialGradient id="glow" cx="85%" cy="15%" r="50%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g transform="translate(80, 80)">
    <circle cx="10" cy="14" r="8" fill="#38bdf8"/>
    <text x="30" y="22" fill="#ffffff" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="28" font-weight="600" letter-spacing="-0.5">
      SBS<tspan font-style="italic" fill="#38bdf8">Next</tspan>
    </text>
  </g>

  <g transform="translate(80, 280)">
    <text fill="#ffffff" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="72" font-weight="700" letter-spacing="-2">
      <tspan x="0" dy="0">AI, Test Automation &amp;</tspan>
      <tspan x="0" dy="84">Full-Stack Engineering.</tspan>
    </text>
    <text fill="#a3a3a3" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="28" font-weight="400">
      <tspan x="0" dy="130">Senior engineers shipping production AI, Playwright systems, and Next.js apps.</tspan>
      <tspan x="0" dy="40">No account managers. No junior bench.</tspan>
    </text>
  </g>

  <g transform="translate(80, 540)" fill="#737373" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="22">
    <text>AI Engineering  ·  Test Automation  ·  Full-Stack  ·  Agent Enablement</text>
  </g>
  <text x="1120" y="562" text-anchor="end" fill="#737373" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="22">sbsnext.com</text>
</svg>
`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outPath);
console.log(`Wrote ${outPath}`);
