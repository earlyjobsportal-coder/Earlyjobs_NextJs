"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is a 90-day recruitment plan?",
    a: "It is a three-month framework for organizing vacancies, recruitment activities and hiring milestones.",
  },
  {
    q: "Who should prepare the plan?",
    a: "HR teams typically coordinate it with department heads, finance and relevant hiring managers.",
  },
  {
    q: "Can it support bulk recruitment?",
    a: "Yes. The template can be adapted for multiple vacancies and locations.",
  },
  {
    q: "Does the plan guarantee hiring targets?",
    a: "No. It is a planning framework, and outcomes depend on candidate availability, employer decisions and other factors.",
  },
] as const;

export function NinetyDayHiringPlanFaq() {
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
