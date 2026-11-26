import type { Metadata } from "next";
import { RecruitmentAgencyEvaluationScorecardPage } from "@/components/recruitment-agency-evaluation-scorecard/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/recruitment-agency-evaluation-scorecard.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/resources/recruitment-agency-evaluation-scorecard",
  title: "Recruitment Agency Evaluation Scorecard | EarlyJobs",
  description:
    "Compare recruitment agencies using a structured scorecard covering role expertise, sourcing approach, communication, costs and recruitment reporting.",
  ogTitle: "Recruitment Agency Evaluation Scorecard | EarlyJobs",
  ogDescription:
    "Compare recruitment agencies using a structured scorecard covering role expertise, sourcing approach, communication, costs and recruitment reporting.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Recruitment Agency Evaluation Scorecard",
  twitterTitle: "Recruitment Agency Evaluation Scorecard",
  twitterDescription:
    "Compare recruitment agencies on experience, sourcing, process, communication, costs and reporting.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <RecruitmentAgencyEvaluationScorecardPage />
    </>
  );
}
