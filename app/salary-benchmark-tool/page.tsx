import type { Metadata } from "next";
import { SalaryBenchmarkToolPage } from "@/components/salary-benchmark-tool/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/salary-benchmark-tool.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/salary-benchmark-tool",
  title: "Salary Benchmarking Tool for Employers | EarlyJobs",
  description:
    "Find fair market rates for roles in high-growth sectors with our Salary Benchmarking Tool. Compare entry-level and mid-level salaries by industry and location to attract the right talent.",
  ogTitle: "Salary Benchmarking Tool for Employers | EarlyJobs",
  ogDescription:
    "Compare entry- and mid-level pay ranges by industry and location to set competitive offers.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs Salary Benchmarking Tool",
  twitterTitle: "Salary Benchmarking Tool for Employers",
  twitterDescription:
    "Explore market salary ranges by role, industry, and location for high-growth hiring.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <SalaryBenchmarkToolPage />
    </>
  );
}
