// src/lib/sections.ts
export type SectionBlock = {
  id: string;
  title: string;
  blurb: string;
};

export const sectionBlocks: SectionBlock[] = [
  {
    id: "revenue",
    title: "Revenue Management",
    blurb:
      "I install a steady pricing cadence, rebalance expirations, and tune amenities so rate integrity holds without sacrificing velocity.",
  },
  {
    id: "crm",
    title: "CRM & Lifecycle",
    blurb:
      "I run the entire lifecycle inside the CRM—lead, tour, app, onboarding, service, renewal—with templates, playbooks, and alert timelines so nothing slips.",
  },
  {
    id: "rollouts",
    title: "Platform Rollouts & Change",
    blurb:
      "I plan the rollout, clean data, configure modules, and train teams with recordings and checkpoints—so adoption actually sticks.",
  },
  {
    id: "reporting",
    title: "Reporting & Ops",
    blurb:
      "I give owners role-based visibility and operators actionable lists—plus make-ready and work-order SLAs that cut backlog and turn time.",
  },
  {
    id: "leaseup",
    title: "Lease-Up Blueprint",
    blurb:
      "I set velocity targets, concession windows, staffing cadence, and weekly reviews tied to pricing, marketing, and on-site execution.",
  },
];

