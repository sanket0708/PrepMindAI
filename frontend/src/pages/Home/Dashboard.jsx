import React, { useEffect, useState } from "react";
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

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching session data!", error);
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
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data:", error);
    }
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

        {sessions.length === 0 ? (
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
        {sessions.length > 0 && (
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
          <CreateSessionForm />
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
