import type { Metadata } from "next";
import { CostPerHireCalculatorPage } from "@/components/cost-per-hire-calculator/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/cost-per-hire-calculator.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/tools/cost-per-hire-calculator",
  title: "Free Cost Per Hire Calculator for Employers | EarlyJobs",
  description:
    "Calculate your recruitment cost per hire using advertising, agency fees, recruiter time and hiring expenses. Free employer calculator with formulas.",
  ogTitle: "Free Cost Per Hire Calculator for Employers | EarlyJobs",
  ogDescription:
    "Calculate your recruitment cost per hire using advertising, agency fees, recruiter time and hiring expenses.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Cost Per Hire Calculator",
  twitterTitle: "Free Cost Per Hire Calculator",
  twitterDescription:
    "Organise internal and external recruitment costs and calculate average cost per hire in INR.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <CostPerHireCalculatorPage />
    </>
  );
}
