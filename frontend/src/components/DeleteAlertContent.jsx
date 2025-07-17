import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-none">
      <div className="relative bg-white rounded-xl shadow-2xl w-[90vw] max-w-xs sm:max-w-sm md:max-w-md p-6 flex flex-col items-center">
        {/* Close (cross) button */}
        {onClose && (
          <button
            type="button"
            className="absolute cursor-pointer top-4.5 right-3 text-gray-400 hover:text-gray-700 bg-transparent rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <LuX className="text-lg" />
          </button>
        )}
        <p className="text-center text-[15px] text-rose-600 font-semibold mb-6 break-words">
          {content}
        </p>
        <button
          type="button"
          className="w-full cursor-pointer flex justify-center items-center gap-2 text-sm text-white font-semibold bg-rose-500 px-4 py-2 rounded-lg shadow hover:bg-rose-600 transition-colors"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
