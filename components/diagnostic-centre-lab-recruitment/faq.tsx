"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs help recruit diagnostic centre staff?",
    a: "Employers can discuss relevant technical, administrative and support vacancies for recruitment assessment.",
  },
  {
    q: "Can fresh graduates work in diagnostic centres?",
    a: "Yes, for positions where their qualifications meet the employer's requirements. Clinical roles may require specific credentials.",
  },
  {
    q: "Can diagnostic chains discuss hiring across branches?",
    a: "Yes. Employers can share branch-wise requirements and timelines.",
  },
  {
    q: "Does EarlyJobs certify laboratory technicians?",
    a: "No certification service should be assumed. Employers must verify all mandatory qualifications.",
  },
] as const;

export function DiagnosticFaq() {
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
