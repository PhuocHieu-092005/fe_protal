// src/pages/template/components/CvEditorLeftPanel.jsx
import React from "react";

const CvEditorLeftPanel = ({
  title,
  setTitle,
  avatarPreview,
  handleAvatarUpload,
  handleSaveCV,
}) => {
  return (
    <div className="p-6 border-b bg-white">
      {/* Tên CV */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-xl font-semibold px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500 mb-6"
        placeholder="Tên CV của bạn"
      />

      {/* Avatar */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Ảnh đại diện
        </label>
        <div className="flex justify-center">
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden hover:border-indigo-400 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
              id="avatar-upload"
            />
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer h-full w-full flex items-center justify-center"
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-3xl text-gray-400">+</div>
              )}
            </label>
          </div>
        </div>
      </div>

      {/* Nút Lưu CV */}
      <button
        onClick={handleSaveCV}
        className="w-full py-2 bg-black text-white font-normal rounded-2xl transition flex items-center justify-center gap-2"
      >
        Lưu CV
      </button>
    </div>
  );
};

export default CvEditorLeftPanel;
