"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is the purpose of a manpower requisition form?",
    a: "It documents a hiring requirement and supports internal approval before recruitment begins.",
  },
  {
    q: "Who prepares a manpower requisition?",
    a: "Usually the requesting department or hiring manager, with HR involvement.",
  },
  {
    q: "Can this template be used for factory hiring?",
    a: "Yes. It can be adapted for production, warehouse, technical and support roles.",
  },
  {
    q: "Is a manpower requisition the same as a job description?",
    a: "No. A requisition requests hiring approval, while a job description explains the responsibilities and requirements of a position.",
  },
  {
    q: "Can it be used for multiple vacancies?",
    a: "Yes. A requisition can cover multiple openings when they share appropriate role and approval requirements.",
  },
] as const;

export function ManpowerRequisitionFaq() {
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
