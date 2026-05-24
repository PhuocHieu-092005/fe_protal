import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ job }) {
  const navigate = useNavigate();

  const shortDesc =
    job.description?.length > 60
      ? job.description.substring(0, 60) + "..."
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
    <div className="group flex h-full min-h-[285px] flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white p-1.5">
            <img
              src={job.companyLogo}
              alt={job.companyName || "Logo công ty"}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <p className="max-w-[120px] truncate text-[11px] font-bold uppercase tracking-wide text-slate-500">
              {job.companyName || "Chưa cập nhật công ty"}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-600">
          Đang tuyển
        </span>
      </div>

      {/* Nội dung chính */}
      <div className="flex flex-1 flex-col">
        <h3 className="mb-1.5 line-clamp-2 text-[16px] font-bold leading-snug text-slate-900">
          {job.title || "Chưa cập nhật tiêu đề"}
        </h3>

        <p className="mb-2 text-[18px] font-extrabold text-blue-600">
          {formatSalary(job.salary)}
        </p>

        <p className="mb-3 line-clamp-2 text-[13px] leading-5 text-slate-500">
          {job.description !== "undefined" && job.description
            ? shortDesc
            : "Chưa có mô tả chi tiết..."}
        </p>

        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {job.tags && job.tags.length > 0 ? (
            job.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600"
              >
                #{tag}
              </span>
            ))
          ) : (
            <span className="rounded-lg bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500">
              Chưa có kỹ năng
            </span>
          )}
        </div>

        {/* Thông tin phụ */}
        <div className="mt-auto border-t border-slate-200 pt-3">
          <div className="mb-2.5 flex items-center justify-between gap-3 text-[13px] text-slate-600">
            <div className="flex min-w-0 items-center gap-1.5">
              <svg
                className="h-3.5 w-3.5 shrink-0 text-slate-500"
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

              <span className="truncate font-medium">
                {job.workLocation || "Toàn quốc"}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 text-slate-500">
              <svg
                className="h-3.5 w-3.5 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>

              <span>
                <span className="font-semibold text-slate-700">
                  {job.viewCount || 0}
                </span>{" "}
                lượt xem
              </span>
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between gap-3 text-[13px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <svg
                className="h-3.5 w-3.5 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3M5 11h14M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>

              <span className="text-black-800 font-semibold">
                Bắt đầu: {formatDate(job.startDay)}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg
                className="h-3.5 w-3.5 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span className="text-red-500 font-bold">
                Hạn: {formatDate(job.endDay)}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate(`/job/${job.id}`)}
            className="w-full rounded-lg border border-blue-500 bg-white py-2 text-[13px] font-bold text-blue-600 transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white active:scale-[0.98]"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
