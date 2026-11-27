"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is an interview scheduling template?",
    a: "It is a structured document used to plan and track candidate interview appointments, including date, time, interviewer, format, location and status.",
  },
  {
    q: "Can the template support bulk hiring?",
    a: "Yes. It can be adapted for multiple candidates, roles and interviewers when columns and status definitions stay consistent.",
  },
  {
    q: "Does the template automatically send invitations?",
    a: "No. Automated invitations require separately implemented functionality. The template organises scheduling details only.",
  },
  {
    q: "Can employers use it for virtual interviews?",
    a: "Yes. The format can include approved meeting details and time zones for telephone or video interviews.",
  },
] as const;

export function InterviewSchedulingFaq() {
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
