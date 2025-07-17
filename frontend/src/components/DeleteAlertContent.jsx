import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center w-full max-w-xs sm:max-w-sm mx-auto">
      <p className="text-center text-[15px] text-rose-600 font-semibold mb-6 break-words">
        {content}
      </p>
      <button
        type="button"
        className="w-full cursor-pointer flex justify-center items-center gap-2 text-sm text-white font-bold bg-gradient-to-r from-rose-500 via-rose-500 to-rose-500 px-5 py-2.5 rounded-lg shadow hover:from-rose-600 hover:to-rose-800 transition-colors"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteAlertContent;
