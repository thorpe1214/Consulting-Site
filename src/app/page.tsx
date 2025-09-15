import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ServicesGrid from "@/components/ServicesGrid";
import About from "@/components/About";
import RenewalRunway from "@/components/RenewalRunway";
import { theme } from "@/config/theme";
import PlanForm from "../../components/PlanForm";

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <Hero />

      <ServicesGrid />

      <Section>
        <RenewalRunway />
      </Section>

      <About />

      <Section id="contact" title="Contact" className="pb-24">
        <p className="mt-3 text-neutral-700">
          Pick the modules you want and I’ll send a modular proposal.
        </p>
        <PlanForm />
        <div className="mt-4 text-sm text-neutral-600">
          Or email me directly:{" "}
          <a className="underline" href={`mailto:${theme.contact.email}`}>
            {theme.contact.email}
          </a>
          {theme.contact.calendly && (
            <>
              {" "}• Or{" "}
              <a className="underline" href={theme.contact.calendly} target="_blank" rel="noreferrer">
                book time
              </a>
              .
            </>
          )}
        </div>
      </Section>
    </main>
  );
}
