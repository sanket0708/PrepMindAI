import React, { useState } from "react";
import HERO_IMG from "../assets/heroBanner.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import { FaBrain } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";

const LandingPage = () => {
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCTA = () => {};

  return (
    <>
      <div className="w-full min-h-full bg-gradient-to-br from-[#f2efe0] via-[#e0f7fa] to-[#e6f7ff] pb-32 relative overflow-x-hidden">
        <div className="hidden md:block absolute -top-24 -left-24 w-[400px] h-[400px] bg-gradient-to-br from-cyan-200 via-blue-100 to-teal-100 rounded-full blur-3xl opacity-60 z-0"></div>
        <div className="hidden md:block absolute top-1/2 right-0 w-[300px] h-[300px] bg-gradient-to-tr from-blue-200 via-cyan-100 to-teal-100 rounded-full blur-2xl opacity-50 z-0"></div>
        <div className="container mx-auto px-4 pt-6 pb-[100px] relative z-10 w-full md:w-[90vw] lg:w-[80vw] xl:w-[1200px]">
          <header className="flex justify-between items-center mb-16 w-full relative">
            <div className="text-2xl md:text-3xl text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 bg-clip-text font-extrabold tracking-tight drop-shadow-lg select-none">
              PrepMind AI
            </div>
            {/* Desktop button */}
            <button
              onClick={() => setOpenAuthModal(true)}
              className="cursor-pointer bg-gradient-to-r from-cyan-500 via-blue-400 to-teal-400 text-white font-bold px-7 py-2.5 rounded-full shadow-lg hover:from-teal-400 hover:to-cyan-500 hover:scale-105 transition-all border-2 border-white focus:outline-none focus:ring-2 focus:ring-cyan-200 hidden md:inline-block"
            >
              Login / Sign Up
            </button>
            {/* Hamburger for mobile */}
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Open menu"
            >
              <FiMenu className="text-3xl text-cyan-600" />
            </button>
            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
              <div className="absolute right-0 top-14 bg-white rounded-xl shadow-lg border border-cyan-100 p-4 z-50 flex flex-col items-end animate-fade-in">
                <button
                  onClick={() => {
                    setOpenAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-cyan-500 via-blue-400 to-teal-400 text-white font-bold px-6 py-2 rounded-full shadow hover:from-teal-400 hover:to-cyan-500 hover:scale-105 transition-all border-2 border-white focus:outline-none focus:ring-2 focus:ring-cyan-200"
                >
                  Login / Sign Up
                </button>
              </div>
            )}
          </header>
          <div className="flex flex-col md:flex-row items-center w-full gap-8 md:gap-0">
            <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
              <div className="flex items-center justify-left mb-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-700 bg-cyan-100 px-4 py-1 rounded-full border border-cyan-200 shadow-sm animate-pulse">
                  <LuSparkles className="text-lg animate-spin-slow" />
                  AI Powered
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900 drop-shadow-lg">
                Smarter interview prep, <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-500 bg-clip-text text-transparent transition-all duration-500 hover:from-teal-500 hover:to-cyan-400 cursor-pointer">
                  Thanks to
                </span>{" "}
                <span className="text-cyan-600">AI</span>
              </h1>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <FaBrain
                className="text-cyan-500 drop-shadow-2xl w-full -mt-6 sm:-mt-10 md:mt-0"
                style={{
                  fontSize: "clamp(5rem, 18vw, 12rem)",
                  maxWidth: "100%",
                  minWidth: "5rem",
                  transition: "transform 0.3s",
                  borderRadius: "1.5rem",
                  background:
                    "linear-gradient(135deg, #e0f7fa 0%, #f2efe0 100%)",
                  boxShadow: "0 8px 32px 0 rgba(34, 197, 246, 0.15)",
                  padding: "clamp(1rem, 5vw, 3rem)",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.08)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          </div>
          <div className="w-full flex justify-center mt-6">
            <button
              onClick={handleCTA}
              className="bg-gradient-to-r from-cyan-500 via-blue-400 to-teal-400 font-bold text-white px-6 py-2 text-base md:text-lg md:px-10 md:py-4 rounded-full cursor-pointer shadow-xl hover:bg-cyan-400 hover:text-black hover:scale-105 transition-all border-2 border-black focus:outline-none focus:ring-2 focus:ring-cyan-400 mt-4 animate-bounce-slow"
            >
              Get Started
            </button>
          </div>
        </div>
        {/* Features Section */}
        <div className="w-full min-h-full relative z-10">
          <div className="py-8 mb-25">
            <section className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl pb-7 md:text-4xl font-extrabold text-center mb-12 text-transparent bg-gradient-to-r from-cyan-500 via-blue-400 to-teal-500 bg-clip-text drop-shadow-lg">
                Empowering Features to Excel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {APP_FEATURES.map((feature, idx) => (
                  <div
                    key={feature.id}
                    className={`bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col items-start hover:scale-105 hover:shadow-2xl transition-all border-2 border-cyan-100/40 relative overflow-hidden group
                      ${
                        idx % 2 === 1 ? "lg:translate-y-8" : "lg:-translate-y-4"
                      }
                    `}
                    style={{
                      boxShadow: `0 8px 32px 0 ${
                        idx % 2 === 0
                          ? "rgba(34,197,246,0.10)"
                          : "rgba(59,130,246,0.10)"
                      }`,
                      borderColor: idx % 2 === 0 ? "#67e8f9" : "#38bdf8",
                    }}
                  >
                    <div
                      className={`absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-20 blur-2xl z-0 ${
                        idx % 2 === 0 ? "bg-cyan-300" : "bg-blue-200"
                      }`}
                    ></div>
                    <h3 className="text-2xl font-bold mb-3 text-cyan-700 drop-shadow-sm z-10">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-base z-10">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          {/* Top Companies Section */}
          <div className="w-full py-14 mt-16 mb-16 bg-white/70 backdrop-blur-md flex flex-col items-center rounded-3xl shadow-lg border border-cyan-100">
            <h3 className="text-2xl md:text-3xl font-extrabold text-center mb-10 tracking-tight text-transparent bg-gradient-to-r from-cyan-500 via-blue-400 to-teal-500 bg-clip-text drop-shadow-lg">
              Prepare for Top Companies
            </h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center w-full max-w-5xl mx-auto">
              {[
                { name: "Google", color: "from-blue-400 to-cyan-600" },
                { name: "Amazon", color: "from-blue-400 to-cyan-600" },
                { name: "Microsoft", color: "from-blue-400 to-cyan-600" },
                { name: "Facebook", color: "from-blue-400 to-cyan-600" },
                { name: "Apple", color: "from-blue-400 to-cyan-600" },
                { name: "Flipkart", color: "from-blue-400 to-cyan-600" },
                { name: "Netflix", color: "from-blue-400 to-cyan-600" },
                { name: "Uber", color: "from-blue-400 to-cyan-600" },
                { name: "Adobe", color: "from-blue-400 to-cyan-600" },
                { name: "IBM", color: "from-blue-400 to-cyan-600" },
              ].map((company) => (
                <span
                  key={company.name}
                  className={`text-lg md:text-2xl font-extrabold px-6 py-2 rounded-full bg-gradient-to-r ${company.color} text-white shadow-md hover:scale-105 transition-all select-none`}
                >
                  {company.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 text-sm py-4">
          <footer className="w-full flex flex-col items-center gap-2 pt-6 pb-6 mt-10 mx-auto max-w-xl rounded-2xl bg-gradient-to-r from-cyan-50 via-blue-50 to-teal-50 shadow-lg border border-cyan-100">
            <span className="flex items-center gap-1 text-cyan-600 font-bold text-base">
              Made by Sanket
              <svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 text-pink-400 animate-pulse' fill='currentColor' viewBox='0 0 20 20'><path d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'/></svg>
            </span>
            <span className="text-xs text-gray-500 tracking-wide">
              &copy; 2025 <span className="font-semibold text-cyan-600">PrepMind AI</span>. All rights reserved.
            </span>
          </footer>
        </div>
      </div>
      <Modal isOpen={openAuthModal} onClose={()=>{
        setOpenAuthModal(false);
        setCurrentPage("login");
      }} hideHeader >
        <div>
          {currentPage === 'login' && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 'signup' && (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>

      </Modal>
    </>
  );
};

export default LandingPage;
