"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How should employers evaluate recruitment agencies?",
    a: "Use consistent criteria covering relevant experience, sourcing, process, communication, costs and compliance.",
  },
  {
    q: "Can agencies be compared using weighted scores?",
    a: "Yes. Weighted criteria can support comparison when scoring rules are clearly defined and weights total 100%.",
  },
  {
    q: "Should price be the main selection factor?",
    a: "Not necessarily. Employers should consider service suitability, process quality and contractual responsibilities.",
  },
  {
    q: "Can the scorecard support bulk recruitment vendor selection?",
    a: "Yes. Employers can adapt the criteria to high-volume or multi-location hiring requirements.",
  },
] as const;

export function AgencyEvaluationFaq() {
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
