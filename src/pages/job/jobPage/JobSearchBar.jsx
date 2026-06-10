import React, { useState } from "react";
import jobService from "../../../services/jobService";
import { useJobs } from "../../../contexts/JobContext";

export default function JobSearchBar() {
  const [keyword, setKeyword] = useState("");
  const { setJobs } = useJobs();

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    try {
      const response = await jobService.searchByTitle(keyword);
      setJobs(response.data.data);
    } catch (err) {
      console.log("Lỗi tìm kiếm", err);
      alert("Không thể tìm kiếm lúc này ");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center gap-2 w-full max-w-4xl rounded-full border border-slate-200 bg-white px-2.5 py-2 shadow-md transition-all duration-300 hover:border-sky-300 hover:ring-2 hover:ring-sky-300/40 hover:shadow-xl sm:px-3">
        <div className="flex min-w-0 flex-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 shrink-0 text-slate-400 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>

          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm kiếm công việc, vị trí, kỹ năng..."
            className="min-w-0 flex-1 bg-transparent px-2 py-2 text-xs text-slate-700 outline-none placeholder:text-slate-400 sm:px-3 sm:text-sm"
          />
        </div>

        <button
          onClick={handleSearch}
          className="shrink-0 whitespace-nowrap rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-600 sm:px-8 sm:py-2.5 sm:text-sm"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}
