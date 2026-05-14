import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  Plus,
  X,
  XCircle,
  Edit, //
} from "lucide-react";
import cvService from "../../../services/cvService";

const CvStatusManager = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCvs();
  }, []);

  const fetchMyCvs = async () => {
    try {
      setLoading(true);
      const response = await cvService.getMyCvs();
      if (response.code === 200 && response.data) {
        setCvs(response.data);
      }
    } catch (error) {
      console.error(
        "Lỗi khi lấy danh sách CV:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xóa CV
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Bạn có chắc chắn muốn xóa CV này không? Hành động này không thể hoàn tác.",
      )
    ) {
      return;
    }

    try {
      await cvService.deleteCv(id);
      setCvs(cvs.filter((cv) => cv.id !== id));
      alert("Xóa CV thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa CV:", error.response?.data || error.message);
      alert("Có lỗi xảy ra khi xóa CV.");
    }
  };

  // 1. Xử lý Xem Chi Tiết (Nút Mắt)
  const handlePreview = (cv) => {
    if (cv.type === "FORM") {
      navigate(`/cv/${cv.id}`); // Mở trang xem chi tiết CV (không phải edit)
    } else if (cv.type === "UPLOAD") {
      const fileObj = cv.cv_file;
      if (fileObj && fileObj.file_path) {
        {console.log("đường dẫn"),fileObj.file_path}
        setPdfPreviewUrl(fileObj.file_path);
      } else {
        alert("Không tìm thấy link file PDF của CV này.");
      }
    }
  };

  // 2. Xử lý Sửa CV (Nút Bút - CHỈ DÀNH CHO FORM)
  const handleEdit = (cvId) => {
    navigate(`/template/edit/${cvId}`); // Chuyển sang trang Edit
  };

  // Render Status
  const renderStatus = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="badge gap-1 bg-green-100 text-green-700 border-green-200 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center shadow-sm">
            <CheckCircle size={14} /> Đã duyệt
          </span>
        );
      case "REJECTED":
        return (
          <span className="badge gap-1 bg-rose-100 text-rose-700 border-rose-200 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center shadow-sm">
            <XCircle size={14} /> Bị từ chối
          </span>
        );
      case "PENDING":
      default:
        return (
          <span className="badge gap-1 bg-yellow-100 text-yellow-700 border-yellow-200 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center shadow-sm">
            <Clock size={14} /> Đang chờ duyệt
          </span>
        );
    }
  };

  return (
    <>
      <section className="w-full bg-white rounded-xl shadow-sm p-8 border border-gray-100 animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FileText className="text-indigo-600" size={28} />
              Quản lý Hồ sơ CV
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Bạn có thể tạo tối đa 2 CV để ứng tuyển.
            </p>
          </div>
          <button
            onClick={() => {
              if (cvs.length < 2) {
                navigate("/template");
              }
            }}
            disabled={cvs.length >= 2}
            className={`flex items-center gap-2 px-6 py-3 font-medium rounded-xl transition-all duration-300 ${
              cvs.length >= 2
                ? "bg-gray-200 text-gray-500 cursor-not-allowed pointer-events-none"
                : "bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-lg active:scale-95"
            }`}
          >
            <Plus size={20} />
            <span>Tạo CV mới</span>
          </button>
        </div>

        {loading ? (
          <div className="py-10 flex justify-center text-gray-500 animate-pulse">
            Đang tải danh sách CV...
          </div>
        ) : cvs.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <FileText size={48} className="text-gray-300 mb-4" />
            <p>Bạn chưa tạo CV nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {cvs.map((cv) => {
              const currentStatus = cv.status;
              const viewCount = cv.view_count ?? 0;
              const createdAt = cv.created_at;

              return (
                <div
                  key={cv.id}
                  className="group border border-gray-100 rounded-2xl p-5 hover:border-indigo-100 hover:shadow-md transition-all bg-white flex items-center justify-between"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`p-4 rounded-xl ${
                        cv.type === "FORM"
                          ? "bg-indigo-50 text-indigo-600"
                          : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      <FileText size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="font-bold text-gray-800 text-lg">
                          {cv.title || "CV Chưa có tiêu đề"}
                        </h3>
                        {renderStatus(currentStatus)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="bg-gray-100 px-2 py-0.5 rounded-md text-xs font-semibold">
                          {cv.type}
                        </span>
                        <span>
                          Ngày tạo:{" "}
                          <b className="text-gray-700">
                            {new Date(createdAt).toLocaleDateString("vi-VN")}
                          </b>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Eye size={14} /> {viewCount} lượt xem
                        </span>
                        {currentStatus === "REJECTED" && cv.admin_note && (
                          <p className="mt-2 text-sm text-slate-400 italic">
                            * Lý do từ chối: {cv.admin_note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* KHỐI NÚT HÀNH ĐỘNG */}
                  <div className="flex gap-2">
                    {/* CHỈ HIỂN THỊ NÚT SỬA NẾU LÀ LOẠI FORM */}
                    {cv.type === "FORM" && (
                      <button
                        onClick={() => handleEdit(cv.id)}
                        className="p-2.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                        title="Chỉnh sửa CV"
                      >
                        <Edit size={20} />
                      </button>
                    )}

                    {/* Nút Xem (Mắt) */}
                    <button
                      onClick={() => handlePreview(cv)}
                      className="p-2.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye size={20} />
                    </button>

                    {/* Nút Xóa */}
                    <button
                      onClick={() => handleDelete(cv.id)}
                      className="p-2.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Xóa CV"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Modal PDF giữ nguyên ... */}
      {pdfPreviewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-lg text-slate-800">
                Xem trước CV PDF
              </h3>
              <button
                onClick={() => setPdfPreviewUrl(null)}
                className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 w-full bg-gray-100 p-2 sm:p-4">
            
              
              <iframe
                src={`${pdfPreviewUrl}#toolbar=0`}
                className="w-full h-full rounded-xl bg-white shadow-sm border border-gray-200"
                title="PDF Preview"
              />
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CvStatusManager;
