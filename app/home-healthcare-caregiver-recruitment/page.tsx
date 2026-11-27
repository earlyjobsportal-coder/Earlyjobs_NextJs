import type { Metadata } from "next";
import { HomeHealthcareCaregiverRecruitmentPage } from "@/components/home-healthcare-caregiver-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/home-healthcare-caregiver-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/home-healthcare-caregiver-recruitment",
  title: "Home Healthcare & Caregiver Recruitment India | EarlyJobs",
  description:
    "Explore recruitment for home healthcare providers, including qualified caregivers, patient support staff, home nursing and care coordination roles.",
  ogTitle: "Home Healthcare & Caregiver Recruitment India | EarlyJobs",
  ogDescription:
    "Explore recruitment for home healthcare providers, including qualified caregivers, patient support staff, home nursing and care coordination roles.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs home healthcare and caregiver recruitment",
  twitterTitle: "Home Healthcare & Caregiver Recruitment",
  twitterDescription:
    "Home nursing, caregiving support, elderly care and care coordination recruitment across India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <HomeHealthcareCaregiverRecruitmentPage />
    </>
  );
}
