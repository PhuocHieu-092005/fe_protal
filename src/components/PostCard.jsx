import React from "react";

export default function PostCard({ job }) {
  const shortDesc =
    job.description?.length > 60
      ? job.description.substring(0, 60) + "..."
      : job.description;

  return (
    <div className="group bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[360px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-14 h-14 rounded-md border border-slate-100 flex items-center justify-center p-1">
          <img
            src={job.logo}
            alt={job.company}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-[11px] font-semibold text-slate-500 uppercase truncate">
            {job.company}
          </h4>

          {/* FIX badge */}
          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium bg-emerald-50 px-2 py-[2px] rounded mt-1 w-fit">
            <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
            Đang tuyển
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1">
        <h3 className="text-[14px] font-semibold text-slate-900 leading-tight line-clamp-2 mb-1">
          {job.title}
        </h3>

        <p className="text-[13px] font-semibold text-blue-600 mb-1">
          {job.salary}
        </p>

        <p className="text-[11px] text-slate-500 italic mb-2 line-clamp-2">
          {shortDesc}
        </p>

        <div className="flex flex-wrap gap-1">
          {job.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-[2px] bg-slate-50 text-slate-500 text-[10px] rounded border border-slate-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-[11px] text-slate-500 py-2 border-t mt-2">
        <span>👁 {job.view_count.toLocaleString()}</span>
        <span>👤 {job.applied_count} ứng viên</span>
      </div>

      {/* Time */}
      <div className="flex justify-between text-[10px] mt-1">
        <span className="text-slate-400">Bắt đầu: {job.start_day}</span>
        <span className="text-rose-500">Hạn nộp: {job.end_day}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-2">
        <button className="flex-1 py-1.5 text-[11px] font-medium border border-slate-200 rounded-lg hover:bg-slate-50">
          Chi tiết
        </button>
        <button className="flex-1 py-1.5 text-[11px] font-medium bg-black text-white border border-black rounded-lg hover:bg-white hover:text-black transition-all duration-200">
          Ứng tuyển
        </button>
      </div>
    </div>
  );
}
