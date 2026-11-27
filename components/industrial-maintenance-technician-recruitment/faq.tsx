"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs help recruit industrial technicians?",
    a: "Employers can discuss suitable junior and qualified technician vacancies for recruitment assessment, based on equipment experience and practical skill requirements.",
  },
  {
    q: "Are ITI graduates eligible for maintenance roles?",
    a: "Eligibility depends on the role, practical skills and employer requirements. Educational qualifications are considered alongside demonstrated competence.",
  },
  {
    q: "Can employers request practical assessments?",
    a: "Employers can define their evaluation requirements as part of the recruitment discussion. EarlyJobs does not perform technical assessments or certification.",
  },
  {
    q: "Who is responsible for technical safety authorization?",
    a: "Employers must ensure personnel meet applicable training, licensing and safety requirements before undertaking maintenance work.",
  },
] as const;

export function IndustrialMaintenanceFaq() {
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
