// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { sendContactEmail } from "../../../lib/email";
import { services } from "../../../lib/services";

type Body = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  selectedServiceIds?: string[];
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    // Basic validation
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const company = (body.company || "").trim();
    const message = (body.message || "").trim();
    const selectedServiceIds = Array.isArray(body.selectedServiceIds) ? body.selectedServiceIds : [];

    if (!name || !email || !message || selectedServiceIds.length === 0) {
      return NextResponse.json(
        { ok: false, error: "missing_fields" },
        { status: 400 }
      );
    }

    // Map IDs to titles safely
    const titleById = new Map(services.map((s) => [s.id, s.title]));
    const selectedServiceTitles = selectedServiceIds
      .map((id) => titleById.get(id))
      .filter((x): x is string => Boolean(x));

    if (selectedServiceTitles.length === 0) {
      return NextResponse.json(
        { ok: false, error: "invalid_services" },
        { status: 400 }
      );
    }

    const res = await sendContactEmail({
      name,
      email,
      company,
      message,
      selectedServiceIds,
      selectedServiceTitles,
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: res.error || "unknown" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, devMode: "devMode" in res ? (res as any).devMode : false });
  } catch (err) {
    console.error("[CONTACT API ERROR]", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
