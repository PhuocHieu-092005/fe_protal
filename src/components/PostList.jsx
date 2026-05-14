import React, { useEffect, useMemo, useState } from "react";
import jobService from "../services/jobService";
import Pagination from "./common/Pagination";
import PostCard from "./PostCard";

function normalizeJobsResponse(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.content)) return response.content;
  if (Array.isArray(response?.data?.content)) return response.data.content;
  return [];
}

export default function PostList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchActiveJobs = async () => {
      try {
        setLoading(true);
        setErrorText("");

        const response = await jobService.getAllJobs();
        const normalizedJobs = normalizeJobsResponse(response);

        setJobs(normalizedJobs);
        console.log("Danh sách việc làm đã tải:", normalizedJobs);
      } catch (err) {
        console.error("Lỗi tải danh sách việc làm:", err);
        setErrorText("Không thể tải danh sách việc làm.");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveJobs();
  }, []);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(jobs.length / itemsPerPage)),
    [jobs.length],
  );

  const currentJobs = useMemo(() => {
    if (!jobs.length) return [];

    return jobs.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  }, [currentPage, jobs]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 font-sans text-slate-900">
      <div className="mx-auto w-[88%] max-w-[1280px]">
        <div className="mb-8">
          <div className="mb-4 h-1.5 w-16 rounded-full bg-blue-600"></div>

          <h2 className="text-4xl font-extrabold tracking-tight">
            Cơ hội việc làm <span className="text-blue-600">mới nhất</span>
          </h2>

          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-500">
            Khám phá hàng ngàn cơ hội nghề nghiệp hấp dẫn dành cho các lập trình
            viên tài năng.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <div className="animate-pulse text-slate-400">
                Đang tải dữ liệu...
              </div>
            </div>
          ) : errorText ? (
            <div className="col-span-full py-20 text-center text-red-500">
              {errorText}
            </div>
          ) : currentJobs.length > 0 ? (
            currentJobs.map((job) => <PostCard key={job.id} job={job} />)
          ) : (
            <div className="col-span-full py-20 text-center text-slate-500">
              Hiện chưa có việc làm nào để hiển thị.
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-center border-t border-slate-200 pt-8">
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
