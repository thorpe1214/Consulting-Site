// components/Section.tsx
import { ReactNode } from "react";

export default function Section({
  id,
  title,
  children,
  className,
}: {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`max-w-6xl mx-auto px-6 ${className || ""}`}>
      {title ? <h2 className="text-2xl font-semibold">{title}</h2> : null}
      {children}
    </section>
  );
}

