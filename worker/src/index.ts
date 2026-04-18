import { createOpenAI } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";
import { sendContactEmail, type ContactPayload } from "./email";
import { systemPrompt } from "./system-prompt";

export interface Env {
  OPENAI_API_KEY: string;
  RESEND_API_KEY?: string;
  DISABLE_EMAIL?: string;
  ALLOWED_ORIGINS?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

function corsHeaders(origin: string | null, env: Env) {
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim());
  const ok = origin && allowed.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? origin : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  organization: z.string().max(200).optional(),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional(),
  message: z.string().max(5000).optional(),
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    try {
      if (url.pathname === "/api/contact" && request.method === "POST") {
        return await handleContact(request, env, cors);
      }
      if (url.pathname === "/api/chat" && request.method === "POST") {
        return await handleChat(request, env, cors);
      }
      if (url.pathname === "/" || url.pathname === "/health") {
        return new Response("ok", { status: 200, headers: cors });
      }
      return new Response("Not found", { status: 404, headers: cors });
    } catch (err) {
      console.error("unhandled", err);
      return new Response("Internal error", { status: 500, headers: cors });
    }
  },
};

async function handleContact(request: Request, env: Env, cors: Record<string, string>) {
  const json = await request.json().catch(() => null);
  const parsed = ContactSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ ok: false, error: parsed.error.issues }, { status: 400, headers: cors });
  }
  const result = await sendContactEmail(env, parsed.data);
  if (!result.ok) {
    return Response.json(result, { status: 500, headers: cors });
  }
  return Response.json({ ok: true }, { headers: cors });
}

async function handleChat(request: Request, env: Env, cors: Record<string, string>) {
  if (!env.OPENAI_API_KEY) {
    return new Response("OPENAI_API_KEY not set", { status: 500, headers: cors });
  }
  const body = await request.json<{ messages: Array<{ role: string; content: string }> }>();
  const openai = createOpenAI({ apiKey: env.OPENAI_API_KEY });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    messages: body.messages,
    maxSteps: 3,
    tools: {
      submitContactUs: tool({
        description:
          "Submit the user's contact info. Only call after the user has agreed to be contacted AND provided a valid email (or phone).",
        parameters: z.object({
          name: z.string().describe("user's name, or 'Guest' if unknown"),
          email: z.string().email().describe("user's email address"),
          phone: z.string().optional().describe("user's phone number if provided"),
          message: z.string().optional().describe("brief summary of what they want"),
        }),
        execute: async (args) => {
          const payload: ContactPayload = {
            name: args.name || "Guest",
            email: args.email,
            phone: args.phone,
            message: args.message || "Submitted via chatbot",
          };
          const r = await sendContactEmail(env, payload);
          return r.ok
            ? "Contact info submitted. Miguel will reach out within one business day."
            : "Could not submit contact info; ask the user to try the contact form instead.";
        },
      }),
    },
  });

  const response = result.toDataStreamResponse();
  const merged = new Headers(response.headers);
  for (const [k, v] of Object.entries(cors)) merged.set(k, v);
  return new Response(response.body, { status: response.status, headers: merged });
}
