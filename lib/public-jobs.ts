import { cache } from "react";
import type { JobListing } from "@/components/jobs/listing";
import { expandJobShortId, isPublicJobId, jobHref, jobShortId, parseJobShortId } from "@/lib/job-path";
import { portalApiUrl } from "@/lib/portal-api";

const JOBS_ENDPOINT = portalApiUrl("/public/jobs");
const PAGE_SIZE = 20;

const employmentTypeByLabel: Record<string, string> = {
  "Full Time": "full-time",
  "Part Time": "part-time",
  Freelance: "freelance",
  Seasonal: "seasonal",
  "Fixed-Price": "fixed-price",
};

const experienceByLabel: Record<string, string> = {
  "No-experience": "no-experience",
  Fresher: "fresher",
  Intermediate: "intermediate",
  Expert: "expert",
};

type PublicJob = {
  _id: string;
  title: string;
  location: string;
  employmentType: string;
  minSalary: number;
  maxSalary: number;
  paymentFrequency: string;
  status: string;
  workType: string;
  noOfOpenings: number;
  minExperience: number;
  maxExperience: number;
  isExternal: boolean;
  createdAt: string;
  jobId: string;
  companyName: string;
  brandName?: string;
  companyLogoUrl?: string;
};

type JobsResponse = {
  status: string;
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  data?: {
    jobs?: PublicJob[];
  };
};

export type PublishedJobsPage = {
  jobs: JobListing[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
};

function trimNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, "");
}

function money(amount: number) {
  if (!Number.isFinite(amount)) return "—";
  if (amount >= 10_000_000) return `₹${trimNumber(amount / 10_000_000)} Cr`;
  if (amount >= 100_000) return `₹${trimNumber(amount / 100_000)} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

function normalizeSalaryMode(frequency: string) {
  return (frequency || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function formatSalary(min: number, max: number, frequency: string) {
  const safeMin = Number.isFinite(min) ? min : NaN;
  const safeMax = Number.isFinite(max) ? max : NaN;
  if (!Number.isFinite(safeMin) && !Number.isFinite(safeMax)) return "Not disclosed";

  const mode = normalizeSalaryMode(frequency);
  const low = Number.isFinite(safeMin) ? safeMin : safeMax;
  const high = Number.isFinite(safeMax) ? safeMax : safeMin;

  if (
    (mode === "yearly" || mode === "annual" || mode === "per annum") &&
    low >= 100_000 &&
    high >= 100_000 &&
    high < 10_000_000
  ) {
    return `₹${trimNumber(low / 100_000)}–${trimNumber(high / 100_000)} LPA`;
  }

  const suffix =
    mode === "monthly"
      ? " /mo"
      : mode === "yearly" || mode === "annual" || mode === "per annum"
        ? " /yr"
        : mode === "day" || mode === "daily"
          ? " /day"
          : "";
  if (low === high) return `${money(low)}${suffix}`;
  return `${money(low)}–${money(high)}${suffix}`;
}

function formatExperience(min: number, max: number) {
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) ? max : safeMin;
  if (safeMin === 0 && safeMax === 0) return "Fresher";
  if (safeMin === safeMax) return safeMin === 1 ? "1 yr" : `${safeMin} yrs`;
  return `${safeMin}–${safeMax} yrs`;
}

function formatOpenings(count: number) {
  const safe = Number.isFinite(count) ? count : 0;
  return safe === 1 ? "1 opening" : `${safe} openings`;
}

function summarySalary(min: number | null, max: number | null, mode: string) {
  if (min == null || max == null || min <= 0 || max <= 0) return "Not Disclosed";
  return formatSalary(min, max, mode);
}

function summaryExperience(min: number, max: number) {
  const left = Number.isFinite(min) ? String(min) : "";
  const right = Number.isFinite(max) ? String(max) : "";
  if (left && right) return `${left} - ${right} years`;
  if (left) return `${left} years`;
  if (right) return `${right} years`;
  return "Not specified";
}

function formatWorkType(workType: string) {
  if (!workType) return "";
  return workType
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");
}

function postedLabel(createdAt: string) {
  const then = createdAt ? new Date(createdAt).getTime() : NaN;
  if (!Number.isFinite(then)) return "";
  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "1d ago";
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return weeks === 1 ? "1w ago" : `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return months <= 1 ? "1mo ago" : `${months}mo ago`;
}

function toListing(job: PublicJob): JobListing {
  const minExperience = Number.isFinite(job.minExperience) ? job.minExperience : 0;
  const maxExperience = Number.isFinite(job.maxExperience) ? job.maxExperience : minExperience;
  return {
    id: job._id || job.jobId,
    jobId: job.jobId,
    title: job.title,
    company: job.brandName || job.companyName || "",
    logoUrl: job.companyLogoUrl,
    location: job.location || "",
    type: job.employmentType || "",
    mode: formatWorkType(job.workType),
    experience: formatExperience(minExperience, maxExperience),
    minExperience,
    maxExperience,
    openings: formatOpenings(job.noOfOpenings),
    salary: formatSalary(job.minSalary, job.maxSalary, job.paymentFrequency),
    posted: postedLabel(job.createdAt),
  };
}

export type JobQuery = {
  search: string;
  location: string;
  categories: string[];
  types: string[];
  levels: string[];
};

export function parseJobsPage(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number(raw);
  if (!Number.isInteger(page) || page < 1) return 1;
  return page;
}

function firstParam(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export function parseJobQuery(params: {
  search?: string | string[];
  location?: string | string[];
  category?: string | string[];
  type?: string | string[];
  level?: string | string[];
}): JobQuery {
  const split = (value: string) => value.split(",").map((item) => item.trim()).filter(Boolean);
  const categories = split(firstParam(params.category));
  return {
    search: firstParam(params.search),
    location: firstParam(params.location),
    categories: categories.length ? categories : ["All Categories"],
    types: split(firstParam(params.type)),
    levels: split(firstParam(params.level)),
  };
}

export function jobsPageHref(page: number, filters?: Partial<JobQuery>) {
  const params = new URLSearchParams();
  if (filters?.search) params.set("search", filters.search);
  if (filters?.location) params.set("location", filters.location);
  const categories = filters?.categories ?? [];
  const defaultCategory = categories.length === 1 && categories[0] === "All Categories";
  if (categories.length && !defaultCategory) params.set("category", categories.join(","));
  if (filters?.types?.length) params.set("type", filters.types.join(","));
  if (filters?.levels?.length) params.set("level", filters.levels.join(","));
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/jobs?${query}` : "/jobs";
}

function employmentTypeParam(types: string[]) {
  return types
    .map((type) => employmentTypeByLabel[type] ?? type.toLowerCase().replace(/\s+/g, "-"))
    .filter(Boolean)
    .join(",");
}

function experienceParam(levels: string[]) {
  return levels
    .map((level) => experienceByLabel[level] ?? level.toLowerCase())
    .filter(Boolean)
    .join(",");
}

function jobsUrl(page: number, filters?: JobQuery) {
  const url = new URL(JOBS_ENDPOINT);
  const categories = filters?.categories?.length ? filters.categories : ["All Categories"];
  url.searchParams.set("category", categories.join(","));
  if (filters?.search) url.searchParams.set("search", filters.search);
  if (filters?.location) url.searchParams.set("location", filters.location);
  const employmentType = employmentTypeParam(filters?.types ?? []);
  if (employmentType) url.searchParams.set("employmentType", employmentType);
  const experience = experienceParam(filters?.levels ?? []);
  if (experience) url.searchParams.set("experience", experience);
  url.searchParams.set("page", String(page));
  url.searchParams.set("pageSize", String(PAGE_SIZE));
  url.searchParams.set("limit", String(PAGE_SIZE));
  url.searchParams.set("status", "published");
  return url;
}

export type PublicJobDetail = {
  jobId: string;
  title: string;
  /** Clean role title for JobPosting JSON-LD (no locality / SEO wrappers). */
  baseTitle: string;
  /** Plain prose for JobPosting JSON-LD */
  description: string;
  /** Arranged HTML for on-page rendering */
  descriptionHtml: string;
  company: string;
  companyWebsite: string;
  logoUrl?: string;
  location: string;
  category: string;
  industry: string;
  occupationalCategory: string;
  type: string;
  mode: string;
  experience: string;
  minExperience: number;
  maxExperience: number;
  /** Exact months for JobPosting.experienceRequirements (preferred over years*12). */
  monthsOfExperience: number | null;
  openings: string;
  salary: string;
  skills: string[];
  qualification: string[];
  educationRequirements: string[];
  keywords: JobKeyword[];
  hiringNeed: string;
  shift: string;
  companyName: string;
  city: string;
  /** State / region for PostalAddress.addressRegion */
  region: string;
  street: string;
  area: string;
  pincode: string;
  summaryExperience: string;
  summarySalary: string;
  updates: "linkedin" | "instagram";
  isActive: boolean;
  isExternal: boolean;
  datePosted: string;
  /** ISO expiry from API — used for JobPosting.validThrough */
  validThrough: string | null;
  /** Canonical public job URL when provided by API */
  url: string;
  minSalary: number | null;
  maxSalary: number | null;
  salaryMode: string;
  related: RelatedJob[];
};

export type RelatedJob = {
  jobId: string;
  title: string;
  company: string;
  logoUrl?: string;
  location: string;
  type: string;
  minExperience: number;
  maxExperience: number;
};

type PublicJobRecord = {
  title?: string;
  base_title?: string;
  description?: string;
  description_html?: string;
  location?: string;
  category?: string;
  industry?: string;
  occupational_category?: string;
  job_id?: string;
  company_name?: string;
  brand_name?: string;
  city?: string;
  address_region?: string;
  commission_type?: string;
  company_logo_url?: string;
  company_website?: string;
  companyWebsite?: string;
  street?: string;
  area?: string;
  pincode?: string;
  employment_type?: string;
  work_type?: string;
  min_salary?: number;
  max_salary?: number;
  salary_mode?: string;
  min_experience?: number;
  max_experience?: number;
  months_of_experience?: number;
  no_of_openings?: number;
  skills?: string[] | string;
  qualification?: string[] | string;
  education_requirements?: string[] | string;
  keywords?: { keyword?: string; isShared?: boolean }[] | string[];
  hiring_need?: string;
  shift_timings?: string;
  isActive?: boolean;
  isExternal?: boolean;
  created_at?: string;
  valid_through?: string;
  url?: string;
  related_jobs?: {
    title?: string;
    company_name?: string;
    city?: string;
    employment_type?: string;
    company_logo?: string;
    job_id?: string;
    min_experience?: number;
    max_experience?: number;
  }[];
};

function relatedJobs(jobs: PublicJobRecord["related_jobs"]): RelatedJob[] {
  if (!jobs?.length) return [];
  return jobs.flatMap((job) => {
    if (!job.job_id || !job.title) return [];
    const minExperience = job.min_experience ?? 0;
    const parenthetical = job.employment_type?.match(/\(([^)]+)\)/)?.[1];
    return [
      {
        jobId: job.job_id,
        title: job.title,
        company: job.company_name || "",
        logoUrl: job.company_logo,
        location: job.city || "",
        type: parenthetical || job.employment_type || "",
        minExperience,
        maxExperience: job.max_experience ?? minExperience,
      },
    ];
  });
}

export type JobKeyword = {
  label: string;
  shared: boolean;
};

function asStringList(value: string[] | string | undefined | null) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function keywordLabels(keywords: PublicJobRecord["keywords"]): JobKeyword[] {
  if (!keywords?.length) return [];
  const labels: JobKeyword[] = [];
  for (const item of keywords) {
    const shared = typeof item !== "string" && Boolean(item.isShared);
    const raw = (typeof item === "string" ? item : item.keyword) ?? "";
    const lines = raw
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => line && !/^here are \d+/i.test(line));
    const label = lines.at(-1);
    if (!label) continue;
    const existing = labels.find((entry) => entry.label === label);
    if (existing) existing.shared = existing.shared || shared;
    else labels.push({ label, shared });
  }
  return labels;
}

export const getPublicJob = cache(async function getPublicJob(jobId: string): Promise<PublicJobDetail | null> {
  if (!isPublicJobId(jobId)) return null;

  const response = await fetch(`${JOBS_ENDPOINT}/${jobId}`, {
    headers: { Accept: "*/*" },
    next: { revalidate: 60 },
  });
  if (!response.ok) return null;

  const body = (await response.json()) as { status?: string; data?: PublicJobRecord };
  const job = body.data;
  if (body.status !== "success" || !job?.title || !job.job_id) return null;

  const minExperience = job.min_experience ?? 0;
  const maxExperience = job.max_experience ?? minExperience;
  const monthsOfExperience =
    typeof job.months_of_experience === "number" && !Number.isNaN(job.months_of_experience)
      ? job.months_of_experience
      : null;

  const companyWebsite = (job.company_website || job.companyWebsite || "").trim();

  const educationRequirements = asStringList(
    job.education_requirements ?? job.qualification,
  );
  const validThroughRaw = (job.valid_through || "").trim();
  const validThroughDate = validThroughRaw ? new Date(validThroughRaw) : null;
  const validThrough =
    validThroughDate && !Number.isNaN(validThroughDate.getTime())
      ? validThroughDate.toISOString()
      : null;
  const expiredByDate =
    validThroughDate != null &&
    !Number.isNaN(validThroughDate.getTime()) &&
    validThroughDate.getTime() <= Date.now();

  return {
    jobId: job.job_id,
    title: job.title,
    baseTitle: (job.base_title || "").trim() || job.title,
    description: job.description ?? "",
    descriptionHtml: (job.description_html || "").trim(),
    company: job.brand_name || job.company_name || "",
    companyWebsite,
    logoUrl: job.company_logo_url,
    location: job.location || "",
    category: job.category || job.industry || "",
    industry: (job.industry || job.category || "").trim(),
    occupationalCategory: (job.occupational_category || "").trim(),
    type: job.employment_type || "",
    mode: job.work_type ? formatWorkType(job.work_type) : "",
    experience: formatExperience(minExperience, maxExperience),
    minExperience,
    maxExperience,
    monthsOfExperience,
    openings: formatOpenings(job.no_of_openings ?? 0),
    salary: formatSalary(
      typeof job.min_salary === "number" ? job.min_salary : Number.NaN,
      typeof job.max_salary === "number" ? job.max_salary : Number.NaN,
      job.salary_mode || "",
    ),
    skills: asStringList(job.skills),
    qualification: educationRequirements,
    educationRequirements,
    keywords: keywordLabels(job.keywords),
    hiringNeed: job.hiring_need || "",
    shift: job.shift_timings || "",
    companyName: job.company_name || job.brand_name || "",
    city: job.city || "Remote",
    region: (job.address_region || "").trim(),
    street: (job.street || "").trim(),
    area: (job.area || "").trim(),
    pincode: (job.pincode || "").trim(),
    summaryExperience: summaryExperience(minExperience, maxExperience),
    summarySalary: summarySalary(
      typeof job.min_salary === "number" ? job.min_salary : null,
      typeof job.max_salary === "number" ? job.max_salary : null,
      job.salary_mode || "",
    ),
    updates: job.commission_type === "percentage" ? "linkedin" : "instagram",
    // Past validThrough → inactive (no JobPosting schema / noindex / apply closed).
    isActive: job.isActive !== false && !expiredByDate,
    isExternal: job.isExternal === true,
    datePosted: job.created_at || "",
    validThrough,
    url: (job.url || "").trim(),
    minSalary: typeof job.min_salary === "number" ? job.min_salary : null,
    maxSalary: typeof job.max_salary === "number" ? job.max_salary : null,
    salaryMode: job.salary_mode || "",
    related: relatedJobs(job.related_jobs),
  };
});

export async function getPublishedJobs(page = 1, filters?: JobQuery): Promise<PublishedJobsPage> {
  const response = await fetch(jobsUrl(page, filters), {
    headers: { Accept: "*/*" },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Jobs request failed (${response.status})`);
  }

  const body = (await response.json()) as JobsResponse;
  if (body.status !== "success" || !body.data?.jobs) {
    throw new Error("Jobs response was empty");
  }

  const jobs: JobListing[] = [];
  for (const job of body.data.jobs) {
    if (!job?.jobId || !job.title) continue;
    try {
      jobs.push(toListing(job));
    } catch {
      // Skip malformed rows so one bad salary/field cannot blank the whole page.
    }
  }

  return {
    jobs,
    page: body.page,
    pageSize: body.limit,
    totalPages: body.totalPages,
    totalResults: body.totalResults,
  };
}

/** The public list does not include isActive. Closed jobs are noindex, so confirm each one. */
async function publishedJobIsClosed(jobId: string): Promise<boolean> {
  try {
    const response = await fetch(`${JOBS_ENDPOINT}/${jobId}`, {
      headers: { Accept: "*/*" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return false;
    const body = (await response.json()) as { data?: { isActive?: boolean } };
    return body.data?.isActive === false;
  } catch {
    return false;
  }
}

async function mapPool<T, R>(items: T[], limit: number, worker: (item: T) => Promise<R>) {
  const results = new Array<R>(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => run()));
  return results;
}

async function fetchPublishedJobsPage(page: number) {
  const url = new URL(JOBS_ENDPOINT);
  url.searchParams.set("status", "published");
  url.searchParams.set("page", String(page));
  url.searchParams.set("pageSize", "100");
  url.searchParams.set("limit", "100");
  const response = await fetch(url, {
    headers: { Accept: "*/*" },
    // Short-id reverse lookup used to be no-store and scanned every page on each click.
    next: { revalidate: 60 },
  });
  if (!response.ok) return null;
  return (await response.json()) as JobsResponse & {
    data?: { jobs?: PublicJob[] };
  };
}

async function listPublishedJobRefs() {
  const refs: { jobId: string; title: string; createdAt?: string }[] = [];
  let page = 1;
  let totalPages = 1;
  while (page <= totalPages && page <= 20) {
    const body = await fetchPublishedJobsPage(page);
    if (!body) break;
    totalPages = body.totalPages || 1;
    for (const job of body.data?.jobs ?? []) {
      const jobId = job.jobId || job._id;
      if (!jobId || !job.title) continue;
      refs.push({ jobId, title: job.title, createdAt: job.createdAt });
    }
    page += 1;
  }
  return refs;
}

/** Resolve an opaque short id without downloading every published page when possible. */
async function findJobIdByShortIds(candidates: Set<string>) {
  if (!candidates.size) return null;
  let page = 1;
  let totalPages = 1;
  while (page <= totalPages && page <= 20) {
    const body = await fetchPublishedJobsPage(page);
    if (!body) break;
    totalPages = body.totalPages || 1;
    for (const job of body.data?.jobs ?? []) {
      const jobId = job.jobId || job._id;
      if (!jobId) continue;
      if (candidates.has(jobShortId(jobId))) return jobId;
    }
    page += 1;
  }
  return null;
}

/** Resolve /jobs/{title}-{shortId} back to the API job id. */
export const resolveJobIdFromSlug = cache(async function resolveJobIdFromSlug(
  slug: string,
  jid?: string | null,
): Promise<string | null> {
  const directJid = jid?.trim() ?? "";
  if (directJid && isPublicJobId(directJid)) return directJid;

  const shortId = parseJobShortId(slug);
  if (!shortId) return null;

  // Older bookmarks that embedded a reversible id in the path.
  const expanded = expandJobShortId(shortId);
  if (expanded && isPublicJobId(expanded)) return expanded;

  // Opaque 8-char short ids — always try the trailing 8 chars as well, in case a
  // title segment (e.g. "manager-xxxxxxxx") was mistaken for a 16-char token.
  const candidates = new Set<string>();
  if (/^[a-z0-9]{8}$/i.test(shortId)) candidates.add(shortId.toLowerCase());
  const trailing8 = slug.toLowerCase().match(/-([a-z0-9]{8})$/)?.[1];
  if (trailing8) candidates.add(trailing8);

  try {
    return await findJobIdByShortIds(candidates);
  } catch {
    return null;
  }
});

export async function listPublishedJobPaths(): Promise<{ path: string; lastModified?: Date }[]> {
  const paths: { path: string; lastModified?: Date; jobId: string }[] = [];
  try {
    const refs = await listPublishedJobRefs();
    for (const job of refs) {
      const lastModified = job.createdAt ? new Date(job.createdAt) : undefined;
      paths.push({
        jobId: job.jobId,
        path: jobHref({ title: job.title, jobId: job.jobId }),
        lastModified: lastModified && !Number.isNaN(lastModified.getTime()) ? lastModified : undefined,
      });
    }
    const closed = await mapPool(paths, 24, (job) => publishedJobIsClosed(job.jobId));
    return paths.filter((_, index) => !closed[index]).map(({ path, lastModified }) => ({ path, lastModified }));
  } catch {
    return paths.map(({ path, lastModified }) => ({ path, lastModified }));
  }
}
