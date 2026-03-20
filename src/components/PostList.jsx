import React, { useState } from "react";
import PostCard from "./PostCard";
import PostAside from "./PostAside";
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
