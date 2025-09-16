// components/ServicesGrid.tsx
// Presentational grid for services grouped by category.
// Section wrapper lives in the page to avoid nested sections.
import { services } from "@/lib/services";

const categories = [
  "Revenue & Pricing",
  "CRM & Lifecycle",
  "Platform Rollouts & Change",
  "Reporting & Ops",
  "Ongoing",
] as const;

export default function ServicesGrid() {
  return (
    <div>
      {categories.map((cat) => {
        const items = services.filter((s) => s.category === cat);
        if (!items.length) return null; // safe if category has no items
        return (
          <div key={cat} className="mt-12">
            <h3 className="text-xl font-semibold">{cat}</h3>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((s) => (
                <article
                  key={s.id}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm hover:shadow-md transition"
                >
                  <h4 className="text-lg font-semibold">{s.title}</h4>
                  <p className="mt-2 text-neutral-700 dark:text-neutral-300">{s.blurb}</p>
                  <ul className="mt-3 text-sm text-neutral-700 dark:text-neutral-300 list-disc pl-5">
                    {s.outcomes.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                  <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                    {s.timeline && (
                      <div>
                        <span className="font-medium">Timeline:</span> {s.timeline}
                      </div>
                    )}
                    {s.deliverables?.length ? (
                      <div>
                        <span className="font-medium">Deliverables:</span> {s.deliverables.join(", ")}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
