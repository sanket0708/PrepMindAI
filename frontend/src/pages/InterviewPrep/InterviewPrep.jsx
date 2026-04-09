import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  //fetch session data

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //generate concept explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          question,
        }
      );
      
      // console.log("Frontend received response:", response.data);
      // console.log("Response data type:", typeof response.data);
      // console.log("Has title?", response.data?.title);
      // console.log("Has explanation?", response.data?.explanation);
      
      if (response.data) {
        // Validate the response structure
        if (response.data.title && response.data.explanation) {
          // console.log("Setting explanation state with:", response.data);
          setExplanation(response.data);
          // Force a small delay to ensure state update
          setTimeout(() => {
            // console.log("Explanation state after set:", explanation);
          }, 100);
        } else {
          console.error("Invalid response structure:", response.data);
          console.error("Title exists:", !!response.data.title);
          console.error("Explanation exists:", !!response.data.explanation);
          setErrorMsg("Invalid response format from server");
        }
      } else {
        console.error("No response data received");
        setErrorMsg("No data received from server");
      }
    } catch (error) {
      setExplanation(null);
      
      // Show more specific error message from backend
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else if (error.response?.status === 429) {
        setErrorMsg("API quota exceeded. Please wait a moment and try again.");
      } else {
        setErrorMsg("Failed to generate explanation, try again later!");
      }
      
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //pin question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );

      // console.log(response);
      if (response.data && response.data.question) {
        // toast.success("Question Pinned Successfully!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //add more question
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      setErrorMsg(""); // Clear any previous errors

      // console.log("Loading more questions...");
      // console.log("Session data:", { role: sessionData?.role, experience: sessionData?.experience, topicsToFocus: sessionData?.topicsToFocus });

      // Step 1: Generate questions from AI
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      // console.log("AI response received:", aiResponse.data);
      // console.log("AI response type:", typeof aiResponse.data);
      // console.log("Is array?", Array.isArray(aiResponse.data));

      if (!aiResponse.data) {
        throw new Error("No data received from AI");
      }

      if (!Array.isArray(aiResponse.data)) {
        console.error("AI response is not an array:", aiResponse.data);
        throw new Error("Invalid response format from AI - expected array");
      }

      if (aiResponse.data.length === 0) {
        throw new Error("AI generated no questions");
      }

      const generatedQuestions = aiResponse.data;
      // console.log(`Generated ${generatedQuestions.length} questions`);

      // Step 2: Add questions to session
      // console.log("Adding questions to session:", sessionId);
      // console.log("Questions to add:", generatedQuestions);

      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        }
      );

      // console.log("Add to session response:", response.data);
      // console.log("Response status:", response.status);

      if (response.data) {
        toast.success(`Added ${generatedQuestions.length} more questions successfully!`);
        // Refresh the session data to show new questions
        await fetchSessionDetailsById();
      } else {
        throw new Error("No response from server when adding questions");
      }
    } catch (error) {
      console.error("Error loading more questions:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      
      let errorMessage = "Failed to load more questions. Please try again.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 429) {
        errorMessage = "API quota exceeded. Please wait a moment and try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrorMsg(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }

    return () => {};
  }, []);

  // Debug: Track explanation state changes
  useEffect(() => {
    // console.log("Explanation state changed:", explanation);
    // console.log("Has explanation content?", !!explanation?.explanation);
    // console.log("Is loading?", isLoading);
  }, [explanation, isLoading]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMMM YYYY")
            : ""
        }
      />
      <div className="mx-auto w-full max-w-4xl px-0 pb-12 pt-4 sm:pt-6 lg:max-w-5xl xl:max-w-6xl">
        <div className="mb-6 max-w-2xl text-center sm:mb-8 sm:text-left">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl md:text-2xl">
            Questions &amp; answers
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 sm:text-base">
            Expand a card to read the model answer. Use Learn more for a deeper
            explanation in the side panel.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="min-w-0">
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id || index}`}
                  >
                    <>
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() =>
                          generateConceptExplanation(data.question)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data._id)}
                      />

                      {!isLoading &&
                        sessionData?.questions?.length == index + 1 && (
                          <div className="flex items-center justify-center mt-5">
                            <button
                              type="button"
                              className="mr-2 inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-900 disabled:cursor-not-allowed disabled:opacity-60"
                              disabled={isLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}
                            >
                              {isUpdateLoader ? (
                                <SpinnerLoader />
                              ) : (
                                <LuListCollapse className="text-lg" />
                              )}{" "}
                              Load More
                            </button>
                          </div>
                        )}
                    </>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => setOpenLeanMoreDrawer(false)}
            title={!isLoading && explanation?.title}
          >
            {errorMsg && (
              <p className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">
                <LuCircleAlert className="mt-0.5 shrink-0" /> {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <div className="mt-4">
                {explanation.explanation ? (
                  <AIResponsePreview content={explanation.explanation} />
                ) : (
                  <div>
                    <p className="text-red-500 mb-2">Explanation object exists but content is missing</p>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                      {JSON.stringify(explanation, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
            {!isLoading && !explanation && !errorMsg && (
              <p className="text-gray-500">No explanation available</p>
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
