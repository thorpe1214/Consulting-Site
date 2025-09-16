// src/components/MeshBG.tsx
export default function MeshBG() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white dark:from-neutral-900 dark:to-neutral-950" />
      <svg
        className="absolute inset-0 h-full w-full opacity-40 mix-blend-multiply dark:opacity-30"
        viewBox="0 0 800 600"
        aria-hidden
      >
        <defs>
          <radialGradient id="dot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {/* light dotted nodes */}
        {Array.from({ length: 48 }).map((_, i) => {
          const x = (i * 73) % 800;
          const y = (i * 137) % 600;
          return <circle key={i} cx={x} cy={y} r="3" fill="url(#dot)" />;
        })}
        {/* faint connecting lines */}
        {Array.from({ length: 30 }).map((_, i) => {
          const x1 = (i * 91) % 800;
          const y1 = (i * 181) % 600;
          const x2 = (x1 + 120) % 800;
          const y2 = (y1 + 220) % 600;
          return <line key={`l-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#cbd5e1" strokeOpacity="0.25" />;
        })}
      </svg>
    </div>
  );
}

