"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is the cost of an unfilled position?",
    a: "It is the estimated financial impact of a vacancy, based on duration and relevant operational or coverage expenses.",
  },
  {
    q: "Is vacancy cost the same as cost per hire?",
    a: "No. Vacancy cost concerns the impact of an open position, while cost per hire measures recruitment spending per completed hire.",
  },
  {
    q: "Can the calculator be used for manufacturing?",
    a: "Yes. Employers can enter plant-specific assumptions and expenses.",
  },
  {
    q: "Does the calculator predict exact losses?",
    a: "No. It produces estimates based on the information supplied by the user.",
  },
] as const;

export function VacancyCostFaq() {
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
