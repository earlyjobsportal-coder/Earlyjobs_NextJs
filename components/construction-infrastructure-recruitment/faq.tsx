"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs support construction workforce recruitment?",
    a: "Employers can discuss suitable construction support, technical and administrative vacancies for assessment.",
  },
  {
    q: "Can companies request hiring across project sites?",
    a: "Yes. Multi-location requirements can be shared with separate role and location details.",
  },
  {
    q: "What information is needed for project hiring?",
    a: "Vacancy numbers, job locations, eligibility, compensation, work conditions and joining timelines.",
  },
  {
    q: "Who handles construction safety compliance?",
    a: "Employers remain responsible for applicable safety training, site procedures and legal requirements.",
  },
] as const;

export function ConstructionFaq() {
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
