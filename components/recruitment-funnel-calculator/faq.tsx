"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is a recruitment funnel conversion rate?",
    a: "It is the percentage of candidates who progress from one hiring stage to another.",
  },
  {
    q: "How do you calculate offer-to-joining conversion?",
    a: "Divide the number of candidates who joined by the number who received offers, then multiply by 100.",
  },
  {
    q: "What is a good recruitment conversion rate?",
    a: "There is no universal rate. Results vary by role, industry, hiring channel and selection requirements.",
  },
  {
    q: "Can employers use the calculator for bulk hiring?",
    a: "Yes. It can help analyze recruitment stages for high-volume hiring campaigns.",
  },
] as const;

export function RecruitmentFunnelFaq() {
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
