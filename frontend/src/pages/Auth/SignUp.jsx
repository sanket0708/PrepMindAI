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
    <div className="flex w-full items-center justify-center bg-slate-50/50 p-6 sm:p-10">
      <div className="mx-auto flex w-full max-w-md flex-col items-center rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm md:p-10">
        <h3 className="mb-2 text-center text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Create an account
        </h3>
        <p className="mb-8 text-center text-sm text-slate-600 md:text-base">
          Add your details to start practicing with AI-generated questions.
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
            className={`mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-indigo-600 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${
              loading
                ? "cursor-not-allowed opacity-70"
                : "hover:bg-indigo-500"
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

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <button
            type="button"
            className="cursor-pointer font-semibold text-indigo-600 underline-offset-2 hover:underline"
            onClick={() => {
              setCurrentPage("login");
            }}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
