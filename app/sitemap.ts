import type { MetadataRoute } from "next";
import { listFranchiseCities } from "@/lib/franchise-cities";
import { listPublishedBlogPaths } from "@/lib/public-blogs";
import { listPublishedJobPaths } from "@/lib/public-jobs";

// ISR: rebuild at most hourly. force-dynamic made every bot hit re-crawl jobs/blogs
// and drove Fluid Active CPU. First request after expiry regenerates; CDN serves cache.
export const revalidate = 3600;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";

const routes = [
  "/",
  "/about",
  "/story",
  "/team",
  "/newsroom",
  "/press-release",
  "/investor-relations",
  "/clientele",
  "/employers",
  "/become-a-recruiter",
  "/agency-partnerships",
  "/franchise",
  "/franchise/locations",
  "/internship",
  "/join-creator-programme",
  "/jobs",
  "/blogs",
  "/contact-us",
  "/it-recruitment",
  "/finance-and-accounting-recruitment",
  "/sales-marketing-recruitment",
  "/hr-executive-recruitment-services",
  "/top-executive-recruitment-firm",
  "/global-recruitment",
  "/recruitment-process-outsourcing",
  "/gcc-hiring-solutions",
  "/gcc-recruitment-partner",
  "/gcc-talent-acquisition",
  "/build-gcc-india",
  "/india-gcc-hiring-services",
  "/offshore-capability-center-hiring",
  "/privacy-policy",
  "/terms-and-conditions",
] as const;

const franchiseUpdated = new Date("2026-11-06");

function entry(path: string, lastModified?: Date): MetadataRoute.Sitemap[number] {
  return {
    url: `${baseUrl}${path === "/" ? "" : path}`,
    ...(lastModified ? { lastModified } : {}),
  };
}

async function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((resolve) => {
        timer = setTimeout(() => resolve(fallback), ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Cap remote crawls so /sitemap.xml stays responsive even if the portal is slow.
  const [jobs, blogs] = await Promise.all([
    withTimeout(listPublishedJobPaths(), 20_000, []),
    withTimeout(listPublishedBlogPaths(), 10_000, []),
  ]);
  return [
    ...routes.map((path) => entry(path, path.startsWith("/franchise") ? franchiseUpdated : undefined)),
    ...listFranchiseCities().map((city) => entry(city.path, franchiseUpdated)),
    ...blogs.map((blog) => entry(blog.path, blog.lastModified)),
    ...jobs.map((job) => entry(job.path, job.lastModified)),
  ];
}
