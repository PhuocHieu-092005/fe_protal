import React from "react";
import { RotateCcw, Filter, SlidersHorizontal } from "lucide-react";

export default function ProjectFilterSidebar({
  filters,
  technologies,
  onChange,
  onReset,
}) {
  const categories = [
    { label: "Tất cả công việc", value: "" },
    { label: "Thực tập", value: "FREE" },
    { label: "Bán thời gian", value: "PAID" },
    { label: "Toàn thời gian", value: "FULLTIME" },
  ];

  return (
    <div className="sticky top-24 space-y-6">
      {/* Section 1: Danh mục (Price Type) */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="mb-6 border-l-4 border-black pl-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">
            DANH MỤC
          </h3>
        </div>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => onChange("priceType", cat.value)}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm font-bold transition-all ${
                filters.priceType === cat.value
                  ? "bg-black text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section 2: Lọc nâng cao (Công nghệ, Sắp xếp, Size) */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="mb-6 border-l-4 border-black pl-3 flex items-center gap-2">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">
            BỘ LỌC NÂNG CAO
          </h3>
        </div>

        <div className="space-y-5">
          {/* Lọc Công nghệ */}
          <div>
            <label className="mb-2 block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Công nghệ
            </label>
            <select
              value={filters.technologyId}
              onChange={(e) => onChange("technologyId", e.target.value)}
              className="w-full rounded-xl border-slate-200 bg-slate-50 py-3 text-sm focus:border-black focus:ring-0"
            >
              <option value="">Tất cả công nghệ</option>
              {technologies.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sắp xếp */}
          <div>
            <label className="mb-2 block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Sắp xếp theo
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => onChange("sortBy", e.target.value)}
              className="w-full rounded-xl border-slate-200 bg-slate-50 py-3 text-sm focus:border-black focus:ring-0"
            >
              <option value="latest">Mới nhất</option>
              <option value="mostViewed">Xem nhiều nhất</option>
              <option value="nameAsc">Tên A - Z</option>
            </select>
          </div>

          {/* Số lượng hiển thị */}
          <div>
            <label className="mb-2 block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Hiển thị
            </label>
            <select
              value={filters.size}
              onChange={(e) => onChange("size", Number(e.target.value))}
              className="w-full rounded-xl border-slate-200 bg-slate-50 py-3 text-sm focus:border-black focus:ring-0"
            >
              <option value={6}>6 đồ án / trang</option>
              <option value={9}>9 đồ án / trang</option>
              <option value={12}>12 đồ án / trang</option>
            </select>
          </div>

          <button
            onClick={onReset}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw size={14} /> Đặt lại bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
}
