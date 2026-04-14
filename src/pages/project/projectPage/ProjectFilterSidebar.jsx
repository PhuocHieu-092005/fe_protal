import React, { useState, useEffect } from "react";
import { RotateCcw, CheckCircle2 } from "lucide-react";

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
    { label: "Tất cả đồ án", value: "" },
    { label: "Đồ án miễn phí", value: "FREE" },
    { label: "Đồ án có phí", value: "PAID" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <div className="mb-3 h-1 w-12 rounded-full bg-blue-600"></div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#0f172a]">
            Danh mục
          </h3>
        </div>

        <div className="space-y-3">
          {categories.map((item) => {
            const isActive = tempFilters.priceType === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleLocalChange("priceType", item.value)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${
                  isActive
                    ? "border-[#0f172a] bg-[#0f172a] text-white shadow-md"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                }`}
              >
                <span>{item.label}</span>
                {isActive && <CheckCircle2 size={18} className="text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <div className="mb-3 h-1 w-12 rounded-full bg-blue-600"></div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#0f172a]">
            Công nghệ
          </h3>
        </div>

        <select
          value={tempFilters.technologyId || ""}
          onChange={(e) => handleLocalChange("technologyId", e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all focus:border-[#0f172a] focus:bg-white focus:ring-0"
        >
          <option value="">Tất cả công nghệ</option>
          {technologies?.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onApply(tempFilters)}
            className="rounded-2xl bg-[#0f172a] py-3 text-sm font-bold text-white transition-all hover:bg-slate-800"
          >
            Áp dụng
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50"
          >
            <RotateCcw size={16} />
            Đặt lại
          </button>
        </div>
      </div>
    </div>
  );
}
