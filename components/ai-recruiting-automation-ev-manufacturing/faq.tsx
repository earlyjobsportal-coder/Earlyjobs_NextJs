"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does AI help hire for EV factories?",
    a: "AI workflows coordinate high-volume technical hiring by matching candidate skills to specific EV roles, managing shift availability, and automating interview scheduling. This reduces the manual coordination when building teams for new plants.",
  },
  {
    q: "Can AI handle international EV hiring?",
    a: "Yes. Workflows can be configured per location. For example, a candidate not available for Plant A might be routed to Plant B in the same region. Multi-site rules ensure each facility’s requirements are applied.",
  },
  {
    q: "What should EV recruiters automate first?",
    a: "Start with engagement and screening for hard-to-fill roles (e.g. battery specialists). Automate outreach to passive candidates with relevant backgrounds, and use automated follow-ups for lab test scheduling. This addresses the longest lead-time parts of EV hiring.",
  },
] as const;

export function EvManufacturingFaq() {
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
