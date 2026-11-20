"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is the cost of employee attrition?",
    a: "It is the estimated financial cost associated with departures and replacement, including recruitment, training and relevant vacancy expenses.",
  },
  {
    q: "Is attrition cost the same as recruitment cost?",
    a: "No. Recruitment cost is one component of the broader attrition cost estimate.",
  },
  {
    q: "Can the calculator be used for factory workers?",
    a: "Yes. Employers can enter assumptions relevant to their workforce and operational environment.",
  },
  {
    q: "Does the result represent an exact financial loss?",
    a: "No. It is a model based on user-provided inputs and assumptions.",
  },
] as const;

export function EmployeeAttritionCostFaq() {
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
