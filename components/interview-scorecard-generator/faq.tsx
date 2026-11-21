"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is an interview scorecard?",
    a: "It is a structured form for evaluating candidates against predefined job-related criteria, typically including candidate information, evaluation categories, a rating scale, evidence notes and an overall recommendation.",
  },
  {
    q: "Can interview scorecards be customized?",
    a: "Yes. Employers should adapt evaluation criteria to each role using the generator, adding or removing competencies and adjusting the rating scale as needed.",
  },
  {
    q: "Should interviewers use the same scorecard?",
    a: "For comparable candidates applying to the same position, consistent criteria can improve evaluation clarity and make it easier to compare candidates fairly.",
  },
  {
    q: "Does a high score guarantee candidate suitability?",
    a: "No. Employers should consider the complete selection process and mandatory requirements rather than relying on a numerical score alone.",
  },
] as const;

export function InterviewScorecardFaq() {
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
