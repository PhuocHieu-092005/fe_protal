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
    <section className="bg-[#F8FAFC] pt-8 pb-0 font-sans text-slate-900 md:pt-16 md:pb-0">
      <div className="-mx-3 w-[calc(100%+1.5rem)] md:mx-auto md:w-[90%] md:max-w-[1320px]">
        <div className="mb-5 px-3 md:mb-8 md:px-0">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
            Việc làm nổi bật
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 md:mt-3 md:text-base">
            Những công việc đang được tuyển dụng nhiều và phù hợp với định hướng
            phát triển của sinh viên CNTT.
          </p>
        </div>

        <div className="grid grid-cols-2 items-start gap-1 sm:gap-2 md:items-stretch lg:grid-cols-4">
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

        <div className="mt-2 flex justify-center border-t border-slate-200 px-3 pt-2 pb-1 md:mt-3 md:px-0 md:pt-3 md:pb-1">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}
