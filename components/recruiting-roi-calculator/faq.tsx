"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What inputs does the ROI calculator need?",
    a: "Typically: number of hires per year, average time-to-fill, daily cost of unfilled roles, and recruiting cost per hire. These inputs are usually available in HR dashboards or finance reports.",
  },
  {
    q: "Can the calculator include quality-of-hire?",
    a: "This simple model focuses on time and cost. For quality-of-hire metrics (like performance ratings), you’d need a more advanced model. However, improving hiring speed and cost often indirectly improves quality by allowing better candidates to stay engaged.",
  },
  {
    q: "How accurate is the ROI estimate?",
    a: "It provides an estimate based on your inputs. It’s most useful for relative comparisons (e.g. project A yields higher ROI than B), not a precise forecast. Always treat it as a directional guide and update with real data over time.",
  },
] as const;

export function RoiFaq() {
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
