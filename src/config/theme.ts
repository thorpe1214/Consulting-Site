// config/theme.ts
export const theme = {
  siteName: "Your Brand (Placeholder)",
  accent: {
    // swap later (amber/sky/emerald/etc.). Tailwind class strings only.
    pill: "bg-amber-100 text-amber-900 border-amber-200",
    glowFrom: "from-amber-200",
    glowTo: "to-amber-400",
    button: "bg-neutral-900 hover:bg-neutral-800 text-white",
    outline: "border-neutral-300 hover:border-neutral-400 bg-white",
  },
  contact: {
    // For display on the page; not used for server email (that’s Batch 2 env)
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "you@example.com",
    calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
  },
  availabilityBadge: "Available for consulting • Open to full-time",
};

