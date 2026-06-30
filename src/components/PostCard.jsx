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
    <div className="group flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md md:min-h-[285px] md:rounded-2xl md:p-4">
      {/* Header công ty */}
      <div className="mb-2 flex min-h-[44px] items-start justify-between gap-1 md:mb-4 md:min-h-[68px] md:gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-1.5 md:gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white p-0.5 shadow-sm md:h-14 md:w-14 md:rounded-xl md:p-1">
            <img
              src={
                job.companyLogo ||
                "https://cdn-icons-png.flaticon.com/512/4091/4091968.png"
              }
              alt={job.companyName || "Logo công ty"}
              className="h-full w-full rounded-md object-contain md:rounded-lg"
              onError={(e) => {
                e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/4091/4091968.png";
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="h-3 truncate text-[9px] font-bold uppercase leading-3 tracking-normal text-slate-600 md:h-[18px] md:max-w-[150px] md:text-[12px] md:leading-[18px] md:tracking-wide">
              {job.companyName || "Chưa cập nhật công ty"}
            </p>

            <p className="mt-0.5 flex h-3 items-center gap-1 truncate text-[8px] leading-3 text-slate-400 md:h-4 md:text-[11px] md:leading-4">
              <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300"></span>

              <span className="truncate">
                {job.workLocation || "Toàn quốc"}
              </span>
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-md border border-emerald-100 bg-emerald-50 px-1 py-0.5 text-[7px] font-bold uppercase leading-tight text-emerald-600 md:rounded-lg md:px-2.5 md:py-1 md:text-[10px]">
          Đang tuyển
        </span>
      </div>

      {/* Nội dung chính */}
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Tên công việc: luôn dành sẵn 2 dòng */}
        <h3 className="mb-1 h-[30px] overflow-hidden text-[12px] font-bold leading-[15px] text-slate-900 line-clamp-2 md:mb-1.5 md:h-[44px] md:text-[16px] md:leading-[22px]">
          {job.title || "Chưa cập nhật tiêu đề"}
        </h3>

        {/* Lương: luôn cố định một dòng */}
        <p className="mb-1.5 h-[18px] truncate text-[14px] font-extrabold leading-[18px] text-blue-600 md:mb-2 md:h-[25px] md:text-[18px] md:leading-[25px]">
          {formatSalary(job.salary)}
        </p>

        {/* Mô tả: mobile 3 dòng, desktop 2 dòng */}
        <p className="mb-2 h-[42px] overflow-hidden text-[9px] leading-[14px] text-slate-500 line-clamp-3 md:mb-3 md:h-[40px] md:text-[13px] md:leading-5 md:line-clamp-2">
          {job.description !== "undefined" && job.description
            ? shortDesc
            : "Chưa có mô tả chi tiết..."}
        </p>

        {/* Tags: cố định một hàng */}
        <div className="mb-2 flex h-[18px] flex-nowrap gap-1 overflow-hidden md:mb-3 md:h-[24px] md:gap-1.5">
          {job.tags && job.tags.length > 0 ? (
            job.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="max-w-[48%] shrink-0 truncate rounded-md bg-blue-50 px-1.5 py-0.5 text-[8px] font-semibold leading-tight text-blue-600 md:rounded-lg md:px-2.5 md:text-[11px]"
              >
                #{tag}
              </span>
            ))
          ) : (
            <span className="max-w-full truncate rounded-md bg-slate-100 px-1.5 py-0.5 text-[8px] font-semibold leading-tight text-slate-500 md:rounded-lg md:px-2.5 md:text-[11px]">
              Chưa có kỹ năng
            </span>
          )}
        </div>

        {/* Thông tin phụ */}
        <div className="mt-auto border-t border-slate-200 pt-2 md:pt-3">
          <div className="mb-1.5 grid grid-cols-2 items-center gap-1 text-[8px] text-slate-600 md:mb-2.5 md:flex md:justify-between md:gap-3 md:text-[13px]">
            <div className="flex min-w-0 items-center gap-1 md:gap-1.5">
              <svg
                className="h-3 w-3 shrink-0 text-slate-500 md:h-3.5 md:w-3.5"
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

            <div className="flex min-w-0 items-center justify-end gap-1 text-slate-500 md:shrink-0 md:gap-1.5">
              <svg
                className="h-3 w-3 shrink-0 text-slate-500 md:h-3.5 md:w-3.5"
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

              <span className="truncate">
                <span className="font-semibold text-slate-700">
                  {job.viewCount || 0}
                </span>{" "}
                lượt xem
              </span>
            </div>
          </div>

          <div className="mb-2 grid grid-cols-2 items-center gap-1 text-[8px] text-slate-600 md:mb-3 md:flex md:justify-between md:gap-3 md:text-[13px]">
            <div className="flex min-w-0 items-center gap-1 md:gap-1.5">
              <svg
                className="h-3 w-3 shrink-0 text-slate-500 md:h-3.5 md:w-3.5"
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

              <span className="truncate font-semibold text-slate-800">
                Bắt đầu: {formatDate(job.startDay)}
              </span>
            </div>

            <div className="flex min-w-0 items-center justify-end gap-1 md:gap-1.5">
              <svg
                className="h-3 w-3 shrink-0 text-slate-500 md:h-3.5 md:w-3.5"
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

              <span className="truncate font-bold text-red-500">
                Hạn: {formatDate(job.endDay)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/job/${job.id}`)}
            className="w-full rounded-md border border-blue-500 bg-white py-1.5 text-[10px] font-bold text-blue-600 transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white active:scale-[0.98] md:rounded-lg md:py-2 md:text-[13px]"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
