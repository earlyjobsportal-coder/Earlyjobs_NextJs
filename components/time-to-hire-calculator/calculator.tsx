"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type HireRecord = {
  id: string;
  label: string;
  roleCategory: string;
  entryDate: string;
  acceptanceDate: string;
};

type DurationResult = {
  record: HireRecord;
  days: number | null;
  error: string | null;
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseDateOnly(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

function calendarDaysBetween(entryDate: string, acceptanceDate: string): number | null {
  const entry = parseDateOnly(entryDate);
  const acceptance = parseDateOnly(acceptanceDate);
  if (!entry || !acceptance) return null;
  return Math.round((acceptance.getTime() - entry.getTime()) / MS_PER_DAY);
}

function formatDateLabel(value: string) {
  const date = parseDateOnly(value);
  if (!date) return value || "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function createId() {
  return `hire-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function shiftDate(iso: string, days: number) {
  const date = parseDateOnly(iso);
  if (!date) return iso;
  date.setDate(date.getDate() + days);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function defaultRecords(): HireRecord[] {
  const today = new Date();
  const base = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return [
    {
      id: "hire-a",
      label: "Candidate A",
      roleCategory: "Warehouse associate",
      entryDate: shiftDate(base, -45),
      acceptanceDate: shiftDate(base, -33),
    },
    {
      id: "hire-b",
      label: "Candidate B",
      roleCategory: "Industrial technician",
      entryDate: shiftDate(base, -50),
      acceptanceDate: shiftDate(base, -32),
    },
    {
      id: "hire-c",
      label: "Candidate C",
      roleCategory: "Warehouse associate",
      entryDate: shiftDate(base, -40),
      acceptanceDate: shiftDate(base, -25),
    },
  ];
}

function emptyRecord(): HireRecord {
  return {
    id: createId(),
    label: "",
    roleCategory: "",
    entryDate: "",
    acceptanceDate: "",
  };
}

function csvEscape(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function evaluateRecord(record: HireRecord): DurationResult {
  if (!record.entryDate || !record.acceptanceDate) {
    return { record, days: null, error: "Enter both dates to calculate duration." };
  }
  if (!parseDateOnly(record.entryDate) || !parseDateOnly(record.acceptanceDate)) {
    return { record, days: null, error: "Use a valid calendar date." };
  }
  const days = calendarDaysBetween(record.entryDate, record.acceptanceDate);
  if (days === null) {
    return { record, days: null, error: "Unable to calculate duration." };
  }
  if (days < 0) {
    return {
      record,
      days: null,
      error: "Offer acceptance date cannot be earlier than the candidate entry date.",
    };
  }
  return { record, days, error: null };
}

export function TimeToHireCalculator() {
  const [records, setRecords] = useState<HireRecord[]>(defaultRecords);
  const [copied, setCopied] = useState(false);

  const evaluated = useMemo(() => records.map(evaluateRecord), [records]);

  const summary = useMemo(() => {
    const valid = evaluated.filter((item): item is DurationResult & { days: number } => item.days !== null);
    const durations = valid.map((item) => item.days);
    const count = durations.length;
    const total = durations.reduce((sum, days) => sum + days, 0);
    const average = count > 0 ? total / count : null;
    const longest = count > 0 ? Math.max(...durations) : null;
    const shortest = count > 0 ? Math.min(...durations) : null;
    const byCategory = new Map<string, number[]>();

    for (const item of valid) {
      const key = item.record.roleCategory.trim() || "Uncategorised";
      const list = byCategory.get(key) ?? [];
      list.push(item.days);
      byCategory.set(key, list);
    }

    const categoryAverages = Array.from(byCategory.entries())
      .map(([category, values]) => ({
        category,
        average: values.reduce((sum, days) => sum + days, 0) / values.length,
        count: values.length,
      }))
      .sort((a, b) => a.category.localeCompare(b.category));

    return {
      validCount: count,
      average,
      longest,
      shortest,
      categoryAverages,
    };
  }, [evaluated]);

  function updateRecord(id: string, patch: Partial<HireRecord>) {
    setRecords((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  function addRecord() {
    setRecords((prev) => [...prev, emptyRecord()]);
  }

  function removeRecord(id: string) {
    setRecords((prev) => (prev.length <= 1 ? prev : prev.filter((row) => row.id !== id)));
  }

  function resetDefaults() {
    setRecords(defaultRecords());
  }

  async function copySummary() {
    const lines = [
      "EarlyJobs Time-to-Hire Summary",
      `Completed hires calculated: ${summary.validCount}`,
      summary.average !== null
        ? `Average time to hire: ${summary.average.toFixed(summary.average % 1 === 0 ? 0 : 1)} calendar days`
        : "Average time to hire: enter at least one valid hire",
      summary.longest !== null ? `Longest duration: ${summary.longest} calendar days` : null,
      summary.shortest !== null ? `Shortest duration: ${summary.shortest} calendar days` : null,
      "",
      "Individual records:",
      ...evaluated.map((item) => {
        const name = item.record.label.trim() || "Untitled record";
        const role = item.record.roleCategory.trim() || "Uncategorised";
        if (item.days !== null) {
          return `${name} · ${role}: ${item.days} days (${formatDateLabel(item.record.entryDate)} → ${formatDateLabel(item.record.acceptanceDate)})`;
        }
        return `${name} · ${role}: ${item.error ?? "incomplete"}`;
      }),
      "",
      "Convention: calendar days (acceptance date − entry date). Do not mix with working-day counts in the same comparison.",
      "Illustrative planning metric — not an EarlyJobs SLA or industry benchmark.",
    ].filter((line): line is string => line !== null);

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function exportCsv() {
    const header = [
      "Identifier",
      "Role category",
      "Candidate entry date",
      "Offer acceptance date",
      "Duration (calendar days)",
      "Status",
    ];
    const rows = evaluated.map((item) => [
      item.record.label,
      item.record.roleCategory,
      item.record.entryDate,
      item.record.acceptanceDate,
      item.days !== null ? String(item.days) : "",
      item.days !== null ? "OK" : item.error ?? "Incomplete",
    ]);
    const csv = [header, ...rows]
      .map((cols) => cols.map((cell) => csvEscape(cell)).join(","))
      .join("\r\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "earlyjobs-time-to-hire.csv";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  return (
    <div
      id="calculator"
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-[#f8fafc] px-5 py-4 sm:px-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
            Hiring duration model
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            Time-to-Hire Calculator
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={addRecord}
            className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Add candidate
          </button>
          <button
            type="button"
            onClick={resetDefaults}
            className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Reset example
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="border-b border-black/5 p-5 sm:p-6 lg:border-r lg:border-b-0">
          <p className="text-[12px] leading-5 text-neutral-500">
            Durations use <span className="font-medium text-neutral-700">calendar days</span> by
            default: offer acceptance date minus candidate entry date. Keep the same convention
            across every record you compare.
          </p>

          <ul className="mt-5 space-y-4">
            {evaluated.map((item, index) => {
              const { record, days, error } = item;
              const invalidAcceptance =
                Boolean(record.entryDate) &&
                Boolean(record.acceptanceDate) &&
                days === null &&
                Boolean(error);

              return (
                <li
                  key={record.id}
                  className="rounded-xl border border-black/10 bg-[#f8fafc] p-4 sm:p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold tracking-[-0.02em]">
                      Hire {index + 1}
                      {days !== null ? (
                        <span className="ml-2 font-medium tabular-nums text-[#2563EB]">
                          {days} day{days === 1 ? "" : "s"}
                        </span>
                      ) : null}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeRecord(record.id)}
                      disabled={records.length <= 1}
                      className="rounded-lg border border-black/10 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label htmlFor={`${record.id}-label`} className="block sm:col-span-1">
                      <span className="text-sm font-medium tracking-[-0.02em] text-neutral-950">
                        Candidate or role identifier
                      </span>
                      <input
                        id={`${record.id}-label`}
                        type="text"
                        value={record.label}
                        onChange={(event) => updateRecord(record.id, { label: event.target.value })}
                        placeholder="Optional label — avoid personal data"
                        autoComplete="off"
                        className="mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-neutral-950 outline-none transition-colors focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                      />
                    </label>

                    <label htmlFor={`${record.id}-role`} className="block sm:col-span-1">
                      <span className="text-sm font-medium tracking-[-0.02em] text-neutral-950">
                        Role category
                      </span>
                      <input
                        id={`${record.id}-role`}
                        type="text"
                        value={record.roleCategory}
                        onChange={(event) =>
                          updateRecord(record.id, { roleCategory: event.target.value })
                        }
                        placeholder="e.g. Warehouse · Technician"
                        autoComplete="off"
                        className="mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-neutral-950 outline-none transition-colors focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                      />
                    </label>

                    <label htmlFor={`${record.id}-entry`} className="block">
                      <span className="text-sm font-medium tracking-[-0.02em] text-neutral-950">
                        Candidate entry date
                      </span>
                      <input
                        id={`${record.id}-entry`}
                        type="date"
                        value={record.entryDate}
                        onChange={(event) =>
                          updateRecord(record.id, { entryDate: event.target.value })
                        }
                        className="mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm tabular-nums text-neutral-950 outline-none transition-colors focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                      />
                    </label>

                    <label htmlFor={`${record.id}-acceptance`} className="block">
                      <span className="text-sm font-medium tracking-[-0.02em] text-neutral-950">
                        Offer acceptance date
                      </span>
                      <input
                        id={`${record.id}-acceptance`}
                        type="date"
                        value={record.acceptanceDate}
                        min={record.entryDate || undefined}
                        aria-invalid={invalidAcceptance}
                        onChange={(event) =>
                          updateRecord(record.id, { acceptanceDate: event.target.value })
                        }
                        className={`mt-2 w-full rounded-lg border bg-white px-3 py-2.5 text-sm tabular-nums text-neutral-950 outline-none transition-colors focus:ring-2 focus:ring-[#2563EB]/15 ${
                          invalidAcceptance
                            ? "border-amber-500 focus:border-amber-600"
                            : "border-black/10 focus:border-[#2563EB]"
                        }`}
                      />
                    </label>
                  </div>

                  {error && record.entryDate && record.acceptanceDate ? (
                    <p className="mt-3 text-[12px] leading-5 text-amber-800" role="alert">
                      {error}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-[#f8fafc] p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-black/5 bg-white p-4 sm:col-span-2">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Average time to hire
              </p>
              {summary.average !== null ? (
                <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] tabular-nums text-[#2563EB]">
                  {summary.average % 1 === 0
                    ? summary.average
                    : summary.average.toFixed(1)}{" "}
                  <span className="text-lg font-semibold text-neutral-700">days</span>
                </p>
              ) : (
                <p className="mt-2 text-sm leading-6 text-amber-800">
                  Add at least one hire with a valid entry and acceptance date.
                </p>
              )}
              <p className="mt-2 text-[12px] leading-5 text-neutral-500">
                Based on {summary.validCount} completed hire
                {summary.validCount === 1 ? "" : "s"} · calendar-day convention
              </p>
            </div>

            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Longest duration
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums">
                {summary.longest !== null ? `${summary.longest} days` : "—"}
              </p>
            </div>

            <div className="rounded-xl border border-black/5 bg-white p-4">
              <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                Shortest duration
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums">
                {summary.shortest !== null ? `${summary.shortest} days` : "—"}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 sm:p-5">
            <p className="text-sm font-semibold tracking-[-0.02em]">Transparent formula</p>
            <p className="mt-3 rounded-lg bg-[#f8fafc] px-3 py-3 font-mono text-[12px] leading-5 text-neutral-700 sm:text-[13px]">
              Time to Hire = Offer Acceptance Date − Candidate Entry Date
            </p>
            <p className="mt-3 rounded-lg bg-[#f8fafc] px-3 py-3 font-mono text-[12px] leading-5 text-neutral-700 sm:text-[13px]">
              Average = Sum of Durations ÷ Number of Completed Hires
            </p>
            <p className="mt-3 text-[12px] leading-5 text-neutral-500">
              Same-day entry and acceptance counts as 0 calendar days. Do not mix calendar days and
              working days in one comparison set.
            </p>
          </div>

          {summary.categoryAverages.length > 0 ? (
            <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 sm:p-5">
              <p className="text-sm font-semibold tracking-[-0.02em]">By role category</p>
              <ul className="mt-3 space-y-2">
                {summary.categoryAverages.map((row) => (
                  <li
                    key={row.category}
                    className="flex items-baseline justify-between gap-3 border-t border-black/5 pt-2 text-sm"
                  >
                    <span className="text-neutral-700">
                      {row.category}{" "}
                      <span className="text-neutral-400">({row.count})</span>
                    </span>
                    <span className="font-semibold tabular-nums">
                      {row.average % 1 === 0 ? row.average : row.average.toFixed(1)} days
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copySummary}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              {copied ? "Copied" : "Copy summary"}
            </button>
            <button
              type="button"
              onClick={exportCsv}
              disabled={records.length === 0}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Download CSV
            </button>
          </div>

          {summary.validCount > 0 ? (
            <div className="mt-5 rounded-xl border border-[#2563EB]/20 bg-white p-4 sm:p-5">
              <p className="text-sm font-semibold tracking-[-0.02em]">Next step</p>
              <p className="mt-2 text-[13px] leading-6 text-neutral-600">
                Once you know where hiring slows down, EarlyJobs can assess role categories,
                locations and expected joining needs — without promising a fixed recruitment
                timeline from this calculator.
              </p>
              <Link
                href="/contact-us"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-[6px] bg-brand px-4 text-[13px] font-medium text-white transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-[#d85c42]"
              >
                Discuss Your Hiring Requirements
              </Link>
            </div>
          ) : null}

          <p className="mt-4 text-[12px] leading-5 text-neutral-500">
            Use optional labels that do not include sensitive personal details. Results stay in your
            browser until you copy or download them.
          </p>
        </div>
      </div>
    </div>
  );
}
