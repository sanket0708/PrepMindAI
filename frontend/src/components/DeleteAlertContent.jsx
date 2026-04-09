import React from "react";

const DeleteAlertContent = ({ content, onDelete, onClose }) => {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 px-6 py-8 sm:px-8">
      <p className="text-center text-[15px] font-medium leading-relaxed text-slate-700">
        {content}
      </p>
      <div className="flex w-full flex-col gap-3 sm:flex-row-reverse">
        <button
          type="button"
          className="w-full cursor-pointer rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-500"
          onClick={onDelete}
        >
          Delete session
        </button>
        {onClose && (
          <button
            type="button"
            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            onClick={onClose}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default DeleteAlertContent;
