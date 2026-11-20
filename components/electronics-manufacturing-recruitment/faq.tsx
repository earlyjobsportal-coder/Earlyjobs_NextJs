"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What roles can electronics manufacturers recruit for?",
    a: "Common entry-level roles include assembly operators, production trainees, inspection assistants and warehouse associates.",
  },
  {
    q: "Can EMS companies discuss bulk recruitment?",
    a: "Yes. Companies can share hiring volumes and timelines for assessment.",
  },
  {
    q: "Can fresh diploma holders apply for electronics manufacturing roles?",
    a: "Many entry-level roles may consider diploma holders, depending on employer requirements.",
  },
  {
    q: "Does EarlyJobs provide technical certification?",
    a: "Technical training or certification should not be assumed to be part of the recruitment service. Employers should confirm any additional requirements separately.",
  },
] as const;

export function ElectronicsFaq() {
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
