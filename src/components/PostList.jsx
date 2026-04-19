import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import PostAside from "./PostAside";
import Pagination from "./common/Pagination";
import jobService from "../services/jobService";

export default function PostList() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  useEffect(() => {
    const fetchActiveJobs = async () => {
      try {
        const response = await jobService.getAllJobs();
        const data = response.data || [];
        setJobs(data);
      } catch (err) {
        console.error("Lỗi, ", err);
      }
    };
    fetchActiveJobs();
  }, []);
  const totalPages = Math.floor((jobs.length + 5) / 6);
  let currentJobs = [];
  if (jobs.length > 0) {
    currentJobs = jobs.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  }
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <PostAside />
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
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => <PostCard key={job.id} job={job} />)
            ) : (
              <p className="col-span-full text-center text-gray-400">
                Đang tải hoặc không có dữ liệu...
              </p>
            )}
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
