import React from "react";
/**
 * Section thông tin học vấn.
 */
const EducationSection = ({ cvData, updateCvData }) => {
  // Lấy mục học vấn đầu tiên
  const edu = cvData.education[0] || {
    school: "",
    major: "",
    gpa: "",
    period: "",
  };
  const handleChange = (field, value) => {
    updateCvData({
      ...cvData,
      education: [{ ...edu, [field]: value }],
    });
  };
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Tên trường đại học / cao đẳng"
        value={edu.school}
        onChange={(e) => handleChange("school", e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
      />

      <input
        type="text"
        placeholder="Chuyên ngành"
        value={edu.major}
        onChange={(e) => handleChange("major", e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="GPA"
          value={edu.gpa}
          onChange={(e) => handleChange("gpa", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="Năm học (2023 - 2027)"
          value={edu.period}
          onChange={(e) => handleChange("period", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
        />
      </div>
    </div>
  );
};
export default EducationSection;
