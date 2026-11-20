import type { Metadata } from "next";
import { RecruitingRoiCalculatorPage } from "@/components/recruiting-roi-calculator/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/recruiting-roi-calculator.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/recruiting-roi-calculator",
  title: "Recruiting ROI Calculator | EarlyJobs",
  description:
    "Use our Recruiting ROI Calculator to estimate the return on investment of your hiring campaigns and recruiting tools, factoring in time saved, cost per hire, and revenue impact.",
  ogTitle: "Recruiting ROI Calculator | EarlyJobs",
  ogDescription:
    "Convert time-to-fill, vacancy cost, and cost per hire into a stakeholder-ready recruiting ROI estimate.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Recruiting ROI Calculator",
  twitterTitle: "Recruiting ROI Calculator",
  twitterDescription:
    "Estimate hiring investment ROI from time saved, cost per hire, and vacancy impact.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <RecruitingRoiCalculatorPage />
    </>
  );
}
