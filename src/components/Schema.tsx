import Script from "next/script";

export default function Schema() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "you@example.com";

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Brennan Thorpe",
    url: site,
    email,
    jobTitle: "Consultant (Multifamily Ops & Revenue)",
    worksFor: { "@type": "Organization", name: "Consulting (placeholder)" },
    sameAs: [],
  };

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Consulting (placeholder)",
    url: site,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email,
      },
    ],
  };

  return (
    <>
      <Script id="ld-person" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <Script id="ld-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
    </>
  );
}

