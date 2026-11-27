import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export const SITE_URL = "https://www.earlyjobs.ai";
export const SITE_NAME = "EarlyJobs";
const LOGO_PATH = "/images/logo.png";

export type PageMetadataInput = {
  /** Path beginning with "/", or "/" for home. */
  path: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  image: string;
  imageAlt: string;
  /** Emitted as og:image:width when set. */
  imageWidth?: number;
  /** Emitted as og:image:height when set. */
  imageHeight?: number;
  twitterTitle: string;
  twitterDescription: string;
  index?: boolean;
  follow?: boolean;
  twitterCard?: "summary" | "summary_large_image";
};

function socialImage(url: string) {
  if (/^https?:\/\//.test(url)) return url;
  const file = path.join(process.cwd(), "public", url.replace(/^\//, ""));
  if (url.startsWith("/") && existsSync(file)) return url;
  return LOGO_PATH;
}

export function pageMetadata(input: PageMetadataInput): Metadata {
  const canonical = input.path === "/" ? "/" : input.path;
  const image = socialImage(input.image);
  const logo = image === LOGO_PATH;
  const width = input.imageWidth ?? (logo ? 1000 : undefined);
  const height = input.imageHeight ?? (logo ? 650 : undefined);
  const sizedImage = {
    url: image,
    alt: input.imageAlt,
    ...(typeof width === "number" ? { width } : {}),
    ...(typeof height === "number" ? { height } : {}),
  };
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: input.title },
    description: input.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_IN",
      title: input.ogTitle,
      description: input.ogDescription,
      images: [sizedImage],
    },
    twitter: {
      card: input.twitterCard ?? (logo ? "summary" : "summary_large_image"),
      title: input.twitterTitle,
      description: input.twitterDescription,
      images: [sizedImage],
    },
    robots: {
      index: input.index ?? true,
      follow: input.follow ?? true,
    },
  };
}
