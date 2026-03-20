import React, { useState } from "react";

// --- 1. COMPONENT: PostCard ---
const PostCard = ({ job }) => {
  const shortDesc =
    job.description?.length > 60
      ? job.description.substring(0, 60) + "..."
      : job.description;

  return (
    <div className="group bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[360px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-14 h-14 rounded-md border border-slate-100 flex items-center justify-center p-1">
          <img
            src={job.logo}
            alt={job.company}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-[11px] font-semibold text-slate-500 uppercase truncate">
            {job.company}
          </h4>

          {/* FIX badge */}
          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium bg-emerald-50 px-2 py-[2px] rounded mt-1 w-fit">
            <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
            Hiring
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1">
        <h3 className="text-[14px] font-semibold text-slate-900 leading-tight line-clamp-2 mb-1">
          {job.title}
        </h3>

        <p className="text-[13px] font-semibold text-blue-600 mb-1">
          {job.salary}
        </p>

        <p className="text-[11px] text-slate-500 italic mb-2 line-clamp-2">
          {shortDesc}
        </p>

        <div className="flex flex-wrap gap-1">
          {job.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-[2px] bg-slate-50 text-slate-500 text-[10px] rounded border border-slate-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-[11px] text-slate-500 py-2 border-t mt-2">
        <span>👁 {job.view_count.toLocaleString()}</span>
        <span>👤 {job.applied_count} applicants</span>
      </div>

      {/* Time */}
      <div className="flex justify-between text-[10px] mt-1">
        <span className="text-slate-400">Start: {job.start_day}</span>
        <span className="text-rose-500">End: {job.end_day}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-2">
        <button className="flex-1 py-1.5 text-[11px] font-medium border border-slate-200 rounded-lg hover:bg-slate-50">
          Details
        </button>

        <button className="flex-1 py-1.5 text-[11px] font-medium bg-black text-white border border-black rounded-lg hover:bg-white hover:text-black transition-all duration-200">
          Apply
        </button>
      </div>
    </div>
  );
};

// --- 2. COMPONENT: PostAside
const PostAside = () => {
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
};

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const pages = Array.from({ length: totalPages });

  return (
    <div className="flex justify-center mt-10">
      <div className="flex items-center justify-between w-full max-w-80 text-gray-500 font-medium">
        {/* Prev */}
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-full bg-slate-200/50 disabled:opacity-40"
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path
              d="M22.5 12.85l-6.25 6.25 6.25 6.25"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
            />
          </svg>
        </button>

        {/* Pages */}
        <div className="flex items-center gap-2 text-sm">
          {pages.map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={i}
                onClick={() => setCurrentPage(page)}
                className={`h-10 w-10 flex items-center justify-center ${
                  currentPage === page
                    ? "text-indigo-500 border border-indigo-200 rounded-full"
                    : ""
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className="rounded-full bg-slate-200/50 disabled:opacity-40"
        >
          <svg
            className="rotate-180"
            width="40"
            height="40"
            viewBox="0 0 40 40"
          >
            <path
              d="M22.5 12.85l-6.25 6.25 6.25 6.25"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
// --- 3. MAIN ---
export default function PostList() {
  const jobs = [
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      company: "FPT Software",
      title: `Job ${i + 1} - Laravel Developer`,
      salary: "5 - 8 Triệu",
      description: "Mô tả công việc backend với Laravel, REST API.",
      tags: ["PHP", "Laravel"],
      logo: "https://vieclam.ueh.edu.vn/images/company/avatar/y7QP7gxQ0d_453076304-910349481138219-1377419910091349711-n.jpg",
      view_count: 1000 + i * 100,
      applied_count: i * 2,
      start_day: "20/03/2026",
      end_day: "15/04/2026",
    })),
  ];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const currentJobs = jobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <PostAside />

        <div className="flex-1">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
              Career Opportunities
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              Latest job opportunities for developerss
            </p>
            <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <PostCard key={job.id} job={job} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
