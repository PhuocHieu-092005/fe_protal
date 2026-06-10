import React, { useState, useEffect } from "react";
import {
  RotateCcw,
  CheckCircle2,
  FolderKanban,
  Gift,
  BadgeDollarSign,
  Cpu,
  SlidersHorizontal,
} from "lucide-react";

export default function ProjectFilterSidebar({
  filters,
  technologies = [],
  onApply,
  onReset,
}) {
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleLocalChange = (field, value) => {
    setTempFilters((prev) => ({ ...prev, [field]: value }));
  };

  const categories = [
    {
      label: "Tất cả",
      value: "",
      icon: FolderKanban,
    },
    {
      label: "Miễn phí",
      value: "FREE",
      icon: Gift,
    },
    {
      label: "Có phí",
      value: "PAID",
      icon: BadgeDollarSign,
    },
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:rounded-3xl lg:p-6">
        <div className="mb-4 lg:mb-6">
          <div className="mb-3 h-1 w-10 rounded-full bg-blue-600 lg:w-12"></div>

          <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0f172a] lg:text-sm">
            <SlidersHorizontal size={16} className="text-blue-600" />
            Danh mục
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {categories.map((item) => {
            const Icon = item.icon;
            const isActive = tempFilters.priceType === item.value;

            return (
              <button
                key={item.value || "all"}
                type="button"
                onClick={() => handleLocalChange("priceType", item.value)}
                className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition-all lg:rounded-2xl lg:px-5 lg:py-4 lg:text-sm ${
                  isActive
                    ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-200"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Icon size={15} />
                  {item.label}
                </span>

                {isActive && <CheckCircle2 size={16} />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:rounded-3xl lg:p-6">
        <div className="mb-4 lg:mb-6">
          <div className="mb-3 h-1 w-10 rounded-full bg-blue-600 lg:w-12"></div>

          <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0f172a] lg:text-sm">
            <Cpu size={16} className="text-blue-600" />
            Công nghệ
          </h3>
        </div>

        {/* Desktop: dropdown cho gọn */}
        <div className="hidden lg:block">
          <select
            value={tempFilters.technologyId || ""}
            onChange={(e) => handleLocalChange("technologyId", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white"
          >
            <option value="">Tất cả công nghệ</option>

            {technologies.map((tech) => (
              <option key={tech.id} value={tech.id}>
                {tech.name}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile: chip cho dễ bấm */}
        <div className="flex flex-wrap gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => handleLocalChange("technologyId", "")}
            className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all ${
              !tempFilters.technologyId
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            Tất cả
          </button>

          {technologies.map((tech) => {
            const value = String(tech.id);
            const isActive = String(tempFilters.technologyId || "") === value;

            return (
              <button
                key={tech.id}
                type="button"
                onClick={() => handleLocalChange("technologyId", value)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all ${
                  isActive
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                {tech.name}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex gap-2 lg:mt-8 lg:gap-3">
          <button
            type="button"
            onClick={() => onApply(tempFilters)}
            className="flex-1 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-lg shadow-slate-200 transition-all hover:bg-blue-600 lg:rounded-2xl lg:px-5 lg:py-4"
          >
            Áp dụng
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 lg:rounded-2xl lg:px-5 lg:py-4"
          >
            <RotateCcw size={16} />
            <span className="hidden sm:inline">Đặt lại</span>
          </button>
        </div>
      </div>
    </div>
  );
}
