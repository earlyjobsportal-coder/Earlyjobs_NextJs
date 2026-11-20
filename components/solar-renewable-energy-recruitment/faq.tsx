"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs support solar project recruitment?",
    a: "Employers can share requirements for eligible entry-level and support roles in solar projects for recruitment assessment.",
  },
  {
    q: "Which qualifications are relevant for solar technician roles?",
    a: "Requirements vary by role and may include ITI, diploma, engineering or specific technical training.",
  },
  {
    q: "Can solar employers recruit candidates for different project sites?",
    a: "Yes. Multi-location requirements can be discussed, subject to recruitment coverage and candidate availability.",
  },
  {
    q: "Who is responsible for electrical and site safety certification?",
    a: "The employer must ensure workers meet applicable safety, qualification and legal requirements.",
  },
] as const;

export function SolarFaq() {
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
