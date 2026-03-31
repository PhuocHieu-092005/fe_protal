// src/pages/template/components/sections/ExperienceSection.jsx
import React from "react";

/**
 * ExperienceSection.jsx
 *
 * Section quản lý kinh nghiệm làm việc / thực tập.
 * Cho phép thêm nhiều kinh nghiệm.
 * Mỗi kinh nghiệm bao gồm: Title, Role (Vị trí), Period (Thời gian), Description.
 */
const ExperienceSection = ({ cvData, updateCvData }) => {
  const { experience } = cvData;

  const addExperience = () => {
    updateCvData({
      ...cvData,
      experience: [
        ...experience,
        { title: "", role: "", period: "", description: "" },
      ],
    });
  };

  const updateExperience = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    updateCvData({ ...cvData, experience: newExperience });
  };

  const removeExperience = (index) => {
    const newExperience = experience.filter((_, i) => i !== index);
    updateCvData({ ...cvData, experience: newExperience });
  };

  return (
    <div className="space-y-6">
      {experience.map((exp, index) => (
        <div
          key={index}
          className="border border-gray-200 p-6 rounded-2xl bg-gray-50"
        >
          <div className="flex justify-between items-center mb-5">
            <h4 className="font-semibold text-lg">Kinh nghiệm #{index + 1}</h4>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Xóa
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Tiêu đề kinh nghiệm (ví dụ: Thực tập Backend Developer)"
              value={exp.title}
              onChange={(e) => updateExperience(index, "title", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
            />

            <input
              type="text"
              placeholder="Vị trí / Vai trò (ví dụ: Backend Developer Intern)"
              value={exp.role}
              onChange={(e) => updateExperience(index, "role", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
            />

            <input
              type="text"
              placeholder="Thời gian (ví dụ: 06/2024 - 12/2024)"
              value={exp.period}
              onChange={(e) =>
                updateExperience(index, "period", e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
            />

            <textarea
              placeholder="Mô tả chi tiết công việc, trách nhiệm, công nghệ sử dụng và thành tựu..."
              value={exp.description}
              onChange={(e) =>
                updateExperience(index, "description", e.target.value)
              }
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500 resize-y"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full py-4 border-2 border-dashed border-gray-400 text-gray-600 rounded-2xl hover:border-indigo-400 hover:text-indigo-600 transition font-medium"
      >
        + Thêm kinh nghiệm mới
      </button>
    </div>
  );
};

export default ExperienceSection;
