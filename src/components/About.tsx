// components/About.tsx
import Section from "@/components/Section";

export default function About() {
  return (
    <Section id="about" title="About" className="pb-16">
      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <p className="text-neutral-700">
            I’m a builder who turns complex operations into simple, repeatable systems.
            I’ve led platform rollouts (Entrata, Yardi, Yardi CRM, Knock), revenue programs
            (LRO, YieldStar/AIRM), and training for teams from leasing to regional leadership.
            My approach is practical: fix the pipeline, lock the cadence, make execution easy—
            then price with confidence.
          </p>
          <ul className="mt-4 text-neutral-700 list-disc pl-5">
            <li>Tech rollouts with real adoption (live trainings, SOPs, recordings, checkpoints)</li>
            <li>CRM lifecycle playbooks from lead → tour → app → onboarding → service → renewal</li>
            <li>Revenue cadence that balances occupancy, rate integrity, and seasonality</li>
            <li>Role-based reporting for owners and operators</li>
          </ul>
        </div>
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h4 className="font-semibold">Availability</h4>
            <p className="mt-2 text-neutral-700">
              Consulting and select full-time roles. Remote-first; travel as needed.
            </p>
            <div className="mt-4 text-sm text-neutral-600">
              <div>• Mix-and-match modules</div>
              <div>• Audit → Sprint → Coaching</div>
              <div>• Fractional option (10–20 hrs/wk)</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

