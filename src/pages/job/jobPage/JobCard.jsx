import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Chưa cập nhật";
    }

    return date.toLocaleDateString("vi-VN");
  };

  const formatSalary = (salary) => {
    if (!salary) return "Thỏa thuận";

    return `${Number(salary).toLocaleString("vi-VN")} VNĐ`;
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-blue-500 hover:shadow-md">
      <div className="flex gap-3">
        <div className="w-16 flex-shrink-0">
          <img
            src={job.companyLogo}
            alt={job.companyName || "Logo công ty"}
            className="h-16 w-16 rounded-lg border border-slate-200 object-cover p-1.5"
          />

          <p className="mt-2 line-clamp-2 text-center text-[11px] font-bold leading-4 text-slate-700">
            {job.workLocation || "Chưa cập nhật"}
          </p>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-[15px] font-bold leading-5 text-slate-950">
              {job.title || "Chưa cập nhật tiêu đề"}
            </h3>

            <span className="shrink-0 whitespace-nowrap text-xs text-slate-500">
              {formatDate(job.startDay)}
            </span>
          </div>

          <p className="mt-1 truncate text-xs font-semibold uppercase text-slate-500">
            {job.companyName || job.company || "Chưa cập nhật công ty"}
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-900">
              {formatSalary(job.salary)}
            </span>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
              {job.jobType || "Chưa cập nhật"}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {job.tags && job.tags.length > 0 ? (
                job.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-blue-100 bg-white px-2.5 py-0.5 text-xs font-semibold text-blue-600"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs text-slate-500">
                  Chưa có kỹ năng
                </span>
              )}
            </div>

            <Link
              to={`/job/${job.id}`}
              className="shrink-0 text-sm font-bold text-slate-950 hover:text-blue-600"
            >
              Chi tiết →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
