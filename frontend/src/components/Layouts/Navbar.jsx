import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-18 bg-white/70 border border-cyan-100 backdrop-blur-md shadow-md py-2.5 px-4 md:px-0 sticky top-0 z-30 rounded-b-2xl mb-6 md:mb-10">
      <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-4 px-0 sm:px-4">
        <Link to="/dashboard">
          <h2 className="text-base xs:text-lg md:text-2xl font-extrabold leading-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 bg-clip-text text-transparent drop-shadow select-none">
            PrepMind AI
          </h2>
        </Link>
        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
