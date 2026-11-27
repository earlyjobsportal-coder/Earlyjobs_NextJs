import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { AgencyEvaluationFaq } from "@/components/recruitment-agency-evaluation-scorecard/faq";
import { AgencyScorecard } from "@/components/recruitment-agency-evaluation-scorecard/agency-scorecard";

const criteria = [
  {
    title: "Relevant recruitment experience",
    body: "Does the provider understand the roles, industries and locations involved?",
  },
  {
    title: "Candidate sourcing approach",
    body: "How does the agency identify and engage potential candidates?",
  },
  {
    title: "Recruitment process",
    body: "How are requirements documented, candidates evaluated and interviews coordinated?",
  },
  {
    title: "Communication",
    body: "Who manages employer communication, candidate updates and issue resolution?",
  },
  {
    title: "Commercial terms",
    body: "What fees, payment triggers and contractual conditions apply?",
  },
  {
    title: "Reporting and transparency",
    body: "What information will the employer receive about recruitment progress?",
  },
  {
    title: "Compliance and data handling",
    body: "How does the provider address candidate information, consent and relevant legal responsibilities?",
  },
] as const;

const steps = [
  {
    title: "Define your hiring needs",
    body: "Document role categories, hiring volumes, locations and expected timelines.",
  },
  {
    title: "Select evaluation criteria",
    body: "Choose the factors most relevant to the organization.",
  },
  {
    title: "Assign weights",
    body: "For example, role expertise may carry more weight than presentation quality.",
  },
  {
    title: "Score each provider",
    body: "Use a consistent rating scale with supporting notes.",
  },
  {
    title: "Compare results",
    body: "Review weighted scores alongside commercial and operational considerations.",
  },
  {
    title: "Complete due diligence",
    body: "Verify relevant claims, references, legal terms and responsibilities before signing.",
  },
] as const;

const benefits = [
  {
    title: "Consistency",
    body: "Every provider is assessed using the same criteria.",
  },
  {
    title: "Documentation",
    body: "Decision-makers can review the reasons behind scores.",
  },
  {
    title: "Stakeholder alignment",
    body: "HR, operations and procurement can compare priorities.",
  },
  {
    title: "Better questions",
    body: "The evaluation process highlights information that should be clarified before engagement.",
  },
] as const;

const exampleWeights = [
  { label: "Relevant experience", weight: "25%" },
  { label: "Sourcing approach", weight: "20%" },
  { label: "Recruitment process", weight: "20%" },
  { label: "Communication", weight: "15%" },
  { label: "Commercial terms", weight: "10%" },
  { label: "Reporting and compliance", weight: "10%" },
] as const;

const related = [
  {
    href: "/compare/recruitment-agency-vs-in-house-hiring",
    title: "Recruitment Agency vs In-House Hiring",
    body: "Compare delivery models before shortlisting partners.",
  },
  {
    href: "/tools/recruitment-budget-calculator",
    title: "Recruitment Budget Calculator",
    body: "Estimate agency and internal recruiting spend for planned hires.",
  },
  {
    href: "/resources/90-day-workforce-hiring-plan",
    title: "90-Day Workforce Hiring Plan",
    body: "Phase headcount and recruitment milestones across a quarter.",
  },
] as const;

function fileExists(relativePublicPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", relativePublicPath));
}

export function RecruitmentAgencyEvaluationScorecardPage() {
  const xlsxAvailable = fileExists(
    "resources/earlyjobs-recruitment-agency-evaluation-scorecard.xlsx"
  );

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
        <div className="page-shell relative grid items-start gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Hiring resources
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Choose Recruitment Partners Using Clear Evaluation Criteria
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              Selecting a recruitment partner can affect hiring costs, candidate experience and
              internal coordination. Comparing agencies becomes difficult when each provider presents
              different service descriptions, pricing models and performance claims. The EarlyJobs
              Recruitment Agency Evaluation Scorecard provides a practical framework for comparing
              potential recruitment providers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#scorecard">Download the Agency Evaluation Scorecard</SolidLink>
              <GhostLink href="#how-it-works">How the scorecard works</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For HR directors, procurement teams, founders, talent acquisition leaders and operations
              managers.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-6">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
              Vendor comparison preview
            </p>
            <div className="mt-4 space-y-3 rounded-xl border border-black/10 bg-[#f8fafc] p-4">
              {[
                "Criteria · Weights totalling 100%",
                "Provider names · Scores 1–5",
                "Weighted totals · Supporting notes",
                "Due diligence checklist",
              ].map((line) => (
                <div
                  key={line}
                  className="rounded-lg border border-dashed border-black/10 bg-white px-3 py-2.5 text-[13px] text-neutral-600"
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Definition
            </p>
            <h2 className="mt-3 max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is a Recruitment Agency Evaluation Scorecard?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              A recruitment agency evaluation scorecard is a structured document used to assess
              recruitment providers against predefined requirements. It can include sourcing
              capabilities, relevant experience, communication processes, commercial terms and
              reporting practices.
            </p>
            <p>
              The scorecard supports informed vendor selection but does not independently verify
              agency claims. Employers should request supporting evidence where appropriate.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Evaluation criteria
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What Should Employers Evaluate?
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {criteria.map((item) => (
              <li key={item.title} className="rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Each criterion should be assessed according to the employer&apos;s actual requirements.
          </p>
        </div>
      </section>

      <section id="scorecard" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Interactive scorecard
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Compare providers with weighted scores
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Adjust weights, score up to three providers and review weighted totals. Download the XLSX
            template for offline evaluation and due diligence tracking.
          </p>
          <div className="mt-10">
            <AgencyScorecard xlsxAvailable={xlsxAvailable} />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            How it works
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            How the Scorecard Works
          </h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((item, index) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <p className="text-[11px] font-medium tracking-[0.14em] text-brand tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Example weights
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Example Weighted Evaluation
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-neutral-600">
              A hypothetical employer might assign the weights below. These weights are illustrative.
              Employers should modify them to reflect their own priorities.
            </p>
          </div>
          <ul className="space-y-3">
            {exampleWeights.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between border-t border-black/10 pt-3 text-sm"
              >
                <span className="font-medium tracking-[-0.02em] text-neutral-900">{item.label}</span>
                <span className="tabular-nums text-neutral-600">{item.weight}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="page-shell pb-16">
          <p className="max-w-3xl text-[15px] leading-7 text-neutral-600">
            A numerical score should not override serious contractual, compliance or trust concerns.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Why it helps
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Why a Structured Comparison Helps
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            The scorecard does not guarantee that the highest-rated agency will deliver the best
            hiring results.
          </p>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Evaluating EarlyJobs
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Apply the Same Criteria to EarlyJobs
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              Employers considering EarlyJobs can apply the same criteria. EarlyJobs combines
              technology-enabled recruitment with recruiter and institutional partnership networks.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              The relevant service scope, recruitment approach, commercials and responsibilities
              should be discussed directly and evaluated against the employer&apos;s needs.
            </p>
          </div>
          <IndustryEnquiryForm
            formId="agency_evaluation_scorecard_enquiry"
            sourceLabel="Recruitment Agency Evaluation Scorecard"
            submitLabel="Discuss Recruitment Requirements with EarlyJobs"
            defaultMessage="Recruitment requirements shared from agency evaluation scorecard page."
            extraFields="electronics"
          />
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">FAQ</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 max-w-3xl">
            <AgencyEvaluationFaq />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
            About EarlyJobs
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            EarlyJobs is an India-focused recruitment platform at{" "}
            <a href="https://www.earlyjobs.ai" className="text-brand underline-offset-2 hover:underline">
              earlyjobs.ai
            </a>{" "}
            that helps employers hire for manufacturing plants, healthcare operations and other
            high-volume roles—combining recruiter networks, employer tools and workflow support for
            shift-based and multi-site programs.
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
            Download the Recruitment Agency Scorecard
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Compare recruitment agencies using structured criteria for experience, sourcing, process,
            communication, costs and reporting.
          </p>
          <div className="mt-8">
            <SolidLink href="#scorecard">Download the Agency Evaluation Scorecard</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
