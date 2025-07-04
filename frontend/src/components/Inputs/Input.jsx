import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box flex items-center gap-2 border-b border-cyan-200 focus-within:border-cyan-500 transition-colors">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none py-2 px-1 text-base text-cyan-900"
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <span className="ml-1 flex items-center">
            {showPassword ? (
              <FaRegEye size={22} className="text-cyan-600 cursor-pointer" onClick={toggleShowPassword} />
            ) : (
              <FaRegEyeSlash size={22} className="text-cyan-400 cursor-pointer" onClick={toggleShowPassword} />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
