import React, { useRef } from "react";
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
        <div className="group relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 to-slate-100 transition hover:scale-[1.02]">
          <LuUser className="text-4xl text-indigo-400" />
          <button 
            type="button" 
            className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-500" 
            onClick={onChooseFile}
          >
            <LuUpload className="text-sm cursor-pointer" />
          </button>
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full relative group">
          {preview ? (
            <img 
              src={preview} 
              alt="profile pic" 
              className="h-full w-full rounded-full border-2 border-indigo-100 object-cover" 
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 to-slate-100">
              <LuUser className="text-4xl text-indigo-400" />
            </div>
          )}
          <button 
            type="button" 
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-all" 
            onClick={handleRemoveImage}
          >
            <LuTrash className="text-xs cursor-pointer" />
          </button>
        </div>
      )}
      <p className="text-center text-xs text-slate-500">Optional profile photo</p>
    </div>
  );
};

export default ProfilePhotoSelector;
