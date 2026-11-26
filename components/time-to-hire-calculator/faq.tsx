"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is time to hire?",
    a: "Time to hire measures the calendar days between a candidate entering your recruitment process and formally accepting an employment offer. Keep the same entry definition — application date or first recruiter contact — across every comparison.",
  },
  {
    q: "How is average time to hire calculated?",
    a: "Add each completed hire’s duration, then divide by the number of completed hires. The EarlyJobs calculator uses calendar days by default: offer acceptance date minus candidate entry date.",
  },
  {
    q: "Is time to hire the same as time to fill?",
    a: "No. Time to fill generally starts when a vacancy is opened or approved and ends when it is filled. Time to hire starts with the candidate’s entry into the process and ends at offer acceptance.",
  },
  {
    q: "Can employers compare different departments?",
    a: "Yes, if every record uses the same entry definition and the same date-counting method. Group by role category so warehouse, technician and office roles are not treated as interchangeable benchmarks.",
  },
  {
    q: "Does a shorter time to hire always mean better hiring?",
    a: "Not automatically. Essential assessments, background checks and compliance steps still matter. Use the metric to spot delays and plan capacity — not to skip evaluation quality.",
  },
] as const;

export function TimeToHireFaq() {
  const [open, setOpen] = useState(0);

  return (
    <ul className="divide-y divide-black/10 border-y border-black/10">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <li key={item.q}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-medium tracking-[-0.02em] text-neutral-950"
            >
              {item.q}
              <span aria-hidden className="text-brand">
                {isOpen ? "–" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p className="max-w-2xl pb-5 text-sm leading-6 text-neutral-600">{item.a}</p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
