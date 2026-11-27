export function HomeHealthcareHeroVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-rose-400/15 via-transparent to-amber-500/10 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
        <div
          className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]"
          style={{
            background: "linear-gradient(160deg, #fff7f6 0%, #fef3e2 40%, #f8fafc 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 20% 10%, rgba(236, 72, 153, 0.16), transparent 45%), radial-gradient(ellipse at 85% 80%, rgba(245, 158, 11, 0.1), transparent 40%)",
            }}
          />

          <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-6">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-rose-700/80 uppercase">
              Home healthcare
            </p>
            <span className="rounded-full bg-rose-600/10 px-2.5 py-0.5 text-[10px] font-semibold text-rose-800">
              Care at home
            </span>
          </div>

          {/* Care visit schedule panels */}
          <div className="absolute inset-x-5 bottom-[20%] top-[24%] sm:inset-x-7">
            <div className="grid h-full grid-cols-3 gap-2 sm:gap-3">
              {[
                { title: "Morning visit", bars: [55, 40, 70, 48] },
                { title: "Midday support", bars: [45, 60, 50, 62] },
                { title: "Evening care", bars: [65, 52, 40, 58] },
              ].map((panel) => (
                <div
                  key={panel.title}
                  className="flex flex-col rounded-xl border border-rose-100/90 bg-white/80 p-2.5 shadow-sm backdrop-blur-sm"
                >
                  <div className="flex h-16 items-end gap-1 sm:h-20">
                    {panel.bars.map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-gradient-to-t from-rose-500/50 to-amber-400/40"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] font-medium tracking-[0.08em] text-rose-900/70 uppercase">
                    {panel.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-6">
            <div className="rounded-xl border border-rose-100/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-neutral-500">Hiring focus</p>
                  <p className="mt-0.5 text-sm font-semibold text-neutral-950">
                    Nursing · Caregiving · Coordination
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-[11px] text-neutral-500">Service areas</p>
                  <p className="mt-0.5 text-sm font-semibold text-rose-800">Multi-city India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-black/5 bg-[#f8fafc] px-4 py-3 sm:px-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              Home healthcare & caregiver
            </p>
            <p className="mt-0.5 text-sm font-medium text-neutral-950">
              Respectful home care context
            </p>
          </div>
          <span className="shrink-0 rounded-md border border-black/10 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-600">
            Care ops
          </span>
        </div>
      </div>
    </div>
  );
}
