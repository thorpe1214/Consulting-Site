// src/components/SnapSection.tsx
import MeshBG from "@/components/MeshBG";
import Link from "next/link";

// Optional: lucide-react ArrowDown; fallback inline icon if missing
let ArrowDown: (props: { size?: number; className?: string }) => JSX.Element = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M12 4v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M6 12l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
try {
  // dynamic require to avoid type errors if package not installed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const lucide = require("lucide-react");
  if (lucide && lucide.ArrowDown) {
    ArrowDown = lucide.ArrowDown;
  }
} catch {}

export default function SnapSection({
  id,
  title,
  blurb,
  nextId,
}: {
  id: string;
  title: string;
  blurb: string;
  nextId?: string;
}) {
  return (
    <section id={id} className="relative snap-start min-h-[100svh]">
      <MeshBG />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24 flex flex-col justify-center min-h-[100svh]">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-200">{blurb}</p>
          <div className="mt-8 flex gap-3">
            <Link
              href="#services"
              className="px-5 py-3 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900"
            >
              Explore modules
            </Link>
            <Link
              href="#contact"
              className="px-5 py-3 rounded-2xl border border-neutral-300 bg-white hover:border-neutral-400 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700 dark:hover:border-neutral-600"
            >
              Build your plan
            </Link>
          </div>
        </div>

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

