import Section from "@/components/Section";
import { caseStudies } from "@/lib/results";

export default function Results() {
  if (!caseStudies.length) return null;
  return (
    <Section id="results" title="Results" className="pb-16">
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((c) => (
          <article
            key={c.id}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm"
          >
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {c.role} {c.timeframe ? `• ${c.timeframe}` : ""}
            </div>
            <h4 className="mt-1 text-lg font-semibold">{c.title}</h4>
            <p className="mt-2 text-neutral-700 dark:text-neutral-200">{c.context}</p>

            {c.stack?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {c.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs rounded-full border border-neutral-200 dark:border-neutral-700 px-2 py-1 bg-neutral-50 dark:bg-neutral-950"
                  >
                    {s}
                  </span>
                ))}
              </div>
            ) : null}

            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {c.metrics.map((m) => (
                <li
                  key={m.label}
                  className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2"
                >
                  <div className="text-neutral-600 dark:text-neutral-400">{m.label}</div>
                  <div className="font-semibold">{m.value}</div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-neutral-700 dark:text-neutral-200">{c.summary}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

