import React from "react";
import { Download, Eye, ImageIcon, Tag } from "lucide-react";

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
  const mainImage = selectedImage || imageList?.[0]?.url;

  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
          <Tag size={14} />
          {courseName}
        </span>

        <h1 className="mt-4 text-3xl font-black leading-tight text-slate-950 md:text-4xl">
          {projectTitle}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
          {description || "Chưa có mô tả cho đồ án này."}
        </p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Eye size={18} />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">Lượt xem</p>
              <p className="mt-1 text-lg font-black text-slate-950">
                {viewCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Download size={18} />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">Lượt tải</p>
              <p className="mt-1 text-lg font-black text-slate-950">
                {downloadCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Tag size={18} />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">Hình thức</p>
              <p className="mt-1 text-lg font-black text-slate-950">
                {isPaidProject ? "Bán code" : "Miễn phí"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Tag size={18} />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">Giá</p>
              <p className="mt-1 text-lg font-black text-slate-950">
                {isPaidProject
                  ? `${Number(priceDownload).toLocaleString("vi-VN")} VNĐ`
                  : "0 VNĐ"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {imageList.length > 0 ? (
        <div>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <img
              src={mainImage}
              alt={projectTitle}
              className="h-[360px] w-full object-cover md:h-[430px]"
            />
          </div>

          {imageList.length > 1 && (
            <div className="mt-3 grid grid-cols-3 gap-3 md:grid-cols-6">
              {imageList.map((img) => {
                const isActive = mainImage === img.url;

                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => onSelectImage(img.url)}
                    className={`overflow-hidden rounded-lg border bg-white p-1 transition-all ${
                      isActive
                        ? "border-blue-600 ring-2 ring-blue-100"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt="preview"
                      className="h-16 w-full rounded-md object-cover md:h-20"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-[360px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
          <div className="text-center">
            <ImageIcon className="mx-auto mb-3" size={42} />
            <p className="text-sm font-semibold">Chưa có hình ảnh đồ án</p>
          </div>
        </div>
      )}
    </section>
  );
}
