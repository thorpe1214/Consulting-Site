// components/Hero.tsx
import { theme } from "@/config/theme";

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className={`absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-40 bg-gradient-to-br ${theme.accent.glowFrom} ${theme.accent.glowTo}`} />
        <div className={`absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-40 bg-gradient-to-br ${theme.accent.glowFrom} ${theme.accent.glowTo}`} />
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        <div className={`inline-flex items-center gap-2 text-sm border rounded-full px-3 py-1 ${theme.accent.pill} dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100`}>
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {theme.availabilityBadge}
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">
          Systems, training, and pricing that raise NOI.
        </h1>
        <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl">
          Pick the help you need: Revenue, CRM/Lifecycle, Platform rollouts, Reporting, Lease-up, Ops.
          It’s mix-and-match—start with an audit, run a sprint, or put me on a fractional cadence.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#contact" className={`px-5 py-3 rounded-2xl shadow ${theme.accent.button}`}>
            Build your plan
          </a>
          <a href="#services" className={`px-5 py-3 rounded-2xl border ${theme.accent.outline} dark:border-neutral-700 dark:hover:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100`}>
            See services
          </a>
        </div>
      </div>
    </header>
  );
}
