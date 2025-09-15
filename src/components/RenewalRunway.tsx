// components/RenewalRunway.tsx
export default function RenewalRunway() {
  const steps = ["D-180", "D-120", "D-90", "D-60", "D-30"];
  return (
    <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h4 className="text-lg font-semibold">Renewal Runway</h4>
      <p className="mt-2 text-neutral-700">
        Proactive cadence with save tactics and offer logic—so renewals aren’t last-minute.
      </p>
      <div className="mt-4 flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex items-center">
            <div className="h-9 w-9 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-medium">{s}</div>
            {i < steps.length - 1 && <div className="mx-2 h-[2px] flex-1 bg-neutral-300" />}
          </div>
        ))}
      </div>
      <ul className="mt-4 text-sm text-neutral-700 list-disc pl-5">
        <li>Templates + alert timelines (CRM)</li>
        <li>Offer logic (fixed vs dynamic) and save tactics</li>
        <li>Manager/Regional visibility on risks & overdue touches</li>
      </ul>
    </div>
  );
}

