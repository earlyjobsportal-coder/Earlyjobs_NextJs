"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can EarlyJobs support wind energy recruitment?",
    a: "Employers can discuss suitable project support, junior technical and administrative vacancies for assessment. Share project locations, turbine counts and joining windows so sourcing aligns with site execution.",
  },
  {
    q: "Can fresh diploma holders work in wind energy?",
    a: "Some entry-level roles may consider diploma holders, depending on the position and training requirements. Turbine climbing, high-voltage work and other safety-critical tasks require appropriate competence, training and authorization before assignment.",
  },
  {
    q: "Can employers discuss hiring across wind farm locations?",
    a: "Yes. Location-specific requirements can be shared for assessment. Multi-site wind farm and O&M hiring can be planned around headcount, mobility expectations and regional candidate availability.",
  },
  {
    q: "Who handles turbine safety certifications?",
    a: "Employers must ensure personnel meet applicable training, authorization and safety requirements. EarlyJobs does not replace statutory certification, PPE authorisation or legal compliance for turbine and high-voltage work.",
  },
] as const;

export function WindFaq() {
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
