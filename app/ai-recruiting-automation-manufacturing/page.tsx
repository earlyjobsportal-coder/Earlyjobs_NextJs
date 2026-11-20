import type { Metadata } from "next";
import { ManufacturingAutomationPage } from "@/components/ai-recruiting-automation-manufacturing/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/ai-recruiting-automation-manufacturing.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/ai-recruiting-automation-manufacturing",
  title: "AI Recruiting Automation for Manufacturing Hiring | EarlyJobs",
  description:
    "Explore AI-driven recruiting workflows for manufacturing hiring teams, coordinating candidate engagement, scheduling, and handoffs across plants to fill plant jobs faster.",
  ogTitle: "AI Recruiting Automation for Manufacturing Hiring | EarlyJobs",
  ogDescription:
    "Coordinate plant-level hiring with AI workflows for candidate engagement, shift matching, and multi-site handoffs — so factories fill roles faster.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs AI recruiting automation for manufacturing hiring",
  twitterTitle: "AI Recruiting Automation for Manufacturing Hiring",
  twitterDescription:
    "Coordinate candidate engagement, scheduling, and handoffs across plants to fill manufacturing roles faster.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <ManufacturingAutomationPage />
    </>
  );
}
