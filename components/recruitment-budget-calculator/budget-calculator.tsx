"use client";

import { useMemo, useState } from "react";

type Inputs = {
  plannedHires: number;
  advertising: number;
  agency: number;
  internalRecruiting: number;
  assessments: number;
  other: number;
};

const defaults: Inputs = {
  plannedHires: 40,
  advertising: 30000,
  agency: 80000,
  internalRecruiting: 50000,
  assessments: 20000,
  other: 20000,
};

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)));
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
}: {
  id: string;
  label: string;
  hint: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium tracking-[-0.02em] text-neutral-950">{label}</span>
        <span className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
          INR
        </span>
      </span>
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => {
          const next = Number(event.target.value);
          onChange(Number.isFinite(next) ? clamp(next, min, max) : min);
        }}
        className="mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm tabular-nums text-neutral-950 outline-none transition-colors focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
      />
      <span className="mt-1.5 block text-[12px] leading-5 text-neutral-500">{hint}</span>
    </label>
  );
}

export function RecruitmentBudgetCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaults);
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const total =
      inputs.advertising +
      inputs.agency +
      inputs.internalRecruiting +
      inputs.assessments +
      inputs.other;
    const costPerHire = inputs.plannedHires > 0 ? total / inputs.plannedHires : null;
    return { total, costPerHire };
  }, [inputs]);

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  async function copySummary() {
    const lines = [
      "EarlyJobs Recruitment Budget Summary",
      `Planned hires: ${inputs.plannedHires}`,
      `Job advertising: ${formatInr(inputs.advertising)}`,
      `Agency and sourcing: ${formatInr(inputs.agency)}`,
      `Internal recruiting: ${formatInr(inputs.internalRecruiting)}`,
      `Assessments: ${formatInr(inputs.assessments)}`,
      `Other expenses: ${formatInr(inputs.other)}`,
      `Total recruitment budget: ${formatInr(results.total)}`,
      results.costPerHire !== null
        ? `Planned cost per hire: ${formatInr(results.costPerHire)}`
        : "Planned cost per hire: cannot be calculated with zero hires",
      "Formula: Total ÷ Planned Hires",
      "Illustrative planning figures — not a commercial quotation.",
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-[#f8fafc] px-5 py-4 sm:px-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
            Recruitment budget planner
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            Recruitment Budget Calculator
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setInputs(defaults)}
          className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Reset defaults
        </button>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="border-b border-black/5 p-5 sm:p-6 lg:border-r lg:border-b-0">
          <div className="grid gap-5">
            <Field
              id="planned-hires"
              label="Planned hires"
              hint="Number of hires planned for the period."
              value={inputs.plannedHires}
              onChange={(value) => update("plannedHires", value)}
              min={0}
              max={100000}
            />
            <Field
              id="advertising"
              label="Job advertising"
              hint="Paid recruitment advertisements."
              value={inputs.advertising}
              onChange={(value) => update("advertising", value)}
              min={0}
              max={100000000}
              step={1000}
            />
            <Field
              id="agency"
              label="Agency and sourcing"
              hint="External recruitment provider fees under agreed terms."
              value={inputs.agency}
              onChange={(value) => update("agency", value)}
              min={0}
              max={100000000}
              step={1000}
            />
            <Field
              id="internal-recruiting"
              label="Internal recruiting"
              hint="Recruiter time and internal hiring administration."
              value={inputs.internalRecruiting}
              onChange={(value) => update("internalRecruiting", value)}
              min={0}
              max={100000000}
              step={1000}
            />
            <Field
              id="assessments"
              label="Assessment expenses"
              hint="Testing, interview or evaluation costs."
              value={inputs.assessments}
              onChange={(value) => update("assessments", value)}
              min={0}
              max={100000000}
              step={1000}
            />
            <Field
              id="other"
              label="Other expenses"
              hint="Travel reimbursements and employer-approved recruitment costs."
              value={inputs.other}
              onChange={(value) => update("other", value)}
              min={0}
              max={100000000}
              step={1000}
            />
          </div>
        </div>

        <div className="bg-[#f8fafc] p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Total recruitment budget
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums">
                {formatInr(results.total)}
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Planned cost per hire
              </p>
              {results.costPerHire !== null ? (
                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums text-[#2563EB]">
                  {formatInr(results.costPerHire)}
                </p>
              ) : (
                <p className="mt-2 text-sm leading-6 text-amber-800">
                  Cannot calculate with zero hires. Enter at least one planned hire.
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 sm:p-5">
            <p className="text-sm font-semibold tracking-[-0.02em]">Transparent formula</p>
            <p className="mt-3 rounded-lg bg-[#f8fafc] px-3 py-3 font-mono text-[12px] leading-5 text-neutral-700 sm:text-[13px]">
              Recruitment Budget = Advertising + Agency + Internal Recruiting + Assessments +
              Other
            </p>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Planned Cost per Hire = Total Budget ÷ Planned Hires
            </p>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Employee compensation after joining is usually tracked separately from this budget.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copySummary}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              {copied ? "Copied" : "Copy summary"}
            </button>
          </div>

          <p className="mt-4 text-[12px] leading-5 text-neutral-500">
            Illustrative planning figures — not industry benchmarks or EarlyJobs pricing. Avoid
            double-counting costs included in more than one category.
          </p>
        </div>
      </div>
    </div>
  );
}
