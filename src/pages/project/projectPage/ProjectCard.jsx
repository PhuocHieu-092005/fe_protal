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

  const techList = project.technologies || project.techStack || [];
  const visibleTechList = techList.slice(0, 2);
  const hiddenTechCount = Math.max(techList.length - 2, 0);

  return (
    <div className="flex h-[430px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md">
      {/* Ảnh */}
      <div className="relative h-[185px] w-full shrink-0 overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={project.title || "Dự án"}
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
        {/* Công nghệ - ngoài card chỉ hiện 2 công nghệ + số còn lại */}
        <div className="mb-3 flex h-[34px] flex-nowrap items-center gap-1.5 overflow-hidden">
          {visibleTechList.map((tech) => (
            <span
              key={`${project.id}-${tech.id || tech.name || tech}`}
              className="shrink-0 rounded-md bg-blue-50 px-2.5 py-1 text-[12px] font-semibold text-blue-600"
            >
              {tech.name || tech}
            </span>
          ))}

          {hiddenTechCount > 0 && (
            <span className="shrink-0 rounded-md bg-slate-100 px-2.5 py-1 text-[12px] font-semibold text-slate-500">
              +{hiddenTechCount}
            </span>
          )}
        </div>
        {/* Tiêu đề */}
        <h3 className="line-clamp-2 min-h-[48px] text-[16px] font-bold leading-6 text-slate-900">
          {project.title || "Chưa cập nhật tiêu đề"}
        </h3>
        {/* Tác giả */}
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <User size={15} className="shrink-0" />
          <span className="line-clamp-1">
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
        <button
          onClick={() => navigate(`/project/${project.id}`)}
          className="group flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-all duration-200 hover:border-blue-500 hover:text-blue-600 active:scale-[0.99]"
        >
          <span>Xem chi tiết Dự án</span>

          <ChevronRight
            size={18}
            strokeWidth={2.3}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}
