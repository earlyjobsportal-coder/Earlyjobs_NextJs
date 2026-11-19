"use client";

import { useEffect, useId, useState } from "react";
import Select, { type StylesConfig } from "react-select";

const COUNTRY_CODES_URL = "https://countriesnow.space/api/v0.1/countries/codes";

export type CountryCodeOption = {
  value: string;
  label: string;
  dialCode: string;
  name: string;
  flag: string;
};

type CountryCodesResponse = {
  data?: Array<{ name?: string; code?: string; dial_code?: string }>;
};

const fallbackCountryCodes: CountryCodeOption[] = [
  option("IN", "India", "+91"),
  option("US", "United States", "+1"),
  option("GB", "United Kingdom", "+44"),
  option("AE", "United Arab Emirates", "+971"),
  option("SG", "Singapore", "+65"),
  option("AU", "Australia", "+61"),
];

let countryCodesRequest: Promise<CountryCodeOption[]> | null = null;

function option(code: string, name: string, dialCode: string): CountryCodeOption {
  return { value: code, label: dialCode, dialCode, name, flag: flagEmoji(code) };
}

function flagEmoji(iso: string) {
  if (!/^[A-Za-z]{2}$/.test(iso)) return "";
  return [...iso.toUpperCase()]
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

function loadCountryCodes() {
  if (!countryCodesRequest) {
    countryCodesRequest = fetch(COUNTRY_CODES_URL)
      .then(async (response) => {
        if (!response.ok) throw new Error("Country codes request failed");
        const body = (await response.json()) as CountryCodesResponse;
        const codes = (body.data ?? [])
          .map((country) => {
            const code = country.code?.trim().toUpperCase() ?? "";
            const name = country.name?.trim() ?? "";
            const dialCode = country.dial_code?.trim() ?? "";
            if (!/^[A-Z]{2}$/.test(code) || !name || !/^\+\d/.test(dialCode)) return null;
            return option(code, name, dialCode);
          })
          .filter((country): country is CountryCodeOption => country !== null)
          .sort((a, b) => a.name.localeCompare(b.name));
        if (!codes.length) throw new Error("Country codes response was empty");
        return codes;
      })
      .catch((error) => {
        countryCodesRequest = null;
        throw error;
      });
  }
  return countryCodesRequest;
}

const selectStyles: StylesConfig<CountryCodeOption, false> = {
  control: (base) => ({
    ...base,
    minHeight: 42,
    height: 42,
    border: "none",
    borderRadius: 12,
    backgroundColor: "transparent",
    boxShadow: "none",
    cursor: "pointer",
    fontSize: 14,
  }),
  valueContainer: (base) => ({ ...base, padding: "0 0 0 12px" }),
  singleValue: (base) => ({ ...base, margin: 0, color: "#171717" }),
  input: (base) => ({ ...base, margin: 0, padding: 0, color: "#171717" }),
  indicatorsContainer: (base) => ({ ...base, height: 42 }),
  dropdownIndicator: (base) => ({ ...base, color: "#737373", padding: "0 4px" }),
  indicatorSeparator: () => ({ display: "none" }),
  menuPortal: (base) => ({ ...base, zIndex: 80 }),
  menu: (base) => ({
    ...base,
    width: 260,
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 12px 32px rgba(23,23,23,0.08)",
  }),
  option: (base, state) => ({
    ...base,
    fontSize: 13,
    cursor: "pointer",
    backgroundColor: state.isSelected ? "#ea6a4e" : state.isFocused ? "#f5f5f5" : "#fff",
    color: state.isSelected ? "#fff" : "#171717",
  }),
  noOptionsMessage: (base) => ({ ...base, fontSize: 13 }),
};

export function EnquiryPhoneField({
  id,
  country,
  phone,
  invalid,
  onCountryChange,
  onPhoneChange,
}: {
  id: string;
  country: string;
  phone: string;
  invalid?: boolean;
  onCountryChange: (country: string, dialCode: string) => void;
  onPhoneChange: (phone: string) => void;
}) {
  const instanceId = useId();
  const [options, setOptions] = useState(fallbackCountryCodes);
  const [loading, setLoading] = useState(true);
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortal(document.body);
    let active = true;
    loadCountryCodes()
      .then((codes) => {
        if (active) setOptions(codes);
      })
      .catch(() => {
        // Keep the short fallback list if the country API is unavailable.
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const selected =
    options.find((item) => item.value === country) ??
    fallbackCountryCodes.find((item) => item.value === country) ??
    null;

  return (
    <div
      className={`mt-1.5 flex items-center rounded-xl border bg-[#fafafa] focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/25 ${
        invalid ? "border-red-400" : "border-black/10"
      }`}
    >
      <div className="w-[7.75rem] shrink-0">
        <Select<CountryCodeOption, false>
          instanceId={`${instanceId}-code`}
          inputId={`${id}-country`}
          aria-label="Country code"
          options={options}
          value={selected}
          isLoading={loading}
          isSearchable
          placeholder="+91"
          styles={selectStyles}
          menuPortalTarget={portal}
          menuPosition="fixed"
          menuPlacement="auto"
          onChange={(next) => {
            if (next) onCountryChange(next.value, next.dialCode);
          }}
          filterOption={(candidate, rawQuery) => {
            const query = rawQuery.trim().toLowerCase();
            if (!query) return true;
            const item = candidate.data;
            return (
              item.name.toLowerCase().includes(query) ||
              item.dialCode.replace(/\s/g, "").includes(query.replace(/\s/g, "")) ||
              item.value.toLowerCase().includes(query)
            );
          }}
          formatOptionLabel={(item, { context }) =>
            context === "menu" ? (
              <span className="flex items-center gap-2">
                <span aria-hidden className="w-5 shrink-0">
                  {item.flag}
                </span>
                <span className="min-w-0 flex-1 truncate">{item.name}</span>
                <span className={item.value === selected?.value ? "text-white/80" : "text-neutral-400"}>
                  {item.dialCode}
                </span>
              </span>
            ) : (
              <span>
                <span aria-hidden>{item.flag} </span>
                {item.dialCode}
              </span>
            )
          }
        />
      </div>
      <span aria-hidden className="h-4 w-px shrink-0 bg-black/10" />
      <input
        id={id}
        name="phone"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="Phone number"
        maxLength={10}
        pattern="[0-9]*"
        value={phone}
        aria-invalid={invalid || undefined}
        onChange={(event) => onPhoneChange(event.target.value.replace(/\D/g, "").slice(0, 10))}
        className="h-11 min-w-0 flex-1 bg-transparent px-3.5 text-sm text-neutral-950 outline-none placeholder:text-neutral-400"
      />
    </div>
  );
}
