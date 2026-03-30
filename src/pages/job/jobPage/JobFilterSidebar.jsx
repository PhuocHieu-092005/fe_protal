import React, { useState } from "react";

export default function JobFilterSidebar() {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skills = ["ReactJS", "NodeJS", "Java", "Flutter", "UI/UX", "SQL"];

  const handleToggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((item) => item !== skill)
        : [...prev, skill],
    );
  };

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Bộ lọc</h3>
        <button
          onClick={() => setSelectedSkills([])}
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          Đặt lại
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Khu vực làm việc
          </label>
          <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none">
            <option>Tất cả khu vực</option>
            <option>TP. Hồ Chí Minh</option>
            <option>Hà Nội</option>
            <option>Đà Nẵng</option>
            <option>Làm việc từ xa (Remote)</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Loại hình công việc
          </label>
          <div className="space-y-2 text-sm text-slate-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Thực tập (Internship)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Bán thời gian (Part-time)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Toàn thời gian (Full-time)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Tự do (Freelance)
            </label>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Cấp bậc / Kinh nghiệm
          </label>
          <div className="space-y-2 text-sm text-slate-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Mới tốt nghiệp (Fresher)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Sơ cấp (Junior)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Trung cấp (Mid-level)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Cao cấp (Senior)
            </label>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Kỹ năng chuyên môn
          </label>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => {
              const isSelected = selectedSkills.includes(skill);

              return (
                <button
                  type="button"
                  key={skill}
                  onClick={() => handleToggleSkill(skill)}
                  className={`rounded-full px-3 py-1.5 text-xs transition ${
                    isSelected
                      ? "bg-slate-950 text-white border border-slate-950"
                      : "border border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
