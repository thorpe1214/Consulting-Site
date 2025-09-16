// lib/email.ts
// Helper to send contact emails via Resend. If flags/env are not ready,
// we log the payload and return ok to keep the flow unblocked.

import { Resend } from "resend";
import { flags } from "@/config/flags";

// Server-side payload shape from the API route
type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  selectedServiceIds: string[];
  selectedServiceTitles: string[];
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO = process.env.CONTACT_TO_EMAIL;
const FROM = process.env.CONTACT_FROM_EMAIL;

// Conditionally initialize the client
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Very small sanitizer to avoid accidental HTML injection in generated email
function escapeHtml(s: string) {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return s.replace(/[&<>"']/g, (m: string) => map[m] ?? m);
}

export async function sendContactEmail(payload: ContactPayload) {
  const { name, email, company, message, selectedServiceTitles } = payload;

  const subject = `Plan request from ${name} (${email})`;
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
      <h2>New plan request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
      <p><strong>Selected Modules:</strong></p>
      <ul>${selectedServiceTitles.map(t => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>
    </div>
  `;

  // Dev mode: if flag off or env missing, just log and return ok.
  const devMode = !flags.email.useResend || !resend || !TO || !FROM;
  if (devMode) {
    console.log("[DEV CONTACT SUBMISSION]", payload);
    return { ok: true, devMode: true as const };
  }

  try {
    const result = await resend.emails.send({ from: FROM!, to: TO!, subject, html });
    if ((result as { error?: unknown }).error) {
      console.error("[CONTACT EMAIL ERROR]", (result as { error?: unknown }).error);
      return { ok: false, error: "email_error" as const };
    }
    return { ok: true };
  } catch (err: unknown) {
    console.error("[CONTACT EMAIL ERROR]", err);
    return { ok: false, error: "email_error" as const };
  }
}
