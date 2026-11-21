import type { Metadata } from "next";
import { TimeToHireCalculatorPage } from "@/components/time-to-hire-calculator/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/time-to-hire-calculator.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/tools/time-to-hire-calculator",
  title: "Free Time-to-Hire Calculator for Employers | EarlyJobs",
  description:
    "Calculate time to hire using candidate application and offer acceptance dates. Analyze hiring duration and recruitment process efficiency with a free tool.",
  ogTitle: "Free Time-to-Hire Calculator for Employers | EarlyJobs",
  ogDescription:
    "Calculate time to hire from candidate entry and offer acceptance dates. Measure average hiring duration with calendar-day clarity.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Time-to-Hire Calculator",
  twitterTitle: "Free Time-to-Hire Calculator",
  twitterDescription:
    "Measure individual and average hiring duration between entry and offer acceptance — free for employers.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <TimeToHireCalculatorPage />
    </>
  );
}
