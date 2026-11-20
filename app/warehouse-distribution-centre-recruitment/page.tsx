import type { Metadata } from "next";
import { WarehouseDistributionCentreRecruitmentPage } from "@/components/warehouse-distribution-centre-recruitment/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/warehouse-distribution-centre-recruitment.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/warehouse-distribution-centre-recruitment",
  title: "Warehouse & Distribution Centre Recruitment India | EarlyJobs",
  description:
    "Explore warehouse recruitment for pickers, packers, inventory assistants, dispatch staff and distribution centre operations across India.",
  ogTitle: "Warehouse & Distribution Centre Recruitment India | EarlyJobs",
  ogDescription:
    "Explore warehouse recruitment for pickers, packers, inventory assistants, dispatch staff and distribution centre operations across India.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs warehouse and distribution centre recruitment",
  twitterTitle: "Warehouse & Distribution Centre Recruitment",
  twitterDescription:
    "Entry-level warehouse hiring — pickers, packers, inventory and dispatch staff across India.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <WarehouseDistributionCentreRecruitmentPage />
    </>
  );
}
