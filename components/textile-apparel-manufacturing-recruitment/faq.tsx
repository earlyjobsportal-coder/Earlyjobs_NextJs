"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs support garment factory recruitment?",
    a: "Employers can discuss suitable production, packaging, warehouse and support vacancies for assessment. Share factory locations, line counts and expected joining timelines.",
  },
  {
    q: "Can companies recruit experienced machine operators?",
    a: "Requirements can be shared, subject to candidate availability and employer-defined skill assessments. Machine-specific experience should be specified in the hiring brief.",
  },
  {
    q: "Can employers discuss bulk hiring?",
    a: "Yes. Companies can share hiring volumes, factory locations and expected timelines for production expansion, replacement vacancies or multi-facility hiring.",
  },
  {
    q: "Are freshers eligible for textile manufacturing roles?",
    a: "Some entry-level positions may consider freshers, depending on training and job requirements. Experienced machine operation roles should not be represented as suitable for untrained candidates.",
  },
] as const;

export function TextileFaq() {
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
