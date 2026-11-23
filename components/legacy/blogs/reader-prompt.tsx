"use client";

import { useEffect, useId, useState, type FormEvent, type RefObject } from "react";
import { EnquiryPhoneField } from "@/components/contact/phone-field";
import { isValidEmail } from "@/lib/contact";
import { hasSavedBlogReader, markBlogReaderSaved, saveBlogReader } from "@/lib/blog-reader";

export function BlogReaderPrompt({
  slug,
  midRef,
}: {
  slug: string;
  midRef: RefObject<HTMLElement | null>;
}) {
  const formId = useId();
  const [eligible, setEligible] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("IN");
  const [phoneCode, setPhoneCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!hasSavedBlogReader()) setEligible(true);
  }, []);

  useEffect(() => {
    if (!eligible || open) return;
    const node = midRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setOpen(true);
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eligible, midRef, open]);

  function close() {
    setEligible(false);
    setOpen(false);
  }

  if (!open) return null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName) {
      setError("Enter your name.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Enter a 10-digit phone number.");
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await saveBlogReader({
        name: trimmedName,
        phoneCode,
        phone,
        email: trimmedEmail,
        slug,
      });
      markBlogReaderSaved();
      setEligible(false);
      setOpen(false);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not save your details.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/30 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-title`}
        className="relative w-full max-w-sm rounded-2xl bg-white p-5 text-neutral-950 shadow-lg"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
        >
          <span aria-hidden className="text-lg leading-none">
            ×
          </span>
        </button>
        <h2 id={`${formId}-title`} className="pr-8 text-lg font-semibold text-neutral-950">
          Are you looking for a job?
        </h2>
        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <label className="block text-sm font-medium text-gray-700" htmlFor={`${formId}-name`}>
            Name
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/25"
            />
          </label>
          <div>
            <span className="block text-sm font-medium text-gray-700" id={`${formId}-phone-label`}>
              Phone
            </span>
            <EnquiryPhoneField
              id={`${formId}-phone`}
              country={country}
              phone={phone}
              invalid={Boolean(error && error.toLowerCase().includes("phone"))}
              onCountryChange={(nextCountry, nextCode) => {
                setCountry(nextCountry);
                setPhoneCode(nextCode);
              }}
              onPhoneChange={setPhone}
            />
          </div>
          <label className="block text-sm font-medium text-gray-700" htmlFor={`${formId}-email`}>
            Email
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/25"
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={submitting}
            className="h-11 w-full rounded-xl bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {submitting ? "Saving…" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
