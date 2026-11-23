import { City, State } from "country-state-city";
import type { PublicJobDetail } from "@/lib/public-jobs";
import { jobHref } from "@/lib/job-path";

const NON_PLACE = new Set([
  "remote",
  "hybrid",
  "on-site",
  "onsite",
  "on site",
  "wfh",
  "work from home",
  "n/a",
  "na",
  "nil",
  "tbd",
]);

/** Known metro cities used on EarlyJobs job pages → state. */
const METRO_CITIES = new Map<string, string>([
  ["bengaluru", "Karnataka"],
  ["bangalore", "Karnataka"],
  ["mumbai", "Maharashtra"],
  ["delhi", "Delhi"],
  ["delhi ncr", "Delhi"],
  ["noida", "Uttar Pradesh"],
  ["gurugram", "Haryana"],
  ["gurgaon", "Haryana"],
  ["hyderabad", "Telangana"],
  ["chennai", "Tamil Nadu"],
  ["pune", "Maharashtra"],
  ["kolkata", "West Bengal"],
  ["ahmedabad", "Gujarat"],
]);

/** City-default invents — never publish in JobPosting postalCode. */
const INVENTED_PINS = new Set([
  "560001",
  "400001",
  "110001",
  "500001",
  "600001",
  "411001",
  "700001",
  "380001",
]);

const ALIASES = new Map<string, string>([
  ["bangalore", "Karnataka"],
  ["bombay", "Maharashtra"],
  ["calcutta", "West Bengal"],
  ["madras", "Tamil Nadu"],
  ["gurugram", "Haryana"],
  ["trivandrum", "Kerala"],
  ["vizag", "Andhra Pradesh"],
  ["baroda", "Gujarat"],
  ["cochin", "Kerala"],
]);

function norm(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

const stateNameByCode = new Map(State.getStatesOfCountry("IN").map((state) => [state.isoCode, state.name]));
const STATES = new Map(State.getStatesOfCountry("IN").map((state) => [norm(state.name), state.name]));

const CITIES = new Map<string, string | null>();
for (const city of City.getCitiesOfCountry("IN") ?? []) {
  const key = norm(city.name);
  const region = stateNameByCode.get(city.stateCode) ?? null;
  if (!CITIES.has(key)) CITIES.set(key, region);
  else if (CITIES.get(key) !== region) CITIES.set(key, null);
}

function salaryUnit(mode: string) {
  const value = norm(mode);
  if (value === "yearly" || value === "annual" || value === "per annum") return "YEAR";
  if (value === "monthly") return "MONTH";
  if (value === "weekly") return "WEEK";
  if (value === "daily") return "DAY";
  if (value === "hourly") return "HOUR";
  return null;
}

function employmentType(type: string) {
  const value = norm(type);
  if (!value) return null;
  if (value.includes("intern")) return "INTERN";
  if (value.includes("part-time") || value.includes("part time")) return "PART_TIME";
  if (value.includes("full") || value.includes("permanent")) return "FULL_TIME";
  if (value.includes("contract")) return "CONTRACTOR";
  if (value.includes("freelance") || value.includes("fixed-price") || value.includes("fixed price")) return "OTHER";
  if (value.includes("temporary") || value.includes("seasonal") || value.includes("fixed-term") || value.includes("fixed term"))
    return "TEMPORARY";
  return null;
}

/**
 * Google JobPosting.title must be the role only.
 * Strip SEO wrappers even when API base_title is missing.
 */
export function cleanJobTitle(
  title?: string,
  baseTitle?: string,
  locality?: string,
  cityOrRegion?: string,
) {
  const explicit = String(baseTitle || "").trim();
  // Prefer API base title only when it does not still look like an SEO display title.
  if (explicit && !/\bjobs?\s+in\b/i.test(explicit) && !/\s[-–—]\s/.test(explicit)) {
    return explicit;
  }

  let cleaned = String(title || "").trim();
  if (!cleaned) return "Job";

  cleaned = cleaned
    .replace(/^walk-in\s+/i, "")
    .replace(/^hiring\s+/i, "")
    .replace(/\s+career opportunity\b/i, "")
    .replace(/\s+vacancy\b/i, "")
    .replace(/\s+opening\b/i, "")
    .replace(/\s+required\b/i, "")
    .replace(/\s+jobs?\b/i, "");

  cleaned = cleaned
    .replace(/\s+[-–—]\s+.+$/u, "")
    .replace(/\s+in\s+.+$/i, "");

  if (locality) {
    const loc = locality.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    cleaned = cleaned.replace(new RegExp(`\\s*[-–—,|/]?\\s*${loc}\\b.*$`, "i"), "");
  }
  if (cityOrRegion) {
    const city = cityOrRegion.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    cleaned = cleaned.replace(new RegExp(`\\s*[-–—,|/]?\\s*${city}\\b.*$`, "i"), "");
  }

  cleaned = cleaned.replace(/\s{2,}/g, " ").replace(/^[-–—,|/]+|[-–—,|/]+$/g, "").trim();
  return cleaned || String(title || "Job").trim();
}

/** Prefer a metro city name (Hyderabad) over a locality for SEO meta. */
export function seoCityLabel(job: Pick<PublicJobDetail, "title" | "city" | "location" | "region">) {
  const sources = [job.title, job.location, job.city, job.region].filter(Boolean) as string[];
  for (const source of sources) {
    for (const token of source.split(/[,|/]/)) {
      const label = token.trim();
      const key = norm(label);
      if (!key || NON_PLACE.has(key)) continue;
      if (METRO_CITIES.has(key) || CITIES.has(key) || ALIASES.has(key)) {
        // Canonical casing for metros
        if (key === "bangalore") return "Bengaluru";
        if (key === "gurugram" || key === "gurgaon") return "Gurugram";
        return label.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bNcr\b/i, "NCR");
      }
    }
    // "… Hyderabad" at end of SEO titles
    const metroHit = source.match(
      /\b(Bengaluru|Bangalore|Mumbai|Delhi(?:\s*NCR)?|Hyderabad|Chennai|Pune|Kolkata|Ahmedabad|Gurugram|Gurgaon|Noida)\b/i,
    );
    if (metroHit) {
      const raw = metroHit[1];
      if (/^bangalore$/i.test(raw)) return "Bengaluru";
      if (/^gurgaon$/i.test(raw)) return "Gurugram";
      return raw.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bNcr\b/i, "NCR");
    }
  }
  const fallback = (job.city || job.location || "").trim();
  if (fallback && !NON_PLACE.has(norm(fallback))) return fallback;
  return "";
}

function findMetroAndRegion(...sources: Array<string | undefined>) {
  let region = "";
  let metro = "";

  for (const source of sources) {
    if (!source) continue;
    for (const token of source.split(/[,|/]/)) {
      const label = token.trim();
      const key = norm(label);
      if (!key || NON_PLACE.has(key)) continue;
      const state = STATES.get(key);
      if (state) {
        if (!region) region = state;
        continue;
      }
      if (METRO_CITIES.has(key) || ALIASES.has(key) || CITIES.has(key)) {
        if (!metro) {
          metro = key === "bangalore" ? "Bengaluru" : label;
        }
        const mapped =
          METRO_CITIES.get(key) || ALIASES.get(key) || CITIES.get(key) || "";
        if (mapped && !region) region = mapped;
      }
    }
    if (!metro) {
      const metroHit = source.match(
        /\b(Bengaluru|Bangalore|Mumbai|Delhi(?:\s*NCR)?|Hyderabad|Chennai|Pune|Kolkata|Ahmedabad|Gurugram|Gurgaon|Noida)\b/i,
      );
      if (metroHit) {
        const raw = metroHit[1];
        const key = norm(raw.replace(/\s+/g, " "));
        metro = /^bangalore$/i.test(raw)
          ? "Bengaluru"
          : raw.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bNcr\b/i, "NCR");
        if (!region) {
          region =
            METRO_CITIES.get(key) ||
            METRO_CITIES.get(key.replace(/\s+ncr$/, "")) ||
            "";
        }
      }
    }
  }

  return { metro, region };
}

function resolvePlace(
  city: string,
  location: string,
  regionHint?: string,
  title?: string,
) {
  const found = findMetroAndRegion(regionHint, title, location, city);
  const region = (regionHint || "").trim() || found.region;

  // Prefer API city/location area (e.g. Jeedimetla Industrial Area), not SEO title text.
  let areaLocality = "";
  for (const source of [city, location]) {
    if (!source) continue;
    for (const token of source.split(/[,|/]/)) {
      const label = token.trim();
      const key = norm(label);
      if (!key || NON_PLACE.has(key)) continue;
      if (STATES.has(key) || METRO_CITIES.has(key) || ALIASES.has(key) || CITIES.has(key)) continue;
      if (!areaLocality && label.length <= 64 && !/\d{6}/.test(label)) {
        areaLocality = label;
      }
    }
  }

  const locality = areaLocality || found.metro;
  return { locality, region };
}

function verifiedPostalCode(pincode?: string) {
  const pin = String(pincode || "").trim();
  if (!pin || INVENTED_PINS.has(pin)) return "";
  return pin;
}

function jobLocation(
  locality: string,
  region: string,
  extras?: { street?: string; area?: string; pincode?: string },
) {
  const streetParts = [extras?.street?.trim(), extras?.area?.trim()].filter(Boolean);
  const streetAddress = streetParts.join(", ");
  const postalCode = verifiedPostalCode(extras?.pincode);

  return {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      ...(streetAddress ? { streetAddress } : {}),
      addressLocality: locality,
      ...(region ? { addressRegion: region } : {}),
      ...(postalCode ? { postalCode } : {}),
      addressCountry: "IN",
    },
  };
}

/** Paragraph markup Google requires, using the same HTML the page renders. */
export function jobDescriptionHtml(html: string) {
  const trimmed = html.trim();
  if (!trimmed) return "";
  if (/<(p|ul|ol|br|li)\b/i.test(trimmed) || trimmed.includes("\n")) return trimmed;
  return `<p>${trimmed}</p>`;
}

/**
 * Prefer the API expiry. Do not invent / extend validThrough locally.
 * Returns null when the API did not provide a usable date.
 */
export function jobValidThrough(job: Pick<PublicJobDetail, "validThrough" | "datePosted">) {
  if (job.validThrough) {
    const expires = new Date(job.validThrough);
    if (!Number.isNaN(expires.getTime())) return expires;
  }
  return null;
}

const SITE_BASE = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai").replace(/\/+$/, "");

/** JobPosting only when the vacancy is active and the required visible fields exist. */
export function jobPostingSchema(job: PublicJobDetail, descriptionHtml: string) {
  const description = jobDescriptionHtml(descriptionHtml);
  if (!job.isActive || !job.title || !job.datePosted || !description || !job.company) return null;
  const posted = new Date(job.datePosted);
  if (Number.isNaN(posted.getTime())) return null;

  const expires = jobValidThrough(job);
  // Drop schema when the posting is past its real expiry.
  if (expires && expires.getTime() <= Date.now()) return null;

  const unit = salaryUnit(job.salaryMode);
  const place = resolvePlace(job.city, job.location, job.region, job.title);
  const remote = /remote/i.test(job.mode);
  const type = employmentType(job.type);
  const logo = job.logoUrl && /^https?:\/\//i.test(job.logoUrl) ? job.logoUrl : "";
  const website = (() => {
    const raw = (job.companyWebsite || "").trim();
    if (!raw) return "https://www.earlyjobs.ai";
    if (/^https?:\/\//i.test(raw)) return raw;
    return `https://${raw}`;
  })();

  const schemaTitle = cleanJobTitle(job.title, job.baseTitle, job.city, place.locality || seoCityLabel(job));
  const canonicalUrl =
    (job.url && /^https?:\/\//i.test(job.url) ? job.url : "") || `${SITE_BASE}${jobHref(job)}`;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: schemaTitle,
    description,
    datePosted: posted.toISOString(),
    url: canonicalUrl,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: website,
      ...(logo ? { logo } : {}),
    },
    identifier: {
      "@type": "PropertyValue",
      name: "EarlyJobs",
      value: job.jobId,
    },
    directApply: !job.isExternal,
  };

  if (expires) data.validThrough = expires.toISOString();

  if (type) data.employmentType = type;
  if (place.locality) {
    data.jobLocation = jobLocation(place.locality, place.region || job.region, {
      street: job.street,
      area: job.area,
      pincode: job.pincode,
    });
  }
  if (remote) {
    data.jobLocationType = "TELECOMMUTE";
    data.applicantLocationRequirements = { "@type": "Country", name: "India" };
  }
  if (job.minExperience > 0) {
    data.experienceRequirements = {
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: Math.round(job.minExperience * 12),
    };
  } else if (job.maxExperience === 0) {
    data.experienceRequirements = "no requirements";
  }

  const hasMin = job.minSalary != null && job.minSalary > 0;
  const hasMax = job.maxSalary != null && job.maxSalary > 0;
  if (unit && (hasMin || hasMax)) {
    const value: Record<string, unknown> = {
      "@type": "QuantitativeValue",
      unitText: unit,
    };
    if (hasMin && hasMax) {
      value.minValue = job.minSalary;
      value.maxValue = job.maxSalary;
    } else if (hasMin) {
      value.value = job.minSalary;
    } else {
      value.value = job.maxSalary;
    }
    data.baseSalary = {
      "@type": "MonetaryAmount",
      currency: "INR",
      value,
    };
  }

  if (job.industry) data.industry = job.industry;
  if (job.occupationalCategory) data.occupationalCategory = job.occupationalCategory;

  const education = job.educationRequirements.filter(Boolean);
  if (education.length) {
    data.educationRequirements =
      education.length === 1 && /^no requirements$/i.test(education[0])
        ? "no requirements"
        : education.map((credentialCategory) =>
            /^no requirements$/i.test(credentialCategory)
              ? "no requirements"
              : {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory,
                },
          );
  }

  return data;
}
