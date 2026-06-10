import React, { useEffect, useState } from "react";
import { UserCheck } from "lucide-react";
import jobService from "../../../services/jobService";
import { useNavigate } from "react-router-dom";

import { alertUtils } from "../../../helpers/alertUtils";
export default function ApplicationByCompany() {
  const [applicants, setApplicants] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [reviewData, setReviewData] = useState({
    status: "APPROVED",
    companyNote: "",
  });
  const navigate = useNavigate();

  const handleReview = async () => {
    try {
      await jobService.reviewApplication(selectedApp.applicationId, reviewData);
      alertUtils.success("Đã gửi phản hồi thành công");
      setApplicants((prev) =>
        prev.map((app) =>
          app.applicationId === selectedApp.applicationId
            ? { ...app, status: reviewData.status }
            : app,
        ),
      );
      setSelectedApp(null);
    } catch (err) {
      console.error("Lỗi review: ", err);
      alertUtils.error("Có lỗi xảy ra khi gửi phản hồi.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jobService.getApplicationByCompany();
        setApplicants(response.data);
      } catch (err) {
        console.log("looix: ", err);
        alertUtils.error("Có lỗii khi gửi phản hồi");
      }
    };
    fetchData();
  }, []);

  const handleViewCv = (cvId) => {
    if (!cvId) return;
    navigate(`/cv/${cvId}`);
  };

  return (
    <>
      {/* Modal Phản hồi */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-slate-900">
              Phản hồi ứng viên
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Đang duyệt hồ sơ của:{" "}
              <span className="font-semibold text-slate-900">
                {selectedApp.fullName}
              </span>
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Kết quả xét duyệt
                </label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    onClick={() =>
                      setReviewData({ ...reviewData, status: "APPROVED" })
                    }
                    className={`py-3 rounded-xl border-2 font-semibold transition-all ${
                      reviewData.status === "APPROVED"
                        ? "border-green-600 bg-green-50 text-green-700"
                        : "border-slate-100 text-slate-400"
                    }`}
                  >
                    Chấp nhận
                  </button>
                  <button
                    onClick={() =>
                      setReviewData({ ...reviewData, status: "REJECTED" })
                    }
                    className={`py-3 rounded-xl border-2 font-semibold transition-all ${
                      reviewData.status === "REJECTED"
                        ? "border-rose-600 bg-rose-50 text-rose-700"
                        : "border-slate-100 text-slate-400"
                    }`}
                  >
                    Từ chối
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Lời nhắn gửi ứng viên
                </label>
                <textarea
                  rows="4"
                  className="w-full mt-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white outline-none transition-all text-sm"
                  placeholder="Ví dụ: Mời bạn tham gia phỏng vấn vào lúc..."
                  value={reviewData.companyNote}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      companyNote: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setSelectedApp(null)}
                className="flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-2xl transition-all"
              >
                Hủy
              </button>
              <button
                onClick={handleReview}
                className="flex-1 py-3 text-sm font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-2xl transition-all disabled:bg-slate-300"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout */}

      <div className=" flex-1 bg-slate-50 min-h-screen w-full box-border">
        <div className="w-full mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-xl">
                <UserCheck className="text-green-600 w-5 h-5" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-slate-900">
                  Ứng viên đã nộp đơn
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Quản lý và phản hồi danh sách hồ sơ tuyển dụng
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-xl text-xs font-semibold">
                Tổng cộng: {applicants.length}
              </div>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
              >
                Quay lại
              </button>
            </div>
          </div>

          {/* Table Container - Thêm cuộn ngang mượt mà khi màn hình hẹp */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden w-full">
            <div className=" hidden md:block overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
              <table className="w-full text-left border-collapse ">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-700 w-[18%]">
                      Ứng viên
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-700 w-[32%]">
                      Vị trí ứng tuyển
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-700 text-center w-[12%]">
                      Trạng thái
                    </th>
                    {/* <th className="px-6 py-4 text-xs font-semibold text-slate-700 text-center w-[12%]">
                      Ngày nộp
                    </th> */}
                    <th className="px-6 py-4 text-xs font-semibold text-slate-700 w-[16%]">
                      Hồ sơ đính kèm
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-700 text-center w-[10%]">
                      Thao tác
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {applicants.map((item) => (
                    <tr
                      key={item.applicationId}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {/* Ứng viên */}
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <div className="font-semibold text-slate-900 text-sm">
                          {item.fullName}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {item.email}
                        </div>
                      </td>

                      {/* Vị trí ứng tuyển */}
                      <td className="px-6 py-4.5">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium max-w-full whitespace-normal break-words">
                          {item.jobTitle}
                        </span>
                      </td>

                      {/* Trạng thái */}
                      <td className="px-6 py-4.5 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold border min-w-[85px] ${
                            item.status === "PENDING"
                              ? "bg-amber-50 text-amber-600 border-amber-200"
                              : item.status === "APPROVED"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                : item.status === "REJECTED"
                                  ? "bg-rose-50 text-rose-600 border-rose-200"
                                  : "bg-gray-50 text-gray-600 border-gray-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Ngày nộp */}
                      {/* <td className="px-6 py-4.5 text-center text-xs text-slate-600 font-medium whitespace-nowrap">
                        {new Date(item.appliedAt).toLocaleDateString("vi-VN")}
                      </td> */}

                      {/* Xem CV */}
                      <td className="px-6 py-4.5">
                        <div className="flex flex-col items-start max-w-[220px]">
                          <span
                            className="text-xs font-medium text-slate-700 truncate w-full"
                            title={item.cvTitle || "CV_Ung_Vien"}
                          >
                            {item.cvTitle || "CV_Ung_Vien"}
                          </span>
                          <button
                            onClick={() => handleViewCv(item.cvId)}
                            className="text-[11px] text-blue-600 hover:text-blue-800 hover:underline font-medium mt-0.5 text-left"
                          >
                            Xem CV chi tiết
                          </button>
                        </div>
                      </td>

                      {/* Thao tác */}
                      <td className="px-6 py-4.5 text-center whitespace-nowrap">
                        {item.status === "PENDING" ? (
                          <button
                            onClick={() => {
                              setSelectedApp(item);
                              setReviewData({
                                status: "APPROVED",
                                companyNote: "",
                              });
                            }}
                            className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg border border-blue-200 transition-all text-xs font-semibold"
                          >
                            Phản hồi
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium italic">
                            Đã xử lý
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {applicants.length === 0 && (
              <div className="py-20 text-center text-slate-400 font-medium text-xs">
                Chưa có ứng viên nào ứng tuyển.
              </div>
            )}
            <div className="md:hidden space-y-4">
              {applicants.map((item) => (
                <div
                  key={item.applicationId}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm"
                >
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.fullName}
                    </h3>

                    <p className="text-xs text-slate-500">{item.email}</p>
                  </div>

                  <div className="mt-3 space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Vị trí:</span>{" "}
                      {item.jobTitle}
                    </div>

                    <div>
                      <span className="font-medium">Trạng thái:</span>{" "}
                      {item.status}
                    </div>

                    <div>
                      <span className="font-medium">CV:</span>{" "}
                      {item.cvTitle || "CV_Ung_Vien"}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleViewCv(item.cvId)}
                      className="flex-1 rounded-lg border px-3 py-2 text-sm"
                    >
                      Xem CV
                    </button>

                    {item.status === "PENDING" && (
                      <button
                        onClick={() => {
                          setSelectedApp(item);
                          setReviewData({
                            status: "APPROVED",
                            companyNote: "",
                          });
                        }}
                        className="flex-1 rounded-lg bg-blue-600 text-white px-3 py-2 text-sm"
                      >
                        Phản hồi
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
