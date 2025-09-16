// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { services } from "@/lib/services";

type Body = {
  name: string;
  email: string;
  company?: string;
  message: string;
  selectedServiceIds: string[];
};

function isNonEmptyString(x: unknown): x is string {
  return typeof x === "string" && x.trim().length > 0;
}

function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every((v) => typeof v === "string");
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

  if (!name || !email || !message || selectedServiceIds.length === 0) return null;
  return { name, email, company, message, selectedServiceIds };
}

export async function POST(req: Request) {
  try {
    const body = await parseBody(req);
    if (!body) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
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
