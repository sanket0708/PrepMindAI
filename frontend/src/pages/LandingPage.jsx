import React, { useContext, useState } from "react";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { LuSparkles, LuArrowRight, LuLayoutDashboard } from "react-icons/lu";
import { FaBrain } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="relative min-h-dvh overflow-x-hidden bg-slate-50 pb-20 sm:pb-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.88 0.08 260), transparent),
              radial-gradient(ellipse 60% 40% at 100% 0%, oklch(0.9 0.06 230), transparent),
              radial-gradient(ellipse 50% 35% at 0% 100%, oklch(0.92 0.05 200), transparent)
            `,
          }}
        />
        <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-1/3 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8 xl:max-w-7xl">
          <header className="relative mb-12 flex items-center justify-between gap-3 sm:mb-16 md:mb-20">
            <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl md:text-2xl">
              PrepMind
              <span className="font-semibold text-indigo-500"> AI</span>
            </span>
            {user ? (
              <div className="hidden items-center gap-2 sm:gap-3 md:flex">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-white hover:text-indigo-600"
                >
                  <LuLayoutDashboard className="text-lg" />
                  Dashboard
                </button>
                <ProfileInfoCard />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setOpenAuthModal(true)}
                className="hidden rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500 md:inline-flex"
              >
                Log in
              </button>
            )}
            <button
              type="button"
              className="rounded-lg p-2 text-slate-600 transition hover:bg-white/80 md:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Open menu"
            >
              <FiMenu className="text-2xl" />
            </button>
            {mobileMenuOpen && (
              <div className="animate-fade-in absolute right-0 top-12 z-50 flex w-[min(100vw-2rem,280px)] flex-col items-stretch gap-2 rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-xl backdrop-blur-md sm:top-14">
                {user ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/dashboard");
                        setMobileMenuOpen(false);
                      }}
                      className="rounded-xl px-3 py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50 sm:text-left"
                    >
                      Dashboard
                    </button>
                    <div className="border-t border-slate-100 pt-3">
                      <ProfileInfoCard variant="stacked" />
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setOpenAuthModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Log in / Sign up
                  </button>
                )}
              </div>
            )}
          </header>

          <div className="flex flex-col items-center gap-10 sm:gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
            <motion.div
              className="w-full max-w-xl text-center lg:w-1/2 lg:max-w-none lg:text-left"
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              <motion.div
                variants={fadeUp}
                custom={0}
                className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 shadow-sm backdrop-blur-sm sm:mb-5 lg:justify-start"
              >
                <LuSparkles className="text-base text-indigo-500" />
                AI-powered prep
              </motion.div>
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-[1.75rem] font-bold leading-[1.15] tracking-tight text-slate-900 min-[400px]:text-4xl sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
              >
                Interview practice that{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  adapts to you
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg lg:mx-0"
              >
                Role-specific questions, model answers, and deep explanations—so
                you walk in prepared, not panicked.
              </motion.p>
              <motion.div
                variants={fadeUp}
                custom={3}
                className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
              >
                <button
                  type="button"
                  onClick={handleCTA}
                  className="group inline-flex w-full min-h-[48px] max-w-xs items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-slate-900/20 transition hover:bg-slate-800 sm:w-auto sm:max-w-none"
                >
                  {user ? "Go to sessions" : "Start preparing"}
                  <LuArrowRight className="transition group-hover:translate-x-0.5" />
                </button>
                {!user && (
                  <p className="max-w-xs text-center text-sm text-slate-500 sm:max-w-none sm:text-left">
                    Free to try · Sign in to save progress
                  </p>
                )}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative flex w-full justify-center lg:w-1/2 lg:max-w-none lg:justify-end"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-full max-w-[min(100%,340px)] sm:max-w-[380px] lg:max-w-[420px]">
                <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white to-indigo-50/80 px-5 pb-5 pt-7 shadow-2xl shadow-indigo-500/10 ring-1 ring-slate-200/60 sm:rounded-[2rem] sm:px-8 sm:pb-6 sm:pt-9">
                  <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-cyan-400/35 to-indigo-400/20 blur-2xl sm:h-32 sm:w-32" />
                  <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-tr from-violet-400/25 to-transparent blur-2xl sm:h-36 sm:w-36" />
                  <div className="relative z-[1] flex flex-col items-center gap-3 sm:gap-4">
                    <div className="flex w-full items-center justify-center py-1 sm:py-2">
                      <FaBrain
                        className="text-indigo-500 drop-shadow-md"
                        style={{
                          fontSize:
                            "clamp(3.5rem, min(22vw, 12rem), 7.5rem)",
                          lineHeight: 1,
                          transition: "transform 0.35s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.04)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />
                    </div>
                    <p className="max-w-[260px] text-center text-[11px] font-medium leading-snug text-slate-500 sm:max-w-none sm:text-sm sm:leading-normal">
                      Structured Q&amp;A · Pin favorites · Learn more on demand
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <section className="relative z-10 mx-auto mt-16 max-w-6xl px-4 sm:mt-20 sm:px-6 lg:px-8 xl:max-w-7xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Built for serious prep
            </h2>
            <p className="mx-auto mt-3 max-w-2xl px-1 text-sm text-slate-600 sm:text-base">
              Everything you need to rehearse answers, understand concepts, and
              track sessions in one calm workspace.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {APP_FEATURES.map((feature, idx) => (
              <motion.article
                key={feature.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200/80 hover:shadow-lg hover:shadow-indigo-500/5 sm:p-6 md:p-7 md:text-left"
              >
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-md shadow-indigo-500/25 md:mb-4 mx-auto md:mx-0">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto mt-16 max-w-6xl px-4 sm:mt-24 sm:px-6 lg:px-8 xl:max-w-7xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 px-5 py-10 text-center shadow-2xl shadow-slate-900/20 sm:rounded-3xl sm:px-8 sm:py-12 md:px-10 md:py-14">
            <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
              Practice like it&apos;s the real thing
            </h3>
            <p className="mx-auto mt-3 max-w-xl px-1 text-sm text-slate-300 sm:text-base">
              Learners use PrepMind to prepare for product, engineering, and
              design interviews at teams of all sizes.
            </p>
            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 md:mt-10 md:grid-cols-5 md:gap-3">
              {[
                "Google",
                "Amazon",
                "Microsoft",
                "Meta",
                "Apple",
                "Netflix",
                "Adobe",
                "Uber",
                "IBM",
                "Flipkart",
              ].map((company) => (
                <span
                  key={company}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-center text-[11px] font-semibold tracking-wide text-white/90 backdrop-blur-sm transition hover:bg-white/10 min-[400px]:px-4 sm:text-xs md:text-sm"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative z-10 mx-auto mt-16 max-w-xl px-4 pb-[env(safe-area-inset-bottom)] text-center sm:mt-20">
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-7 shadow-sm backdrop-blur-sm sm:px-6 sm:py-8">
            <p className="text-sm text-slate-600">
              Made by{" "}
              <span className="font-semibold text-slate-800">
                Sanket Mudholkar
              </span>
            </p>
            <p className="mt-2 text-xs text-slate-500">
              &copy; {new Date().getFullYear()} PrepMind AI. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
