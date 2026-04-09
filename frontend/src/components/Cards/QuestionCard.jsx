import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="group mb-4 overflow-hidden rounded-2xl border border-slate-200/90 bg-white px-3 py-4 shadow-sm transition hover:border-indigo-200/80 hover:shadow-md sm:px-4 md:px-5 md:py-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-2.5 sm:gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-700 sm:h-8 sm:w-8">
            Q
          </span>
          <h3
            onClick={toggleExpand}
            className="min-w-0 flex-1 text-left text-sm font-medium leading-snug text-slate-900 md:text-[15px]"
          >
            {question}
          </h3>
          <button
            type="button"
            className="mt-0.5 shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 sm:mt-0"
            onClick={toggleExpand}
            aria-expanded={isExpanded}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:max-w-[55%] sm:justify-end md:max-w-none">
          <button
            type="button"
            className="inline-flex min-h-[40px] min-w-[44px] items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white sm:min-h-0 sm:min-w-0 sm:px-2.5 sm:py-1.5"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin();
            }}
          >
            {isPinned ? (
              <LuPinOff className="text-sm" />
            ) : (
              <LuPin className="text-sm" />
            )}
            <span className="hidden sm:inline">
              {isPinned ? "Unpin" : "Pin"}
            </span>
          </button>
          <button
            type="button"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-800 transition hover:border-indigo-200 hover:bg-indigo-100/80 sm:min-h-0 sm:px-2.5 sm:py-1.5"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
              onLearnMore();
            }}
          >
            <LuSparkles className="text-sm" />
            <span className="md:inline">Learn more</span>
          </button>
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-3 text-slate-800 sm:mt-4 sm:px-4 sm:py-4"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
