import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileInfoCard = ({ variant = "default" }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const stacked = variant === "stacked";

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
    toast.success("Logged out successfully!");
  };
  return (
    user && (
      <div
        className={`flex gap-3 ${
          stacked
            ? "h-auto flex-col items-center py-1 text-center"
            : "h-11 items-center"
        }`}
      >
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="h-10 w-10 shrink-0 rounded-full border-2 border-white object-cover shadow-sm ring-2 ring-indigo-100 sm:h-11 sm:w-11"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-indigo-100 to-slate-100 text-sm font-bold text-indigo-700 shadow-sm ring-2 ring-indigo-100 sm:h-11 sm:w-11">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
        <div
          className={`min-w-0 flex flex-col justify-center ${
            stacked ? "items-center" : ""
          }`}
        >
          <div
            className={`text-sm font-semibold text-slate-900 sm:text-base ${
              stacked ? "max-w-[220px] text-center" : "truncate"
            }`}
          >
            {user.name || ""}
          </div>
          <button
            type="button"
            className={`mt-0.5 inline-flex cursor-pointer items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-600 transition hover:bg-rose-100 hover:text-rose-700 ${
              stacked ? "" : "w-fit"
            }`}
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
