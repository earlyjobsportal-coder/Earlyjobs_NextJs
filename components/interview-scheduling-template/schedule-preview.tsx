"use client";

import { useState } from "react";
import { SolidLink } from "@/components/home/primitives";

const statuses = ["Scheduled", "Confirmed", "Completed", "Rescheduled", "Cancelled"] as const;

const sampleRows = [
  {
    id: "A",
    role: "Production Trainee",
    date: "02 Dec",
    time: "10:00",
    format: "In-person",
    interviewer: "Plant HR Lead",
    status: "Confirmed" as (typeof statuses)[number],
    location: "Interview Room B",
  },
  {
    id: "B",
    role: "Warehouse Associate",
    date: "02 Dec",
    time: "11:00",
    format: "Video",
    interviewer: "Ops Manager",
    status: "Scheduled" as (typeof statuses)[number],
    location: "Approved meeting link",
  },
  {
    id: "C",
    role: "Admin Assistant",
    date: "03 Dec",
    time: "14:30",
    format: "Telephone",
    interviewer: "Department Head",
    status: "Completed" as (typeof statuses)[number],
    location: "Office landline",
  },
  {
    id: "D",
    role: "Quality Inspector",
    date: "03 Dec",
    time: "16:00",
    format: "In-person",
    interviewer: "QA Lead",
    status: "Rescheduled" as (typeof statuses)[number],
    location: "Plant Gate 2",
  },
] as const;

const columns = [
  "Candidate ID",
  "Job title",
  "Date",
  "Time",
  "Format",
  "Interviewer",
  "Location / link",
  "Status",
  "Follow-up owner",
] as const;

type SchedulePreviewProps = {
  xlsxAvailable: boolean;
};

export function SchedulePreview({ xlsxAvailable }: SchedulePreviewProps) {
  const [view, setView] = useState<"sheet" | "calendar">("sheet");

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-[#f8fafc] px-5 py-4 sm:px-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
            Scheduling sheet preview
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
            Interview Scheduling Template
          </h3>
        </div>
        <div className="flex rounded-lg border border-black/10 bg-white p-0.5">
          {(
            [
              { id: "sheet", label: "Sheet view" },
              { id: "calendar", label: "Calendar view" },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setView(option.id)}
              className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors ${
                view === option.id
                  ? "bg-[#2563EB] text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-black/5 bg-white px-5 py-4 sm:px-6">
        <p className="text-sm leading-6 text-neutral-600">
          Preview uses anonymised placeholders only. Download the XLSX for status dropdowns, date
          fields and blank rows you can adapt for your hiring drive.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {xlsxAvailable ? (
            <a
              href="/resources/earlyjobs-interview-scheduling-template.xlsx"
              download
              className="inline-flex h-10 items-center justify-center rounded-[6px] bg-brand px-4 text-[13px] font-medium text-white transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-[#d85c42]"
            >
              Download XLSX Template
            </a>
          ) : (
            <p className="text-sm text-neutral-500">
              Download file is being prepared. Preview the schedule structure below in the meantime.
            </p>
          )}
        </div>
      </div>

      {view === "sheet" ? (
        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full border-collapse text-left text-[12px]">
            <thead>
              <tr className="border-b border-black/10 bg-[#f8fafc]">
                {columns.map((column) => (
                  <th
                    key={column}
                    className="px-3 py-3 font-semibold tracking-[-0.01em] text-neutral-700 whitespace-nowrap"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleRows.map((row) => (
                <tr key={row.id} className="border-b border-black/5">
                  <td className="px-3 py-3 text-neutral-800">Candidate {row.id}</td>
                  <td className="px-3 py-3 text-neutral-600">{row.role}</td>
                  <td className="px-3 py-3 tabular-nums text-neutral-600">{row.date}</td>
                  <td className="px-3 py-3 tabular-nums text-neutral-600">{row.time}</td>
                  <td className="px-3 py-3 text-neutral-600">{row.format}</td>
                  <td className="px-3 py-3 text-neutral-600">{row.interviewer}</td>
                  <td className="px-3 py-3 text-neutral-600">{row.location}</td>
                  <td className="px-3 py-3">
                    <span className="inline-flex rounded-md border border-black/10 bg-[#f8fafc] px-2 py-1 text-[11px] font-medium text-neutral-700">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-neutral-600">TA Coordinator</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          {["02 Dec", "03 Dec"].map((day) => (
            <div key={day} className="rounded-xl border border-black/10 bg-[#f8fafc] p-4">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
                {day}
              </p>
              <ul className="mt-3 space-y-2">
                {sampleRows
                  .filter((row) => row.date === day)
                  .map((row) => (
                    <li
                      key={row.id}
                      className="rounded-lg border border-dashed border-black/10 bg-white px-3 py-2.5"
                    >
                      <p className="text-[13px] font-medium text-neutral-900">
                        {row.time} · Candidate {row.id}
                      </p>
                      <p className="mt-1 text-[12px] leading-5 text-neutral-600">
                        {row.role} · {row.format} · {row.status}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-black/5 bg-[#f8fafc] px-5 py-5 sm:px-6">
        <p className="text-sm leading-6 text-neutral-600">
          Limit access to candidate information according to your privacy requirements. Share only
          what interviewers need for the appointment.
        </p>
        <div className="mt-4">
          <SolidLink href="#enquiry">Discuss Your Recruitment Requirements</SolidLink>
        </div>
      </div>
    </div>
  );
}
