import React from "react";
import { Link } from "react-router-dom";

export default function JobManage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Bảng điều khiển Nhà tuyển dụng
            </h1>
            <p className="text-sm text-slate-500">
              Chào mừng bạn quay lại, quản lý các tin đăng của bạn tại đây.
            </p>
          </div>
          <Link
            to="/job/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-md"
          >
            <span>+</span> Đăng tin mới
          </Link>
        </div>

        {/* Stats Section - Style TopCV */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Tin đang đăng", count: "5", color: "text-blue-600" },
            { label: "Ứng viên mới", count: "12", color: "text-emerald-600" },
            { label: "Lượt xem tin", count: "1,240", color: "text-slate-900" },
            { label: "CV đã duyệt", count: "8", color: "text-orange-600" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {item.label}
              </p>
              <p className={`text-3xl font-black mt-2 ${item.color}`}>
                {item.count}
              </p>
            </div>
          ))}
        </div>

        {/* Table List - Style ITviec */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800">
              Danh sách tin tuyển dụng
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Tìm kiếm tin..."
                className="text-sm border rounded-lg px-3 py-1.5 outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[11px] uppercase text-slate-400 bg-slate-50">
                <tr>
                  <th className="px-6 py-4">Vị trí</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4">Ứng tuyển</th>
                  <th className="px-6 py-4">Hạn nộp</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-900">
                      Frontend Developer (ReactJS)
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">ID: #JOB123</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md text-[10px] font-bold">
                      HIỂN THỊ
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold">24 người</p>
                    <p className="text-[10px] text-blue-600 hover:underline cursor-pointer">
                      Xem danh sách
                    </p>
                  </td>
                  <td className="px-6 py-5 text-slate-500">30/04/2026</td>
                  <td className="px-6 py-5 text-right space-x-3">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                      Sửa
                    </button>
                    <button className="text-slate-400 hover:text-red-600 transition-colors">
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
