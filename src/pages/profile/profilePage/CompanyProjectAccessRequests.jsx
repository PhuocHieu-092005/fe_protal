import React, { useEffect, useState } from "react";
import { Eye, Clock3, FolderOpen, Building2 } from "lucide-react";
import projectAccessRequestService from "../../../services/projectAccessRequestService";

export default function CompanyProjectAccessRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response =
        await projectAccessRequestService.getMyProjectAccessRequests(0, 20);

      const pageData = response?.data;
      setRequests(pageData?.content || []);
    } catch (error) {
      console.error("Lỗi lấy danh sách yêu cầu hợp tác:", error);
      window.alert("Không thể tải danh sách yêu cầu hợp tác.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleOpenDetail = async (id) => {
    try {
      const response =
        await projectAccessRequestService.getMyProjectAccessRequestDetail(id);

      if (response?.data) {
        setSelectedRequest(response.data);
      }
    } catch (error) {
      console.error("Lỗi lấy chi tiết yêu cầu:", error);
      window.alert("Không thể tải chi tiết yêu cầu.");
    }
  };

  const handleCloseDetail = () => {
    setSelectedRequest(null);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "---";

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "---";

    return date.toLocaleString("vi-VN");
  };

  const getStatusClass = (status) => {
    if (status === "PENDING") {
      return "bg-amber-100 text-amber-700";
    }

    if (status === "APPROVED") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (status === "REJECTED") {
      return "bg-rose-100 text-rose-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  return (
    <>
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Chi tiết yêu cầu hợp tác
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Theo dõi trạng thái và phản hồi từ admin.
                </p>
              </div>

              <button
                onClick={handleCloseDetail}
                className="rounded-full px-3 py-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-900">
                  <FolderOpen size={18} className="text-blue-600" />
                  Thông tin project
                </h3>

                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-700">
                      Project:
                    </span>{" "}
                    {selectedRequest.project_title}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">
                      Sinh viên:
                    </span>{" "}
                    {selectedRequest.student_name}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-900">
                  <Building2 size={18} className="text-blue-600" />
                  Trạng thái yêu cầu
                </h3>

                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-700">
                      Trạng thái:
                    </span>{" "}
                    <span
                      className={`ml-2 rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                        selectedRequest.status,
                      )}`}
                    >
                      {selectedRequest.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">
                      Gửi lúc:
                    </span>{" "}
                    {formatDateTime(selectedRequest.requested_at)}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">
                      Xử lý lúc:
                    </span>{" "}
                    {formatDateTime(selectedRequest.processed_at)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                Lý do gửi yêu cầu
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                {selectedRequest.reason || "Không có nội dung."}
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                Ghi chú phản hồi từ admin
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                {selectedRequest.approval_note || "Chưa có phản hồi từ admin."}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseDetail}
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="flex-1 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-slate-900">
              Yêu cầu hợp tác project
            </h2>
            <p className="mt-2 text-slate-500">
              Theo dõi các yêu cầu hợp tác hoặc xin quyền truy cập project mà
              công ty đã gửi.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Tổng số
            </p>
            <p className="mt-1 font-bold text-slate-900">{requests.length}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full border-collapse text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                  Project
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                  Lý do
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                  Ngày gửi
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                  Chi tiết
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : requests.length > 0 ? (
                requests.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {item.project_title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Sinh viên: {item.student_name}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {item.reason?.length > 60
                        ? item.reason.slice(0, 60) + "..."
                        : item.reason}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock3 size={14} className="text-slate-400" />
                        {formatDateTime(item.requested_at)}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenDetail(item.id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        <Eye size={16} />
                        Xem
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    Bạn chưa gửi yêu cầu hợp tác project nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
