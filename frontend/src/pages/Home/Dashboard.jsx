import React, { useEffect, useState, useContext } from "react";
import { LuPlus, LuSparkles } from "react-icons/lu";
import { motion } from "framer-motion";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import moment from "moment";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import { UserContext } from "../../context/userContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [userStats, setUserStats] = useState({
    totalSessions: 0,
    totalQuestions: 0,
    studyStreak: 0,
    lastActive: null,
    topRole: ""
  });
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null });

  // Load cached data on mount
  useEffect(() => {
    const cachedSessions = localStorage.getItem('cachedSessions');
    const cachedStats = localStorage.getItem('cachedUserStats');
    
    if (cachedSessions) {
      try {
        const parsedSessions = JSON.parse(cachedSessions);
        setSessions(parsedSessions);
        setIsInitialLoad(false);
      } catch (error) {
        console.error('Error parsing cached sessions:', error);
      }
    }
    
    if (cachedStats) {
      try {
        const parsedStats = JSON.parse(cachedStats);
        setUserStats(parsedStats);
      } catch (error) {
        console.error('Error parsing cached stats:', error);
      }
    }
  }, []);

  const fetchAllSessions = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      const sessionsData = response.data;
      setSessions(sessionsData);
      setIsInitialLoad(false);
      
      // Cache the data for future loads
      localStorage.setItem('cachedSessions', JSON.stringify(sessionsData));
      
      // Calculate and cache user stats
      const totalSessions = sessionsData.length;
      const totalQuestions = sessionsData.reduce((acc, session) => acc + (session.questions?.length || 0), 0);
      
      const lastActiveDate = sessionsData.length > 0 ? moment(sessionsData[0].updatedAt) : moment();
      const today = moment();
      const daysDiff = today.diff(lastActiveDate, 'days');
      const studyStreak = daysDiff <= 1 ? 1 : 0;
      
      const roleCount = {};
      sessionsData.forEach(session => {
        roleCount[session.role] = (roleCount[session.role] || 0) + 1;
      });
      const topRole = Object.keys(roleCount).reduce((a, b) => roleCount[a] > roleCount[b] ? a : b, "");
      
      const stats = {
        totalSessions,
        totalQuestions,
        studyStreak,
        lastActive: sessionsData.length > 0 ? lastActiveDate.format('MMM DD') : null,
        topRole
      };
      
      setUserStats(stats);
      localStorage.setItem('cachedUserStats', JSON.stringify(stats));
      
    } catch (error) {
      console.error("Error fetching session data!", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session deleted successfully!");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      
      // Clear cache and refetch
      localStorage.removeItem('cachedSessions');
      localStorage.removeItem('cachedUserStats');
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data:", error);
    }
  };

  // Clear cache when new session is created
  const handleSessionCreated = () => {
    localStorage.removeItem('cachedSessions');
    localStorage.removeItem('cachedUserStats');
    fetchAllSessions();
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full pt-2">
        <div className="mb-8">
          <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Your sessions
              </h1>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">
                Pick up where you left off or start a new role-specific prep
                run.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <LuSparkles className="shrink-0 text-indigo-500" />
              <span>AI-generated Q&amp;A</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 pb-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="h-6 bg-slate-200 rounded mb-4"></div>
                <div className="h-4 bg-slate-200 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[min(50vh,420px)] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/60 px-5 py-14 text-center sm:px-8 sm:py-16"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
              <LuPlus className="text-3xl" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">
              No sessions yet
            </h2>
            <p className="mt-2 max-w-sm text-slate-600">
              Create your first session to get tailored questions for your role
              and experience.
            </p>
            <button
              type="button"
              onClick={() => setOpenCreateModal(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500"
            >
              <LuPlus className="text-lg" />
              New session
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-5 pb-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {sessions?.map((data, index) => (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience || "-"}
                questions={data?.questions?.length || "-"}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data.updatedAt).format("Do MMMM YYYY")
                    : ""
                }
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data })}
              />
            ))}
          </div>
        )}
        {!isInitialLoad && sessions.length > 0 && (
          <button
            type="button"
            className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-20 flex h-12 min-w-[10rem] -translate-x-1/2 cursor-pointer items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 text-sm font-semibold text-white shadow-xl shadow-indigo-500/30 transition hover:bg-indigo-500 sm:left-auto sm:right-6 sm:translate-x-0 md:bottom-10 md:h-14 md:right-8 lg:right-12"
            onClick={() => setOpenCreateModal(true)}
          >
            <LuPlus className="text-xl" />
            New session
          </button>
        )}
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm 
            onSessionCreated={handleSessionCreated}
            onClose={() => setOpenCreateModal(false)}
          />
        </div>
      </Modal>
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null });
        }}
        hideHeader
      >
        <DeleteAlertContent
          content="Are you sure you want to delete this session detail?"
          onDelete={() => deleteSession(openDeleteAlert.data)}
          onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
