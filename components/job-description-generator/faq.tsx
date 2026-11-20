"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is a job description generator?",
    a: "It is a tool that turns employer-provided role details into an organised job description draft.",
  },
  {
    q: "Can the generator create descriptions for freshers?",
    a: "Yes. It can support entry-level roles when the employer supplies appropriate requirements.",
  },
  {
    q: "Should generated job descriptions be reviewed?",
    a: "Yes. Employers should verify responsibilities, qualifications, compensation and legal compliance.",
  },
  {
    q: "Can the job description be edited?",
    a: "Yes. You can edit the draft before copying or downloading the result.",
  },
] as const;

export function JobDescriptionFaq() {
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
