import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="min-h-dvh bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,oklch(0.93_0.04_250),transparent)] bg-slate-50 pb-[env(safe-area-inset-bottom)]">
      <Navbar />

      {user && (
        <main className="relative mx-auto w-full max-w-7xl px-4 pb-28 pt-1 sm:px-6 md:pb-32 lg:px-8">
          {children}
        </main>
      )}
    </div>
  );
};

export default DashboardLayout;
