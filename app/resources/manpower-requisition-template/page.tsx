import type { Metadata } from "next";
import { ManpowerRequisitionTemplatePage } from "@/components/manpower-requisition-template/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/manpower-requisition-template.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/resources/manpower-requisition-template",
  title: "Free Manpower Requisition Form & Hiring Template | EarlyJobs",
  description:
    "Download a manpower requisition template for HR teams. Plan vacancies, shifts, salaries, locations and joining timelines before starting recruitment.",
  ogTitle: "Free Manpower Requisition Form & Hiring Template | EarlyJobs",
  ogDescription:
    "Download a manpower requisition template for HR teams. Plan vacancies, shifts, salaries, locations and joining timelines before starting recruitment.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Manpower Requisition Template",
  twitterTitle: "Free Manpower Requisition Form",
  twitterDescription:
    "Structure vacancies, eligibility, compensation and approvals before recruitment begins.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <ManpowerRequisitionTemplatePage />
    </>
  );
}
