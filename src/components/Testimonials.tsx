import Section from "@/components/Section";
import { testimonials } from "@/lib/testimonials";

export default function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <Section className="pb-16">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
        <h3 className="text-xl font-semibold">What partners say</h3>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <blockquote key={t.id} className="text-neutral-800 dark:text-neutral-100">
              <p className="text-sm leading-relaxed">“{t.quote}”</p>
              <footer className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                — {t.name}
                {t.title ? `, ${t.title}` : ""}
                {t.org ? ` • ${t.org}` : ""}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </Section>
  );
}

