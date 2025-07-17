import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white relative">
      <div className="container mx-auto px-10 md:px-0">
        <div className="h-[200px] flex flex-col justify-center relative z-10">
          <div className="flex items-start">
            <div className="flex justify-between items-start">
              <div>
                <div>
                  <h2 className="text-2xl font-medium">{role}</h2>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {topicsToFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Experience: {experience} {experience == 1 ? "Year" : "Years"}
            </div>
            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              {questions} Q&A
            </div>
            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Last updated: {lastUpdated}
            </div>
          </div>
        </div>
        <div className="w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-white overflow-hidden absolute top-0 right-0 ">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-700 via-blue-800 to-teal-700 blur-[65px] opacity-90 animate-blob1" />
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-700 via-blue-800 to-teal-700 blur-[65px] opacity-80 animate-blob1" />
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-700 via-blue-800 to-teal-700 blur-[65px] opacity-70 animate-blob1" />
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
