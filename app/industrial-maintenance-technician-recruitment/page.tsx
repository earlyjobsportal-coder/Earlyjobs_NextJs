import type { Metadata } from "next";
import { IndustrialMaintenanceTechnicianRecruitmentPage } from "@/components/industrial-maintenance-technician-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/industrial-maintenance-technician-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/industrial-maintenance-technician-recruitment",
  title: "Industrial Maintenance & Technician Recruitment | EarlyJobs",
  description:
    "Explore recruitment for industrial maintenance, electrical, mechanical and junior technician roles across manufacturing and industrial facilities in India.",
  ogTitle: "Industrial Maintenance & Technician Recruitment | EarlyJobs",
  ogDescription:
    "Explore recruitment for industrial maintenance, electrical, mechanical and junior technician roles across manufacturing and industrial facilities in India.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs industrial maintenance and technician recruitment",
  twitterTitle: "Industrial Maintenance & Technician Recruitment",
  twitterDescription:
    "Industrial electrical, mechanical, equipment and utilities technician recruitment across India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <IndustrialMaintenanceTechnicianRecruitmentPage />
    </>
  );
}
