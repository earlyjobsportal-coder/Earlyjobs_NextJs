import type { Metadata } from "next";
import { DiagnosticCentreLabRecruitmentPage } from "@/components/diagnostic-centre-lab-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/diagnostic-centre-lab-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/diagnostic-centre-lab-recruitment",
  title: "Diagnostic Centre & Medical Lab Recruitment | EarlyJobs",
  description:
    "Explore entry-level recruitment for diagnostic centres and medical laboratories. Hire lab assistants, sample collection staff and healthcare operations talent.",
  ogTitle: "Diagnostic Centre & Medical Lab Recruitment | EarlyJobs",
  ogDescription:
    "Explore entry-level recruitment for diagnostic centres and medical laboratories. Hire lab assistants, sample collection staff and healthcare operations talent.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs diagnostic centre and medical lab recruitment",
  twitterTitle: "Diagnostic Centre & Medical Lab Recruitment",
  twitterDescription:
    "Entry-level diagnostic hiring — lab assistants, sample collection and healthcare operations talent.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <DiagnosticCentreLabRecruitmentPage />
    </>
  );
}
