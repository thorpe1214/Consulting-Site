// lib/results.ts
export type Metric = { label: string; value: string };
export type CaseStudy = {
  id: string;
  title: string;
  role: string;
  timeframe?: string;
  context: string;
  stack?: string[];
  metrics: Metric[];
  summary: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "rev-cadence",
    title: "Revenue cadence that lifted rate integrity",
    role: "Revenue Management",
    timeframe: "Multi-year",
    context:
      "Portfolio across mixed asset classes with seasonal troughs and inconsistent expirations.",
    stack: ["LRO", "AIRM/YieldStar", "Entrata/Yardi"],
    metrics: [
      { label: "Occupancy trend", value: "Stabilized" },
      { label: "Effective rent", value: "Up" },
      { label: "Concessions", value: "Down" },
    ],
    summary:
      "Installed weekly/biweekly pricing calls, expiration rebalancing, and amenity pricing guardrails; paired with CRM follow-through to protect rate while keeping velocity.",
  },
  {
    id: "crm-lifecycle",
    title: "Lifecycle CRM that improved close + renewals",
    role: "CRM & Lifecycle",
    timeframe: "90 days to stand-up",
    context:
      "Leads dropped between sources and teams; renewals reactive instead of proactive.",
    stack: ["Yardi CRM or Knock", "SharePoint SOPs"],
    metrics: [
      { label: "Lead → lease", value: "Improved" },
      { label: "Renewals", value: "Improved" },
      { label: "Attribution quality", value: "Cleaned" },
    ],
    summary:
      "Implemented playbooks, templates, and alert timelines from first contact through D-180 renewal runway; added routing/SLAs and integrity checks.",
  },
  {
    id: "rollout-training",
    title: "Platform rollout with real adoption",
    role: "PMS/CRM Rollout & Training",
    timeframe: "6–10 weeks",
    context:
      "Multi-site rollout with uneven data quality and low tool adoption across field teams.",
    stack: ["Entrata", "Yardi", "Teams/SharePoint"],
    metrics: [
      { label: "Time-to-adoption", value: "Faster" },
      { label: "Data cleanliness", value: "Higher" },
      { label: "Backlog/turn days", value: "Reduced" },
    ],
    summary:
      "Planned migration, configured modules, trained 50–100+ users live with recordings, tracked attendance + surveys, and enforced post-go-live checkpoints.",
  },
];

