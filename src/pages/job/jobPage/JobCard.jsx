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
    <div className="group h-fit w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={job.companyLogo}
            alt={job.companyName || "Logo công ty"}
            className="h-14 w-14 flex-shrink-0 rounded-2xl border border-slate-100 object-cover p-2"
          />

          <div className="min-w-0">
            <p className="truncate text-sm text-slate-500">
              {job.companyName || job.company || "Chưa cập nhật công ty"}
            </p>

            <h3 className="mt-1 line-clamp-1 text-lg font-semibold text-slate-900">
              {job.title || "Chưa cập nhật tiêu đề"}
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600">
        <span className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5">
          {job.workLocation || "Chưa cập nhật"}
        </span>

        <span className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5">
          {job.jobType || "Chưa cập nhật"}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-lg font-bold text-slate-900">
          {formatSalary(job.salary)}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Đăng {formatDate(job.startDay)}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {job.tags && job.tags.length > 0 ? (
          job.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500">
            Chưa có kỹ năng
          </span>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Link
          to={`/job/${job.id}`}
          className="flex-1 rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}
