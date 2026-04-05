import React from "react";
import { Search } from "lucide-react";

export default function ProjectHero({ keyword, onKeywordChange, onSearch }) {
  return (
    <section className="w-full pt-6">
      <div className="w-full">
        <div className="relative w-full overflow-hidden bg-[#0f172a] px-6 py-20 shadow-2xl md:px-12 lg:px-16">
          <div className="relative z-10 max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-sm">
              <span className="h-4 w-4">📁</span>
              Kho lưu trữ đồ án sinh viên IT
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-[1.15] text-white md:text-5xl lg:text-6xl">
              KHÁM PHÁ <span className="text-blue-500">ĐỒ ÁN</span>
              <br />
              CHẤT LƯỢNG CAO
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Nơi tổng hợp các dự án, đồ án tốt nghiệp xuất sắc từ sinh viên
              Khoa CNTT.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch();
            }}
            className="relative z-10 mx-auto mt-12 flex w-full max-w-3xl items-center gap-2 rounded-2xl bg-white p-2 shadow-xl"
          >
            <div className="flex flex-1 items-center px-4">
              <Search className="mr-2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Tìm tên đồ án, công nghệ (React, Java...)"
                className="w-full border-none bg-transparent text-sm text-slate-700 outline-none focus:outline-none focus:ring-0"
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-black px-8 py-3 text-sm font-bold text-white transition-all hover:bg-slate-900"
            >
              Tìm kiếm
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
