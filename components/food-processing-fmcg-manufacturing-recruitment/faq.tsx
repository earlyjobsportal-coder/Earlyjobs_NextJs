"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs help recruit food processing workers?",
    a: "Employers can share suitable production, packaging, warehouse and support vacancies for assessment.",
  },
  {
    q: "Can companies discuss seasonal hiring?",
    a: "Yes. Employers should specify hiring volumes, employment duration and joining timelines.",
  },
  {
    q: "Are freshers eligible for food manufacturing roles?",
    a: "Some entry-level positions may consider freshers, depending on qualifications and job requirements.",
  },
  {
    q: "Who handles food-safety compliance?",
    a: "Employers are responsible for applicable training, hygiene procedures and regulatory compliance.",
  },
] as const;

export function FoodManufacturingFaq() {
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
