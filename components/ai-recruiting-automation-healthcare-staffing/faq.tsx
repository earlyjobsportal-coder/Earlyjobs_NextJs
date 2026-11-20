"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does AI recruiting automation help healthcare staffing?",
    a: "AI automation manages recurring tasks like outreach, scheduling, and follow-ups. It ensures candidates hear back quickly and consistently, while routing complex decisions — license checks and interview decisions — to human recruiters. This keeps hiring moving efficiently without cutting corners on patient-care standards.",
  },
  {
    q: "Can AI check nurse licenses automatically?",
    a: "It depends on integrations. Some systems can verify licenses against official databases and flag missing credentials. However, final verification and compliance approval should remain with trained staff.",
  },
  {
    q: "What should healthcare recruiters automate first?",
    a: "Start with the most repetitive, time-consuming tasks. For example, automate interview scheduling and basic candidate communications — these have clear rules and big time savings. Then progressively automate follow-ups and notifications. Always keep recruiters in the loop for any decision affecting patient care.",
  },
] as const;

export function HealthcareFaq() {
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
