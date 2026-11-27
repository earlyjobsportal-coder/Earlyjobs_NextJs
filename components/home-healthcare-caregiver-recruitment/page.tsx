import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { HomeHealthcareFaq } from "@/components/home-healthcare-caregiver-recruitment/faq";
import { HomeHealthcareHeroVisual } from "@/components/home-healthcare-caregiver-recruitment/hero-visual";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const challenges = [
  "A qualified candidate may be unavailable for the required shift.",
  "Hospital experience does not imply comfort in residential care settings.",
  "Assignments are geographically distributed across neighbourhoods and cities.",
  "Shift and schedule availability must match patient care needs.",
  "Communication skills and professional conduct matter in sensitive home environments.",
  "Employer-defined background screening must be confirmed before placement.",
] as const;

const roleCards = [
  {
    title: "Home Nursing",
    tone: "Clinical",
    body: "Qualified nursing personnel who meet applicable professional registration and employer requirements.",
  },
  {
    title: "Caregiving Support",
    tone: "Patient-facing",
    body: "Caregivers and patient support workers whose responsibilities match their training and experience.",
  },
  {
    title: "Elderly Care Support",
    tone: "Non-clinical",
    body: "Suitable non-clinical care assistants and support personnel.",
  },
  {
    title: "Care Coordination",
    tone: "Administrative",
    body: "Scheduling assistants, patient service coordinators and administrative support associates.",
  },
  {
    title: "Operations Support",
    tone: "Administrative",
    body: "Documentation, customer coordination and relevant entry-level administrative roles.",
  },
] as const;

const process = [
  {
    title: "Requirement planning",
    body: "Define roles, locations and schedules.",
  },
  {
    title: "Eligibility screening",
    body: "Establish mandatory qualifications and experience.",
  },
  {
    title: "Candidate identification",
    body: "Explore suitable applicants.",
  },
  {
    title: "Employer evaluation",
    body: "Conduct interviews and necessary checks.",
  },
  {
    title: "Selection and joining",
    body: "Communicate responsibilities and reporting expectations.",
  },
] as const;

const related = [
  {
    href: "/diagnostic-centre-lab-recruitment",
    title: "Diagnostic Centre & Medical Lab Recruitment",
    body: "Hire phlebotomists, lab assistants and shift-lab support for diagnostic chains across India.",
  },
  {
    href: "/resources/manpower-requisition-template",
    title: "Manpower Requisition Template",
    body: "Capture location-wise vacancies, qualifications and joining timelines before sourcing.",
  },
  {
    href: "/ai-recruiting-automation-healthcare-staffing",
    title: "Healthcare Recruitment Automation",
    body: "Explore coordinated healthcare staffing workflows for clinical operations.",
  },
] as const;

export function HomeHealthcareCaregiverRecruitmentPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, rgba(236, 72, 153, 0.1), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(245, 158, 11, 0.08), transparent 42%), linear-gradient(180deg, #fef7f3 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Home healthcare
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Home Healthcare & Caregiver Recruitment Across India
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs helps home healthcare organizations explore recruitment for suitable
              caregiving, patient support and administrative positions. Employers can align
              qualifications, availability, location preferences and responsibilities before
              selection.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Home Healthcare Hiring</SolidLink>
              <GhostLink href="#journey">See care journey</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For home healthcare companies, elderly care providers, assisted living operators and
              healthcare HR managers.
            </p>
          </div>
          <HomeHealthcareHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Why Home Healthcare Recruitment Is Different
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Home healthcare employers must match workforce requirements with the practical
              conditions of individual assignments. A candidate may be qualified but unavailable
              for the required shift; another may be willing to work in a hospital but not in a
              residential care environment. These differences should be understood before
              selection.
            </p>
            <p>
              Important recruitment considerations include relevant care qualifications, experience
              with required responsibilities, assignment location, shift and schedule availability,
              communication skills, employer-defined background screening and patient safety.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#fef7f3]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Recruitment considerations
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Practical Conditions Shape Candidate Suitability
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Qualification alone is not enough for home care roles. Employers should weigh
            availability, location, shift fit and conduct expectations alongside credentials before
            sourcing begins.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {challenges.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm leading-6 text-neutral-700"
              >
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-rose-500" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Employers should explain working conditions clearly and avoid assigning clinical
            responsibilities to unqualified personnel.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Roles Across Home Healthcare
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roleCards.map((item) => (
              <li
                key={item.title}
                className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 transition-shadow hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
              >
                <p className="text-[11px] font-semibold tracking-[0.12em] text-rose-700 uppercase">
                  {item.tone}
                </p>
                <h3 className="mt-2 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm leading-6 text-neutral-500">
            Clinical procedures must be performed only by appropriately qualified and authorized
            personnel. Employers remain responsible for credential verification.
          </p>
        </div>
      </section>

      <section id="journey" className="scroll-mt-24 border-b border-black/10 bg-[#fef7f3]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Multi-location service networks
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Hiring Across Multiple Service Locations
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Home healthcare organizations may serve patients across different neighbourhoods or
            cities, creating location-specific recruitment requirements. Employers should define
            assignment areas, travel expectations, working hours and employment conditions before
            candidate sourcing begins. Where accommodation or transport is provided, the details
            should be confirmed accurately.
          </p>
          <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
                  Service area planning
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-neutral-950">
                  Location-specific hiring requirements
                </h3>
              </div>
              <p className="max-w-sm text-sm leading-6 text-neutral-600">
                Define assignment zones, shift coverage and employment conditions per location so
                sourcing matches the actual care environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Suitability beyond qualifications
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Candidate Suitability Beyond Qualifications
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Communication, reliability, respect for patient privacy and an understanding of
              professional boundaries are relevant considerations for the care environment. These
              qualities should be assessed through appropriate employer-led interviews, reference
              checks and onboarding procedures.
            </p>
            <p>
              Recruitment alone does not replace safeguarding, credential verification or patient
              safety processes. Employers must ensure all required checks and legal obligations are
              completed.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#fef7f3]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            From vacancy to joining
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            A Practical Hiring Process
          </h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((item, index) => (
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

      <section id="enquiry" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Why EarlyJobs
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Why EarlyJobs?
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs combines technology-enabled recruitment with recruiter and institutional
              partnership networks. For home healthcare providers, the objective is to connect
              clearly defined workforce needs with suitable candidate pools.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              Employers can discuss recurring vacancies, expansion requirements and location-specific
              hiring needs. Qualification review remains human-led and employer-owned — EarlyJobs
              does not certify caregivers or nurses.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Share Your Care Workforce Requirements</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="home_healthcare_caregiver_enquiry"
              sourceLabel="Home Healthcare & Caregiver Recruitment"
              submitLabel="Discuss Home Healthcare Hiring"
              defaultMessage="Home healthcare and caregiver recruitment enquiry."
              extraFields="diagnostic"
            />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-b border-black/10 bg-[#fef7f3]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">FAQ</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 max-w-3xl">
            <HomeHealthcareFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="We support home healthcare providers hiring caregivers, home nurses, patient support staff and care coordinators." />

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
              "radial-gradient(ellipse at 50% 0%, rgba(236, 72, 153, 0.12), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(245, 158, 11, 0.08), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Plan Your Home Healthcare Recruitment
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share service locations, role types and hiring volumes for a recruitment assessment.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Home Healthcare Hiring</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
