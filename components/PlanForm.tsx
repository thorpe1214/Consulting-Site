"use client";

import { useEffect, useMemo, useState } from "react";
import { services as allServices } from "../lib/services";
import type { Service } from "@/lib/services";

function groupServices() {
  const map = new Map<Service["category"], Service[]>();
  for (const s of allServices) {
    const arr = map.get(s.category) ?? [];
    arr.push(s);
    map.set(s.category, arr);
  }
  return Array.from(map, ([category, items]) => ({ category, items }));
}

const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_URL;

export default function PlanForm() {
  const groups = useMemo(
    () => groupServices() as { category: Service["category"]; items: Service[] }[],
    []
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<"ok" | "error" | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Spam guards (client-side): timestamp + honeypot
  const [renderedAt, setRenderedAt] = useState<number>(0);
  const [hp, setHp] = useState<string>(""); // honeypot: stays empty for humans

  // On mount, record when the form became interactive.
  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setDone(null);
    setError(null);
    try {
      // Compute elapsed time to detect too-fast submits (likely bots)
      const elapsedMs = Date.now() - renderedAt;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          selectedServiceIds: selected,
          // Spam guard payload
          hp,
          elapsedMs,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setDone("error");
        setError(data?.error || "unknown");
      } else {
        setDone("ok");
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
        setSelected([]);
        setHp("");
        setRenderedAt(Date.now()); // reset guards post-success
      }
    } catch {
      setDone("error");
      setError("network");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // action points to API for progressive enhancement; JS intercepts via onSubmit
    <form
      onSubmit={onSubmit}
      action="/api/contact"
      method="post"
      className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold">Build your plan</h3>
      <p className="mt-1 text-sm text-neutral-600">
        Pick the modules you want. I’ll review and reply with a modular proposal.
      </p>

      {/* ---- Honeypot field (hidden to humans, visible to many bots) ---- */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company website {/* decoy label to entice basic scrapers */}
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </label>
        {/* Include elapsedMs for no-JS form posts */}
        <input type="hidden" name="elapsedMs" value={String(Math.max(0, Date.now() - renderedAt))} />
      </div>

      {/* Services */}
      <div className="mt-5 space-y-6">
        {groups.map(({ category, items }) => (
          <fieldset key={category} className="border-t pt-5">
            <legend className="text-sm font-medium text-neutral-900">{category}</legend>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {items.map((s) => (
                <label key={s.id} className="flex items-start gap-3 rounded-xl border border-neutral-200 p-3 hover:border-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    name="selectedServiceIds"
                    className="mt-1"
                    value={s.id}
                    checked={selected.includes(s.id)}
                    onChange={() => toggle(s.id)}
                  />
                  <div>
                    <div className="font-medium">{s.title}</div>
                    <div className="text-sm text-neutral-700">{s.blurb}</div>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      {/* Contact fields */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="text-sm text-neutral-700">Your name</label>
          <input
            name="name"
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="sm:col-span-1">
          <label className="text-sm text-neutral-700">Email</label>
          <input
            type="email"
            name="email"
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm text-neutral-700">Company (optional)</label>
          <input
            name="company"
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Owner/operator or property name"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm text-neutral-700">What’s the situation?</label>
          <textarea
            name="message"
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me what hurts, timelines, and goals."
            required
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={submitting || selected.length === 0}
          className="px-5 py-3 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50"
          title={selected.length === 0 ? "Select at least one module" : "Submit"}
        >
          {submitting ? "Sending…" : "Send request"}
        </button>

        {CALENDLY && (
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-2xl border border-neutral-300 bg-white hover:border-neutral-400"
          >
            Or book a time
          </a>
        )}
      </div>

      {/* Status */}
      {done === "ok" && (
        <p className="mt-3 text-sm text-emerald-700">
          Thanks! I’ll review and get back to you with a modular proposal.
          {" "}
          {CALENDLY ? (
            <>
              Meanwhile, you can {" "}
              <a className="underline" href={CALENDLY} target="_blank" rel="noreferrer">
                book a time
              </a>
              .
            </>
          ) : null}
          {" "}
          {/* If email isn’t configured yet, this was logged on the server in dev mode. */}
        </p>
      )}
      {done === "error" && (
        <p className="mt-3 text-sm text-red-700">
          Sorry—something went wrong ({error}). Please try again or email me directly.
        </p>
      )}
    </form>
  );
}
