import React from "react";

export default function CvFilterSidebar() {
  const technologies = [
    "ReactJS",
    "NodeJS",
    "Java",
    "C#",
    "PHP",
    "Laravel",
    "VueJS",
    "NextJS",
    "TypeScript",
    "MongoDB",
  ];

  return (
    <aside className="w-1/4 top-6 max-h-[480px] overflow-y-auto bg-white border rounded-xl p-5">
      {/* Header */}
      <div className="border-b pb-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Bộ lọc CV</h2>
        <p className="text-xs text-gray-500">Tối ưu tìm kiếm ứng viên</p>
      </div>

      <div className="space-y-5">
        {/* MSSV */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            Mã số sinh viên
          </label>
          <input
            type="text"
            placeholder="Nhập MSSV..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
            focus:outline-none focus:ring-1 focus:ring-black focus:border-black
            transition"
          />
        </div>

        {/* Position */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            Vị trí mong muốn
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
            focus:outline-none focus:ring-1 focus:ring-black focus:border-black
            bg-white"
          >
            <option value="">Tất cả vị trí</option>
            <option value="backend">Lập trình viên Backend</option>
            <option value="frontend">Lập trình viên Frontend</option>
            <option value="fullstack">Lập trình viên Fullstack</option>
            <option value="uiux">Thiết kế UI/UX</option>
          </select>
        </div>

        {/* Technologies */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            Công nghệ sử dụng
          </label>

          <div className="max-h-40 overflow-y-auto pr-1 space-y-2 border border-gray-200 rounded-md p-3">
            {technologies.map((tech) => (
              <label
                key={tech}
                className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-black"
              >
                <input
                  type="checkbox"
                  value={tech}
                  className="w-4 h-4 border-gray-300 rounded 
                  focus:ring-black accent-black"
                />
                {tech}
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            className="flex-1 bg-black text-white text-sm font-medium py-2 rounded-md 
            hover:bg-gray-900 transition"
          >
            Áp dụng
          </button>

          <button
            className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium py-2 rounded-md 
            hover:bg-gray-100 transition"
          >
            Đặt lại
          </button>
        </div>
      </div>
    </aside>
  );
}
