import React, { useState } from "react";
import { useJobs } from "../../../contexts/JobContext";
import jobService from "../../../services/jobService";

export default function JobFilterSidebar({ onApplied }) {
  const { fetchActiveJobs, setJobs } = useJobs();

  const skills = [
    "ReactJS",
    "NodeJS",
    "Java",
    "Flutter",
    "UI/UX",
    "SQL",
    "html",
  ];

  const locations = [
    { value: "", label: "Tất cả" },
    { value: "HANOI", label: "Hà Nội" },
    { value: "TPHCM", label: "TP.HCM" },
    { value: "MIENBAC", label: "Miền Bắc" },
    { value: "MIENTRUNG", label: "Miền Trung" },
    { value: "MIENNAM", label: "Miền Nam" },
    { value: "REMOTE", label: "Remote" },
  ];

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    minSalary: "",
    maxSalary: "",
    tags: [],
  });

  const handleToggleSkillTags = (skill) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(skill)
        ? prev.tags.filter((item) => item !== skill)
        : [...prev.tags, skill],
    }));
  };

  const handleReset = () => {
    setFilters({
      location: "",
      type: "",
      minSalary: "",
      maxSalary: "",
      tags: [],
    });

    fetchActiveJobs();
    onApplied?.();
  };

  const handleSubmit = async () => {
    try {
      const response = await jobService.filterJobs(filters);
      setJobs(response.data.data);

      onApplied?.();
    } catch (err) {
      console.log("lỗi: ", err);
    }
  };

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold text-slate-900">
          Bộ lọc
        </h3>

        <button
          onClick={handleReset}
          className="text-xs md:text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          Đặt lại
        </button>
      </div>

      <div className="space-y-5">
        {/* Khu vực */}
        <div>
          <label className="mb-2 block text-xs md:text-sm font-medium text-slate-700">
            Khu vực làm việc
          </label>

          <div className="grid grid-cols-2 gap-1.5">
            {locations.map((item) => {
              const isSelected = filters.location === item.value;

              return (
                <button
                  type="button"
                  key={item.value || "all"}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      location: item.value,
                    })
                  }
                  className={`rounded-lg border px-2 py-1.5 text-[11px] md:text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lương */}
        <div>
          <label className="mb-2 block text-xs md:text-sm font-medium text-slate-700">
            Mức lương (VNĐ)
          </label>

          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Từ"
              value={filters.minSalary}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minSalary: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs md:text-sm outline-none focus:border-slate-900"
            />

            <span className="text-slate-400">-</span>

            <input
              type="number"
              placeholder="Đến"
              value={filters.maxSalary}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxSalary: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs md:text-sm outline-none focus:border-slate-900"
            />
          </div>
        </div>

        {/* Loại hình */}
        <div>
          <label className="mb-2 block text-xs md:text-sm font-medium text-slate-700">
            Loại hình công việc
          </label>

          <div className="space-y-2 text-xs md:text-sm text-slate-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="jobType"
                checked={filters.type === "FULLTIME"}
                onChange={() => setFilters({ ...filters, type: "FULLTIME" })}
                className="w-4 h-4 accent-slate-900"
              />
              Toàn thời gian
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="jobType"
                checked={filters.type === "PARTTIME"}
                onChange={() => setFilters({ ...filters, type: "PARTTIME" })}
                className="w-4 h-4 accent-slate-900"
              />
              Bán thời gian
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="jobType"
                checked={filters.type === "INTERNSHIP"}
                onChange={() => setFilters({ ...filters, type: "INTERNSHIP" })}
                className="w-4 h-4 accent-slate-900"
              />
              Thực tập
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="jobType"
                checked={filters.type === "FREELANCE"}
                onChange={() => setFilters({ ...filters, type: "FREELANCE" })}
                className="w-4 h-4 accent-slate-900"
              />
              Freelance
            </label>
          </div>
        </div>

        {/* Skill */}
        <div>
          <label className="mb-2 block text-xs md:text-sm font-medium text-slate-700">
            Kỹ năng chuyên môn
          </label>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => {
              const isSelected = filters.tags.includes(skill);

              return (
                <button
                  type="button"
                  key={skill}
                  onClick={() => handleToggleSkillTags(skill)}
                  className={`rounded-full px-3 py-1.5 text-[11px] md:text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-slate-950 text-white border border-slate-950"
                      : "border border-slate-200 text-slate-600 bg-white"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition-all hover:bg-black active:scale-95"
        >
          Áp dụng lọc
        </button>
      </div>
    </aside>
  );
}
