import type { Metadata } from "next";
import { RecruitmentBudgetCalculatorPage } from "@/components/recruitment-budget-calculator/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/recruitment-budget-calculator.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/tools/recruitment-budget-calculator",
  title: "Free Recruitment Budget Calculator for Employers | EarlyJobs",
  description:
    "Estimate recruitment budgets using planned hires, advertising costs, agency expenses, assessments and internal recruiting costs. Free employer planning tool.",
  ogTitle: "Free Recruitment Budget Calculator for Employers | EarlyJobs",
  ogDescription:
    "Estimate recruitment budgets using planned hires, advertising costs, agency expenses, assessments and internal recruiting costs.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Recruitment Budget Calculator",
  twitterTitle: "Free Recruitment Budget Calculator",
  twitterDescription:
    "Plan recruitment spend with planned hires, advertising, agency, internal recruiting, assessment and other expenses in INR.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <RecruitmentBudgetCalculatorPage />
    </>
  );
}
