import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6 text-slate-700 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">
            Tạo Bài Tuyển Dụng Mới (Create New Job)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Cung cấp thông tin chi tiết để tìm kiếm ứng viên phù hợp nhất.
          </p>
        </div>

        <form className="space-y-8">
          {/* 1. Thông tin chung */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm">
                1
              </span>
              Thông tin chung (General Information)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-sm font-semibold text-slate-600">
                Vị trí tuyển dụng
              </label>
              <div className="md:col-span-3">
                <input
                  type="text"
                  placeholder="VD: Senior React Developer"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>

              <label className="text-sm font-semibold text-slate-600">
                Mức lương
              </label>
              <div className="md:col-span-3">
                <input
                  type="text"
                  placeholder="VD: 15.000.000 - 20.000.000 VNĐ"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>

              <label className="text-sm font-semibold text-slate-600">
                Mô tả công việc
              </label>
              <div className="md:col-span-3">
                <textarea
                  rows="4"
                  placeholder="Mô tả chi tiết nhiệm vụ và trách nhiệm..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                ></textarea>
              </div>
            </div>
          </section>

          {/* 2. Yêu cầu & Kỹ năng */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm">
                2
              </span>
              Kỹ năng & Yêu cầu (Requirements)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-sm font-semibold text-slate-600">
                Yêu cầu ứng viên
              </label>
              <div className="md:col-span-3">
                <textarea
                  rows="4"
                  placeholder="Kỹ năng chuyên môn, kinh nghiệm làm việc..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                ></textarea>
              </div>

              <label className="text-sm font-semibold text-slate-600">
                Từ khóa (Tags)
              </label>
              <div className="md:col-span-3 flex flex-wrap gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
                  ReactJS{" "}
                  <button type="button" className="hover:text-red-200">
                    ×
                  </button>
                </span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
                  NodeJS{" "}
                  <button type="button" className="hover:text-red-200">
                    ×
                  </button>
                </span>
                <input
                  type="text"
                  placeholder="+ Thêm kỹ năng"
                  className="bg-transparent outline-none text-xs flex-1 min-w-[100px]"
                />
              </div>
            </div>
          </section>

          {/* 3. File đính kèm */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm">
                3
              </span>
              Hồ sơ đính kèm (JD File)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="text-sm font-semibold text-slate-600">
                Tải lên JD
              </label>
              <div className="md:col-span-3 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-all cursor-pointer">
                <span className="text-3xl text-slate-400 mb-2">📁</span>
                <p className="text-xs text-slate-500 font-medium text-center">
                  Nhấn để chọn file hoặc kéo thả tại đây (PDF, DOCX)
                </p>
              </div>
            </div>
          </section>

          {/* 4. Thời hạn */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm">
                4
              </span>
              Thời hạn tuyển dụng
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-sm font-semibold text-slate-600">
                Hạn chót nhận hồ sơ
              </label>
              <div className="md:col-span-3">
                <input
                  type="date"
                  className="bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Footer nút bấm */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={() => navigate("/job/manage")}
              className="px-8 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="bg-slate-900 hover:bg-blue-700 text-white px-10 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200"
            >
              Đăng Bài Tuyển Dụng (Submit Job)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
