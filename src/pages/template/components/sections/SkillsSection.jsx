// src/pages/template/components/sections/SkillsSection.jsx
import React, { useState } from "react";

/**
 * SkillsSection.jsx
 *
 * Section quản lý kỹ năng, được chia thành 3 nhóm:
 * - Ngôn ngữ lập trình (programming)
 * - Framework & Công nghệ (frameworks)
 * - Kỹ năng mềm (softSkills)
 *
 * Cho phép thêm/xóa kỹ năng theo từng nhóm.
 */
const SkillsSection = ({ cvData, updateCvData }) => {
  const { skills } = cvData;

  // State quản lý input đang nhập
  const [newSkill, setNewSkill] = useState("");
  const [activeCategory, setActiveCategory] = useState("programming");

  /**
   * Thêm kỹ năng vào nhóm đang chọn
   */
  const addSkill = () => {
    if (!newSkill.trim()) return;

    const updatedSkills = {
      ...skills,
      [activeCategory]: [...(skills[activeCategory] || []), newSkill.trim()],
    };

    updateCvData({ ...cvData, skills: updatedSkills });
    setNewSkill(""); // Reset input sau khi thêm
  };

  /**
   * Xóa kỹ năng theo nhóm và vị trí
   */
  const removeSkill = (category, index) => {
    const updatedSkills = {
      ...skills,
      [category]: skills[category].filter((_, i) => i !== index),
    };
    updateCvData({ ...cvData, skills: updatedSkills });
  };

  const categories = [
    { key: "programming", label: "Ngôn ngữ lập trình" },
    { key: "frameworks", label: "Framework & Công nghệ" },
    { key: "softSkills", label: "Kỹ năng mềm" },
  ];

  return (
    <div>
      {/* Tab chọn nhóm kỹ năng */}
      <div className="flex gap-2 mb-6 border-b pb-1">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-5 py-2 rounded-t-xl font-medium transition text-sm ${
              activeCategory === cat.key
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Input thêm kỹ năng */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder={`Thêm ${categories.find((c) => c.key === activeCategory).label.toLowerCase()}`}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
          onKeyPress={(e) => e.key === "Enter" && addSkill()}
        />
        <button
          onClick={addSkill}
          className="px-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium"
        >
          Thêm
        </button>
      </div>

      {/* Danh sách kỹ năng đã thêm */}
      <div className="flex flex-wrap gap-3">
        {(skills[activeCategory] || []).map((skill, index) => (
          <div
            key={index}
            className="bg-gray-100 px-5 py-2.5 rounded-2xl flex items-center gap-3 group hover:bg-gray-200 transition"
          >
            <span className="text-gray-800 font-medium">{skill}</span>
            <button
              onClick={() => removeSkill(activeCategory, index)}
              className="text-red-500 opacity-0 group-hover:opacity-100 transition hover:scale-110"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {(!skills[activeCategory] || skills[activeCategory].length === 0) && (
        <p className="text-gray-400 text-sm italic mt-4">
          Chưa có kỹ năng nào được thêm vào nhóm này.
        </p>
      )}
    </div>
  );
};

export default SkillsSection;
