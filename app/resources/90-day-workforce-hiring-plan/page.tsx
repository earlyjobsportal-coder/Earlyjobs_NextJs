import type { Metadata } from "next";
import { NinetyDayWorkforceHiringPlanPage } from "@/components/ninety-day-workforce-hiring-plan/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/90-day-workforce-hiring-plan.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/resources/90-day-workforce-hiring-plan",
  title: "Free 90-Day Workforce Hiring Plan Template | EarlyJobs",
  description:
    "Download a 90-day workforce hiring plan template for employers. Organize headcount, recruitment milestones, interview schedules and joining targets.",
  ogTitle: "Free 90-Day Workforce Hiring Plan Template | EarlyJobs",
  ogDescription:
    "Download a 90-day workforce hiring plan template. Organize headcount, milestones, interviews and joining targets.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs 90-Day Workforce Hiring Plan Template",
  twitterTitle: "Free 90-Day Workforce Hiring Plan Template",
  twitterDescription:
    "Organize headcount, recruitment milestones, interviews and joining targets over 90 days.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <NinetyDayWorkforceHiringPlanPage />
    </>
  );
}
