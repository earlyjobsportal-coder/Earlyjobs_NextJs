import type { Metadata } from "next";
import { ConstructionInfrastructureRecruitmentPage } from "@/components/construction-infrastructure-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/construction-infrastructure-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/construction-infrastructure-recruitment",
  title: "Construction & Infrastructure Recruitment India | EarlyJobs",
  description:
    "Explore construction and infrastructure workforce recruitment for site support, technicians, equipment operators and project administration roles across India.",
  ogTitle: "Construction & Infrastructure Recruitment India | EarlyJobs",
  ogDescription:
    "Explore construction and infrastructure workforce recruitment for site support, technicians, equipment operators and project administration roles across India.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs construction and infrastructure recruitment",
  twitterTitle: "Construction & Infrastructure Recruitment India",
  twitterDescription:
    "Construction manpower recruitment — site support, trades, equipment and project admin across India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <ConstructionInfrastructureRecruitmentPage />
    </>
  );
}
