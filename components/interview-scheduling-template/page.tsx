import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { InterviewSchedulingFaq } from "@/components/interview-scheduling-template/faq";
import { SchedulePreview } from "@/components/interview-scheduling-template/schedule-preview";

const includeFields = [
  {
    title: "Candidate and role information",
    body: "Candidate name or reference ID, job title and department.",
  },
  {
    title: "Interview schedule",
    body: "Date, start time, expected duration and time zone where relevant.",
  },
  {
    title: "Interview format",
    body: "In-person, telephone or video interview.",
  },
  {
    title: "Interviewer information",
    body: "Assigned interviewer and relevant coordination contact.",
  },
  {
    title: "Location or meeting details",
    body: "Office address, interview venue or approved meeting link.",
  },
  {
    title: "Interview status",
    body: "Scheduled, confirmed, completed, rescheduled or cancelled.",
  },
  {
    title: "Follow-up responsibility",
    body: "The person responsible for communicating next steps.",
  },
] as const;

const steps = [
  {
    title: "Collect shortlisted candidates",
    body: "Confirm which candidates are eligible to proceed.",
  },
  {
    title: "Identify interviewer availability",
    body: "Coordinate with hiring managers or technical evaluators.",
  },
  {
    title: "Assign interview slots",
    body: "Avoid overlapping appointments and unrealistic scheduling gaps.",
  },
  {
    title: "Communicate instructions",
    body: "Share the date, time, format and relevant reporting details.",
  },
  {
    title: "Track confirmation",
    body: "Record whether the candidate has confirmed attendance.",
  },
  {
    title: "Update the status",
    body: "Mark completed, rescheduled or cancelled interviews.",
  },
  {
    title: "Record follow-up ownership",
    body: "Identify who will communicate the next recruitment step.",
  },
] as const;

const industries = [
  {
    title: "Manufacturing",
    body: "Schedule interviews for several production trainee positions with consistent status tracking.",
  },
  {
    title: "Healthcare",
    body: "Coordinate different interview panels for administrative and qualified clinical roles.",
  },
  {
    title: "Logistics",
    body: "Organise interviews across multiple warehouse locations without overlapping slots.",
  },
] as const;

const related = [
  {
    href: "/tools/interview-scorecard-generator",
    title: "Interview Scorecard Generator",
    body: "Build evaluation criteria once interviews are booked.",
  },
  {
    href: "/tools/recruitment-funnel-calculator",
    title: "Recruitment Funnel Calculator",
    body: "Measure stage conversions from applications through to joinings.",
  },
  {
    href: "/resources/bulk-hiring-checklist",
    title: "Bulk Hiring Checklist",
    body: "Plan high-volume hiring across sourcing, interviews and joining.",
  },
] as const;

function fileExists(relativePublicPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", relativePublicPath));
}

export function InterviewSchedulingTemplatePage() {
  const xlsxAvailable = fileExists("resources/earlyjobs-interview-scheduling-template.xlsx");

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
              Organize Candidate Interviews Without Losing Track of Details
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              Interview scheduling is an important part of recruitment coordination. When several
              candidates, interviewers and vacancies are involved, scheduling information can become
              scattered across emails, messages and spreadsheets. The EarlyJobs Interview Scheduling
              Template helps employers organise interview arrangements in one structured document.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#template">Download the Interview Scheduling Template</SolidLink>
              <GhostLink href="#how-to-use">How to use it</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For HR coordinators, recruiters, hiring managers and talent acquisition operations
              teams.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-6">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
              Clean interview scheduling sheet
            </p>
            <div className="mt-4 space-y-3 rounded-xl border border-black/10 bg-[#f8fafc] p-4">
              {[
                "Candidate ID · Role · Department",
                "Date · Time · Duration · Zone",
                "Format · Interviewer · Venue / link",
                "Status · Follow-up owner",
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
              What Is an Interview Scheduling Template?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              An interview scheduling template is a planning document used to record interview
              appointments and relevant coordination details. It typically includes the candidate
              identifier, job role, interview date, time, interviewer, location or meeting method and
              current status.
            </p>
            <p>
              The template supports scheduling consistency but does not automatically send invitations
              unless a separate integration is implemented.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Template fields
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What Should the Template Include?
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {includeFields.map((item) => (
              <li key={item.title} className="rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Organizations should limit access to candidate information according to their privacy
            requirements.
          </p>
        </div>
      </section>

      <section id="template" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Free download
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Preview and download the scheduling template
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Switch between sheet and calendar-style previews. The downloadable workbook includes
            status dropdowns and blank rows for your hiring team.
          </p>
          <div className="mt-10">
            <SchedulePreview xlsxAvailable={xlsxAvailable} />
          </div>
        </div>
      </section>

      <section id="how-to-use" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            How to use
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            How to Use the Template
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
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            High-volume coordination
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Designed for High-Volume Interview Coordination
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {industries.map((item) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            The template can support these requirements through consistent columns and status
            definitions.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Common pitfalls
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Avoid Common Scheduling Problems
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Recruitment teams should confirm interviewer availability before offering slots.
              Candidates should receive clear information about interview format and location.
              Changes should be communicated promptly.
            </p>
            <p>
              Employers should also distinguish between an interview invitation and an attended
              interview when reporting recruitment metrics. The template provides a structure for
              these activities but does not guarantee attendance.
            </p>
          </div>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Next step
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              From Interviews to Hiring Decisions
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              After interviews are completed, employers can use a separate scorecard or evaluation
              process to assess candidates.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs can discuss recruitment requirements where employers need additional candidate
              sourcing support.
            </p>
          </div>
          <IndustryEnquiryForm
            formId="interview_scheduling_template_enquiry"
            sourceLabel="Interview Scheduling Template"
            submitLabel="Discuss Your Recruitment Requirements"
            defaultMessage="Recruitment requirements shared from interview scheduling template page."
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
            <InterviewSchedulingFaq />
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
            Download Your Interview Scheduling Template
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Organise candidate interviews, interviewer availability, locations and recruitment status
            across hiring teams.
          </p>
          <div className="mt-8">
            <SolidLink href="#template">Download the Interview Scheduling Template</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
