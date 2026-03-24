import React from "react";
import { Link } from "react-router-dom";

const TemplateHero = () => {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              Bộ sưu tập mẫu CV công nghệ thông tin
              <span className="block text-indigo-600">
                cơ bản, chuyên nghiệp và dễ tùy chỉnh
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              Chọn mẫu CV phù hợp với định hướng của bạn, tạo CV trực tiếp bằng
              form hoặc tải lên file PDF có sẵn để quản lý trên hệ thống.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/template/create"
                className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                📄 Tạo CV ngay
              </Link>

              <button className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                ⬆️ Tải CV PDF
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 h-56 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200" />
                <h3 className="text-xl font-semibold text-slate-900">
                  CV Fresher IT
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Phù hợp sinh viên mới ra trường, thực tập sinh, bố cục gọn
                  gàng dễ đọc.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    FORM
                  </span>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-700">
                    Fresher
                  </span>
                </div>

                <button className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  Xem trước
                </button>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 h-56 rounded-2xl bg-gradient-to-b from-indigo-100 to-sky-100" />
                <h3 className="text-xl font-semibold text-slate-900">
                  CV Clean Professional
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Bố cục hiện đại, phù hợp ứng tuyển fresher, junior hoặc
                  full-time.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    FORM
                  </span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">
                    Professional
                  </span>
                </div>

                <button className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  Xem trước
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplateHero;
