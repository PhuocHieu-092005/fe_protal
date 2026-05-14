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
      label: "Tất cả đồ án",
      value: "",
      icon: FolderKanban,
    },
    {
      label: "Đồ án miễn phí",
      value: "FREE",
      icon: Gift,
    },
    {
      label: "Đồ án có phí",
      value: "PAID",
      icon: BadgeDollarSign,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <div className="mb-3 h-1 w-12 rounded-full bg-blue-600"></div>

          <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-[#0f172a]">
            <SlidersHorizontal size={17} className="text-blue-600" />
            Danh mục
          </h3>
        </div>

        <div className="space-y-3">
          {categories.map((item) => {
            const Icon = item.icon;
            const isActive = tempFilters.priceType === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleLocalChange("priceType", item.value)}
                className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-sm font-bold transition-all ${
                  isActive
                    ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-200"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon size={17} />
                  {item.label}
                </span>

                {isActive && <CheckCircle2 size={18} />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <div className="mb-3 h-1 w-12 rounded-full bg-blue-600"></div>

          <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-[#0f172a]">
            <Cpu size={17} className="text-blue-600" />
            Công nghệ
          </h3>
        </div>

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

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => onApply(tempFilters)}
            className="flex-1 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-lg shadow-slate-200 transition-all hover:bg-blue-600"
          >
            Áp dụng
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <RotateCcw size={17} />
            Đặt lại
          </button>
        </div>
      </div>
    </div>
  );
}
