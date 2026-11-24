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

/** City-level default pincodes when a job has no stored pin. */
const CITY_DEFAULT_PINS = new Map<string, string>([
  ["bengaluru", "560001"],
  ["bangalore", "560001"],
  ["mumbai", "400001"],
  ["delhi", "110001"],
  ["delhi ncr", "110001"],
  ["hyderabad", "500001"],
  ["chennai", "600001"],
  ["pune", "411001"],
  ["kolkata", "700001"],
  ["ahmedabad", "380001"],
  ["gurugram", "122001"],
  ["gurgaon", "122001"],
  ["noida", "201301"],
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

  const looksLikeFullAddress = (value: string) =>
    value.length > 40 || /,/.test(value) || /^\d+\b/.test(value) || /\d{6}/.test(value);

  // Prefer API city/location area (e.g. Jeedimetla Industrial Area), not SEO title text.
  // Never treat house numbers / full street lines as addressLocality.
  let areaLocality = "";
  for (const source of [city, location]) {
    if (!source || looksLikeFullAddress(source)) continue;
    for (const token of source.split(/[,|/]/)) {
      const label = token.trim();
      const key = norm(label);
      if (!key || NON_PLACE.has(key)) continue;
      if (/^\d+$/.test(key) || /^\d+\b/.test(label)) continue;
      if (STATES.has(key) || METRO_CITIES.has(key) || ALIASES.has(key) || CITIES.has(key)) continue;
      if (!areaLocality && label.length <= 64 && !/\d{6}/.test(label)) {
        areaLocality = label;
      }
    }
  }

  // Metro city wins over a suspicious area token when the raw city was a full address.
  const locality =
    (looksLikeFullAddress(city) || looksLikeFullAddress(location)
      ? found.metro || areaLocality
      : areaLocality || found.metro) || found.metro;
  return { locality, region };
}

function resolvePostalCode(
  pincode: string | undefined,
  ...placeHints: Array<string | undefined>
) {
  const pin = String(pincode || "").trim();
  if (pin) return pin;
  for (const hint of placeHints) {
    if (!hint) continue;
    for (const token of hint.split(/[,|/]/)) {
      const key = norm(token);
      if (CITY_DEFAULT_PINS.has(key)) return CITY_DEFAULT_PINS.get(key)!;
    }
    const metroHit = hint.match(
      /\b(Bengaluru|Bangalore|Mumbai|Delhi(?:\s*NCR)?|Hyderabad|Chennai|Pune|Kolkata|Ahmedabad|Gurugram|Gurgaon|Noida)\b/i,
    );
    if (metroHit) {
      const key = norm(metroHit[1].replace(/\s+/g, " "));
      const mapped =
        CITY_DEFAULT_PINS.get(key) || CITY_DEFAULT_PINS.get(key.replace(/\s+ncr$/, ""));
      if (mapped) return mapped;
    }
  }
  return "560001";
}

function jobLocation(
  locality: string,
  region: string,
  extras?: { street?: string; area?: string; pincode?: string; title?: string },
) {
  const streetParts = [extras?.street?.trim(), extras?.area?.trim()].filter(Boolean);
  const streetAddress = streetParts.join(", ");
  const postalCode = resolvePostalCode(
    extras?.pincode,
    locality,
    region,
    extras?.title,
  );

  return {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      ...(streetAddress ? { streetAddress } : {}),
      addressLocality: locality,
      ...(region ? { addressRegion: region } : {}),
      postalCode,
      addressCountry: "IN",
    },
  };
}

/** Plain prose for JobPosting JSON-LD — no HTML tags. */
export function jobDescriptionPlain(text: string) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return "";
  return trimmed
    .replace(/<\s*br\s*\/?\s*>/gi, " ")
    .replace(/<\/\s*(?:p|h1|h2|h3|li|div)\s*>/gi, " ")
    .replace(/<\s*(?:p|h1|h2|h3|li|div)[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}

function escapeUiHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function uiParagraphs(text: string) {
  const plain = jobDescriptionPlain(text);
  if (!plain) return "";
  const sentences = plain.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) || [plain];
  const chunks: string[] = [];
  let buf: string[] = [];
  for (const sentence of sentences) {
    const s = sentence.trim();
    if (!s) continue;
    buf.push(s);
    if (buf.length >= 2) {
      chunks.push(buf.join(" "));
      buf = [];
    }
  }
  if (buf.length) chunks.push(buf.join(" "));
  return chunks.map((chunk) => `<p>${escapeUiHtml(chunk)}</p>`).join("\n");
}

function uiList(items: string[]) {
  const clean = items.map((item) => item.replace(/[.]+$/g, "").trim()).filter(Boolean);
  if (!clean.length) return "";
  return `<ul>\n${clean.map((item) => `  <li>${escapeUiHtml(item)}</li>`).join("\n")}\n</ul>`;
}

/** Split "a, b, and c" / "a, b and c" prose into list items. */
function splitProseList(text: string) {
  const raw = text.trim().replace(/[.]+$/g, "");
  if (!raw) return [] as string[];
  const normalized = raw.replace(/\s+,/g, ",").replace(/,\s+/g, ", ");
  const andSplit = normalized.split(/\s+,?\s+and\s+/i);
  if (andSplit.length > 1) {
    const head = andSplit.slice(0, -1).join(", ");
    const tail = andSplit[andSplit.length - 1];
    return [...head.split(/,\s+/).map((s) => s.trim()).filter(Boolean), tail.trim()].filter(Boolean);
  }
  return normalized.split(/,\s+/).map((s) => s.trim()).filter(Boolean);
}

const UI_SECTION_MARKERS: Array<{ title: string; pattern: RegExp }> = [
  { title: "Responsibilities", pattern: /\bKey responsibilities include\s+/i },
  { title: "Requirements / Qualifications", pattern: /\bRequirements include\s+/i },
  { title: "Skills", pattern: /\bPreferred skills include\s+/i },
  { title: "Experience", pattern: /\bExperience required:\s*/i },
  { title: "Working hours / Shift", pattern: /\bWorking hours:\s*/i },
  { title: "Benefits", pattern: /\bBenefits include\s+/i },
];

/**
 * Build arranged UI HTML from plain Flipkart-style prose + job fields.
 * Works even when API description_html is missing.
 */
export function arrangeJobDescriptionForUi(job: PublicJobDetail) {
  const fromApi = String(job.descriptionHtml || "").trim();
  if (fromApi && /<(?:ul|h2|h3)\b/i.test(fromApi)) return fromApi;

  const plain = jobDescriptionPlain(job.description);
  const parts: string[] = [];

  // Start section parsing at the first structured block (avoid early
  // "Experience required:" lines that belong in the overview).
  const sectionWindowStart = (() => {
    const keys = [
      plain.search(/\bKey responsibilities include\s+/i),
      plain.search(/\bRequirements include\s+/i),
      plain.search(/\bPreferred skills include\s+/i),
      plain.search(/\bBenefits include\s+/i),
    ].filter((index) => index >= 0);
    return keys.length ? Math.min(...keys) : -1;
  })();

  type Hit = { title: string; start: number; bodyStart: number };
  const hits: Hit[] = [];
  const windowText = sectionWindowStart >= 0 ? plain.slice(sectionWindowStart) : "";
  for (const marker of UI_SECTION_MARKERS) {
    const match = marker.pattern.exec(windowText);
    if (!match || match.index == null) continue;
    const absoluteStart = sectionWindowStart + match.index;
    hits.push({
      title: marker.title,
      start: absoluteStart,
      bodyStart: absoluteStart + match[0].length,
    });
  }
  hits.sort((a, b) => a.start - b.start);

  const overview =
    hits.length > 0 ? plain.slice(0, hits[0].start).trim() : plain;
  if (overview) parts.push(uiParagraphs(overview));

  const usedTitles = new Set<string>();
  for (let i = 0; i < hits.length; i += 1) {
    const hit = hits[i];
    const end = i + 1 < hits.length ? hits[i + 1].start : plain.length;
    const body = plain.slice(hit.bodyStart, end).trim();
    if (!body) continue;
    usedTitles.add(hit.title);

    // Prefer structured skills list when available.
    if (hit.title === "Skills" && job.skills?.length) {
      parts.push("<h2>Skills</h2>");
      parts.push(uiList(job.skills));
      continue;
    }

    const headingTag =
      hit.title === "Experience" || hit.title === "Working hours / Shift" ? "h3" : "h2";
    parts.push(`<${headingTag}>${hit.title}</${headingTag}>`);

    // Prose-derived sections: keep as paragraph(s). Comma-splitting breaks
    // items like "install, service and repair AC units".
    if (hit.title === "Experience" || hit.title === "Working hours / Shift") {
      parts.push(`<p>${escapeUiHtml(body.replace(/[.]+$/g, ""))}</p>`);
    } else if (hit.title === "Skills" || hit.title === "Benefits") {
      const items = splitProseList(body);
      parts.push(items.length > 1 ? uiList(items) : `<p>${escapeUiHtml(body)}</p>`);
    } else {
      // Responsibilities / Requirements: full prose paragraph under a heading.
      parts.push(`<p>${escapeUiHtml(body)}</p>`);
    }
  }

  // Fill gaps from structured job fields when prose sections were missing.
  if (!usedTitles.has("Skills") && job.skills?.length) {
    parts.push("<h2>Skills</h2>");
    parts.push(uiList(job.skills));
  }
  if (!usedTitles.has("Experience") && (job.summaryExperience || job.experience)) {
    parts.push("<h3>Experience</h3>");
    parts.push(`<p>${escapeUiHtml(job.summaryExperience || job.experience)}</p>`);
  }
  if (!usedTitles.has("Working hours / Shift") && job.shift) {
    parts.push("<h3>Working hours / Shift</h3>");
    parts.push(`<p>${escapeUiHtml(job.shift)}</p>`);
  }

  return parts.filter(Boolean).join("\n");
}

/**
 * Arranged HTML for the job page UI.
 * Prefer API description_html; otherwise rebuild sections from plain prose.
 */
export function jobDescriptionHtml(arrangedHtml: string, plainFallback = "") {
  const arranged = String(arrangedHtml || "").trim();
  if (arranged && /<(?:ul|h2|h3)\b/i.test(arranged)) return arranged;

  const plain = jobDescriptionPlain(arranged || plainFallback);
  if (!plain) return "";
  // Last-resort single paragraph if no section markers exist.
  return uiParagraphs(plain);
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
export function jobPostingSchema(job: PublicJobDetail, _descriptionHtml?: string) {
  // JSON-LD description must stay plain-paragraph text (no <p>/<ul>/etc).
  const description = jobDescriptionPlain(job.description);
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
      title: job.title,
    });
  }
  if (remote) {
    data.jobLocationType = "TELECOMMUTE";
    data.applicantLocationRequirements = { "@type": "Country", name: "India" };
  }
  const monthsOfExperience =
    job.monthsOfExperience != null && !Number.isNaN(job.monthsOfExperience)
      ? Math.round(job.monthsOfExperience)
      : job.minExperience > 0
        ? Math.round(job.minExperience * 12)
        : null;
  if (monthsOfExperience != null && monthsOfExperience > 0) {
    data.experienceRequirements = {
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience,
    };
  } else if (job.maxExperience === 0 || monthsOfExperience === 0) {
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
