import type { Metadata } from "next";
import { PharmaceuticalManufacturingRecruitmentPage } from "@/components/pharmaceutical-manufacturing-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/pharmaceutical-manufacturing-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/pharmaceutical-manufacturing-recruitment",
  title: "Pharmaceutical Manufacturing Recruitment in India | EarlyJobs",
  description:
    "Hire production operators, packaging staff, junior QC talent and plant support workers for pharmaceutical manufacturing operations in India.",
  ogTitle: "Pharmaceutical Manufacturing Recruitment in India | EarlyJobs",
  ogDescription:
    "Hire production operators, packaging staff, junior QC talent and plant support workers for pharmaceutical manufacturing operations in India.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs pharmaceutical manufacturing recruitment",
  twitterTitle: "Pharmaceutical Manufacturing Recruitment in India",
  twitterDescription:
    "Entry-level pharma plant staffing — production, packaging, QC support and warehouse roles.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PharmaceuticalManufacturingRecruitmentPage />
    </>
  );
}
