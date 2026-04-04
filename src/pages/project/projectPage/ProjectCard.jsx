import React from "react";
import { Eye, Users } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:shadow-2xl hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="h-14 w-14 rounded-xl bg-slate-50 p-2 border border-slate-100 flex items-center justify-center">
          <img
            src={
              project.thumbnail ||
              "https://cdn-icons-png.flaticon.com/512/1087/1087815.png"
            }
            alt="logo"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-600 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
          Đang tuyển
        </span>
      </div>

      <div className="mt-5 flex-grow">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          FPT SOFTWARE
        </p>
        <h3 className="mt-1 line-clamp-1 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {project.title || "Project Title"}
        </h3>
        <p className="mt-1 text-base font-bold text-blue-600">
          {project.price_type === "PAID" ? "5 - 8 Triệu" : "Miễn phí"}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {project.description || "Mô tả đồ án công nghệ thông tin chi tiết..."}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500 uppercase">
            React
          </span>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500 uppercase">
            NodeJS
          </span>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-50 pt-4">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye size={14} /> {project.view_count || 0}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} /> {project.download_count || 0} ứng viên
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Bắt đầu: 20/03/2026</span>
          <span className="font-bold text-red-500">Hạn nộp: 15/04/2026</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button className="rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            Chi tiết
          </button>
          <button className="rounded-xl bg-black py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 shadow-lg shadow-black/10">
            Ứng tuyển
          </button>
        </div>
      </div>
    </div>
  );
}
