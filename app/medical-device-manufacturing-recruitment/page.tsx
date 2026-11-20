import type { Metadata } from "next";
import { MedicalDeviceManufacturingRecruitmentPage } from "@/components/medical-device-manufacturing-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/medical-device-manufacturing-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/medical-device-manufacturing-recruitment",
  title: "Medical Device Manufacturing Recruitment India | EarlyJobs",
  description:
    "Explore recruitment for medical device manufacturing, including assembly trainees, production operators, quality support and plant administration roles.",
  ogTitle: "Medical Device Manufacturing Recruitment India | EarlyJobs",
  ogDescription:
    "Explore recruitment for medical device manufacturing, including assembly trainees, production operators, quality support and plant administration roles.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs medical device manufacturing recruitment",
  twitterTitle: "Medical Device Manufacturing Recruitment India",
  twitterDescription:
    "Medical device factory hiring — assembly, packaging, quality support and plant admin roles.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <MedicalDeviceManufacturingRecruitmentPage />
    </>
  );
}
