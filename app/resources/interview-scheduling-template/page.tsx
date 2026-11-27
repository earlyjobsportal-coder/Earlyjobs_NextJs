import type { Metadata } from "next";
import { InterviewSchedulingTemplatePage } from "@/components/interview-scheduling-template/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/interview-scheduling-template.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/resources/interview-scheduling-template",
  title: "Free Interview Scheduling Template for Recruiters | EarlyJobs",
  description:
    "Download an interview scheduling template to organize candidate interviews, interviewer availability, locations and recruitment status across hiring teams.",
  ogTitle: "Free Interview Scheduling Template for Recruiters | EarlyJobs",
  ogDescription:
    "Download an interview scheduling template to organize candidate interviews, interviewer availability, locations and recruitment status across hiring teams.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Interview Scheduling Template",
  twitterTitle: "Free Interview Scheduling Template",
  twitterDescription:
    "Organize candidate interviews, interviewer availability, locations and recruitment status.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <InterviewSchedulingTemplatePage />
    </>
  );
}
