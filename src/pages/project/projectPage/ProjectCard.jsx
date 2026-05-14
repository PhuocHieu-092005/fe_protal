import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Download, User } from "lucide-react";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  const imageUrl =
    project.images?.[0]?.imageUrl ||
    project.images?.[0]?.image_url ||
    "https://via.placeholder.com/400x225";

  const isFree = project.price_type === "FREE";

  const priceText = isFree
    ? "0đ"
    : `${Number(project.price_download || 0).toLocaleString("vi-VN")}đ`;

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl">
      {" "}
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={project.title || "Đồ án"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3">
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-black uppercase text-white ${
              isFree ? "bg-emerald-500" : "bg-blue-600"
            }`}
          >
            {isFree ? "Miễn phí" : "Có phí"}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-4 text-left">
        <h3 className="line-clamp-2 min-h-[48px] text-[17px] font-black leading-6 text-slate-900">
          {project.title || "Chưa cập nhật tiêu đề"}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <User size={15} />
          <span className="truncate font-medium">
            {project.student_name || "Chưa cập nhật"}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Eye size={15} />
              {project.view_count || 0}
            </div>

            <div className="flex items-center gap-1">
              <Download size={15} />
              {project.download_count || 0}
            </div>
          </div>

          <div className="text-lg font-black text-blue-600">{priceText}</div>
        </div>

        <button
          onClick={() => navigate(`/project/${project.id}`)}
          className="mt-4 w-full rounded-xl bg-zinc-900 px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-blue-600"
        >
          Xem chi tiết đồ án
        </button>
      </div>
    </div>
  );
}
