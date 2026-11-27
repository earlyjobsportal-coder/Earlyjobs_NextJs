import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { TextileFaq } from "@/components/textile-apparel-manufacturing-recruitment/faq";
import { TextileHeroVisual } from "@/components/textile-apparel-manufacturing-recruitment/hero-visual";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const considerations = [
  "Factory location and commuting accessibility.",
  "Production shift schedules.",
  "Machine-specific experience.",
  "Required skills and training.",
  "Seasonal or order-driven hiring demand.",
  "Compensation and employment conditions.",
  "Expected joining dates.",
] as const;

const roleCards = [
  {
    title: "Production Operations",
    body: "Production trainees, sewing machine operators and manufacturing assistants.",
  },
  {
    title: "Finishing and Packaging",
    body: "Finishing assistants, packing associates, labelling workers and dispatch support.",
  },
  {
    title: "Quality Inspection",
    body: "Junior quality assistants and garment inspection trainees, subject to employer requirements.",
  },
  {
    title: "Warehouse and Materials",
    body: "Fabric inventory assistants, material handlers and warehouse associates.",
  },
  {
    title: "Factory Administration",
    body: "Documentation assistants, data-entry operators and junior HR coordinators.",
  },
] as const;

const productionWorkflow = [
  {
    step: "01",
    title: "Materials",
    body: "Fabric receipt, inspection and storage.",
  },
  {
    step: "02",
    title: "Production",
    body: "Spinning, weaving, knitting and garment stitching.",
  },
  {
    step: "03",
    title: "Finishing",
    body: "Trimming, pressing, labelling and quality checks.",
  },
  {
    step: "04",
    title: "Packaging",
    body: "Folding, packing, cartoning and dispatch preparation.",
  },
] as const;

const facilityTypes = [
  {
    type: "Textile mill",
    focus: "Spinning, weaving or processing equipment knowledge.",
  },
  {
    type: "Garment manufacturing unit",
    focus: "Stitching, finishing and packaging priority.",
  },
  {
    type: "Apparel export facility",
    focus: "Production support with documentation and dispatch personnel.",
  },
] as const;

const process = [
  {
    title: "Workforce requirement",
    body: "Define positions, vacancies and production schedules.",
  },
  {
    title: "Eligibility",
    body: "Specify skills, experience and workplace conditions.",
  },
  {
    title: "Candidate identification",
    body: "Explore relevant recruitment channels.",
  },
  {
    title: "Employer assessment",
    body: "Conduct interviews and practical tests.",
  },
  {
    title: "Joining coordination",
    body: "Communicate selection outcomes and reporting requirements.",
  },
] as const;

const related = [
  {
    href: "/food-processing-fmcg-manufacturing-recruitment",
    title: "Food Processing Recruitment",
    body: "Hygiene-aware production and packaging staff for food and FMCG plants.",
  },
  {
    href: "/warehouse-distribution-centre-recruitment",
    title: "Warehouse Recruitment",
    body: "Pickers, packers, inventory and dispatch staff for warehouses and DCs.",
  },
  {
    href: "/resources/bulk-hiring-checklist",
    title: "Bulk Hiring Checklist",
    body: "Plan headcount, shifts and joining timelines for volume hiring.",
  },
] as const;

export function TextileApparelManufacturingRecruitmentPage() {
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
              EarlyJobs · Textile & apparel
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Build the Workforce Behind Textile and Apparel Production
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              Textile and apparel manufacturing depends on coordinated teams working across
              production, machine operations, finishing, quality inspection, packaging and dispatch.
              EarlyJobs helps textile and apparel employers explore recruitment for relevant
              manufacturing and factory support positions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Textile Manufacturing Hiring</SolidLink>
              <GhostLink href="#workflow">See the production workflow</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For textile manufacturers, garment exporters, apparel production companies, industrial
              HR managers and factory operations leaders.
            </p>
          </div>
          <TextileHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Why Apparel Manufacturing Needs Structured Recruitment
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Textile and garment production can involve different manufacturing processes,
              equipment and production schedules. A sewing machine operator may require practical
              experience, while a packing assistant may be suitable for entry-level recruitment.
              Employers must distinguish between these requirements.
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
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-neutral-600 lg:col-span-2 lg:mt-4">
            Clear communication helps candidates understand the role before employer evaluation.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Roles Across Textile and Apparel Manufacturing
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
            Technical equipment operation must be assigned to personnel with appropriate training and
            supervision.
          </p>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Production workflow
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              From Materials to Finished Garments
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              A textile or apparel employer&apos;s hiring needs follow the production workflow — from
              material handling through finishing, packaging and dispatch. Role requirements change
              at each stage.
            </p>
          </div>
          <div className="space-y-6">
            {productionWorkflow.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 rounded-full border border-black/10 bg-[#f7f8fa] px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-neutral-600 tabular-nums mt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-600">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Facility-specific hiring
            </p>
            <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Hiring for Different Production Requirements
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              A textile mill may require workers with knowledge of spinning, weaving or processing
              equipment. A garment manufacturing unit may prioritize stitching, finishing and
              packaging. An apparel export facility may require production support alongside
              documentation and dispatch personnel.
            </p>
            <p>
              These differences should guide recruitment planning. Employers should prepare
              role-specific hiring briefs rather than using one generic factory job description.
            </p>
          </div>
          <ul className="mt-2 grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:mt-4 lg:grid-cols-3">
            {facilityTypes.map((item) => (
              <li
                key={item.type}
                className="flex h-full gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm leading-6 text-neutral-700"
              >
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                <span>
                  <span className="font-semibold">{item.type}</span> — {item.focus}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Demand planning
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Workforce Planning for Changing Demand
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Textile and apparel employers may experience changing production requirements due to
              order schedules or facility expansion. Recruitment teams can plan ahead by identifying
              expected headcount, shift arrangements and joining timelines.
            </p>
            <p>
              For temporary or fixed-term positions, employment conditions should be communicated
              accurately.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Career pathways
            </p>
            <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Connecting Candidates With Manufacturing Careers
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Entry-level textile and apparel positions may attract candidates from vocational
              institutions, relevant training programs and broader local labour markets. Eligibility
              depends on the position.
            </p>
            <p>
              Experienced machine operation roles should not be represented as suitable for untrained
              candidates. Employers should conduct practical evaluations where necessary.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            A structured process
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            A Structured Recruitment Process
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

      <section id="enquiry" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Why EarlyJobs
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Why EarlyJobs?
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs combines technology-enabled recruitment with a recruiter and institutional
              partnership network. For textile and apparel manufacturers, the focus is on connecting
              clearly defined workforce requirements with relevant candidates.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              Employers can discuss production expansion, replacement vacancies or hiring across
              multiple facilities.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Build Your Textile Manufacturing Hiring Pipeline</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="textile_apparel_enquiry"
              sourceLabel="Textile & Apparel Manufacturing Recruitment"
              submitLabel="Discuss Textile Manufacturing Hiring"
              defaultMessage="Textile and apparel manufacturing workforce enquiry."
              extraFields="textile"
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
            <TextileFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="We support textile and apparel employers hiring production, quality and factory support workforce." />

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
            Build Your Textile Manufacturing Hiring Pipeline
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share factory locations, hiring volume and role categories — and align recruitment with
            production schedules.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Textile Manufacturing Hiring</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
