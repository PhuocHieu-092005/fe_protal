// src/pages/template/components/CvEditorLeftPanel.jsx
import React from "react";

const CvEditorLeftPanel = ({
  title,
  setTitle,
  avatarPreview,
  handleAvatarUpload,
  handleSaveCV,
  currentStatus, // Nhận thêm prop này
  isEditMode, // Nhận thêm prop này
  hasPendingRequest,
}) => {
  // Xác định chữ và màu nút dựa trên trạng thái
  let buttonText = "Lưu CV";
  let buttonClass = "bg-black hover:bg-gray-800 text-white";
  let isDisabled = false;
  if (isEditMode) {
    if (currentStatus === "APPROVED") {
      if (hasPendingRequest) {
        buttonText = "Đang chờ Admin duyệt yêu cầu sửa";
        buttonClass = "bg-gray-400 text-white cursor-not-allowed";
        isDisabled = true; // Khóa nút
      } else {
        buttonText = "Yêu cầu mở khóa sửa CV";
        buttonClass = "bg-orange-500 hover:bg-orange-600 text-white";
      }
    } else {
      buttonText = "Cập nhật CV";
      buttonClass = "bg-indigo-600 hover:bg-indigo-700 text-white";
    }
  }

  return (
    <div className="p-6 border-b bg-white">
      {/* Tên CV */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-xl font-semibold px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500 mb-6"
        placeholder="Tên CV của bạn"
        disabled={currentStatus === "APPROVED"} // Khóa đổi tên nếu đã duyệt
      />

      {/* Avatar */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Ảnh đại diện
        </label>
        <div className="flex justify-center">
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden hover:border-indigo-400 transition relative">
            {/* Vô hiệu hóa upload ảnh nếu đã duyệt */}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
              id="avatar-upload"
              disabled={currentStatus === "APPROVED"}
            />
            <label
              htmlFor="avatar-upload"
              className={`h-full w-full flex items-center justify-center ${currentStatus === "APPROVED" ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
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

      {/* Nút Lưu / Cập nhật / Yêu cầu */}
      <button
        onClick={handleSaveCV}
        disabled={isDisabled}
        className={`w-full py-2.5 font-medium rounded-2xl transition flex items-center justify-center gap-2 shadow-sm ${buttonClass}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default CvEditorLeftPanel;
