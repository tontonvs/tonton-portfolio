import portraitImg from "@/assets/tonton-portrait.png";

export function HeroPortrait() {
  return (
    <div className="relative aspect-[4/5] w-full max-w-md">
      {/* bright hot core — small, lightly blurred, so it survives and stays visible */}
      <div
        aria-hidden
        className="absolute -z-10"
        style={{
          top: "10%",
          left: "55%",
          width: "280px",
          height: "280px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, #FFFFFF 0%, #FFE9D6 35%, #FFA054 70%, rgba(255, 160, 84, 0) 100%)",
          filter: "blur(35px)",
          opacity: 0.85,
          pointerEvents: "none",
        }}
      />
      {/* ambient wash — large, heavily blurred, gives the glow room to breathe */}
      <div
        aria-hidden
        className="absolute -z-10"
        style={{
          top: "10%",
          left: "55%",
          width: "910px",
          height: "910px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, #FFA054 0%, #FF7A33 30%, #C9601F 50%, rgba(20, 16, 13, 0) 75%)",
          filter: "blur(90px)",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
      <div className="glass-panel relative h-full w-full overflow-hidden rounded-3xl">
        <img
          src={portraitImg}
          alt="Portrait of Tonton Mensah"
          className="h-full w-full object-cover object-top"
          style={{
            filter: "contrast(1.05) sepia(0.15) saturate(1.1) brightness(0.98)",
          }}
        />
        {/* subtle warm scrim so the photo sits into the ember palette rather than reading as a flat cutout */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,16,13,0) 55%, rgba(20,16,13,0.55) 100%)",
          }}
        />

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
