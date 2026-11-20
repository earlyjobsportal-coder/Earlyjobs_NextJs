"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs help recruit medical device production workers?",
    a: "Employers can discuss suitable assembly, production, packaging and support vacancies.",
  },
  {
    q: "Can freshers apply for medical device manufacturing roles?",
    a: "Some entry-level positions may consider freshers, depending on employer-defined qualifications and training requirements.",
  },
  {
    q: "Can manufacturers discuss bulk hiring?",
    a: "Yes. Companies can share hiring volumes and expected joining timelines.",
  },
  {
    q: "Who verifies regulated manufacturing qualifications?",
    a: "Employers remain responsible for mandatory technical assessments, training and regulatory compliance.",
  },
] as const;

export function MedicalDeviceFaq() {
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
