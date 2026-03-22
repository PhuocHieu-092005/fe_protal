import React from "react";

export default function JobSectionHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Available Jobs
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Explore the latest opportunities from top companies.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500">Sort by</span>
        <select className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none">
          <option>Newest</option>
          <option>Highest salary</option>
          <option>Oldest</option>
        </select>
      </div>
    </div>
  );
}
