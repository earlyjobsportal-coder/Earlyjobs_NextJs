import type { Metadata } from "next";
import { BatteryManufacturingRecruitmentPage } from "@/components/battery-manufacturing-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/battery-manufacturing-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/battery-manufacturing-recruitment",
  title: "Battery Manufacturing Recruitment in India | EarlyJobs",
  description:
    "Explore entry-level recruitment for battery manufacturing plants, including production trainees, assembly operators, quality assistants and warehouse staff.",
  ogTitle: "Battery Manufacturing Recruitment in India | EarlyJobs",
  ogDescription:
    "Explore entry-level recruitment for battery manufacturing plants, including production trainees, assembly operators, quality assistants and warehouse staff.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs battery manufacturing recruitment",
  twitterTitle: "Battery Manufacturing Recruitment in India",
  twitterDescription:
    "Entry-level battery plant hiring — production, assembly, quality and warehouse support.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <BatteryManufacturingRecruitmentPage />
    </>
  );
}
