export const BLOG_READER_SAVED_KEY = "earlyjobs.blogReaderSaved";

export type BlogReaderPayload = {
  name: string;
  phoneCode: string;
  phone: string;
  email: string;
  slug: string;
};

export function hasSavedBlogReader() {
  try {
    return window.localStorage.getItem(BLOG_READER_SAVED_KEY) === "true";
  } catch {
    return false;
  }
}

export function markBlogReaderSaved() {
  window.localStorage.setItem(BLOG_READER_SAVED_KEY, "true");
}

export async function saveBlogReader(payload: BlogReaderPayload) {
  const response = await fetch("/api/blog-readers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!response.ok || !result?.ok) {
    throw new Error(result?.error || "Could not save your details.");
  }
}
