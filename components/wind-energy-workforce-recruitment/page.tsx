import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { WindFaq } from "@/components/wind-energy-workforce-recruitment/faq";
import { WindHeroVisual } from "@/components/wind-energy-workforce-recruitment/hero-visual";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const considerations = [
  "Project and facility locations, often far from employment centres.",
  "Technical qualifications appropriate to turbine work.",
  "Relevant industry experience.",
  "Travel and relocation expectations.",
  "Shift and maintenance schedules.",
  "Safety training requirements.",
  "Mandatory authorizations and certifications.",
] as const;

const roleCards = [
  {
    title: "Project Support",
    body: "Site assistants, documentation associates and junior project coordinators.",
  },
  {
    title: "Electrical Support",
    body: "Qualified electrical technicians and trainees working within authorized responsibilities.",
  },
  {
    title: "Mechanical Maintenance",
    body: "Junior mechanical support personnel and appropriately qualified maintenance technicians.",
  },
  {
    title: "Materials and Logistics",
    body: "Warehouse assistants, inventory coordinators and dispatch support staff.",
  },
  {
    title: "Site Administration",
    body: "Data-entry operators, HR support associates and operational administration staff.",
  },
] as const;

const developmentVsOperations = [
  {
    phase: "Construction / project development",
    focus: "Materials handling, site coordination and installation support.",
    timing: "Aligned to construction readiness and commissioning dates.",
  },
  {
    phase: "Operations and maintenance",
    focus: "Maintenance personnel, technical specialists and administrative support.",
    timing: "Ongoing, shift-aligned workforce at operational facilities.",
  },
] as const;

const process = [
  {
    title: "Requirement planning",
    body: "Define project roles, locations and eligibility.",
  },
  {
    title: "Candidate identification",
    body: "Explore applicants with relevant qualifications and availability.",
  },
  {
    title: "Employer evaluation",
    body: "Conduct interviews, technical assessments and mandatory checks.",
  },
  {
    title: "Selection coordination",
    body: "Communicate approved employment conditions.",
  },
  {
    title: "Joining follow-up",
    body: "Support candidate communication within the agreed recruitment scope.",
  },
] as const;

const related = [
  {
    href: "/solar-renewable-energy-recruitment",
    title: "Solar & Renewable Energy Recruitment",
    body: "Hire solar technicians, installation helpers and multi-site project staff across India.",
  },
  {
    href: "/industrial-maintenance-technician-recruitment",
    title: "Industrial Technician Recruitment",
    body: "Electrical, mechanical and junior technician hiring for industrial facilities.",
  },
  {
    href: "/resources/90-day-workforce-hiring-plan",
    title: "90-Day Workforce Hiring Plan",
    body: "Phase project manpower, joining dates and locations before sourcing.",
  },
] as const;

export function WindEnergyWorkforceRecruitmentPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 14% 0%, rgba(251,191,36,0.12), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(14,165,233,0.1), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Wind energy
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Build the Workforce Supporting Wind Energy Projects
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              Wind energy projects depend on people working across installation support, electrical
              systems, equipment maintenance, site coordination and operational administration.
              EarlyJobs helps renewable energy employers explore recruitment for suitable entry-level
              support, junior technical and project coordination positions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Wind Energy Hiring Requirements</SolidLink>
              <GhostLink href="#signature">See development vs operations hiring</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For wind energy developers, turbine manufacturers, operations and maintenance
              contractors, EPC companies and project HR teams.
            </p>
          </div>
          <WindHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Why Wind Energy Recruitment Needs Specialized Planning
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Wind energy facilities can be located far from major employment centres. Some positions
              involve travel, outdoor work, electrical systems or working at height. These conditions
              make accurate job descriptions and qualification requirements essential.
            </p>
            <p>
              A candidate&apos;s general interest in renewable energy does not establish suitability for
              turbine-related technical work.
            </p>
          </div>
          <ul className="mt-2 grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:mt-4">
            {considerations.map((item) => (
              <li
                key={item}
                className="flex h-full gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm leading-6 text-neutral-700"
              >
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Roles Across Wind Energy Operations
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roleCards.map((item) => (
              <li
                key={item.title}
                className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 sm:p-8 transition-shadow hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
              >
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm leading-6 text-neutral-500">
            Turbine climbing, high-voltage work and other safety-critical responsibilities require
            appropriate competence, training and authorization.
          </p>
        </div>
      </section>

      <section id="signature" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Development vs operations
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Project Development Versus Operations Workforce
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              Wind energy employers may require different workforce profiles during project
              development and ongoing operations. These requirements should be planned separately.
            </p>
          </div>
          <div className="space-y-6">
            {developmentVsOperations.map((item) => (
              <div
                key={item.phase}
                className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8"
              >
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.phase}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.focus}</p>
                <p className="mt-1 text-xs font-medium tracking-[0.1em] text-brand uppercase">
                  {item.timing}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Trust and safety
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Support Roles Versus Safety-Critical Work
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Employers should distinguish between administrative and support positions and
            safety-critical responsibilities. Candidates must not be assigned specialist turbine work
            without the required training and supervision.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            <li className="flex gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm leading-6 text-neutral-700">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2563EB]" />
              Support: documentation, data entry, HR support and site administration
            </li>
            <li className="flex gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm leading-6 text-neutral-700">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2563EB]" />
              Safety-critical: turbine climbing, high-voltage work and equipment maintenance
            </li>
          </ul>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Talent pipeline
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Connecting Technical Education With Renewable Energy Careers
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              ITIs, polytechnics and engineering institutions may provide relevant candidates for
              certain entry-level technical roles. However, employers should distinguish between
              academic qualifications and demonstrated competence for turbine operations.
            </p>
            <p>
              Candidates must not be assigned specialist work without the required training and
              supervision.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            From brief to joining
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            A Practical Recruitment Process
          </h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
              partnership networks. For wind energy employers, the objective is to connect clearly
              defined workforce requirements with suitable candidate pools.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              Employers can discuss project-based recruitment, recurring support vacancies and
              multi-location hiring requirements.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Plan Your Wind Energy Workforce Recruitment</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="wind_energy_enquiry"
              sourceLabel="Wind Energy Workforce Recruitment"
              submitLabel="Discuss Wind Energy Hiring Requirements"
              defaultMessage="Wind energy project workforce enquiry."
              extraFields="wind"
            />
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
            <WindFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="We support wind energy employers hiring project-site, technical and operational workforce." />

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
              "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.12), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(14,165,233,0.08), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Plan Your Wind Energy Workforce Recruitment
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share project locations, hiring volume and role categories — and align recruitment with
            site execution.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Wind Energy Hiring Requirements</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
