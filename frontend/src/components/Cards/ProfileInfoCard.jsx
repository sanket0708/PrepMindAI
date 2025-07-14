import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };
  return (
    user && <div className="flex items-center gap-3">
      <img
        src={user.profileImageUrl}
        alt="Profile"
        className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full object-cover border-2 border-blue-400"
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm sm:text-base text-gray-900 font-semibold truncate">
          {user.name || ""}
        </div>
        <button
          className="mt-1 cursor-pointer px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 mr-2 sm:mr-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
