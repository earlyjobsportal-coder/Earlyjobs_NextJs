import type { Metadata } from "next";
import { WindEnergyWorkforceRecruitmentPage } from "@/components/wind-energy-workforce-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/wind-energy-workforce-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/wind-energy-workforce-recruitment",
  title: "Wind Energy Workforce Recruitment India | EarlyJobs",
  description:
    "Explore recruitment for wind energy projects, including qualified turbine technicians, electrical support, site coordination and renewable energy operations staff.",
  ogTitle: "Wind Energy Workforce Recruitment India | EarlyJobs",
  ogDescription:
    "Explore recruitment for wind energy projects, including qualified turbine technicians, electrical support, site coordination and renewable energy operations staff.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs wind energy workforce recruitment",
  twitterTitle: "Wind Energy Recruitment India",
  twitterDescription:
    "Wind turbine technician recruitment, wind farm staffing and renewable energy manpower in India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <WindEnergyWorkforceRecruitmentPage />
    </>
  );
}
