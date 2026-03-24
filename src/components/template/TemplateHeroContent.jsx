import React from "react";
import { Link } from "react-router-dom";

const TemplateHeroContent = () => {
  return (
    <div>
      <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
        Bộ sưu tập mẫu CV công nghệ thông tin
        <span className="block text-indigo-600">
          cơ bản, chuyên nghiệp và dễ tùy chỉnh
        </span>
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
        Chọn mẫu CV phù hợp với định hướng của bạn, tạo CV trực tiếp bằng form
        hoặc tải lên file PDF có sẵn để quản lý trên hệ thống.
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
  );
};

export default TemplateHeroContent;
