"use client";

import { useMemo, useState } from "react";
import { SolidLink } from "@/components/home/primitives";

type Criterion = {
  id: string;
  name: string;
  weight: number;
  scores: [number, number, number];
  notes: string;
};

type Providers = [string, string, string];

const defaultCriteria: Criterion[] = [
  {
    id: "c1",
    name: "Relevant recruitment experience",
    weight: 25,
    scores: [4, 3, 4],
    notes: "",
  },
  {
    id: "c2",
    name: "Candidate sourcing approach",
    weight: 20,
    scores: [4, 4, 3],
    notes: "",
  },
  {
    id: "c3",
    name: "Recruitment process",
    weight: 20,
    scores: [3, 4, 3],
    notes: "",
  },
  {
    id: "c4",
    name: "Communication",
    weight: 15,
    scores: [4, 3, 4],
    notes: "",
  },
  {
    id: "c5",
    name: "Commercial terms",
    weight: 10,
    scores: [3, 4, 3],
    notes: "",
  },
  {
    id: "c6",
    name: "Reporting and compliance",
    weight: 10,
    scores: [4, 3, 4],
    notes: "",
  },
];

const defaultProviders: Providers = ["Provider A", "Provider B", "EarlyJobs"];

function clampScore(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.min(5, Math.max(1, Math.round(value)));
}

function clampWeight(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
}

type AgencyScorecardProps = {
  xlsxAvailable: boolean;
};

export function AgencyScorecard({ xlsxAvailable }: AgencyScorecardProps) {
  const [providers, setProviders] = useState<Providers>(defaultProviders);
  const [criteria, setCriteria] = useState<Criterion[]>(defaultCriteria);

  const totalWeight = useMemo(
    () => criteria.reduce((sum, item) => sum + item.weight, 0),
    [criteria]
  );
  const weightsValid = totalWeight === 100;

  const weightedTotals = useMemo(() => {
    return [0, 1, 2].map((providerIndex) =>
      criteria.reduce((sum, item) => {
        if (!weightsValid) return 0;
        return sum + (item.scores[providerIndex] * item.weight) / 100;
      }, 0)
    ) as [number, number, number];
  }, [criteria, weightsValid]);

  function updateProvider(index: 0 | 1 | 2, value: string) {
    setProviders((prev) => {
      const next: Providers = [...prev];
      next[index] = value;
      return next;
    });
  }

  function updateCriterion(id: string, patch: Partial<Criterion>) {
    setCriteria((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  }

  function updateScore(id: string, providerIndex: 0 | 1 | 2, value: number) {
    setCriteria((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const scores: [number, number, number] = [...item.scores];
        scores[providerIndex] = clampScore(value);
        return { ...item, scores };
      })
    );
  }

  function resetDefaults() {
    setProviders(defaultProviders);
    setCriteria(defaultCriteria);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-[#f8fafc] px-5 py-4 sm:px-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
            Interactive vendor comparison
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            Recruitment Agency Evaluation Scorecard
          </h3>
        </div>
        <button
          type="button"
          onClick={resetDefaults}
          className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Reset defaults
        </button>
      </div>

      <div className="border-b border-black/5 bg-white px-5 py-4 sm:px-6">
        <p className="text-sm leading-6 text-neutral-600">
          Enter provider names, adjust criterion weights so they total 100%, then score each provider
          from 1–5. Download the XLSX for offline evaluation and due diligence notes.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {xlsxAvailable ? (
            <a
              href="/resources/earlyjobs-recruitment-agency-evaluation-scorecard.xlsx"
              download
              className="inline-flex h-10 items-center justify-center rounded-[6px] bg-brand px-4 text-[13px] font-medium text-white transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-[#d85c42]"
            >
              Download XLSX Scorecard
            </a>
          ) : (
            <p className="text-sm text-neutral-500">
              Download file is being prepared. Use the interactive comparison below in the meantime.
            </p>
          )}
        </div>
      </div>

      <div className="border-b border-black/5 p-5 sm:p-6">
        <p className="text-[12px] font-semibold tracking-[0.08em] text-neutral-500 uppercase">
          Providers
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {providers.map((provider, index) => (
            <label key={index} className="block">
              <span className="text-[12px] font-medium text-neutral-700">
                Provider {String.fromCharCode(65 + index)}
              </span>
              <input
                type="text"
                value={provider}
                onChange={(event) => updateProvider(index as 0 | 1 | 2, event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-neutral-950 outline-none transition-colors focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[860px] w-full border-collapse text-left text-[12px]">
          <thead>
            <tr className="border-b border-black/10 bg-[#f8fafc]">
              <th className="px-3 py-3 font-semibold text-neutral-700">Criterion</th>
              <th className="px-3 py-3 font-semibold text-neutral-700">Weight %</th>
              {providers.map((provider) => (
                <th key={provider} className="px-3 py-3 font-semibold text-neutral-700">
                  {provider || "Provider"} (1–5)
                </th>
              ))}
              <th className="px-3 py-3 font-semibold text-neutral-700">Notes</th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((item) => (
              <tr key={item.id} className="border-b border-black/5 align-top">
                <td className="px-3 py-3">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(event) => updateCriterion(item.id, { name: event.target.value })}
                    className="w-full min-w-[160px] rounded-md border border-black/10 bg-white px-2 py-1.5 text-[12px] outline-none focus:border-[#2563EB]"
                  />
                </td>
                <td className="px-3 py-3">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={item.weight}
                    onChange={(event) =>
                      updateCriterion(item.id, {
                        weight: clampWeight(Number(event.target.value)),
                      })
                    }
                    className="w-20 rounded-md border border-black/10 bg-white px-2 py-1.5 text-[12px] tabular-nums outline-none focus:border-[#2563EB]"
                  />
                </td>
                {([0, 1, 2] as const).map((providerIndex) => (
                  <td key={providerIndex} className="px-3 py-3">
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={item.scores[providerIndex]}
                      onChange={(event) =>
                        updateScore(item.id, providerIndex, Number(event.target.value))
                      }
                      className="w-16 rounded-md border border-black/10 bg-white px-2 py-1.5 text-[12px] tabular-nums outline-none focus:border-[#2563EB]"
                    />
                  </td>
                ))}
                <td className="px-3 py-3">
                  <input
                    type="text"
                    value={item.notes}
                    placeholder="Evidence / clarifications"
                    onChange={(event) => updateCriterion(item.id, { notes: event.target.value })}
                    className="w-full min-w-[160px] rounded-md border border-black/10 bg-white px-2 py-1.5 text-[12px] outline-none focus:border-[#2563EB]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 border-t border-black/5 bg-[#f8fafc] p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:p-6">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.08em] text-neutral-500 uppercase">
            Weight validation
          </p>
          <p
            className={`mt-2 text-sm font-medium ${
              weightsValid ? "text-emerald-700" : "text-[#c2410c]"
            }`}
          >
            Total weight: {totalWeight}% {weightsValid ? "— valid" : "— must equal 100%"}
          </p>
          <p className="mt-2 text-[12px] leading-5 text-neutral-500">
            Weighted totals update only when criterion weights sum to exactly 100%.
          </p>
        </div>
        <div>
          <p className="text-[12px] font-semibold tracking-[0.08em] text-neutral-500 uppercase">
            Weighted comparison
          </p>
          <ul className="mt-3 space-y-2">
            {providers.map((provider, index) => (
              <li
                key={`${provider}-${index}`}
                className="flex items-center justify-between rounded-lg border border-black/10 bg-white px-3 py-2.5"
              >
                <span className="text-[13px] font-medium text-neutral-900">
                  {provider || `Provider ${String.fromCharCode(65 + index)}`}
                </span>
                <span className="text-[13px] tabular-nums text-neutral-700">
                  {weightsValid ? weightedTotals[index].toFixed(2) : "—"}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12px] leading-5 text-neutral-500">
            A numerical score should not override serious contractual, compliance or trust concerns.
          </p>
        </div>
      </div>

      <div className="border-t border-black/5 px-5 py-5 sm:px-6">
        <SolidLink href="#enquiry">Discuss Recruitment Requirements with EarlyJobs</SolidLink>
      </div>
    </div>
  );
}
