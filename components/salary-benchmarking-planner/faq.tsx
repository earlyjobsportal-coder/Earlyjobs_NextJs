"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is salary benchmarking?",
    a: "It is the comparison of compensation for similar roles using relevant, reliable salary information.",
  },
  {
    q: "Does the tool provide live market salary data?",
    a: "Not in its initial version. It calculates employer-provided salary scenarios unless verified market data is added.",
  },
  {
    q: "Can employers compare salary budgets across locations?",
    a: "Yes. Users can enter separate assumptions for different locations.",
  },
  {
    q: "Does the calculator include statutory employment costs?",
    a: "Only costs explicitly entered or supported by verified calculation logic should be included.",
  },
] as const;

export function SalaryBenchmarkingFaq() {
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
