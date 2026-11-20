"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs support battery manufacturing recruitment?",
    a: "Employers can discuss suitable entry-level production, assembly and support requirements for recruitment assessment.",
  },
  {
    q: "Which qualifications are relevant?",
    a: "Requirements vary by position and may include ITI, diploma, engineering or employer-approved training.",
  },
  {
    q: "Can battery manufacturers discuss bulk hiring?",
    a: "Yes. Employers can share expected vacancies, locations and joining timelines.",
  },
  {
    q: "Who is responsible for battery safety training?",
    a: "The employer must ensure personnel receive the necessary training, authorization and supervision.",
  },
] as const;

export function BatteryFaq() {
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
