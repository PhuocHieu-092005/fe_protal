import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jobService from "../../../services/jobService";
export default function CompanyJobs() {
  const [jobs, setJobs] = useState([]);

  const [selectedJob, setSelectedJob] = useState(null);

  const navigate = useNavigate();
  const handleViewDetail = async (id) => {
    try {
      const response = await jobService.getJobDetail(id);
      setSelectedJob(response.data);
    } catch (err) {
      window.alert(err);
    }
  };

  const fetchJobs = async () => {
    try {
      const reponse = await jobService.getMyJobs();
      setJobs(reponse.data.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách tin: ", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchJobs();
  }, []);
  return (
    <>
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            {/* Nút đóng nhanh */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>

            {/* Header Modal: Logo + Tiêu đề */}
            <div className="flex items-center gap-4 mb-6 border-b pb-4">
              <img
                src={selectedJob.companyLogo}
                alt="logo"
                className="w-16 h-16 rounded-lg object-cover border"
              />
              <div>
                <h3 className="text-xl font-bold text-indigo-700">
                  {selectedJob.title}
                </h3>
                <p className="text-gray-500 font-medium">
                  {selectedJob.companyName}
                </p>
              </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-400">Hình thức làm việc</span>
                <span className="font-semibold text-gray-700">
                  {selectedJob.jobType}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400">Địa điểm</span>
                <span className="font-semibold text-gray-700">
                  {selectedJob.workLocation}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400">Mức lương</span>
                <span className="font-semibold text-emerald-600">
                  {selectedJob.salary
                    ? `${selectedJob.salary.toLocaleString()} VNĐ`
                    : "Thỏa thuận"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400">Lượt xem tin</span>
                <span className="font-semibold text-blue-600">
                  {selectedJob.viewCount} lượt
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400">Ngày bắt đầu</span>
                <span className="font-semibold">
                  {new Date(selectedJob.startDay).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400">Hạn cuối</span>
                <span className="font-semibold text-rose-500">
                  {new Date(selectedJob.endDay).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedJob.tags &&
                selectedJob.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-semibold rounded-full border border-indigo-200 shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
            {/* File đính kèm */}
            {selectedJob.jdFileUrl && (
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <h4 className="font-bold text-indigo-800 mb-1">
                  Tài liệu đính kèm (JD)
                </h4>
                <a
                  href={selectedJob.jdFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 underline flex items-center gap-2"
                >
                  <span>📄</span> Xem chi tiết tệp mô tả công việc
                </a>
              </div>
            )}
            <div className="mt-6 space-y-6">
              {/* Mô tả công việc */}
              {selectedJob.description && (
                <div>
                  <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-5 bg-indigo-600 rounded-full"></span>
                    Mô tả công việc
                  </h4>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line pl-3">
                    {selectedJob.description}
                  </p>
                </div>
              )}

              {/* Yêu cầu ứng viên */}
              {selectedJob.requirements && (
                <div>
                  <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-5 bg-emerald-500 rounded-full"></span>
                    Yêu cầu ứng viên
                  </h4>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line pl-3">
                    {selectedJob.requirements}
                  </p>
                </div>
              )}
            </div>
            {/* Nút hành động (Footer) */}
            <div className="mt-8 flex justify-end gap-3 border-t pt-5">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-5 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all font-medium"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#F0F2F5]  pb-12 px-6">
        <div className="max-w-7xl mx-auto">
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
                    <th className="px-6 py-4">Hạn chót</th>
                    <th className="px-6 py-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {jobs.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-10 text-slate-400"
                      >
                        Bạn chưa có tin tuyển dụng nào.
                      </td>
                    </tr>
                  ) : (
                    jobs.map((job) => (
                      <tr
                        key={job.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-5">
                          <p className="font-bold text-slate-900">
                            {job.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            ID: #{job.id}
                          </p>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                              job.status === "APPROVED"
                                ? "bg-emerald-50 text-emerald-600"
                                : job.status === "REJECTED"
                                  ? "bg-red-50 text-red-600"
                                  : "bg-orange-50 text-orange-600"
                            }`}
                          >
                            {job.status === "APPROVED"
                              ? "ĐÃ ĐƯỢC DUYỆT "
                              : job.status === "REJECTED"
                                ? "TỪ CHỐI"
                                : "ĐANG CHỜ"}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-slate-500">
                          {new Date(job.startDay).toLocaleDateString("vi-VN")}
                        </td>
                        <td className="px-6 py-5 text-slate-500">
                          {new Date(job.endDay).toLocaleDateString("vi-VN")}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex justify-end items-center gap-3">
                            <button
                              className="text-white rounded-md text-sm bg-yellow-600 px-3 py-1.5 hover:bg-yellow-700 transition-colors"
                              onClick={() =>
                                navigate(
                                  `/companies/jobs/${job.id}/applications`,
                                )
                              }
                            >
                              Đơn ứng tuyển ({job.quantityApply})
                            </button>

                            <button
                              className="text-white rounded-md text-sm bg-pink-600 px-3 py-1.5 hover:bg-pink-700 transition-colors"
                              onClick={() => handleViewDetail(job.id)}
                            >
                              Xem
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
