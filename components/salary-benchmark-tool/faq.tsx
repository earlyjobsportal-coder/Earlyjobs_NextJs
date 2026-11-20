"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What data does the tool use?",
    a: "It aggregates salary survey data from reputable sources, labor statistics, and employer submissions. All figures represent actual paid salaries, not just advertised ranges.",
  },
  {
    q: "Can I use this for entry-level roles?",
    a: "Absolutely. The tool includes entry-level positions and can break out graduate or junior roles separately. This helps budget for new hires fresh out of school.",
  },
  {
    q: "How often is the data updated?",
    a: "We update the database quarterly to reflect market changes (inflation, new regulations, etc.) so you always see current pay ranges.",
  },
] as const;

export function SalaryFaq() {
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
