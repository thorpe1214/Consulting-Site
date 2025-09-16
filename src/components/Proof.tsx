import Section from "@/components/Section";
import { metrics, logos } from "@/lib/proof";

export default function Proof() {
  return (
    <Section className="pb-12">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold">Proof</h3>
            <ul className="mt-3 grid sm:grid-cols-2 gap-3">
              {metrics.map((m) => (
                <li key={m.label} className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-3">
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">{m.label}</div>
                  <div className="text-lg font-semibold">{m.value}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold">Selected partners</h4>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {logos.map((l) => (
                <div key={l.name} className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300">
                  {l.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

