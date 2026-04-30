import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ job }) {
  const navigate = useNavigate();

  const shortDesc =
    job.description?.length > 90
      ? job.description.substring(0, 90) + "..."
      : job.description;

  const formatDate = (dateString) => {
    if (!dateString) return "---";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    /* GIỮ LẠI: Hiệu ứng nổi lên (-translate-y-1.5) và bóng đổ (shadow-xl) cho chuyên nghiệp */
    <div className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full min-h-[420px] relative cursor-pointer">
      {/* Header: Logo & Company Name */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl border border-slate-100 flex items-center justify-center p-2 bg-slate-50 shrink-0 shadow-inner group-hover:border-slate-200 transition-colors">
          <img
            src={job.companyLogo}
            alt={job.companyName}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider truncate mb-1">
            {job.companyName}
          </h4>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            ĐANG TUYỂN
          </span>
        </div>
      </div>

      {/* Body: Title & Salary */}
      <div className="flex-1 flex flex-col">
        {/* FIX: Đã loại bỏ class đổi màu chữ. Tiêu đề sẽ luôn là màu slate-800 */}
        <h3 className="text-lg font-bold text-slate-800 leading-snug line-clamp-2 mb-2">
          {job.title}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <span className="text-lg font-extrabold text-blue-600">
            {job.salary ? `${job.salary.toLocaleString()} VNĐ` : "Thỏa thuận"}
          </span>
        </div>

        <p className="text-[14px] text-slate-500 mb-4 line-clamp-3 leading-relaxed">
          {job.description !== "undefined" && job.description
            ? shortDesc
            : "Chưa có mô tả chi tiết cho vị trí này..."}
        </p>

        {/* Tags: Giữ màu xám trung tính, không đổi màu xanh */}
        <div className="flex flex-wrap gap-2 mt-auto mb-4">
          {job.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg border border-slate-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Info: Location & Views */}
      <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-600 mb-3">
        <div className="flex items-center gap-1.5 font-medium">
          <svg
            className="w-4 h-4 text-slate-400"
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
          {job.workLocation || "Toàn quốc"}
        </div>
        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-md text-xs text-slate-500">
          <span className="font-bold text-slate-700">{job.viewCount || 0}</span>{" "}
          lượt xem
        </div>
      </div>

      {/* Time */}
      <div className="flex justify-between items-center text-[12px] mb-4">
        <span className="text-slate-400 italic">
          Bắt đầu: {formatDate(job.startDay)}
        </span>
        <span className="text-rose-600 font-bold bg-rose-50 px-2 py-1 rounded">
          Hạn: {formatDate(job.endDay)}
        </span>
      </div>

      {/* Action: Nút bấm vẫn nên có hiệu ứng đổi màu để người dùng biết chỗ này click được */}
      <button
        onClick={() => navigate(`/job/${job.id}`)}
        className="w-full py-3 text-sm font-bold bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 shadow-md active:scale-[0.98]"
      >
        Xem chi tiết công việc
      </button>
    </div>
  );
}
