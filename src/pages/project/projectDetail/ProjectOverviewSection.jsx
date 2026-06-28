import React, { useRef } from "react";
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

  // RESPONSIVE UI: lưu vị trí chạm để mobile vuốt ảnh chính qua trái/phải
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // RESPONSIVE UI: đổi ảnh chính khi vuốt trên mobile
  const handleTouchStart = (event) => {
    touchStartXRef.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndXRef.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!imageList || imageList.length <= 1) return;

    const swipeDistance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45;

    if (Math.abs(swipeDistance) < minSwipeDistance) return;

    const currentIndex = imageList.findIndex((img) => img.url === mainImage);
    const safeCurrentIndex = currentIndex === -1 ? 0 : currentIndex;

    if (swipeDistance > 0) {
      const nextIndex =
        safeCurrentIndex === imageList.length - 1 ? 0 : safeCurrentIndex + 1;
      onSelectImage(imageList[nextIndex].url);
    } else {
      const prevIndex =
        safeCurrentIndex === 0 ? imageList.length - 1 : safeCurrentIndex - 1;
      onSelectImage(imageList[prevIndex].url);
    }

    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
  };

  return (
    // RESPONSIVE UI: mobile bo góc + padding nhỏ, desktop vẫn rộng
    <section className="rounded-[1.65rem] border border-slate-200 bg-white p-3 shadow-sm md:rounded-[1.4rem] md:p-3.5">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
          <Tag size={14} />
          {courseName}
        </span>

        <h1 className="mt-4 break-words text-2xl font-black leading-tight text-slate-950 sm:text-3xl md:text-4xl">
          {projectTitle}
        </h1>

        <p className="mt-3 break-words text-sm leading-6 text-slate-600 md:text-base">
          {description || "Chưa có mô tả cho Dự án này."}
        </p>
      </div>

      {/* RESPONSIVE UI: mobile 2 cột gọn, desktop 4 cột */}
      <div className="my-4 grid grid-cols-2 gap-3 md:mb-3 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Eye size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-500">Lượt xem</p>
              <p className="mt-1 text-lg font-black text-slate-950">
                {viewCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Download size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-500">Lượt tải</p>
              <p className="mt-1 text-lg font-black text-slate-950">
                {downloadCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Tag size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-500">Hình thức</p>
              <p className="mt-1 truncate text-base font-black text-slate-950 sm:text-lg">
                {isPaidProject ? "Bán code" : "Miễn phí"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Tag size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-500">Giá</p>
              <p className="mt-1 truncate text-base font-black text-slate-950 sm:text-lg">
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
          {/* RESPONSIVE UI: ảnh chính mobile có thể vuốt trái/phải để đổi ảnh */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative touch-pan-y overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 md:rounded-xl"
          >
            <img
              src={mainImage}
              alt={projectTitle}
              draggable={false}
              className="aspect-[4/3] w-full select-none object-cover sm:aspect-video md:h-[430px] md:aspect-auto"
            />

            {/* RESPONSIVE UI: chấm chỉ số ảnh trên mobile */}
            {imageList.length > 1 && (
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/35 px-3 py-1.5 backdrop-blur-sm md:hidden">
                {imageList.map((img) => {
                  const isActive = mainImage === img.url;

                  return (
                    <span
                      key={img.id}
                      className={`h-1.5 rounded-full transition-all ${
                        isActive ? "w-4 bg-white" : "w-1.5 bg-white/60"
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {imageList.length > 1 && (
            /*
              RESPONSIVE UI:
              - Mobile dùng overflow-x-auto để người dùng kéo ngang thumbnail bằng tay.
              - Desktop giữ dạng grid.
            */
            <div className="-mx-1 mt-3 flex snap-x gap-3 overflow-x-auto px-1 pb-2 md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0 md:pb-0">
              {imageList.map((img) => {
                const isActive = mainImage === img.url;

                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => onSelectImage(img.url)}
                    className={`w-24 shrink-0 snap-start overflow-hidden rounded-xl border bg-white p-1 transition-all md:w-auto md:rounded-lg ${
                      isActive
                        ? "border-blue-600 ring-2 ring-blue-100"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt="preview"
                      className="h-16 w-full rounded-lg object-cover md:h-20 md:rounded-md"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400 md:h-[360px] md:aspect-auto md:rounded-xl">
          <div className="text-center">
            <ImageIcon className="mx-auto mb-3" size={42} />
            <p className="text-sm font-semibold">Chưa có hình ảnh Dự án</p>
          </div>
        </div>
      )}
    </section>
  );
}
