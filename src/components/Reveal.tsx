// src/components/Reveal.tsx
// Small, reusable "fade-up on view" wrapper.
// Accessible (gentle motion), only runs on client.
// Usage: <Reveal><h2>Section title</h2></Reveal>

"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // IntersectionObserver to start animation when ~20% of element is visible.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && controls.start("show")),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: variants.hidden,
        show: { ...variants.show, transition: { ...variants.show!.transition, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

