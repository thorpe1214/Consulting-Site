// app/page.tsx
import { services } from "../lib/services";
import PlanForm from "../components/PlanForm";

const categories = [
  "Revenue & Pricing",
  "CRM & Lifecycle",
  "Platform Rollouts & Change",
  "Reporting & Ops",
  "Ongoing",
] as const;

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Systems, training, and pricing that raise NOI.
        </h1>
        <p className="mt-4 text-lg text-neutral-700 max-w-3xl">
          Pick the help you need: Revenue, CRM/Lifecycle, Platform rollouts, Reporting, Lease-up, Ops.
          It’s mix-and-match—start with an audit, run a sprint, or put me on a fractional cadence.
        </p>
        <div className="mt-8 flex gap-3">
          <a href="#contact" className="px-5 py-3 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800">
            Build your plan
          </a>
          <a href="#services" className="px-5 py-3 rounded-2xl border border-neutral-300 bg-white hover:border-neutral-400">
            See services
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-6 pb-20">
        {categories.map((cat) => {
          const items = services.filter((s) => s.category === cat);
          if (!items.length) return null;
          return (
            <div key={cat} className="mt-12">
              <h2 className="text-2xl font-semibold">{cat}</h2>
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((s) => (
                  <article key={s.id} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-neutral-700">{s.blurb}</p>
                    <ul className="mt-3 text-sm text-neutral-700 list-disc pl-5">
                      {s.outcomes.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                    <div className="mt-4 text-sm text-neutral-600">
                      {s.timeline && <div><span className="font-medium">Timeline:</span> {s.timeline}</div>}
                      {s.deliverables && s.deliverables.length > 0 && (
                        <div className="mt-1">
                          <span className="font-medium">Deliverables:</span> {s.deliverables.join(", ")}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="mt-3 text-neutral-700">
          Pick the modules you want and I’ll send a modular proposal.
        </p>
        <PlanForm />
      </section>
    </main>
  );
}
