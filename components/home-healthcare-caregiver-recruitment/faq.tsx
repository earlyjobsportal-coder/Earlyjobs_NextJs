"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs support caregiver recruitment?",
    a: "Employers can discuss suitable caregiving and patient support vacancies for assessment. Share shift patterns, service areas and qualification expectations before sourcing begins.",
  },
  {
    q: "Can companies recruit home nurses?",
    a: "Requirements involving qualified nurses can be discussed, subject to candidate availability and professional eligibility. Employers must confirm applicable nursing registration requirements.",
  },
  {
    q: "Who conducts background and credential checks?",
    a: "Employers must ensure all required background, credential and legal checks are completed. Recruitment alone does not replace safeguarding or patient safety processes.",
  },
  {
    q: "Can home healthcare companies discuss multi-location hiring?",
    a: "Yes. Location-specific requirements across neighbourhoods or cities can be shared for assessment, including assignment areas, travel expectations and working hours.",
  },
] as const;

export function HomeHealthcareFaq() {
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
