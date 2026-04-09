import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-[35] bg-slate-900/20 backdrop-blur-[1px] transition-opacity md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed right-0 top-14 z-40 h-[calc(100dvh-3.5rem)] w-full overflow-y-auto border-l border-slate-200/90 bg-white/95 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-md transition-transform duration-300 ease-out md:top-16 md:h-[calc(100dvh-4rem)] md:max-w-[min(100%,28rem)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
        aria-hidden={!isOpen}
      >
        <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <h2
            className="text-lg font-semibold leading-snug text-slate-900"
            id="drawer-right-label"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <LuX className="text-xl" />
          </button>
        </div>
        <div className="text-sm leading-relaxed text-slate-700">{children}</div>
      </aside>
    </>
  );
};

export default Drawer;
