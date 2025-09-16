export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title?: string;
  org?: string;
};

export const testimonials: Testimonial[] = [
  // Add real quotes later; leave empty array to hide section.
  // {
  //   id: "ref-1",
  //   quote:
  //     "Brennan built the cadence and playbooks our teams needed. We saw cleaner data and steadier performance.",
  //   name: "Firstname Lastname",
  //   title: "Regional Manager",
  //   org: "Owner/Operator",
  // },
];

