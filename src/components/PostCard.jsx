import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ job }) {
  const navigate = useNavigate();

  const shortDesc =
    job.description?.length > 48
      ? job.description.substring(0, 48) + "..."
      : job.description;

  const formatDate = (dateString) => {
    if (!dateString) return "---";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "---";

    return date.toLocaleDateString("vi-VN");
  };

  const formatSalary = (salary) => {
    if (!salary) return "Thỏa thuận";
    return `${Number(salary).toLocaleString("vi-VN")} VNĐ`;
  };

  return (
    <div className="group relative flex h-full min-h-[275px] flex-col rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      {/* Trạng thái */}
      <div className="absolute right-4 top-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          Đang tuyển
        </span>
      </div>

      {/* Header */}
      <div className="mb-3 flex items-center gap-3 pr-24">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-1.5 shadow-inner transition-colors group-hover:border-slate-200">
          <img
            src={job.companyLogo}
            alt={job.companyName || "Logo công ty"}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="truncate text-[11px] font-bold uppercase tracking-wide text-slate-400">
            {job.companyName || "Chưa cập nhật công ty"}
          </h4>
        </div>
      </div>

      {/* Nội dung */}
      <div className="flex flex-1 flex-col">
        <h3 className="mb-1.5 line-clamp-2 text-[16px] font-bold leading-snug text-slate-900">
          {job.title || "Chưa cập nhật tiêu đề"}
        </h3>

        <div className="mb-2">
          <span className="text-[18px] font-extrabold text-blue-600">
            {formatSalary(job.salary)}
          </span>
        </div>

        <p className="mb-3 line-clamp-2 text-[12px] leading-5 text-slate-500">
          {job.description !== "undefined" && job.description
            ? shortDesc
            : "Chưa có mô tả chi tiết..."}
        </p>

        {/* Tags */}
        <div className="mb-3 mt-auto flex flex-wrap gap-2">
          {job.tags && job.tags.length > 0 ? (
            job.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-600"
              >
                #{tag}
              </span>
            ))
          ) : (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold text-slate-500">
              Chưa có kỹ năng
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mb-2 border-t border-slate-100 pt-3 text-[12px] text-slate-600">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-1.5 font-medium">
            <svg
              className="h-3.5 w-3.5 shrink-0 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <span className="truncate">{job.workLocation || "Toàn quốc"}</span>
          </div>

          <div className="ml-2 flex shrink-0 items-center gap-1 rounded-md bg-slate-50 px-2 py-0.5 text-[11px] text-slate-500">
            <span className="font-bold text-slate-700">
              {job.viewCount || 0}
            </span>
            lượt xem
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-600">
            Bắt đầu:{" "}
            <span className="text-[12px] font-bold text-slate-900">
              {formatDate(job.startDay)}
            </span>
          </span>

          <span className="rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-600">
            Hạn: {formatDate(job.endDay)}
          </span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => navigate(`/job/${job.id}`)}
        className="w-full rounded-xl bg-slate-800 py-2.5 text-[13px] font-bold text-white shadow-sm transition-colors duration-200 hover:bg-blue-600 active:scale-[0.98]"
      >
        Xem chi tiết
      </button>
    </div>
  );
}
