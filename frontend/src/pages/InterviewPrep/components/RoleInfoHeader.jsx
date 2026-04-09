import React from "react";
import { LuBriefcase, LuCalendarClock } from "react-icons/lu";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-white via-indigo-50/40 to-slate-50">
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-1/4 h-48 w-48 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="relative z-[1] mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 shadow-sm backdrop-blur-sm">
              <LuBriefcase className="text-sm" />
              Session overview
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              {role || "Interview session"}
            </h1>
            {topicsToFocus && (
              <p className="mt-2 text-sm font-medium text-slate-600 sm:text-base">
                {topicsToFocus}
              </p>
            )}
            {description && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            )}
          </div>
          <div className="flex w-full max-w-md flex-shrink-0 flex-wrap justify-center gap-2 sm:max-w-none lg:w-auto lg:max-w-[min(100%,28rem)] lg:justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
              {experience}{" "}
              {experience == 1 ? "year" : "years"} experience
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
              {questions} Q&amp;A
            </span>
            {lastUpdated && (
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                <LuCalendarClock className="shrink-0 text-slate-400" />
                <span className="truncate">{lastUpdated}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleInfoHeader;
