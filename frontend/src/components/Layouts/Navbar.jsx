import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-sm shadow-slate-900/5">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Link
            to="/dashboard"
            className="shrink-0 text-base font-bold tracking-tight text-slate-900 transition hover:text-indigo-600 sm:text-lg md:text-xl"
          >
            PrepMind
            <span className="font-semibold text-indigo-500"> AI</span>
          </Link>
          <nav className="hidden items-center gap-0.5 sm:flex md:gap-1">
            <Link
              to="/"
              className="rounded-full px-2.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 md:px-3"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="rounded-full px-2.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 md:px-3"
            >
              Sessions
            </Link>
          </nav>
        </div>
        <div className="flex min-w-0 shrink-0 items-center justify-end">
          <ProfileInfoCard />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
