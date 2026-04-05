import React from "react";
import { Eye, Download, User } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:shadow-xl hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-slate-100">
        <img
          src={
            project.images?.[0]?.imageUrl ||
            "https://via.placeholder.com/400x250?text=Project+Thumbnail"
          }
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-bold shadow-sm ${
              project.price_type === "FREE"
                ? "bg-emerald-500 text-white"
                : "bg-amber-500 text-white"
            }`}
          >
            {project.price_type === "FREE" ? "MIỄN PHÍ" : "CÓ PHÍ"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 flex-grow">
        <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <User size={14} className="text-blue-600" />
          <span className="font-medium">
            {project.student_name || "Sinh viên ẩn danh"}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies?.map((tech) => (
            <span
              key={tech.id}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase"
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-50 pt-4">
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Eye size={14} /> {project.view_count || 0}
          </span>
          <span className="flex items-center gap-1">
            <Download size={14} /> {project.download_count || 0}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-blue-600">
            {project.price_type === "FREE"
              ? "0đ"
              : `${project.price_download?.toLocaleString()}đ`}
          </p>
        </div>
      </div>

      <button className="mt-4 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white transition hover:bg-blue-600">
        Xem chi tiết đồ án
      </button>
    </div>
  );
}
