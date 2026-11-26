import type { Metadata } from "next";
import { TextileApparelManufacturingRecruitmentPage } from "@/components/textile-apparel-manufacturing-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/textile-apparel-manufacturing-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/textile-apparel-manufacturing-recruitment",
  title: "Textile & Apparel Manufacturing Recruitment | EarlyJobs",
  description:
    "Explore recruitment for textile mills, garment factories and apparel manufacturers, including production trainees, machine operators, quality assistants and packing staff.",
  ogTitle: "Textile & Apparel Manufacturing Recruitment | EarlyJobs",
  ogDescription:
    "Explore recruitment for textile mills, garment factories and apparel manufacturers, including production trainees, machine operators, quality assistants and packing staff.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs textile and apparel manufacturing recruitment",
  twitterTitle: "Textile Manufacturing Recruitment India",
  twitterDescription:
    "Garment factory manpower recruitment, apparel manufacturing staffing and textile worker hiring in India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <TextileApparelManufacturingRecruitmentPage />
    </>
  );
}
