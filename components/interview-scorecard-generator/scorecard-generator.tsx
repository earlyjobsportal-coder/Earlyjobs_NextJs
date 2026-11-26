"use client";

import { useCallback, useMemo, useReducer, useState } from "react";

type Criterion = {
  id: string;
  name: string;
  weight: number;
};

type RatingScale = {
  min: number;
  max: number;
};

type Inputs = {
  role: string;
  interviewer: string;
  criteria: Criterion[];
  ratingScale: RatingScale;
};

const defaultCriteria: Criterion[] = [
  { id: "c1", name: "Understanding of job responsibilities", weight: 1 },
  { id: "c2", name: "Relevant educational background", weight: 1 },
  { id: "c3", name: "Willingness to work required shifts", weight: 1 },
  { id: "c4", name: "Basic technical knowledge", weight: 1 },
  { id: "c5", name: "Communication and ability to follow instructions", weight: 1 },
];

const defaults: Inputs = {
  role: "",
  interviewer: "",
  criteria: defaultCriteria,
  ratingScale: { min: 1, max: 5 },
};

const newCriterion = (id: string): Criterion => ({ id, name: "", weight: 1 });

type Action =
  | { type: "setRole"; value: string }
  | { type: "setInterviewer"; value: string }
  | { type: "setCriterionName"; id: string; value: string }
  | { type: "setCriterionWeight"; id: string; value: number }
  | { type: "addCriterion" }
  | { type: "removeCriterion"; id: string }
  | { type: "setRatingMin"; value: number }
  | { type: "setRatingMax"; value: number }
  | { type: "reset" };

function reducer(state: Inputs, action: Action): Inputs {
  switch (action.type) {
    case "setRole":
      return { ...state, role: action.value };
    case "setInterviewer":
      return { ...state, interviewer: action.value };
    case "setCriterionName":
      return {
        ...state,
        criteria: state.criteria.map((c) =>
          c.id === action.id ? { ...c, name: action.value } : c
        ),
      };
    case "setCriterionWeight":
      return {
        ...state,
        criteria: state.criteria.map((c) =>
          c.id === action.id ? { ...c, weight: action.value } : c
        ),
      };
    case "addCriterion":
      return {
        ...state,
        criteria: [...state.criteria, newCriterion(`c${Date.now()}`)],
      };
    case "removeCriterion":
      return {
        ...state,
        criteria: state.criteria.filter((c) => c.id !== action.id),
      };
    case "setRatingMin":
      return { ...state, ratingScale: { ...state.ratingScale, min: action.value } };
    case "setRatingMax":
      return { ...state, ratingScale: { ...state.ratingScale, max: action.value } };
    case "reset":
      return defaults;
    default:
      return state;
  }
}

function useScoreGenerator() {
  const [state, dispatch] = useReducer(reducer, defaults);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const dispatchAction = useCallback(
    (action: Action) => {
      dispatch(action);
      setGenerated(false);
    },
    []
  );

  const { role, interviewer, criteria, ratingScale } = state;

  const totalWeight = useMemo(
    () => criteria.reduce((sum, c) => sum + c.weight, 0),
    [criteria]
  );

  const generateScorecard = () => setGenerated(true);

  const printScorecard = () => window.print();

  const copyScorecard = () => {
    const lines = [
      "Interview Scorecard",
      `Role: ${role || "—"}`,
      `Interviewer: ${interviewer || "—"}`,
      `Rating scale: ${ratingScale.min}–${ratingScale.max}`,
      "",
      "Criteria:",
      ...criteria.map((c) => `  • ${c.name || "Untitled criterion"} (weight ${c.weight})`),
      "",
      "Candidate name:",
      "Role applied for:",
      "Interview date:",
      "",
      "Scores:",
      ...criteria.map((c) => `  ${c.name || "Criterion"}: ___ / ${ratingScale.max}`),
      "",
      "Evidence and observations:",
      ...criteria.map((c) => `  ${c.name || "Criterion"}:`),
      "",
      "Overall recommendation:",
      "",
      "Generated with EarlyJobs Interview Scorecard Generator.",
    ];
    try {
      navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return {
    state,
    dispatchAction,
    generated,
    copied,
    totalWeight,
    generateScorecard,
    printScorecard,
    copyScorecard,
  };
}

export function InterviewScorecardGenerator() {
  const {
    state,
    dispatchAction,
    generated,
    copied,
    totalWeight,
    generateScorecard,
    printScorecard,
    copyScorecard,
  } = useScoreGenerator();

  const { role, interviewer, criteria, ratingScale } = state;

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-[#f8fafc] px-5 py-4 sm:px-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
            Interview evaluation builder
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            Interview Scorecard Generator
          </h3>
        </div>
        <button
          type="button"
          onClick={() => dispatchAction({ type: "reset" })}
          className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Reset defaults
        </button>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="border-b border-black/5 p-5 sm:p-6 lg:border-r lg:border-b-0">
          <div className="space-y-5">
            <div>
              <label className="block text-[12px] font-medium text-neutral-700">
                Job title / role
              </label>
              <input
                id="role"
                type="text"
                value={role}
                onChange={(e) => dispatchAction({ type: "setRole", value: e.target.value })}
                placeholder="e.g. Production Trainee"
                className="mt-2 h-11 w-full border border-black/10 bg-white px-3 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-neutral-700">
                Interviewer name
              </label>
              <input
                id="interviewer"
                type="text"
                value={interviewer}
                onChange={(e) => dispatchAction({ type: "setInterviewer", value: e.target.value })}
                placeholder="e.g. Hiring Manager"
                className="mt-2 h-11 w-full border border-black/10 bg-white px-3 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
              />
            </div>

            <div className="pt-3 border-t border-black/10">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <span className="text-[12px] font-medium text-neutral-700">Evaluation criteria</span>
                <button
                  type="button"
                  onClick={() => dispatchAction({ type: "addCriterion" })}
                  className="rounded-lg border border-black/10 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  Add criterion
                </button>
              </div>
              {criteria.map((criterion, index) => (
                <div
                  key={criterion.id}
                  className="flex gap-3 items-start"
                >
                  <input
                    id={`criterion-${criterion.id}`}
                    type="text"
                    value={criterion.name}
                    onChange={(e) => dispatchAction({ type: "setCriterionName", id: criterion.id, value: e.target.value })}
                    placeholder="Criterion name"
                    className="flex-1 h-10 border border-black/10 bg-white px-2.5 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                  />
                  <input
                    type="number"
                    min={0}
                    max={10}
                    step={1}
                    value={criterion.weight}
                    onChange={(e) => {
                      const next = Number(e.target.value);
                      dispatchAction({
                        type: "setCriterionWeight",
                        id: criterion.id,
                        value: Number.isFinite(next) ? next : 1,
                      });
                    }}
                    className="h-10 w-14 border border-black/10 bg-white px-2 text-sm tabular-nums text-neutral-950 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                  />
                  <button
                    type="button"
                    onClick={() => dispatchAction({ type: "removeCriterion", id: criterion.id })}
                    disabled={criteria.length === 1}
                    aria-label="Remove criterion"
                    className="shrink-0 rounded-lg border border-black/10 bg-white px-2 py-1 text-[10px] font-medium text-neutral-500 transition-colors hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    –{index + 1}
                  </button>
                </div>
              ))}
              <p className="mt-2 text-[11px] leading-5 text-neutral-500">
                Total weight: {totalWeight}. Give greater weight to criteria essential for the role.
              </p>
            </div>

            <div className="pt-3 border-t border-black/10 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-neutral-700">
                  Rating scale minimum
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  step={1}
                  value={ratingScale.min}
                  onChange={(e) => {
                    const next = Number(e.target.value);
                    if (Number.isFinite(next)) dispatchAction({ type: "setRatingMin", value: next });
                  }}
                  className="mt-2 h-10 w-full border border-black/10 bg-white px-2.5 text-sm tabular-nums text-neutral-950 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-neutral-700">
                  Rating scale maximum
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  step={1}
                  value={ratingScale.max}
                  onChange={(e) => {
                    const next = Number(e.target.value);
                    if (Number.isFinite(next)) dispatchAction({ type: "setRatingMax", value: next });
                  }}
                  className="mt-2 h-10 w-full border border-black/10 bg-white px-2.5 text-sm tabular-nums text-neutral-950 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f8fafc] p-5 sm:p-6">
          {!generated ? (
            <>
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-[-0.02em] text-neutral-950">
                  Generate your scorecard
                </p>
                <p className="text-sm leading-6 text-neutral-600">
                  Enter the role, define evaluation criteria and set a rating scale. The generator
                  creates an editable scorecard you can print, copy or use for interviews.
                </p>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={generateScorecard}
                  disabled={!role.trim()}
                  className={`mt-2 inline-flex h-11 items-center justify-center rounded-[6px] px-4 text-[13px] font-medium transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] ${!role.trim() ? "bg-neutral-100 text-neutral-400" : "bg-brand text-white hover:bg-[#d85c42]"}`}
                >
                  Create an Interview Scorecard
                </button>
                {role.trim() === "" && (
                  <p className="mt-2 text-[11px] leading-5 text-neutral-500">
                    Enter a job title to enable generation.
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-baseline justify-between gap-3 mb-4">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                    Generated scorecard
                  </p>
                  <h3 className="text-base font-semibold tracking-[-0.02em] text-neutral-950">
                    {role || "Untitled Role"} — Interview Scorecard
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={copyScorecard}
                    className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                  >
                    {copied ? "Copied" : "Copy text"}
                  </button>
                  <button
                    type="button"
                    onClick={printScorecard}
                    className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                  >
                    Print
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-black/10 bg-white p-4 sm:p-5">
                  <p className="text-[11px] font-semibold tracking-[0.08em] text-neutral-400 uppercase">
                    Candidate information
                  </p>
                  <div className="mt-3 grid sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium text-neutral-600 uppercase">
                        Candidate name
                      </label>
                      <input type="text" className="h-9 border border-black/10 bg-white px-2 text-sm text-neutral-950 focus:border-[#2563EB]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium text-neutral-600 uppercase">
                        Role applied for
                      </label>
                      <input type="text" className="h-9 border border-black/10 bg-white px-2 text-sm text-neutral-950 focus:border-[#2563EB]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium text-neutral-600 uppercase">
                        Interview date
                      </label>
                      <input type="date" className="h-9 border border-black/10 bg-white px-2 text-sm text-neutral-950 focus:border-[#2563EB]" />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-4 sm:p-5">
                  <p className="text-[11px] font-semibold tracking-[0.08em] text-neutral-400 uppercase">
                    Evaluation criteria
                  </p>
                  <table className="mt-3 w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-black/10">
                        <th className="pb-2 text-[11px] font-medium text-neutral-600 uppercase">Criterion</th>
                        <th className="pb-2 text-[11px] font-medium text-neutral-600 uppercase text-right">Weight</th>
                        <th className="pb-2 text-[11px] font-medium text-neutral-600 uppercase text-right">Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {criteria.map((c) => (
                        <tr key={c.id} className="text-sm">
                          <td className="py-3 text-neutral-700">{c.name || "Untitled criterion"}</td>
                          <td className="py-3 tabular-nums text-right text-neutral-700">
                            {c.weight}
                          </td>
                          <td className="py-3 text-right">
                            <input
                              type="number"
                              min={ratingScale.min}
                              max={ratingScale.max}
                              step={1}
                              className="h-9 w-16 border border-black/10 bg-white px-2 tabular-nums text-sm text-neutral-950 text-right outline-none focus:border-[#2563EB]"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-4 sm:p-5">
                  <p className="text-[11px] font-semibold tracking-[0.08em] text-neutral-400 uppercase">
                    Evidence and observations
                  </p>
                  {criteria.map((c) => (
                    <div key={c.id} className="flex flex-col gap-1">
                      <label className="text-[11px] font-medium text-neutral-600 uppercase">
                        {c.name || "Criterion"}
                      </label>
                      <textarea
                        rows={2}
                        className="h-auto w-full border border-black/10 bg-white px-2 py-1.5 text-sm text-neutral-950 focus:border-[#2563EB]"
                      />
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-4 sm:p-5">
                  <p className="text-[11px] font-semibold tracking-[0.08em] text-neutral-400 uppercase">
                    Overall recommendation
                  </p>
                  <div className="mt-3 space-y-2">
                    <label className="flex items-start gap-2 text-sm text-neutral-700">
                      <input type="radio" name="recommendation" value="proceed" className="mt-0.5" />
                      <span>Proceed to next stage</span>
                    </label>
                    <label className="flex items-start gap-2 text-sm text-neutral-700">
                      <input type="radio" name="recommendation" value="hold" className="mt-0.5" />
                      <span>Hold — request further assessment</span>
                    </label>
                    <label className="flex items-start gap-2 text-sm text-neutral-700">
                      <input type="radio" name="recommendation" value="decline" className="mt-0.5" />
                      <span>Decline</span>
                    </label>
                  </div>
                  <p className="mt-3 text-[11px] leading-5 text-neutral-500">
                    A scorecard does not assign a hiring decision automatically. Consider the
                    complete selection process and mandatory requirements.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[11px] leading-5 text-neutral-500">
                Illustrative template for employer use — adapt criteria to each role and review for
                fairness and relevance.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
