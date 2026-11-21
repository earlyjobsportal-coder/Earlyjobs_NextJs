import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { RecruitmentBudgetCalculator } from "@/components/recruitment-budget-calculator/budget-calculator";
import { RecruitmentBudgetFaq } from "@/components/recruitment-budget-calculator/faq";

const expenseCategories = [
  {
    title: "Job advertising",
    body: "Estimated spending on paid recruitment advertisements.",
  },
  {
    title: "Agency and sourcing expenses",
    body: "Fees payable to external recruitment providers under agreed commercial terms.",
  },
  {
    title: "Internal recruiting costs",
    body: "The relevant portion of recruiter time and internal recruitment administration.",
  },
  {
    title: "Assessment expenses",
    body: "Approved testing, interview or evaluation costs.",
  },
  {
    title: "Candidate-related expenses",
    body: "Travel reimbursements or other employer-approved recruitment expenses.",
  },
  {
    title: "Recruitment tools",
    body: "Relevant software or platform expenses allocated to the hiring period.",
  },
] as const;

const whyItMatters = [
  {
    title: "Hiring approvals",
    body: "Provide finance teams with a clear estimate of planned expenditure.",
  },
  {
    title: "Channel planning",
    body: "Compare expected spending across recruitment channels.",
  },
  {
    title: "Workforce expansion",
    body: "Estimate the recruitment costs associated with additional headcount.",
  },
  {
    title: "Cost monitoring",
    body: "Compare approved budgets with actual expenses during the hiring period.",
  },
  {
    title: "Scenario analysis",
    body: "Model different hiring volumes or recruitment approaches before committing resources.",
  },
] as const;

const related = [
  {
    href: "/tools/cost-per-hire-calculator",
    title: "Cost-per-Hire Calculator",
    body: "Add internal & external recruiting costs and divide by hires to see average cost per hire.",
  },
  {
    href: "/tools/vacancy-cost-calculator",
    title: "Vacancy Cost Calculator",
    body: "Estimate the cost of an unfilled role across days and lost productivity.",
  },
  {
    href: "/tools/salary-benchmarking-planner",
    title: "Salary Benchmarking Planner",
    body: "Compare salary bands across roles and cities for hiring planning.",
  },
] as const;

export function RecruitmentBudgetCalculatorPage() {
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
        <div className="page-shell relative pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            EarlyJobs · Employer tools
          </p>
          <h1 className="mt-4 max-w-3xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
            Free Recruitment Budget Calculator for Employers
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-neutral-600">
            The EarlyJobs Recruitment Budget Calculator helps employers estimate recruitment
            expenditure using their own hiring plans and cost assumptions. Enter planned hires,
            advertising, agency, internal recruiting, assessment and other expenses — with results
            shown in Indian rupees and no mandatory lead form before results.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <SolidLink href="#calculator">Calculate Your Recruitment Budget</SolidLink>
            <GhostLink href="#formula">See the formula</GhostLink>
          </div>
          <p className="mt-5 text-[12px] leading-5 text-neutral-500">
            For HR directors, finance managers, founders, TA leaders and operations managers.
          </p>
        </div>
      </section>

      <section id="formula" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Definition
            </p>
            <h2 className="mt-3 max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is a Recruitment Budget?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              A recruitment budget is the estimated amount an organization plans to spend on
              attracting, evaluating and hiring employees during a defined period. It may include
              internal recruiting expenses and payments to external service providers.
            </p>
            <p className="text-[15px] leading-7 text-neutral-600">
              <code className="rounded-xl border border-black/10 bg-[#f8fafc] px-4 py-3 font-medium text-neutral-950">
                Recruitment Budget = Internal Recruiting Costs + External Recruiting Costs +
                Other Approved Hiring Expenses
              </code>
            </p>
            <p className="text-[15px] leading-7 text-neutral-600">
              <code className="rounded-xl border border-black/10 bg-[#f8fafc] px-4 py-3 font-medium text-neutral-950">
                Planned Cost per Hire = Total Recruitment Budget ÷ Planned Number of Hires
              </code>
            </p>
            <p>
              The planned cost per hire is an estimate, not the actual cost of completed
              recruitment.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Expense categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What Expenses Should Employers Include?
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {expenseCategories.map((item) => (
              <li key={item.title} className="rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Avoid double-counting costs included in more than one category.
          </p>
        </div>
      </section>

      <section id="calculator" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Interactive tool
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            How the Calculator Works
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Enter planned hires and expense assumptions for advertising, agency support, internal
            recruiting, assessments and other costs. The calculator shows the total budget and
            planned cost per hire in INR, with reset and copyable summary.
          </p>
          <div className="mt-10">
            <RecruitmentBudgetCalculator />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Business use
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Why Recruitment Budgeting Matters
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
            Budgeting should not focus exclusively on minimizing cost. Employers must also
            consider candidate suitability, compliance and recruitment effectiveness.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Scenario comparison
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Compare Hiring Scenarios
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              The calculator can allow employers to create multiple scenarios. For example, a
              company might compare a plan for 25 hires with a plan for 50 hires. It could also
              compare different advertising and agency expense assumptions.
            </p>
            <p>
              The tool shows the financial differences without claiming which scenario will
              produce better candidates.
            </p>
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
            <RecruitmentBudgetFaq />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              From budget to recruitment
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              From Budget Planning to Recruitment
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              Once an employer has an approved recruitment budget, the next step is defining
              hiring requirements. EarlyJobs can assess recruitment needs based on roles,
              locations, expected hiring volumes and timelines. Commercial terms should be
              confirmed separately rather than inferred from calculator results.
            </p>
            <div className="mt-8">
              <SolidLink href="/contact-us">Discuss Recruitment Within Your Budget</SolidLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
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
            Plan Your Recruitment Budget
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Estimate total budget and planned cost per hire before hiring begins.
          </p>
          <div className="mt-8">
            <SolidLink href="#calculator">Calculate Your Recruitment Budget</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
