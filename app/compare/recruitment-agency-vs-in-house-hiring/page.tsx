import type { Metadata } from "next";
import { RecruitmentAgencyVsInHousePage } from "@/components/recruitment-agency-vs-in-house/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/recruitment-agency-vs-in-house-hiring.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/compare/recruitment-agency-vs-in-house-hiring",
  title: "Recruitment Agency vs In-House Hiring | Employer Guide",
  description:
    "Compare recruitment agencies and in-house hiring teams across cost, control, candidate sourcing and scalability. Choose the right hiring model for your business.",
  ogTitle: "Recruitment Agency vs In-House Hiring | Employer Guide",
  ogDescription:
    "Compare recruitment agencies and in-house hiring across cost, control, sourcing and scalability.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Recruitment Agency vs In-House Hiring Guide",
  twitterTitle: "Recruitment Agency vs In-House Hiring",
  twitterDescription:
    "A balanced employer guide to in-house, agency and hybrid recruitment models.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <RecruitmentAgencyVsInHousePage />
    </>
  );
}
