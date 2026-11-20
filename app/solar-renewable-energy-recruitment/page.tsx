import type { Metadata } from "next";
import { SolarRenewableEnergyRecruitmentPage } from "@/components/solar-renewable-energy-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/solar-renewable-energy-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/solar-renewable-energy-recruitment",
  title: "Solar & Renewable Energy Recruitment in India | EarlyJobs",
  description:
    "Explore workforce recruitment for solar projects, renewable energy operations, installation support and entry-level technical roles across India.",
  ogTitle: "Solar & Renewable Energy Recruitment in India | EarlyJobs",
  ogDescription:
    "Explore workforce recruitment for solar projects, renewable energy operations, installation support and entry-level technical roles across India.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs solar and renewable energy recruitment",
  twitterTitle: "Solar & Renewable Energy Recruitment in India",
  twitterDescription:
    "Solar workforce recruitment — installation support, technicians and project manpower across India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <SolarRenewableEnergyRecruitmentPage />
    </>
  );
}
