import React from "react";

export default function JobSectionHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Việc làm đang tuyển
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Khám phá những cơ hội mới nhất từ các công ty hàng đầu.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500">Sắp xếp theo</span>
        <select className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none">
          <option>Mới nhất</option>
          <option>Lương cao nhất</option>
          <option>Cũ nhất</option>
        </select>
      </div>
    </div>
  );
}
