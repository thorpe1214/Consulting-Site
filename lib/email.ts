// lib/email.ts
import { Resend } from "resend";
import { flags } from "../config/flags";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  selectedServiceIds: string[];
  selectedServiceTitles: string[];
};

const apiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.CONTACT_TO_EMAIL;
const fromEmail = process.env.CONTACT_FROM_EMAIL;

// Initialize only if key exists
const resend = apiKey ? new Resend(apiKey) : null;

export async function sendContactEmail(payload: ContactPayload) {
  const { name, email, company, message, selectedServiceIds, selectedServiceTitles } = payload;

  // Dev mode: no key or flag off or missing to/from
  const devMode = !flags.email.useResend || !resend || !toEmail || !fromEmail;

  const subject = `Plan request from ${name} (${email})`;
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
      <h2>New plan request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
      <p><strong>Selected Modules (${selectedServiceIds.length}):</strong></p>
      <ul>${selectedServiceTitles.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>
    </div>
  `;

  if (devMode) {
    // Log to server console; still return ok so the UI succeeds.
    console.log("[DEV CONTACT SUBMISSION]", {
      name,
      email,
      company,
      selectedServiceIds,
      selectedServiceTitles,
      message,
    });
    return { ok: true, devMode: true as const };
  }

  // Attempt to send via Resend
  try {
    const result = await resend!.emails.send({
      from: fromEmail!,
      to: toEmail!,
      subject,
      html,
    });
    // Resend SDK returns a typed object, but we guard anyway:
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

// Very small sanitizer
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
