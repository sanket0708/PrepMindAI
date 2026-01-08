import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { toast } from "react-hot-toast";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

const Signup = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setLoading(true);
    
    // Show loading toast
    const toastId = toast.loading("Signing you up... Please wait", {
      duration: 4000,
    });

    //signup api call
    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        toast.success("Account created successfully! 🎉", { id: toastId });
        navigate("/dashboard");
      }
    } catch (error) {
      let errorMessage = "Something went wrong! Please try again.";
      
      if (error.response && error.response.data.message) {
        errorMessage = error.response.data.message;
        setError(error.response.data.message);
      } else {
        setError(errorMessage);
      }
      
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gradient-to-br from-[#f2efe0] via-[#e0f7fa] to-[#e6f7ff]">
      <div className="w-[90vw] max-w-md mx-auto bg-white/70 rounded-3xl shadow-2xl border-2 border-cyan-100 p-8 md:p-10 flex flex-col items-center">
        <h3 className="text-2xl md:text-3xl font-extrabold text-center mb-2 text-transparent bg-gradient-to-r from-cyan-500 via-blue-400 to-teal-500 bg-clip-text drop-shadow-lg">
          Create an account
        </h3>
        <p className="text-base text-cyan-700 mb-8 text-center">
          Join us today by entering your details below.
        </p>
        <form onSubmit={handleSignUp} className="w-full flex flex-col gap-6">
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
            preview={preview}
            setPreview={setPreview}
          />

          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer w-full bg-gradient-to-r from-cyan-500 via-blue-400 to-teal-400 text-white rounded-full py-2.5 mt-2 font-bold shadow transition-all border-2 border-white focus:outline-none focus:ring-2 focus:ring-cyan-200 text-lg tracking-wide flex items-center justify-center gap-2 ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-teal-400 hover:to-cyan-500 hover:scale-105"
            }`}
          >
            {loading ? (
              <>
                <SpinnerLoader />
                <span>Signing up...</span>
              </>
            ) : (
              "SIGN UP"
            )}
          </button>
        </form>

        <p className="text-[13px] text-cyan-800 mt-6 text-center">
          Already have an account?{" "}
          <button
            className="font-medium text-blue-500 underline cursor-pointer hover:text-cyan-600 transition-colors"
            onClick={() => {
              setCurrentPage("login");
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
