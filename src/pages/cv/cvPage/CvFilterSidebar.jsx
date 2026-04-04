import React, { useState } from "react";

export default function CvFilterSidebar({ onApplyFilter }) {
  const technologiesList = [
    "ReactJS",
    "VueJS",
    "Angular",
    "NextJS",
    "TypeScript",
    "JavaScript",
    "HTML/CSS",
    "TailwindCSS",
    "Bootstrap",
    "NodeJS",
    "Java",
    "Spring Boot",
    "C#",
    ".NET",
    "PHP",
    "Laravel",
    "Python",
    "Django",
    "Go",
    "C++",
    "MySQL",
    "PostgreSQL",
    "SQL Server",
    "MongoDB",
    "Redis",
    "Flutter",
    "React Native",
    "Swift",
    "Kotlin",
    "Git",
    "Docker",
    "Kubernetes",
    "AWS",
    "Firebase",
  ].sort();

  // Local state cho các input trong sidebar
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const [selectedTechs, setSelectedTechs] = useState([]);

  // Xử lý tick chọn nhiều công nghệ
  const handleTechChange = (tech) => {
    setSelectedTechs(
      (prev) =>
        prev.includes(tech)
          ? prev.filter((t) => t !== tech) // Bỏ tick
          : [...prev, tech], // Thêm tick
    );
  };

  const handleApply = () => {
    onApplyFilter({
      keyword: keyword,
      type: type,
      techs: selectedTechs,
    });
  };

  const handleReset = () => {
    setKeyword("");
    setType("");
    setSelectedTechs([]);
    // Gửi bộ lọc rỗng lên cha để load lại toàn bộ CV
    onApplyFilter({ keyword: "", type: "", techs: [] });
  };

  return (
    <aside className="w-[300px] sticky top-28 h-fit max-h-[80vh] flex flex-col bg-white border rounded-xl p-5 shadow-sm">
      {/* Header */}
      <div className="border-b pb-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Bộ lọc CV</h2>
        <p className="text-xs text-gray-500 mt-1">Tối ưu tìm kiếm ứng viên</p>
      </div>

      <div className="space-y-5 overflow-y-auto pr-2 flex-1 scrollbar-hide">
        {/* Tìm kiếm theo Title */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
            Tiêu đề CV (Chức danh)
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="VD: Frontend, React..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Loại CV */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
            Loại Hồ sơ
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="">Tất cả các loại</option>
            <option value="FORM">Tạo từ hệ thống (Form)</option>
            <option value="UPLOAD">File PDF đính kèm</option>
          </select>
        </div>

        {/* Technologies Checkboxes */}
        <div className="space-y-2 pt-2 border-t">
          <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
            Công nghệ sử dụng
          </label>
          <div className="space-y-2 border border-gray-100 rounded-md p-3 bg-gray-50/50">
            {technologiesList.map((tech) => (
              <label
                key={tech}
                className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors"
              >
                <input
                  type="checkbox"
                  value={tech}
                  checked={selectedTechs.includes(tech)}
                  onChange={() => handleTechChange(tech)}
                  className="w-4 h-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                />
                {tech}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-5 mt-auto border-t">
        <button
          onClick={handleApply}
          className="flex-1 bg-slate-900 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-indigo-600 transition shadow-sm"
        >
          Áp dụng
        </button>
        <button
          onClick={handleReset}
          className="flex-1 border border-gray-300 text-gray-700 text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition"
        >
          Đặt lại
        </button>
      </div>
    </aside>
  );
}
