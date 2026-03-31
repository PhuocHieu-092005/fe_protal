// src/pages/template/components/sections/ObjectiveSection.jsx
import React from "react";

/**
 * ObjectiveSection.jsx
 *
 */
const ObjectiveSection = ({ cvData, updateCvData }) => {
  return (
    <textarea
      placeholder="Viết ngắn gọn về mục tiêu nghề nghiệp của bạn (ví dụ: Mong muốn trở thành một lập trình viên React chuyên nghiệp, đóng góp vào các dự án công nghệ hiện đại...)"
      value={cvData.objective || ""}
      onChange={(e) => updateCvData({ ...cvData, objective: e.target.value })}
      className="w-full h-40 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500 resize-y leading-relaxed"
    />
  );
};

export default ObjectiveSection;
