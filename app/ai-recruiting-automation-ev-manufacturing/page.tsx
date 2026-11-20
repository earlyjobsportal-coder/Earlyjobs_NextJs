import type { Metadata } from "next";
import { EvManufacturingAutomationPage } from "@/components/ai-recruiting-automation-ev-manufacturing/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/ai-recruiting-automation-ev-manufacturing.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/ai-recruiting-automation-ev-manufacturing",
  title: "AI Recruiting Automation for EV Manufacturing | EarlyJobs",
  description:
    "Discover AI recruiting solutions for the electric vehicle industry, coordinating factory hiring, shift matching, and candidate follow-ups in EV and battery production plants.",
  ogTitle: "AI Recruiting Automation for EV Manufacturing | EarlyJobs",
  ogDescription:
    "Coordinate EV and battery plant hiring with AI workflows for skill matching, shift scheduling, and high-volume candidate follow-ups.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs AI recruiting automation for EV manufacturing",
  twitterTitle: "AI Recruiting Automation for EV Manufacturing",
  twitterDescription:
    "Coordinate factory hiring, shift matching, and candidate follow-ups in EV and battery production plants.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <EvManufacturingAutomationPage />
    </>
  );
}
