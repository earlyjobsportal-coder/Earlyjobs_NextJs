"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs support EV manufacturing recruitment?",
    a: "Employers can discuss entry-level production, assembly and support requirements for assessment.",
  },
  {
    q: "Which qualifications are suitable for automotive production roles?",
    a: "Requirements depend on the position and may include ITI, diploma, engineering or other employer-approved qualifications.",
  },
  {
    q: "Can manufacturers discuss bulk hiring?",
    a: "Yes. Hiring volumes, plant locations and joining timelines can be shared for assessment.",
  },
  {
    q: "Who handles technical and safety verification?",
    a: "Employers remain responsible for mandatory qualifications, assessments and workplace safety requirements.",
  },
] as const;

export function AutomotiveFaq() {
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
