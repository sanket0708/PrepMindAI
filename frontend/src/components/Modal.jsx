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
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40 backdrop-blur-sm">
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        {!hideHeader && (
          <div className="flex items-center justify-between mb-6 min-h-[2.5rem] px-1">
            <h3 className="text-lg font-semibold text-cyan-700 flex-1">
              {title}
            </h3>
          </div>
        )}
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-cyan-100 hover:text-cyan-500 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-8.5 z-10 right-5 cursor-pointer sm:top-11"
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
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
