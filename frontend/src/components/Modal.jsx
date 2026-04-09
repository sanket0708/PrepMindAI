import React, { useEffect } from "react";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-[2px] sm:p-4">
      <div className="relative max-h-[min(90dvh,calc(100dvh-2rem))] w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/15">
        {!hideHeader && (
          <div className="flex min-h-[2.5rem] items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 className="flex-1 text-lg font-semibold text-slate-800">
              {title}
            </h3>
          </div>
        )}
        <button
          type="button"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          onClick={onClose}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        <div className="max-h-[min(85dvh,860px)] flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
