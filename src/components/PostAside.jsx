import React from "react";

export default function PostAside() {
  const filters = ["All Jobs", "Internship", "Part-time", "Full-time"];

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sticky top-5 shadow-sm">
        {/* Title */}
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wide">
          <div className="w-1.5 h-4 bg-black rounded-full"></div>
          Categories
        </h3>

        {/* Filters */}
        <div className="space-y-1.5">
          {filters.map((f, i) => (
            <button
              key={i}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-[12px] font-medium transition-all ${
                i === 0
                  ? "bg-black text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
