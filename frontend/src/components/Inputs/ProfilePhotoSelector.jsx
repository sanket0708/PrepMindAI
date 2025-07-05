import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(previewUrl);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 border-2 border-cyan-200 flex items-center justify-center relative group cursor-pointer hover:scale-105 transition-all">
          <LuUser className="text-4xl text-cyan-600" />
          <button 
            type="button" 
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all" 
            onClick={onChooseFile}
          >
            <LuUpload className="text-sm cursor-pointer" />
          </button>
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full relative group">
          <img 
            src={preview} 
            alt="profile pic" 
            className="w-full h-full rounded-full object-cover border-2 border-cyan-200" 
          />
          <button 
            type="button" 
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-all" 
            onClick={handleRemoveImage}
          >
            <LuTrash className="text-xs cursor-pointer" />
          </button>
        </div>
      )}
      <p className="text-xs text-cyan-700 text-center">Click to upload profile photo</p>
    </div>
  );
};

export default ProfilePhotoSelector;
