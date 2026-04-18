export type ContactPayload = {
  name: string;
  organization?: string;
  email: string;
  phone?: string;
  message?: string;
};

export async function sendContactEmail(
  env: { RESEND_API_KEY?: string; DISABLE_EMAIL?: string; CONTACT_TO?: string; CONTACT_FROM?: string },
  payload: ContactPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const html = renderHtml(payload);

  if (env.DISABLE_EMAIL === "true") {
    console.log("[DISABLE_EMAIL] would have sent:", html);
    return { ok: true };
  }

  if (!env.RESEND_API_KEY) return { ok: false, error: "RESEND_API_KEY not set" };

  const to = (env.CONTACT_TO || "miguel@sbsnext.com").split(",").map((s) => s.trim());
  const from = env.CONTACT_FROM || "SBSNext <hello@sbsnext.com>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject: `New contact from ${payload.name}${payload.organization ? ` — ${payload.organization}` : ""}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("resend error", res.status, err);
    return { ok: false, error: `resend ${res.status}` };
  }
  return { ok: true };
}

function renderHtml(p: ContactPayload): string {
  const esc = (s = "") => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
  return `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#111;line-height:1.5">
    <h2 style="margin:0 0 12px">New contact form submission</h2>
    <p><strong>Name:</strong> ${esc(p.name)}</p>
    ${p.organization ? `<p><strong>Organization:</strong> ${esc(p.organization)}</p>` : ""}
    <p><strong>Email:</strong> <a href="mailto:${esc(p.email)}">${esc(p.email)}</a></p>
    ${p.phone ? `<p><strong>Phone:</strong> ${esc(p.phone)}</p>` : ""}
    ${p.message ? `<p><strong>Message:</strong><br>${esc(p.message).replace(/\n/g, "<br>")}</p>` : ""}
  </body></html>`;
}
