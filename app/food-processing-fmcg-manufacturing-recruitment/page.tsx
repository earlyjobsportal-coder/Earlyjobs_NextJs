import type { Metadata } from "next";
import { FoodProcessingFmcgManufacturingRecruitmentPage } from "@/components/food-processing-fmcg-manufacturing-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/food-processing-fmcg-manufacturing-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/food-processing-fmcg-manufacturing-recruitment",
  title: "Food Processing & FMCG Recruitment India | EarlyJobs",
  description:
    "Explore recruitment for food processing plants and FMCG manufacturing facilities. Hire production trainees, packaging staff and warehouse associates.",
  ogTitle: "Food Processing & FMCG Recruitment India | EarlyJobs",
  ogDescription:
    "Explore recruitment for food processing plants and FMCG manufacturing facilities. Hire production trainees, packaging staff and warehouse associates.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs food processing and FMCG manufacturing recruitment",
  twitterTitle: "Food Processing & FMCG Recruitment India",
  twitterDescription:
    "Entry-level food and FMCG plant hiring — production, packaging, quality and warehouse.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <FoodProcessingFmcgManufacturingRecruitmentPage />
    </>
  );
}
