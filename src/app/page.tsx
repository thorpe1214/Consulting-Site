import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ServicesGrid from "@/components/ServicesGrid";
import About from "@/components/About";
import PlanForm from "../../components/PlanForm";
import RenewalRunway from "@/components/RenewalRunway";
import Proof from "@/components/Proof";
import { theme } from "@/config/theme";
import SnapSection from "@/components/SnapSection";
import DotNav from "@/components/DotNav";
import { sectionBlocks } from "@/lib/sections";

export default function Page() {
  const dots = sectionBlocks.map((s) => ({ id: s.id, label: s.title }));
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Full-screen stacked sections with snap */}
      <div className="snap-y snap-mandatory h-[100svh] overflow-y-auto">
        {/* Hero stays as first impression */}
        <Hero />

        {/* Category sections */}
        {sectionBlocks.map((s, idx) => (
          <SnapSection
            key={s.id}
            id={s.id}
            title={s.title}
            blurb={s.blurb}
            nextId={sectionBlocks[idx + 1]?.id ?? "services"}
          />
        ))}

        {/* Services grid and rest of page */}
        <Section id="services" title="Services" className="pb-16">
          <ServicesGrid />
          <div className="mt-8"><RenewalRunway /></div>
        </Section>

        <Proof />
        <About />

        <Section id="contact" title="Contact" className="pb-24">
          <p className="mt-3 text-neutral-700 dark:text-neutral-200">
            Pick the modules you want and I’ll send a modular proposal.
          </p>
          <PlanForm />
          <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            Or email me directly:{" "}
            <a className="underline" href={`mailto:${theme.contact.email}`}>
              {theme.contact.email}
            </a>
            {theme.contact.calendly && (
              <>
                {" "}&bull;{" "}
                <a className="underline" href={theme.contact.calendly} target="_blank" rel="noreferrer">
                  book time
                </a>
              </>
            )}
          </div>
        </Section>
      </div>

      {/* Right-side dot nav */}
      <DotNav dots={dots} />
    </main>
  );
}
