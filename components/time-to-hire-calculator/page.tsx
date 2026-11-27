import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { TimeToHireCalculator } from "@/components/time-to-hire-calculator/calculator";
import { TimeToHireFaq } from "@/components/time-to-hire-calculator/faq";

const inputsGuide = [
  {
    title: "Candidate entry date",
    body: "The date the candidate applied or entered recruitment, based on your organisation’s chosen definition.",
  },
  {
    title: "Offer acceptance date",
    body: "The date the candidate formally accepted the employment offer.",
  },
  {
    title: "Candidate or role identifier",
    body: "An optional label to distinguish records without requiring sensitive personal details.",
  },
  {
    title: "Role category",
    body: "An optional classification for comparing similar positions across departments or facilities.",
  },
] as const;

const whyItMatters = [
  {
    title: "Process visibility",
    body: "Understand how long candidates remain in the hiring process.",
  },
  {
    title: "Interview coordination",
    body: "Identify whether scheduling or approval steps require review.",
  },
  {
    title: "Workforce planning",
    body: "Use historical recruitment durations to inform future hiring schedules.",
  },
  {
    title: "Candidate communication",
    body: "Establish realistic expectations about the selection process.",
  },
  {
    title: "Internal reporting",
    body: "Track recruitment duration using consistent definitions.",
  },
] as const;

const related = [
  {
    href: "/tools/recruitment-funnel-calculator",
    title: "Recruitment Funnel Calculator",
    body: "Measure stage conversions from applications through to joinings.",
  },
  {
    href: "/tools/vacancy-cost-calculator",
    title: "Vacancy Cost Calculator",
    body: "Estimate the cost of unfilled roles across vacancy days and daily impact.",
  },
  {
    href: "/tools/recruitment-budget-calculator",
    title: "Recruitment Budget Calculator",
    body: "Plan advertising, agency, internal recruiting and assessment spend in INR.",
  },
] as const;

export function TimeToHireCalculatorPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, rgba(37,99,235,0.08), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(234,106,78,0.08), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative pt-14 pb-10 sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-14">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            EarlyJobs · Employer tools
          </p>
          <h1 className="mt-4 max-w-3xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
            Understand How Long Your Hiring Process Actually Takes
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Recruitment teams often measure hiring progress through application counts, interviews
            and offers. Those numbers do not show how long candidates spend in the process. The{" "}
            <strong className="font-semibold text-neutral-950">
              EarlyJobs Time-to-Hire Calculator
            </strong>{" "}
            measures calendar days between a candidate entering recruitment and accepting an offer —
            so HR and talent teams can spot delays and plan with consistent definitions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <SolidLink href="#calculator">Calculate Time to Hire</SolidLink>
            <GhostLink href="#definition">What is time to hire?</GhostLink>
          </div>
          <p className="mt-5 text-[12px] leading-5 text-neutral-500">
            For HR leaders, recruitment managers, founders and talent acquisition teams.
          </p>

          <div className="mt-10">
            <TimeToHireCalculator />
          </div>
        </div>
      </section>

      <section id="definition" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Definition
            </p>
            <h2 className="mt-3 max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is Time to Hire?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Time to hire is a recruitment metric that measures the duration between a candidate
              entering the hiring process and accepting an employment offer.
            </p>
            <p>
              Organisations may define the starting point differently, such as application submission
              or first recruiter contact. The important requirement is consistency.
            </p>
            <p>
              Time to hire is different from time to fill, which commonly measures the duration from
              opening or approving a vacancy to filling it.
            </p>
          </div>
        </div>
      </section>

      <section id="formula" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Formula
            </p>
            <h2 className="mt-3 max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              How to Calculate Time to Hire
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>For an individual candidate:</p>
            <p>
              <code className="block rounded-xl border border-black/10 bg-white px-4 py-4 font-medium text-neutral-950">
                Time to Hire = Offer Acceptance Date − Candidate Entry Date
              </code>
            </p>
            <p>For multiple completed hires:</p>
            <p>
              <code className="block rounded-xl border border-black/10 bg-white px-4 py-4 font-medium text-neutral-950">
                Average Time to Hire = Sum of Individual Hiring Durations ÷ Number of Completed Hires
              </code>
            </p>
            <p>
              The calculator uses calendar days by default: the whole number of days between the two
              dates on a standard calendar. Employers should not mix calendar days and working days
              within the same comparison.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Inputs
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What Information Should Employers Enter?
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {inputsGuide.map((item) => (
              <li key={item.title} className="rounded-2xl border border-black/10 bg-[#f8fafc] p-6">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Example
            </p>
            <h2 className="mt-3 max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Example Time-to-Hire Calculation
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>Consider three hypothetical candidates:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Candidate A: 12 days.</li>
              <li>Candidate B: 18 days.</li>
              <li>Candidate C: 15 days.</li>
            </ul>
            <p>
              The average time to hire is{" "}
              <code className="rounded-md border border-black/10 bg-white px-2 py-1 text-sm font-medium text-neutral-950">
                (12 + 18 + 15) ÷ 3 = 15 days
              </code>
              .
            </p>
            <p>
              This example demonstrates the calculation and is not an industry benchmark. Actual
              recruitment duration varies by role, location, candidate availability and employer
              selection requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Business use
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Why Time to Hire Matters
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyItMatters.map((item) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            A shorter hiring process is not automatically better if essential assessments or
            compliance checks are compromised.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Comparisons
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Compare Hiring Duration Across Roles
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Employers should avoid comparing unrelated positions without context. For example,
              recruitment for a warehouse associate may involve different stages from recruitment for
              a qualified industrial technician.
            </p>
            <p>
              The calculator can group records by role category or department. This makes comparisons
              more useful when the same definitions and calendar-day convention are applied.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Planning
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              From Hiring Metrics to Recruitment Planning
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Once employers understand their recruitment timelines, they can identify roles
              requiring additional sourcing or coordination.
            </p>
            <p>
              EarlyJobs can assess hiring requirements according to role categories, locations and
              expected joining needs. The calculator does not predict or guarantee EarlyJobs
              recruitment timelines.
            </p>
            <div className="pt-2">
              <SolidLink href="/contact-us">Discuss Your Hiring Requirements</SolidLink>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">FAQ</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 max-w-3xl">
            <TimeToHireFaq />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
            About EarlyJobs
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            EarlyJobs is an India-focused recruitment platform that helps employers hire for
            manufacturing plants, healthcare staffing, and other high-volume roles — with free hiring
            calculators plus recruiter support when you need structured workforce planning.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
            Related hiring resources
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group block border-t border-black/10 pt-4 transition-colors hover:border-brand"
                >
                  <h3 className="text-base font-semibold tracking-[-0.02em] group-hover:text-brand">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(234,106,78,0.08), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Calculate Your Average Time to Hire
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Enter entry and offer acceptance dates for completed hires, then review individual,
            average and longest durations.
          </p>
          <div className="mt-8">
            <SolidLink href="#calculator">Calculate Time to Hire</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
