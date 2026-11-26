"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What should a recruitment budget include?",
    a: "Relevant internal recruiting costs, external sourcing expenses, assessments and other approved hiring expenditures. Employee compensation after joining is usually tracked separately.",
  },
  {
    q: "Is recruitment budget the same as payroll budget?",
    a: "No. Recruitment spending and ongoing employee compensation are generally planned separately.",
  },
  {
    q: "Can the calculator support bulk hiring?",
    a: "Yes. Employers can enter planned headcount and relevant recruitment cost assumptions to model bulk hiring budgets.",
  },
  {
    q: "Does the calculator estimate EarlyJobs fees?",
    a: "No. It models user-provided recruitment expenses and does not represent a commercial quotation or EarlyJobs pricing.",
  },
] as const;

export function RecruitmentBudgetFaq() {
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
