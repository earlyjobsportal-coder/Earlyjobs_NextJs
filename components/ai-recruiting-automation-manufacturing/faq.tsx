"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is manufacturing recruitment automation?",
    a: "It’s the use of AI-assisted workflows to support recurring industrial hiring tasks, such as candidate screening, shift matching, and interview scheduling, all integrated across a factory operation.",
  },
  {
    q: "Can AI handle multiple plant locations?",
    a: "Yes. When properly configured, the system treats each location’s requirements distinctly while applying shared rules. It can route candidates to the right plant or flag conflicts if, for example, one candidate qualifies for roles at two plants.",
  },
  {
    q: "Do I need an ATS to use these workflows?",
    a: "A database of candidates is helpful, but the core need is a workflow engine. Many ATS platforms offer workflow modules. The key is configuring the workflow logic around manufacturing-specific events (e.g. shift availability).",
  },
] as const;

export function ManufacturingFaq() {
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
