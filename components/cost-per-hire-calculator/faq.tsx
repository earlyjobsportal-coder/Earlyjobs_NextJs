"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How do you calculate cost per hire?",
    a: "Add internal and external recruitment expenses for a defined period, then divide by the number of hires completed during that period.",
  },
  {
    q: "Should recruiter salaries be included?",
    a: "The relevant portion of recruiter compensation may be included as an internal recruitment cost, depending on the organization's accounting method.",
  },
  {
    q: "Does cost per hire include employee salaries?",
    a: "Ordinary compensation paid after joining is generally not included as a recruitment expense.",
  },
  {
    q: "What if there are zero hires?",
    a: "Cost per hire cannot be calculated for a period with zero hires. The calculator displays a clear message rather than dividing by zero.",
  },
  {
    q: "Is a lower cost per hire always better?",
    a: "No. Hiring quality, retention, compliance and operational requirements also matter.",
  },
] as const;

export function CostPerHireFaq() {
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
