function Turbine({
  height,
  opacity = 1,
  delay = "0s",
}: {
  height: string;
  opacity?: number;
  delay?: string;
}) {
  return (
    <div className="relative flex flex-col items-center" style={{ height, opacity }}>
      {/* Rotor hub + blades */}
      <div
        className="relative z-10 size-3 shrink-0 rounded-full bg-white/85 shadow-[0_0_12px_rgba(251,191,36,0.35)] animate-[spin_12s_linear_infinite] sm:size-3.5"
        style={{ animationDelay: delay }}
      >
        {[0, 120, 240].map((deg) => (
          <span
            key={deg}
            aria-hidden
            className="absolute left-1/2 top-1/2 origin-bottom rounded-full bg-gradient-to-t from-white/90 to-white/55"
            style={{
              width: "2px",
              height: "2.75rem",
              marginLeft: "-1px",
              marginTop: "-2.75rem",
              transform: `rotate(${deg}deg)`,
            }}
          />
        ))}
      </div>
      {/* Nacelle */}
      <div className="relative z-10 -mt-0.5 h-2 w-5 rounded-sm bg-white/70 sm:h-2.5 sm:w-6" />
      {/* Tower */}
      <div className="w-1 flex-1 rounded-b-sm bg-gradient-to-b from-white/55 to-white/20 sm:w-1.5" />
      {/* Base */}
      <div className="h-1 w-4 rounded-sm bg-amber-300/80 sm:w-5" />
    </div>
  );
}

export function WindHeroVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-400/15 via-transparent to-[#2563EB]/10 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
        <div
          className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]"
          style={{
            background:
              "linear-gradient(165deg, #1c1917 0%, #292524 42%, #0c4a6e 100%)",
          }}
        >
          {/* Horizon glow */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1/2"
            style={{
              background:
                "radial-gradient(ellipse at 70% 20%, rgba(251,191,36,0.35), transparent 55%)",
            }}
          />

          {/* Ground plane */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[42%]"
            style={{
              background:
                "linear-gradient(180deg, rgba(68,64,60,0.2) 0%, #1c1917 100%)",
            }}
          />

          {/* Turbine silhouettes */}
          <div
            aria-hidden
            className="absolute inset-x-6 bottom-[22%] top-[18%] flex items-end justify-center gap-6 sm:inset-x-10 sm:gap-10"
          >
            <Turbine height="68%" opacity={0.75} delay="0s" />
            <Turbine height="100%" opacity={1} delay="-4s" />
            <Turbine height="78%" opacity={0.85} delay="-8s" />
          </div>

          <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-6">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-amber-200/80 uppercase">
              Wind farm site
            </p>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-sky-100">
              Turbine workforce
            </span>
          </div>

          <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-6">
            <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-white/50">Hiring focus</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    Technicians · Ops · Logistics
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-[11px] text-white/50">Coverage</p>
                  <p className="mt-0.5 text-sm font-semibold text-amber-200">Multi-site India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-black/5 bg-[#f8fafc] px-4 py-3 sm:px-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              Wind energy
            </p>
            <p className="mt-0.5 text-sm font-medium text-neutral-950">
              Authentic turbine maintenance context
            </p>
          </div>
          <span className="shrink-0 rounded-md border border-black/10 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-600">
            Developers & O&M
          </span>
        </div>
      </div>
    </div>
  );
}
