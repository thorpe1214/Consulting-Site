// src/components/DotNav.tsx
"use client";

import { useEffect, useState } from "react";

type Dot = { id: string; label: string };

export default function DotNav({ dots }: { dots: Dot[] }) {
  const [active, setActive] = useState<string>(dots[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    dots.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(id);
          });
        },
        { threshold: 0.6 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [dots]);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {dots.map((d) => (
        <a
          key={d.id}
          href={`#${d.id}`}
          className={`h-3 w-3 rounded-full border transition ${
            active === d.id
              ? "bg-neutral-900 border-neutral-900 dark:bg-neutral-100 dark:border-neutral-100"
              : "bg-transparent border-neutral-400 dark:border-neutral-600 hover:border-neutral-800 dark:hover:border-neutral-300"
          }`}
          aria-label={d.label}
          title={d.label}
        />
      ))}
    </div>
  );
}

