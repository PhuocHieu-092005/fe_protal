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
    <div className="flex h-auto min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md md:h-[430px]">
      {/* Ảnh */}
      <div className="relative h-[105px] w-full shrink-0 overflow-hidden bg-slate-100 md:h-[185px]">
        <img
          src={imageUrl}
          alt={project.title || "Dự án"}
          className="h-full w-full object-cover"
        />

        <span
          className={`absolute right-1.5 top-1.5 rounded-md px-1.5 py-0.5 text-[7px] font-bold uppercase text-white md:right-3 md:top-3 md:px-2.5 md:py-1 md:text-[11px] ${
            isFree ? "bg-emerald-500" : "bg-blue-600"
          }`}
        >
          {isFree ? "Miễn phí" : "Có phí"}
        </span>
      </div>

      {/* Nội dung */}
      <div className="flex min-h-0 flex-col p-2 md:flex-1 md:p-4">
        {/* Công nghệ */}
        <div className="mb-2 flex h-[18px] flex-nowrap items-center gap-1 overflow-hidden md:mb-3 md:h-[34px] md:gap-1.5">
          {visibleTechList.map((tech) => (
            <span
              key={`${project.id}-${tech.id || tech.name || tech}`}
              className="max-w-[42%] shrink-0 truncate rounded-md bg-blue-50 px-1.5 py-0.5 text-[7px] font-semibold text-blue-600 md:max-w-none md:px-2.5 md:py-1 md:text-[12px]"
            >
              {tech.name || tech}
            </span>
          ))}

          {hiddenTechCount > 0 && (
            <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[7px] font-semibold text-slate-500 md:px-2.5 md:py-1 md:text-[12px]">
              +{hiddenTechCount}
            </span>
          )}
        </div>

        {/* Tiêu đề */}
        <h3 className="line-clamp-2 h-[32px] overflow-hidden text-[12px] font-bold leading-4 text-slate-900 md:h-auto md:min-h-[48px] md:text-[16px] md:leading-6">
          {project.title || "Chưa cập nhật tiêu đề"}
        </h3>

        {/* Tác giả */}
        <div className="mt-1 flex min-w-0 items-center gap-1 text-[8px] text-slate-500 md:mt-2 md:gap-2 md:text-sm">
          <User size={11} className="shrink-0 md:h-[15px] md:w-[15px]" />

          <span className="truncate">
            Tác giả:{" "}
            <span className="font-bold text-slate-800">
              {project.student_name || "Chưa cập nhật"}
            </span>
          </span>
        </div>

        {/* View / download / giá */}
        <div className="mt-2 flex items-center justify-between gap-1 md:mt-4">
          <div className="flex min-w-0 items-center gap-2 text-[8px] text-slate-500 md:gap-4 md:text-sm">
            <div className="flex items-center gap-0.5 md:gap-1">
              <Eye size={11} className="shrink-0 md:h-[15px] md:w-[15px]" />
              <span>{project.view_count || 0}</span>
            </div>

            <div className="flex items-center gap-0.5 md:gap-1">
              <Download
                size={11}
                className="shrink-0 md:h-[15px] md:w-[15px]"
              />
              <span>{project.download_count || 0}</span>
            </div>
          </div>

          <div className="max-w-[62px] truncate text-right text-[11px] font-bold text-blue-600 md:max-w-none md:text-[18px]">
            {priceText}
          </div>
        </div>

        {/* Nút mobile */}
        <button
          onClick={() => navigate(`/project/${project.id}`)}
          className="group mt-2 flex h-7 w-full items-center justify-center gap-1 whitespace-nowrap rounded-md border border-slate-300 bg-white px-2 text-[8px] font-semibold leading-none text-slate-900 transition-all duration-200 hover:border-blue-500 hover:text-blue-600 active:scale-[0.99] md:hidden"
        >
          <span>Xem chi tiết</span>

          <ChevronRight
            size={12}
            strokeWidth={2.3}
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>

        {/* Nút desktop/laptop giữ nguyên */}
        <button
          onClick={() => navigate(`/project/${project.id}`)}
          className="group mt-auto hidden w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-all duration-200 hover:border-blue-500 hover:text-blue-600 active:scale-[0.99] md:flex"
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
