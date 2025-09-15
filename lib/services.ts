// lib/services.ts
export type Service = {
  id: string;
  category:
    | "Revenue & Pricing"
    | "CRM & Lifecycle"
    | "Platform Rollouts & Change"
    | "Reporting & Ops"
    | "Ongoing";
  title: string;
  blurb: string;
  outcomes: string[];
  timeline?: string;
  deliverables?: string[];
};

export const services: Service[] = [
  {
    id: "rev-audit-90",
    category: "Revenue & Pricing",
    title: "Revenue Management Audit + 90-Day Plan",
    blurb:
      "I assess pricing, expirations, amenities, and demand signals against your market and goals—then set a weekly/biweekly cadence with clear guardrails and dashboards.",
    outcomes: [
      "Steadier occupancy",
      "Healthier rate integrity",
      "A plan operators can run",
    ],
    timeline: "2–4 weeks",
    deliverables: ["Pricing cadence", "Guardrails", "Dashboard starter"],
  },
  {
    id: "expire-amenities",
    category: "Revenue & Pricing",
    title: "Expiration & Amenity Pricing Tune-Up",
    blurb:
      "I rebalance expirations out of low-season traps and tune amenity rules (views, floors, parking) so value is priced—without whiplash.",
    outcomes: ["Smoother seasonality", "Fewer concessions", "Higher ER"],
    timeline: "1–2 weeks",
    deliverables: ["Expiration policy", "Amenity rules", "Override guide"],
  },
  {
    id: "leaseup-blueprint",
    category: "Revenue & Pricing",
    title: "Lease-Up Blueprint",
    blurb:
      "I set velocity targets, concession windows, staffing cadence, and weekly check-ins tied to marketing, pricing, and on-site execution.",
    outcomes: ["Disciplined pre-lease", "On-time stabilization"],
    timeline: "2–6 weeks (phased)",
    deliverables: ["Velocity targets", "Cadence", "Weekly scorecard"],
  },
  {
    id: "crm-lifecycle",
    category: "CRM & Lifecycle",
    title: "CRM & Lifecycle Automation",
    blurb:
      "I run the entire lifecycle inside the CRM: lead nurture, tour, application, onboarding, service, and renewal. Templates, playbooks, and alert timelines ensure the right message goes out at the right time—and nothing falls through the cracks.",
    outcomes: ["Faster response", "Higher close rates", "Stronger renewals"],
    timeline: "2–4 weeks to stand up",
    deliverables: [
      "Lifecycle playbooks",
      "Templates",
      "Alert timelines",
      "Adoption checklists",
    ],
  },
  {
    id: "lead-integrity",
    category: "CRM & Lifecycle",
    title: "Lead Integrity & Attribution Fix",
    blurb:
      "I audit routing, SLAs, source tags, and follow-ups—cleaning attribution and ensuring every inquiry gets timely, consistent touches.",
    outcomes: ["Clean attribution", "Better CPA", "More qualified tours"],
    timeline: "1–3 weeks",
    deliverables: ["Routing map", "SLA policy", "Attribution cleanup"],
  },
  {
    id: "rollout",
    category: "Platform Rollouts & Change",
    title: "PMS/CRM Rollout (Plan → Migration → Training)",
    blurb:
      "I plan the rollout, map and clean data, configure modules, and train teams with live sessions, recordings, SOPs, and adoption checkpoints.",
    outcomes: ["System that matches workflow", "Real adoption"],
    timeline: "6–10 weeks (portfolio-dependent)",
    deliverables: ["Project plan", "Config checklist", "SOPs", "Training pack"],
  },
  {
    id: "training-day",
    category: "Platform Rollouts & Change",
    title: "Team Training Day (Live + Recorded)",
    blurb:
      "Practical, tool-specific training with ready-to-send templates and checklists—plus recordings, attendance tracking, and office hours.",
    outcomes: ["Confident teams", "Cleaner data", "Faster adoption"],
    timeline: "1 day + follow-ups",
    deliverables: ["Slides", "Recordings", "Checklists", "Q&A sessions"],
  },
  {
    id: "reporting",
    category: "Reporting & Ops",
    title: "Reporting in 2 Weeks (Owner + Ops)",
    blurb:
      "I consolidate KPIs into simple, role-based views: owners see portfolio health; operators get actionable lists and SLA compliance.",
    outcomes: ["Fewer spreadsheets", "Faster decisions", "Clear accountability"],
    timeline: "2 weeks",
    deliverables: ["Owner view", "Ops view", "Weekly operator sheet"],
  },
  {
    id: "make-ready-sla",
    category: "Reporting & Ops",
    title: "Make-Ready & Work-Order SLAs",
    blurb:
      "Digital board, weekend/holiday logic, and escalations that reduce backlogs and improve readiness for tours and move-ins.",
    outcomes: ["Reduced turn time", "Lower backlog", "Better CX"],
    timeline: "1–2 weeks",
    deliverables: ["Board config", "SLA ladder", "Escalation tree"],
  },
  {
    id: "renewal-runway",
    category: "Reporting & Ops",
    title: "Renewal Runway",
    blurb:
      "D-180 → D-30 cadence with save tactics and offer logic so renewals are proactive, not last-minute.",
    outcomes: ["Higher renewals", "Fewer surprises"],
    timeline: "1–2 weeks",
    deliverables: ["Timeline", "Templates", "Offer logic"],
  },
  {
    id: "fractional-rm",
    category: "Ongoing",
    title: "Fractional Revenue Manager (10–20 hrs/week)",
    blurb:
      "Steady drumbeat: pricing calls, marketing audits, CRM follow-through, and leadership visibility—without adding headcount.",
    outcomes: ["Consistent execution", "Faster course-corrections"],
    timeline: "Ongoing",
    deliverables: ["Weekly cadence", "Review notes", "Quarterly summary"],
  },
];

