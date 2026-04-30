import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
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
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 md:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="h-1.5 w-16 bg-blue-600 mb-4 rounded-full"></div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              Cơ hội việc làm <span className="text-blue-600">mới nhất</span>
            </h2>
            <p className="text-slate-500 mt-3 text-lg max-w-2xl leading-relaxed">
              Khám phá hàng ngàn cơ hội nghề nghiệp hấp dẫn dành cho các lập
              trình viên tài năng.
            </p>
          </div>

          {/* Bạn có thể thêm bộ lọc hoặc search ở đây sau này */}
        </div>

        {/* Grid: Tăng gap lên 8 để các card có không gian "thở" */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => <PostCard key={job.id} job={job} />)
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="animate-pulse text-slate-400">
                Đang tải dữ liệu...
              </div>
            </div>
          )}
        </div>

        {/* Pagination: Đặt trong một container đẹp hơn */}
        <div className="mt-16 flex justify-center border-t border-slate-200 pt-10">
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
