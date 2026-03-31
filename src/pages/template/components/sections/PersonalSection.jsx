// src/pages/template/components/sections/PersonalSection.jsx
import React from "react";

/**
 * PersonalSection.jsx
 *
 * Section thu thập thông tin cá nhân cơ bản của sinh viên.
 */
const PersonalSection = ({ cvData, updateCvData }) => {
  const { personalInfo } = cvData;

  const handleChange = (field, value) => {
    updateCvData({
      ...cvData,
      personalInfo: {
        ...personalInfo,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Họ và tên đầy đủ"
        value={personalInfo.fullName || ""}
        onChange={(e) => handleChange("fullName", e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
      />

      <input
        type="text"
        placeholder="Chức danh nghề nghiệp (ví dụ: Fresher React Developer)"
        value={personalInfo.title || ""}
        onChange={(e) => handleChange("title", e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="email"
          placeholder="Email"
          value={personalInfo.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
        />
        <input
          type="tel"
          placeholder="Số điện thoại"
          value={personalInfo.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
        />
      </div>

      <input
        type="text"
        placeholder="Địa chỉ"
        value={personalInfo.address || ""}
        onChange={(e) => handleChange("address", e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="GitHub"
          value={personalInfo.github || ""}
          onChange={(e) => handleChange("github", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="LinkedIn"
          value={personalInfo.linkedin || ""}
          onChange={(e) => handleChange("linkedin", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
        />
      </div>
    </div>
  );
};

export default PersonalSection;
