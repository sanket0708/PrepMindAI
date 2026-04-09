import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200/80 hover:shadow-lg hover:shadow-indigo-500/5"
      onClick={onSelect}
    >
      <div
        className="relative p-5"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white/95 text-sm font-bold text-slate-800 shadow-sm">
            {getInitials(role)}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[17px] font-semibold leading-snug text-slate-900">
              {role}
            </h2>
            <p className="mt-0.5 text-sm text-slate-700/90">{topicsToFocus}</p>
          </div>
        </div>

        <button
          type="button"
          className="absolute right-3 top-3 z-10 hidden items-center gap-1.5 rounded-lg border border-rose-100 bg-white/95 px-2.5 py-1.5 text-xs font-medium text-rose-600 shadow-sm transition hover:bg-rose-50 group-hover:flex"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 className="text-sm" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>

      <div className="space-y-3 px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
        <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
            {experience}{" "}
            {experience == 1 ? "year" : "years"} experience
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
            {questions} Q&amp;A
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600">
            Updated {lastUpdated}
          </span>
        </div>
        {description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
            {description}
          </p>
        )}
      </div>
    </article>
  );
};

export default SummaryCard;
