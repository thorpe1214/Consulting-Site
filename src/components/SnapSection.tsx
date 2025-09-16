// src/components/SnapSection.tsx
// Full-screen section with mesh background, headline + blurb, CTAs,
// and an optional down-arrow that jumps to the next section.
// Uses ESM imports (no CommonJS require) per Next.js + TypeScript best practices.
import MeshBG from "@/components/MeshBG"; // background layer (presentational only)
import { ArrowDown } from "lucide-react"; // icon via ESM; SSR-safe
import React from "react";

// Props kept explicit and typed; nextId is optional and safely handled.
type Props = {
  id: string; // HTML id (used by right-side dot nav and anchors)
  title: string; // section headline
  blurb: string; // short description
  nextId?: string; // if present, shows a hash-link arrow to the next section
};

export default function SnapSection({ id, title, blurb, nextId }: Props) {
  return (
    <section id={id} className="relative snap-start min-h-[100svh]">
      {/* Decorative mesh background; non-interactive */}
      <MeshBG />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24 flex flex-col justify-center min-h-[100svh]">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-200">{blurb}</p>
          <div className="mt-8 flex gap-3">
            {/* For in-page anchors, use <a href="#..."> so it works without JS and avoids Next Link warnings. */}
            <a
              href="#services"
              className="px-5 py-3 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900"
            >
              Explore modules
            </a>
            <a
              href="#contact"
              className="px-5 py-3 rounded-2xl border border-neutral-300 bg-white hover:border-neutral-400 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700 dark:hover:border-neutral-600"
            >
              Build your plan
            </a>
          </div>
        </div>

        {/* Optional down-arrow only when nextId is provided. */}
        {nextId && (
          <a
            href={`#${nextId}`}
            className="absolute left-1/2 -translate-x-1/2 bottom-6 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/80 px-4 py-2 text-sm shadow hover:border-neutral-400 dark:bg-neutral-900/80 dark:border-neutral-700 dark:hover:border-neutral-600"
            aria-label="Next section"
          >
            <ArrowDown size={16} />
            Next
          </a>
        )}
      </div>
    </section>
  );
}
