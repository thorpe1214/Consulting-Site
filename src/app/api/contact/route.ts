// src/app/api/contact/route.ts
// Server handler for contact form. Validates payload, applies simple spam checks,
// maps service IDs -> titles, then either sends an email (if enabled) or logs in dev.

import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { services } from "@/lib/services";

// Expected request body (extendable; keep fields documented here)
type Body = {
  name: string;
  email: string;
  company?: string;
  message: string;
  selectedServiceIds: string[];
  // Spam-guard fields (optional)
  hp?: string;        // Honeypot: should be empty for humans
  elapsedMs?: number; // Client-reported ms from render to submit
};

// ---- Type guards to safely narrow untyped JSON to our Body ----
function isNonEmptyString(x: unknown): x is string {
  return typeof x === "string" && x.trim().length > 0;
}
function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every((v) => typeof v === "string");
}
function isNonNegativeNumber(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x) && x >= 0;
}

async function parseBody(req: Request): Promise<Body | null> {
  const raw: unknown = await req.json();
  if (!raw || typeof raw !== "object") return null;

  const obj = raw as Record<string, unknown>;
  const name = isNonEmptyString(obj.name) ? obj.name.trim() : "";
  const email = isNonEmptyString(obj.email) ? obj.email.trim() : "";
  const company = typeof obj.company === "string" ? obj.company.trim() : undefined;
  const message = isNonEmptyString(obj.message) ? obj.message.trim() : "";
  const selectedServiceIds = isStringArray(obj.selectedServiceIds) ? obj.selectedServiceIds : [];
  const hp = typeof obj.hp === "string" ? obj.hp : undefined;
  const elapsedMs = isNonNegativeNumber(obj.elapsedMs) ? obj.elapsedMs : undefined;

  if (!name || !email || !message || selectedServiceIds.length === 0) return null;
  return { name, email, company, message, selectedServiceIds, hp, elapsedMs };
}

export async function POST(req: Request) {
  try {
    const body = await parseBody(req);
    if (!body) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    // ---- Simple spam checks (soft fail: pretend success, send nothing) ----
    const MIN_ELAPSE_MS = 3500; // humans rarely complete a thoughtful form faster
    const hpTripped = !!(body.hp && body.hp.trim().length > 0);
    const tooFast = typeof body.elapsedMs === "number" && body.elapsedMs < MIN_ELAPSE_MS;
    if (hpTripped || tooFast) {
      return NextResponse.json({ ok: true, devMode: false, ignored: true });
    }

    // ---- Map IDs -> titles defensively ----
    const titleById = new Map(services.map((s) => [s.id, s.title]));
    const selectedServiceTitles: string[] = body.selectedServiceIds
      .map((id) => titleById.get(id))
      .filter((t): t is string => typeof t === "string");

    if (selectedServiceTitles.length === 0) {
      return NextResponse.json({ ok: false, error: "invalid_services" }, { status: 400 });
    }

    // ---- Send (or dev-log) via helper ----
    const res = await sendContactEmail({
      name: body.name,
      email: body.email,
      company: body.company,
      message: body.message,
      selectedServiceIds: body.selectedServiceIds,
      selectedServiceTitles,
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: res.error || "email_error" }, { status: 500 });
    }

    // Include devMode so client can show a helpful message if emails are disabled.
    return NextResponse.json({ ok: true, devMode: "devMode" in res ? res.devMode : false });
  } catch (err: unknown) {
    console.error("[CONTACT API ERROR]", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
