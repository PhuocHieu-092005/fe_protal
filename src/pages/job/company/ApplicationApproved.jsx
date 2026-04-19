import React, { useEffect, useState } from "react";
import { Eye, Download, UserCheck } from "lucide-react"; // Dùng thư viện icon lucide-react
import jobService from "../../../services/jobService";
import { useNavigate } from "react-router-dom";

export default function ApprovedApplicants() {
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jobService.getApplicatonsApproved();
        setApplicants(response.data);
      } catch (err) {
        console.log("looix: ", err);
        alert("Có lỗii khi gửi phản hồi");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-slate-50 min-h-screen pt-24">
  
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="text-green-600" />
              Ứng viên đã duyệt
            </h1>
            <p className="text-slate-500 text-sm">
              Quản lý đơn đã trúng tuyển các vị trí
            </p>
          </div>
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium">
            Tổng cộng: {applicants.length}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
          >
            Quay lại
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-bottom border-slate-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                  Ứng viên
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                  Vị trí ứng tuyển
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                  Ngày nộp
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applicants.map((item) => (
                <tr
                  key={item.applicationId}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">
                      {item.fullName}
                    </div>
                    <div className="text-xs text-slate-500">{item.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                      {item.jobTitle}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(item.appliedAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <a
                        href={item.cvFileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 hover:bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 transition-all shadow-sm"
                        title="Xem CV"
                      >
                        <Eye size={18} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {applicants.length === 0 && (
            <div className="py-20 text-center text-slate-400">
              Chưa có ứng viên nào được duyệt.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
