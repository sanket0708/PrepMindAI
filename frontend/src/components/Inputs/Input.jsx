import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-slate-700">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 transition-colors focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/15">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="flex-1 bg-transparent py-2.5 text-base text-slate-900 outline-none placeholder:text-slate-400"
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <span className="ml-1 flex items-center">
            {showPassword ? (
              <FaRegEye
                size={20}
                className="cursor-pointer text-slate-500 hover:text-indigo-600"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="cursor-pointer text-slate-400 hover:text-indigo-600"
                onClick={toggleShowPassword}
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
