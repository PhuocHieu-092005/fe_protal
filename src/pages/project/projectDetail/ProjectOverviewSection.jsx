import React from "react";
import { Download, Eye } from "lucide-react";

export default function ProjectOverviewSection({
  courseName,
  projectTitle,
  description,
  viewCount,
  downloadCount,
  isPaidProject,
  priceDownload,
  imageList,
  selectedImage,
  onSelectImage,
}) {
  return (
    <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm md:p-10">
      <span className="mb-6 inline-flex rounded-full bg-blue-50 px-4 py-1 text-[10px] font-black uppercase tracking-wider text-blue-600">
        {courseName}
      </span>

      <h1 className="mb-5 text-3xl font-black leading-tight text-slate-900 md:text-5xl">
        {projectTitle}
      </h1>

      <p className="mb-8 text-base leading-relaxed text-slate-600 md:text-lg">
        {description || "Chưa có mô tả cho đồ án này."}
      </p>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
          <p className="text-xs text-slate-500">Lượt xem</p>
          <p className="mt-1 flex items-center gap-2 font-bold text-slate-800">
            <Eye size={16} />
            {viewCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
          <p className="text-xs text-slate-500">Lượt tải</p>
          <p className="mt-1 flex items-center gap-2 font-bold text-slate-800">
            <Download size={16} />
            {downloadCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
          <p className="text-xs text-slate-500">Hình thức</p>
          <p className="mt-1 font-bold text-slate-800">
            {isPaidProject ? "Bán code" : "Miễn phí"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
          <p className="text-xs text-slate-500">Giá</p>
          <p className="mt-1 font-bold text-slate-800">
            {isPaidProject
              ? `${Number(priceDownload).toLocaleString("vi-VN")} VNĐ`
              : "0 VNĐ"}
          </p>
        </div>
      </div>

      {imageList.length > 0 && (
        <div className="space-y-5">
          <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50">
            <img
              src={selectedImage || imageList[0]?.url}
              alt={projectTitle}
              className="h-[320px] w-full object-cover md:h-[480px]"
            />
          </div>

          {imageList.length > 1 && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {imageList.map((img) => {
                const isActive = (selectedImage || imageList[0]?.url) === img.url;

                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => onSelectImage(img.url)}
                    className={`overflow-hidden rounded-2xl border-2 transition-all ${
                      isActive
                        ? "border-blue-500 ring-2 ring-blue-100"
                        : "border-transparent hover:border-slate-200"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt="preview"
                      className="h-24 w-full object-cover md:h-28"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
