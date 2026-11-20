import type { Metadata } from "next";
import { ElectronicsManufacturingRecruitmentPage } from "@/components/electronics-manufacturing-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/electronics-manufacturing-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/electronics-manufacturing-recruitment",
  title: "Electronics Manufacturing Recruitment & EMS Hiring | EarlyJobs",
  description:
    "Explore entry-level recruitment for electronics and EMS manufacturing. Hire assembly operators, production trainees and quality support staff in India.",
  ogTitle: "Electronics Manufacturing Recruitment & EMS Hiring | EarlyJobs",
  ogDescription:
    "Explore entry-level recruitment for electronics and EMS manufacturing. Hire assembly operators, production trainees and quality support staff in India.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs electronics manufacturing recruitment",
  twitterTitle: "Electronics Manufacturing Recruitment & EMS Hiring",
  twitterDescription:
    "Entry-level EMS staffing — assembly operators, production trainees and quality support in India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <ElectronicsManufacturingRecruitmentPage />
    </>
  );
}
