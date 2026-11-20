import type { Metadata } from "next";
import { HealthcareStaffingAutomationPage } from "@/components/ai-recruiting-automation-healthcare-staffing/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/ai-recruiting-automation-healthcare-staffing.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/ai-recruiting-automation-healthcare-staffing",
  title: "AI Recruiting Automation for Healthcare Staffing | EarlyJobs",
  description:
    "Explore AI-powered recruiting workflows for healthcare staffing teams that coordinate candidate communication, credential checks, and scheduling to fill nursing and allied health roles faster.",
  ogTitle: "AI Recruiting Automation for Healthcare Staffing | EarlyJobs",
  ogDescription:
    "Streamline nurse and allied health hiring with AI workflows for outreach, credential routing, and interview scheduling — with human oversight for patient-care standards.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs AI recruiting automation for healthcare staffing",
  twitterTitle: "AI Recruiting Automation for Healthcare Staffing",
  twitterDescription:
    "Coordinate candidate communication, credential checks, and scheduling to fill clinical roles faster.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <HealthcareStaffingAutomationPage />
    </>
  );
}
