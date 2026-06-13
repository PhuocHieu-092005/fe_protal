import React from "react";
import { FolderOpen } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=80",
];

export default function ProjectHero({ keyword, onKeywordChange, onSearch }) {
  return (
    <section className="relative overflow-hidden">
      <style>
        {`
          @keyframes projectHeroFade {
            0%, 30% { opacity: 1; transform: scale(1); }
            36%, 94% { opacity: 0; transform: scale(1.04); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>

      {heroImages.map((image, index) => (
        <div
          key={image}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
            animation: "projectHeroFade 18s ease-in-out infinite",
            animationDelay: `${index * 6}s`,
            filter: "brightness(0.72) saturate(0.95)",
            opacity: index === 0 ? 1 : 0,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-slate-950/58" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.42),rgba(2,6,23,0.78))]" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-32">
        <div className="mx-auto max-w-4xl text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur md:px-4 md:text-sm">
            <FolderOpen className="h-4 w-4 text-sky-300" />
            Kho lưu trữ đồ án sinh viên IT
          </span>

          <h1 className="mt-5 text-3xl font-bold leading-tight md:mt-6 md:text-6xl">
            Khám phá đồ án chất lượng cao từ sinh viên Khoa CNTT
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 md:mt-5 md:text-lg">
            Tìm kiếm dự án tốt nghiệp, sản phẩm thực chiến và công nghệ phù hợp
            để tham khảo ý tưởng, học hỏi cách triển khai hoặc kết nối hợp tác.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch();
            }}
            className="mt-6 flex w-full justify-center md:mt-10"
          >
            <div className="flex w-full max-w-4xl items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-2 shadow-md transition-all duration-300 hover:border-sky-300 hover:ring-2 hover:ring-sky-300/40 hover:shadow-xl sm:px-3">
              <div className="flex min-w-0 flex-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 shrink-0 text-slate-400 sm:h-5 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>

                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => onKeywordChange(e.target.value)}
                  placeholder="Tìm tên đồ án..."
                  className="min-w-0 flex-1 bg-transparent px-2 py-2 text-xs text-slate-700 outline-none placeholder:text-slate-400 sm:px-3 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="shrink-0 whitespace-nowrap rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-600 sm:px-8 sm:py-2.5 sm:text-sm"
              >
                Tìm kiếm
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
