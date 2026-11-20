"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is bulk hiring?",
    a: "Bulk hiring is recruitment involving multiple vacancies, often within a defined period or across related roles.",
  },
  {
    q: "What should a bulk hiring plan include?",
    a: "Vacancies, eligibility, sourcing channels, interviews, selection responsibilities, budget and joining timelines.",
  },
  {
    q: "Can the checklist be used for factory recruitment?",
    a: "Yes. It can be adapted for production, packaging, warehouse and other relevant roles.",
  },
  {
    q: "Is a bulk hiring checklist the same as a recruitment tracker?",
    a: "No. A checklist covers planning activities, while a tracker records candidate progress.",
  },
] as const;

export function BulkHiringChecklistFaq() {
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
