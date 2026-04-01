import React from "react";
import {
  FileText,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
} from "lucide-react";

const CvStatusManager = () => {
  // DỮ LIỆU MẪU (MOCK DATA)
  const mockCvs = [
    {
      id: 1,
      title: "CV Fresher ReactJS - 2024",
      type: "FORM",
      status: "APPROVED",
      created_at: "2024-03-10",
      view_count: 12,
    },
    {
      id: 2,
      title: "CV Designer Part-time",
      type: "UPLOAD",
      status: "PENDING",
      created_at: "2024-03-25",
      view_count: 0,
    },
    {
      id: 3,
      title: "CV Thực tập Backend",
      type: "FORM",
      status: "REJECTED",
      created_at: "2024-02-20",
      view_count: 5,
    },
  ];

  // Hàm hiển thị Badge trạng thái
  const renderStatus = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="badge badge-success gap-1 bg-green-100 text-green-700 border-green-200">
            <CheckCircle size={14} /> Đã duyệt
          </span>
        );
      case "PENDING":
        return (
          <span className="badge badge-warning gap-1 bg-yellow-100 text-yellow-700 border-yellow-200">
            <Clock size={14} /> Chờ duyệt
          </span>
        );
      case "REJECTED":
        return (
          <span className="badge badge-error gap-1 bg-red-100 text-red-700 border-red-200">
            <XCircle size={14} /> Từ chối
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-3/4 bg-white rounded-lg shadow-sm p-8 border border-gray-100 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <FileText className="text-blue-600" size={28} />
          Quản lý CV & Trạng thái
        </h2>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 active:scale-95">
          <Plus size={20} />
          <span>Tạo CV mới</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockCvs.map((cv) => (
          <div
            key={cv.id}
            className="group border rounded-xl p-5 hover:shadow-md transition-all bg-white flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
              <div
                className={`p-4 rounded-xl ${cv.type === "FORM" ? "bg-purple-100 text-purple-600" : "bg-orange-100 text-orange-600"}`}
              >
                <FileText size={24} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {cv.title}
                  </h3>
                  {renderStatus(cv.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>
                    Loại: <b className="text-gray-700">{cv.type}</b>
                  </span>
                  <span>
                    Ngày tạo:{" "}
                    <b>{new Date(cv.created_at).toLocaleDateString("vi-VN")}</b>
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} /> {cv.view_count} lượt xem
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="btn btn-square btn-sm btn-ghost text-blue-600 hover:bg-blue-50"
                title="Xem chi tiết"
              >
                <Eye size={18} />
              </button>
              <button
                className="btn btn-square btn-sm btn-ghost text-red-500 hover:bg-red-50"
                title="Xóa CV"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CvStatusManager;
