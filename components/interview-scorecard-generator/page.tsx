import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { InterviewScorecardGenerator } from "@/components/interview-scorecard-generator/scorecard-generator";
import { InterviewScorecardFaq } from "@/components/interview-scorecard-generator/faq";

const whatItIncludes = [
  {
    title: "Candidate information",
    body: "Name, role applied for, interview date and interviewer.",
  },
  {
    title: "Evaluation criteria",
    body: "Skills, knowledge and competencies directly related to the position.",
  },
  {
    title: "Rating scale",
    body: "A consistent scale with clear descriptions of what each rating means.",
  },
  {
    title: "Evidence and observations",
    body: "Notes explaining why a particular score was assigned.",
  },
  {
    title: "Overall recommendation",
    body: "A summary of the candidate's suitability against the role requirements.",
  },
] as const;

const howItWorks = [
  {
    step: "Select the role",
    body: "Choose or enter the job title.",
  },
  {
    step: "Define evaluation criteria",
    body: "Add relevant competencies such as communication, technical knowledge or role-specific experience.",
  },
  {
    step: "Set the rating scale",
    body: "Choose a consistent scale, such as one to five, with descriptive anchors.",
  },
  {
    step: "Assign optional weights",
    body: "Employers may give greater importance to criteria essential for the position.",
  },
  {
    step: "Generate the scorecard",
    body: "The tool creates an editable form for interviewer use.",
  },
] as const;

const related = [
  {
    href: "/tools/job-description-generator",
    title: "Job Description Generator",
    body: "Create structured job descriptions for entry-level hiring with editable responsibilities and qualifications.",
  },
  {
    href: "/tools/recruitment-funnel-calculator",
    title: "Recruitment Funnel Calculator",
    body: "Measure stage conversions from applications through to joinings.",
  },
  {
    href: "/resources/manpower-requisition-template",
    title: "Manpower Requisition Template",
    body: "Capture role-wise vacancies, qualifications and joining timelines before sourcing.",
  },
] as const;

export function InterviewScorecardGeneratorPage() {
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
            Free Interview Scorecard Generator for Employers
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-neutral-600">
            The EarlyJobs Interview Scorecard Generator helps employers create editable evaluation
            forms for different roles. Define job-specific criteria, set a rating scale, assign
            optional weights and generate a structured scorecard for consistent candidate assessment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <SolidLink href="#generator">Create an Interview Scorecard</SolidLink>
            <GhostLink href="#what-it-includes">See what to include</GhostLink>
          </div>
          <p className="mt-5 text-[12px] leading-5 text-neutral-500">
            For HR managers, recruiters, hiring managers and department heads.
          </p>
        </div>
      </section>

      <section id="what-it-includes" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Definition
            </p>
            <h2 className="mt-3 max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is an Interview Scorecard?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              An interview scorecard is a document used to evaluate candidates against predefined
              job-related criteria. It typically includes candidate information, assessment
              categories, rating scales, interviewer notes and an overall recommendation.
            </p>
            <p>
              The scorecard supports consistent evaluation but does not replace professional
              judgment or appropriate technical assessments. Employers should avoid collecting
              irrelevant sensitive personal information.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Scorecard contents
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What Should an Interview Scorecard Include?
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whatItIncludes.map((item) => (
              <li key={item.title} className="rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Employers should review criteria for fairness and relevance so that scoring supports
            consistent, defensible hiring decisions.
          </p>
        </div>
      </section>

      <section id="generator" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Interactive tool
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            How the Generator Works
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Follow five steps to build an editable scorecard: select the role, define evaluation
            criteria, set the rating scale, assign optional weights, then generate the form. The
            output includes notes fields and works for print or copy.
          </p>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {howItWorks.map((item, index) => (
              <li key={item.step} className="border-t border-black/10 pt-5">
                <p className="text-[11px] font-medium tracking-[0.14em] text-brand tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{item.step}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <InterviewScorecardGenerator />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Why structured evaluation
            </p>
            <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Why Structured Evaluation Matters
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Interviewers use the same relevant criteria for comparable candidates, hiring teams
              can record evidence supporting their evaluations, and multiple interviewers can
              discuss candidates using a shared framework.
            </p>
            <p>
              A scorecard does not eliminate bias automatically. Employers should review criteria
              for fairness and relevance before relying on scores.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Industry adaptation
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Adapting Scorecards Across Industries
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Healthcare employers may evaluate administrative communication and role-specific
              eligibility. Manufacturers may prioritize technical aptitude and shift requirements.
              Warehouse employers may assess operational understanding and availability.
            </p>
            <p>
              Every scorecard should reflect the actual responsibilities of the position. A
              technical role may require additional practical assessments alongside scoring.
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
            <InterviewScorecardFaq />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              From evaluation to hiring
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              From Evaluation to Hiring
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              Once candidates have been assessed, employers can use the completed scorecards to
              support internal selection discussions. EarlyJobs can assess recruitment requirements
              for employers seeking additional candidate sourcing support.
            </p>
            <div className="mt-8">
              <SolidLink href="/contact-us">Discuss Your Hiring Requirements</SolidLink>
            </div>
          </div>
          <div className="hidden lg:flex flex-col justify-center items-end">
            <div className="max-w-sm rounded-xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                Scorecard output
              </p>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Editable scorecard with candidate fields, weighted criteria, rating inputs,
                evidence notes and recommendation options.
              </p>
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
            Generate Your Interview Scorecard
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Build a structured, editable evaluation form for consistent candidate assessment.
          </p>
          <div className="mt-8">
            <SolidLink href="#generator">Create an Interview Scorecard</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
