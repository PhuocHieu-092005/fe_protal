import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Download, User, ChevronRight } from "lucide-react";

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
    <div className="flex h-[390px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md">
      {/* Ảnh */}
      <div className="relative h-[150px] w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={project.title || "Đồ án"}
          className="h-full w-full object-cover"
        />

        <span
          className={`absolute right-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-bold uppercase text-white ${
            isFree ? "bg-emerald-500" : "bg-blue-600"
          }`}
        >
          {isFree ? "Miễn phí" : "Có phí"}
        </span>
      </div>

      {/* Nội dung */}
      <div className="flex flex-1 flex-col p-4">
        {/* Công nghệ */}
        <div className="mb-2 flex flex-wrap gap-1.5">
          {(project.technologies || project.techStack || [])
            .slice(0, 3)
            .map((tech) => (
              <span
                key={`${project.id}-${tech.id || tech.name || tech}`}
                className="rounded-md bg-blue-50 px-2.5 py-1 text-[12px] font-semibold text-blue-600"
              >
                {tech.name || tech}
              </span>
            ))}
        </div>

        {/* Tiêu đề */}
        <h3 className="line-clamp-2 min-h-[48px] text-[16px] font-bold leading-6 text-slate-900">
          {project.title || "Chưa cập nhật tiêu đề"}
        </h3>

        {/* Tác giả */}
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <User size={15} />
          <span>
            Tác giả:{" "}
            <span className="font-bold text-slate-800">
              {project.student_name || "Chưa cập nhật"}
            </span>
          </span>
        </div>

        {/* View / download / giá */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <Eye size={15} />
              <span>{project.view_count || 0}</span>
            </div>

            <div className="flex items-center gap-1">
              <Download size={15} />
              <span>{project.download_count || 0}</span>
            </div>
          </div>

          <div className="text-[18px] font-bold text-blue-600">{priceText}</div>
        </div>

        {/* Đẩy button xuống dưới */}
        <div className="mt-auto pt-4">
          <button
            onClick={() => navigate(`/project/${project.id}`)}
            className="group relative flex w-full items-center justify-between overflow-hidden rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 active:scale-[0.99]"
          >
            <span className="absolute inset-y-0 left-0 w-0 bg-slate-900 transition-all duration-300 group-hover:w-full"></span>

            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Xem chi tiết đồ án
            </span>

            <ChevronRight
              size={18}
              strokeWidth={2.3}
              className="relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
