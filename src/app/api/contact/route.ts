// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { services } from "@/lib/services";

// Expected body shape; extended with spam-guard fields.
type Body = {
  name: string;
  email: string;
  company?: string;
  message: string;
  selectedServiceIds: string[];
  // Spam-guard fields
  hp?: string; // honeypot (should be empty)
  elapsedMs?: number; // client-reported time between render & submit
};

function isNonEmptyString(x: unknown): x is string {
  return typeof x === "string" && x.trim().length > 0;
}

function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every((v) => typeof v === "string");
}
function isNonNegativeNumber(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x) && x >= 0;
}

// Parse and validate request body safely; supports JSON and basic form posts.
async function parseBody(req: Request): Promise<Body | null> {
  const ct = req.headers.get("content-type") || "";
  let obj: Record<string, unknown> | null = null;

  try {
    if (ct.includes("application/json")) {
      const raw: unknown = await req.json();
      if (raw && typeof raw === "object") obj = raw as Record<string, unknown>;
    } else if (ct.includes("application/x-www-form-urlencoded")) {
      // Progressive enhancement: allow plain HTML form POSTs without JS
      const text = await req.text();
      const params = new URLSearchParams(text);
      const gather = (k: string) => params.get(k) ?? undefined;
      const gatherAll = (k: string) => params.getAll(k);
      obj = {
        name: gather("name"),
        email: gather("email"),
        company: gather("company"),
        message: gather("message"),
        selectedServiceIds: gatherAll("selectedServiceIds"),
        hp: gather("website"),
        elapsedMs: Number(gather("elapsedMs")),
      } as Record<string, unknown>;
    }
  } catch {
    obj = null;
  }

  if (!obj) return null;

  const name = isNonEmptyString(obj.name) ? obj.name.trim() : "";
  const email = isNonEmptyString(obj.email) ? obj.email.trim() : "";
  const company = typeof obj.company === "string" ? obj.company.trim() : undefined;
  const message = isNonEmptyString(obj.message) ? obj.message.trim() : "";
  const selectedServiceIds = isStringArray(obj.selectedServiceIds) ? obj.selectedServiceIds : [];

  // Spam guard fields (optional)
  const hp = typeof obj.hp === "string" ? obj.hp : undefined;
  const elapsedMs = isNonNegativeNumber(obj.elapsedMs) ? (obj.elapsedMs as number) : undefined;

  if (!name || !email || !message || selectedServiceIds.length === 0) return null;
  return { name, email, company, message, selectedServiceIds, hp, elapsedMs };
}

export async function POST(req: Request) {
  try {
    const body = await parseBody(req);
    if (!body) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    // ---- Spam checks (soft fail) ----
    const MIN_ELAPSE_MS = 3500; // 3.5s minimum typing time to discourage bots
    const hpTripped = typeof body.hp === "string" && body.hp.trim().length > 0;
    const tooFast = typeof body.elapsedMs === "number" && body.elapsedMs < MIN_ELAPSE_MS;

    if (hpTripped || tooFast) {
      // Pretend success to avoid bot retries; do not send email.
      return NextResponse.json({ ok: true, devMode: false, ignored: true });
    }

    // Safely map IDs -> titles
    const titleById = new Map(services.map((s) => [s.id, s.title]));
    const selectedServiceTitles: string[] = body.selectedServiceIds
      .map((id) => titleById.get(id))
      .filter((t): t is string => typeof t === "string");

    if (selectedServiceTitles.length === 0) {
      return NextResponse.json({ ok: false, error: "invalid_services" }, { status: 400 });
    }

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

    return NextResponse.json({ ok: true, devMode: "devMode" in res ? res.devMode : false });
  } catch (err: unknown) {
    console.error("[CONTACT API ERROR]", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
