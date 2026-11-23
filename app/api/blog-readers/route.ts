import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/contact";
import { portalApiUrl } from "@/lib/portal-api";
import type { BlogReaderPayload } from "@/lib/blog-reader";

const LEAD_ENDPOINT = portalApiUrl("/public/blog-leads");

export async function POST(request: Request) {
  let body: Partial<BlogReaderPayload>;
  try {
    body = (await request.json()) as Partial<BlogReaderPayload>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phoneCode = String(body.phoneCode ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const slug = String(body.slug ?? "").trim();

  if (!name || !phoneCode || !phone || !email || !slug) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }
  if (!/^\d{10}$/.test(phone)) {
    return NextResponse.json({ ok: false, error: "Enter a 10-digit phone number." }, { status: 400 });
  }
  if (!/^\+\d{1,4}(?: \d{1,4})?$/.test(phoneCode)) {
    return NextResponse.json({ ok: false, error: "Invalid country code." }, { status: 400 });
  }

  let response: Response;
  try {
    response = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phoneCode, phone, email, slug }),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not save your details." }, { status: 502 });
  }

  const result = (await response.json().catch(() => null)) as { status?: string; message?: string } | null;
  if (!response.ok || result?.status !== "success") {
    return NextResponse.json(
      { ok: false, error: result?.message || "Could not save your details." },
      { status: response.ok ? 502 : response.status },
    );
  }

  return NextResponse.json({ ok: true });
}
