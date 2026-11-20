"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs support warehouse staff recruitment?",
    a: "Employers can share requirements for pickers, packers, inventory assistants and other relevant roles.",
  },
  {
    q: "Can companies discuss bulk warehouse hiring?",
    a: "Yes. Hiring volumes, locations and joining timelines can be assessed.",
  },
  {
    q: "What information is needed to start warehouse recruitment?",
    a: "Role descriptions, vacancy numbers, facility locations, shift patterns, compensation and eligibility criteria.",
  },
  {
    q: "Does EarlyJobs provide forklift certification?",
    a: "Certification or equipment training should not be assumed. Employers must ensure workers meet applicable requirements.",
  },
] as const;

export function WarehouseFaq() {
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
