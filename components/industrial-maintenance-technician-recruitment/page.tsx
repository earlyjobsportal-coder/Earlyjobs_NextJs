import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { IndustrialMaintenanceFaq } from "@/components/industrial-maintenance-technician-recruitment/faq";
import { IndustrialMaintenanceHeroVisual } from "@/components/industrial-maintenance-technician-recruitment/hero-visual";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const considerations = [
  "Educational qualifications match the technical scope.",
  "Relevant trade training for electrical or mechanical work.",
  "Equipment experience suited to facility machinery.",
  "Shift availability aligned with maintenance coverage.",
  "Plant location and travel expectations.",
  "Safety requirements and required licenses or authorizations.",
  "Practical assessment criteria for technical competence.",
] as const;

const roleCards = [
  {
    title: "Electrical Maintenance",
    tone: "Qualified trade",
    body: "Qualified electricians, electrical trainees and junior electrical support personnel.",
  },
  {
    title: "Mechanical Maintenance",
    tone: "Diploma-level",
    body: "Mechanical technicians, maintenance assistants and relevant diploma-level trainees.",
  },
  {
    title: "Equipment Support",
    tone: "Trainee",
    body: "Machine maintenance trainees and equipment support associates.",
  },
  {
    title: "Utilities and Facilities",
    tone: "Facility operations",
    body: "Junior utilities support staff and qualified facility maintenance personnel.",
  },
  {
    title: "Maintenance Administration",
    tone: "Administrative",
    body: "Documentation assistants, maintenance coordinators and spare-parts inventory associates.",
  },
] as const;

const process = [
  {
    title: "Define the technical requirement",
    body: "Identify equipment, responsibilities and qualifications.",
  },
  {
    title: "Establish eligibility",
    body: "Confirm experience, licenses and mandatory skills.",
  },
  {
    title: "Identify candidates",
    body: "Explore relevant talent pools.",
  },
  {
    title: "Conduct practical assessments",
    body: "Evaluate technical suitability through employer-defined methods.",
  },
  {
    title: "Coordinate selection",
    body: "Communicate employment terms and joining expectations.",
  },
] as const;

const related = [
  {
    href: "/ev-automotive-manufacturing-recruitment",
    title: "Automotive Manufacturing Recruitment",
    body: "Technician hiring for assembly machinery and automotive plant maintenance.",
  },
  {
    href: "/electronics-manufacturing-recruitment",
    title: "Electronics Manufacturing Recruitment",
    body: "Maintenance and technical support roles in electronics production facilities.",
  },
  {
    href: "/resources/90-day-workforce-hiring-plan",
    title: "90-Day Workforce Hiring Plan",
    body: "Structure equipment maintenance hiring across facilities over the next quarter.",
  },
] as const;

export function IndustrialMaintenanceTechnicianRecruitmentPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, rgba(160, 174, 192, 0.1), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(245, 158, 11, 0.08), transparent 42%), linear-gradient(180deg, #fbfbfb 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Industrial maintenance
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Industrial Maintenance & Technician Recruitment Across India
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs helps industrial employers explore recruitment for relevant junior
              maintenance, technical support and qualified technician positions. Align
              qualifications, practical skills, equipment experience and working environment
              before selection.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Industrial Technician Hiring</SolidLink>
              <GhostLink href="#journey">See technical alignment</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For manufacturing plants, industrial facilities, maintenance contractors,
              operations leaders and plant HR teams.
            </p>
          </div>
          <IndustrialMaintenanceHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Why Industrial Technician Recruitment Requires Skill Alignment
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Maintenance roles vary substantially across facilities. An electrical technician
              working with industrial control systems has different responsibilities from a
              mechanical maintenance assistant. Employers should define the technical scope
              before sourcing candidates.
            </p>
            <p>
              Important considerations include educational qualifications, relevant trade
              training, equipment experience, shift availability, plant location, safety
              requirements, required licenses or authorizations and practical assessment criteria.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#fbfbfb]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Technical scope alignment
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Qualification-to-Role Alignment
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            A detailed hiring brief helps distinguish trainee-level positions from roles requiring
            independent technical competence. Match educational background, trade training and
            hands-on equipment experience to the facility&apos;s maintenance requirements.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {considerations.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm leading-6 text-neutral-700"
              >
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-stone-500" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            High-risk electrical work, machinery isolation and specialized equipment maintenance
            require appropriate training and authorization.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role matrix
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Roles Across Industrial Maintenance
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roleCards.map((item) => (
              <li
                key={item.title}
                className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 transition-shadow hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
              >
                <p className="text-[11px] font-semibold tracking-[0.12em] text-stone-700 uppercase">
                  {item.tone}
                </p>
                <h3 className="mt-2 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm leading-6 text-neutral-500">
            High-risk electrical work, machinery isolation and specialized equipment maintenance
            require appropriate training and authorization. Employers remain responsible for
            technical safety verification.
          </p>
        </div>
      </section>

      <section id="journey" className="scroll-mt-24 border-b border-black/10 bg-[#fbfbfb]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Facility-specific requirements
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Hiring for Different Industrial Environments
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            A food processing facility may prioritize packaging equipment maintenance. An
            automotive plant may need technicians familiar with assembly machinery. A
            pharmaceutical facility may require personnel who understand controlled procedures
            and documentation requirements. These differences should influence candidate
            selection.
          </p>
          <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
                  Recruitment brief
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-neutral-950">
                  Equipment categories and work conditions
                </h3>
              </div>
              <p className="max-w-sm text-sm leading-6 text-neutral-600">
                Share equipment categories, technical requirements and work conditions so
                sourcing matches the actual industrial environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Entry-level technical pipelines
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Building Entry-Level Technical Pipelines
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              ITIs and polytechnics can be relevant sources of junior technical talent. However,
              employers should distinguish between educational qualifications and demonstrated
              practical competence.
            </p>
            <p>
              A newly qualified trainee may require supervision and structured training before
              undertaking independent maintenance tasks. EarlyJobs can assess suitable
              recruitment requirements through its available candidate and institutional networks.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#fbfbfb]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Structured hiring approach
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            A Structured Hiring Approach
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
              partnerships. For industrial employers, the focus is on aligning recruitment
              activity with clearly defined technical workforce needs.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              Employers can discuss junior technician pipelines, replacement hiring or
              requirements across multiple facilities. EarlyJobs does not perform technical
              assessments or certification.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Share Your Technical Hiring Requirements</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="industrial_maintenance_technician_enquiry"
              sourceLabel="Industrial Maintenance & Technician Recruitment"
              submitLabel="Discuss Industrial Technician Hiring"
              defaultMessage="Industrial maintenance and technician recruitment enquiry."
              extraFields="diagnostic"
            />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-b border-black/10 bg-[#fbfbfb]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">FAQ</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 max-w-3xl">
            <IndustrialMaintenanceFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="We support industrial employers hiring electrical, mechanical, equipment, utilities and maintenance administration technicians." />

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
              "radial-gradient(ellipse at 50% 0%, rgba(160, 174, 192, 0.12), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(245, 158, 11, 0.08), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Build Your Industrial Technical Workforce
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share equipment categories, technical requirements and hiring volumes for a
            recruitment assessment.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Industrial Technician Hiring</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
