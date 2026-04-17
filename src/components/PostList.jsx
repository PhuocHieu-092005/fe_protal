import React, { useState } from "react";
import PostCard from "./PostCard";
import Pagination from "./common/Pagination";

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
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
              Cơ hội việc làm
            </h2>
            <p className="text-gray-500 mt-2 max-w-2xl italic">
              Những cơ hội việc làm mới nhất dành cho lập trình viên
            </p>
            <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job, index) => (
              <PostCard key={index} job={job} />
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
