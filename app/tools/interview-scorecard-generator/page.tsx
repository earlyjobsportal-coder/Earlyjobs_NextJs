import type { Metadata } from "next";
import { InterviewScorecardGeneratorPage } from "@/components/interview-scorecard-generator/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/interview-scorecard-generator.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/tools/interview-scorecard-generator",
  title: "Free Interview Scorecard Generator for Employers | EarlyJobs",
  description:
    "Create structured interview scorecards with job-specific evaluation criteria, rating scales and interviewer notes. Free editable employer template.",
  ogTitle: "Free Interview Scorecard Generator for Employers | EarlyJobs",
  ogDescription:
    "Create structured interview scorecards with job-specific evaluation criteria, rating scales and interviewer notes.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Interview Scorecard Generator",
  twitterTitle: "Free Interview Scorecard Generator",
  twitterDescription:
    "Build editable interview scorecards with job-specific criteria, rating scales and interviewer notes.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <InterviewScorecardGeneratorPage />
    </>
  );
}
