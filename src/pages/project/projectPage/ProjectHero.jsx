import React from "react";
import { Search, FolderKanban, MapPin } from "lucide-react";

export default function ProjectHero({ keyword, onKeywordChange, onSearch }) {
  return (
    <section className="w-full px-6 lg:px-8 pt-24">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-sky-100 via-indigo-50 to-cyan-100 px-8 py-12 shadow-sm ring-1 ring-slate-200/80 md:px-12 md:py-16 xl:px-16 xl:py-20">
        {/* Các vòng tròn mờ nghệ thuật của bạn */}
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="relative grid grid-cols-1 items-center gap-12 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
              <FolderKanban size={16} className="text-blue-600" />
              Kho đồ án sinh viên IT
            </div>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl xl:text-6xl uppercase">
              Cổng thông tin{" "}
              <span className="block text-blue-600">việc làm</span>
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Nền tảng đáng tin cậy để tìm kiếm nhân tài hàng đầu và cơ hội nghề
              nghiệp nhanh chóng.
            </p>
          </div>

          {/* Phần Mockup trình duyệt bên phải bạn muốn giữ */}
          <div className="relative hidden xl:block">
            <div className="relative ml-auto w-full max-w-[620px]">
              <div className="rounded-[32px] border border-white/60 bg-white/65 p-5 shadow-xl backdrop-blur">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="rounded-[28px] bg-white p-5 shadow-sm">
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                      <h3 className="font-bold text-slate-800">
                        Website tuyển dụng sinh viên
                      </h3>
                      <p className="text-xs text-blue-600 font-bold mt-1">
                        5 - 8 Triệu
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                      <h3 className="font-bold text-slate-800">
                        Hệ thống quản lý đồ án
                      </h3>
                      <p className="text-xs text-blue-600 font-bold mt-1">
                        Miễn phí
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thanh tìm kiếm kiểu mới (Pill-shaped, Nút đen) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          className="relative mt-10 w-full"
        >
          <div className="mx-auto w-full max-w-[1100px] rounded-full border border-white/70 bg-white p-2 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <div className="relative flex-[1.5] flex items-center px-4">
                <Search size={20} className="text-slate-400" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => onKeywordChange(e.target.value)}
                  placeholder="Tìm kiếm công việc, vị trí, kỹ năng..."
                  className="h-12 w-full border-none bg-transparent px-3 text-base text-slate-700 outline-none focus:ring-0"
                />
              </div>
              <div className="hidden h-8 w-[1px] bg-slate-200 md:block"></div>
              <div className="flex flex-1 items-center px-4">
                <MapPin size={20} className="text-slate-400" />
                <select className="w-full border-none bg-transparent text-slate-600 outline-none focus:ring-0">
                  <option>Vị trí</option>
                  <option>Hà Nội</option>
                  <option>TP. HCM</option>
                </select>
              </div>
              <button
                type="submit"
                className="h-14 rounded-full bg-black px-10 text-base font-bold text-white transition hover:bg-slate-800 md:min-w-[160px]"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
