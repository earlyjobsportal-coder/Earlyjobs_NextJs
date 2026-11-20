import type { Metadata } from "next";
import { EvAutomotiveManufacturingRecruitmentPage } from "@/components/ev-automotive-manufacturing-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/ev-automotive-manufacturing-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/ev-automotive-manufacturing-recruitment",
  title: "EV & Automotive Manufacturing Recruitment in India | EarlyJobs",
  description:
    "Hire entry-level talent for EV and automotive manufacturing. Explore recruitment for assembly operators, production trainees, quality assistants and plant support roles.",
  ogTitle: "EV & Automotive Manufacturing Recruitment in India | EarlyJobs",
  ogDescription:
    "Hire entry-level talent for EV and automotive manufacturing. Explore recruitment for assembly operators, production trainees, quality assistants and plant support roles.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs EV and automotive manufacturing recruitment",
  twitterTitle: "EV & Automotive Manufacturing Recruitment in India",
  twitterDescription:
    "Entry-level automotive plant hiring — assembly, quality, materials and EV production support.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <EvAutomotiveManufacturingRecruitmentPage />
    </>
  );
}
