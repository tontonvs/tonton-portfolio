export function HeroPortrait() {
  return (
    <div className="relative aspect-[4/5] w-full max-w-md">
      {/* warm static radial glow */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--ember) 45%, transparent), transparent 70%)",
        }}
      />
      <div className="glass-panel relative h-full w-full overflow-hidden rounded-3xl">
        <svg
          viewBox="0 0 400 500"
          className="h-full w-full"
          role="img"
          aria-label="Abstract geometric portrait"
        >
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF7A33" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C9601F" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="g2" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#F5EFE6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#F5EFE6" stopOpacity="0.02" />
            </linearGradient>
            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M24 0H0V24"
                fill="none"
                stroke="#F5EFE6"
                strokeOpacity="0.05"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="400" height="500" fill="url(#grid)" />
          {/* silhouette */}
          <circle cx="200" cy="180" r="70" fill="url(#g1)" />
          <path
            d="M80 500 C 80 340, 320 340, 320 500 Z"
            fill="url(#g1)"
            opacity="0.85"
          />
          <path
            d="M40 500 C 40 380, 360 380, 360 500 Z"
            fill="url(#g2)"
          />
          {/* orbit lines */}
          <circle
            cx="200"
            cy="180"
            r="110"
            fill="none"
            stroke="#FF7A33"
            strokeOpacity="0.25"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="180"
            r="150"
            fill="none"
            stroke="#F5EFE6"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        </svg>

        {/* signature terminal detail */}
        <div className="pointer-events-none absolute bottom-4 left-4 right-4">
          <div className="glass-panel rounded-lg p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
            <div>
              <span className="text-ember">$</span> whoami
            </div>
            <div className="text-foreground">tonton — fullstack, offline-first</div>
          </div>
        </div>
      </div>
    </div>
  );
}
