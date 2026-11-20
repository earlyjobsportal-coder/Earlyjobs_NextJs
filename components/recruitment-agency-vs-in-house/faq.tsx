"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is an agency cheaper than in-house recruitment?",
    a: "Not necessarily. Costs depend on hiring volume, internal resources and agreed agency fees.",
  },
  {
    q: "Can companies use both recruitment models?",
    a: "Yes. A hybrid approach combines internal hiring ownership with external recruitment support.",
  },
  {
    q: "Who makes the final hiring decision?",
    a: "The employer ordinarily retains final selection authority unless a different lawful arrangement is explicitly agreed.",
  },
  {
    q: "When should a company consider an agency?",
    a: "When additional sourcing capacity, specialist support or hiring flexibility is required.",
  },
] as const;

export function RecruitmentAgencyVsInHouseFaq() {
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
