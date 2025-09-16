export type Metric = { label: string; value: string };
export type Logo = { name: string; href?: string };

export const metrics: Metric[] = [
  { label: "Portfolio growth while raising occupancy", value: "Sustained" },
  { label: "Revenue programs (LRO, YieldStar/AIRM)", value: "13+ yrs" },
  { label: "Platform rollouts (Entrata, Yardi, CRM)", value: "40+ sites" },
];

export const logos: Logo[] = [
  { name: "IDM" },
  { name: "Hayden" },
  { name: "Grand Pacific" },
  // add/remove freely; swap with SVGs later
];

