import React, { useEffect, useState } from "react";
import { Eye, Download, UserCheck } from "lucide-react"; // Dùng thư viện icon lucide-react
import jobService from "../../../services/jobService";
import { useNavigate } from "react-router-dom";
import cvService from "../../../services/cvService";
export default function ApprovedApplicants() {
  const [applicants, setApplicants] = useState([]);
    const [viewingCv, setViewingCv] = useState(null);
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
 const handleViewCv = async (cvId) => {
    try {
      console.log("giá trị cv id", cvId);
      const response = await cvService.getCvById(cvId);
      setViewingCv(response);
      // console.log("đã set giá trị");
    } catch (err) {
      console.error("lỗi khi lấy chi tiết cv", err);
    }
  };
  return (
    <>
     {viewingCv && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-5 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Chi tiết: {viewingCv.title}</h2>
              <button
                onClick={() => setViewingCv(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              {viewingCv.type === "FORM" ? (
                (() => {
                  const cvData = viewingCv.content_json;

                  return (
                    <div className="bg-white p-8 rounded-xl shadow-sm space-y-6">
                      <h3 className="text-lg font-bold">Thông tin ứng viên</h3>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Họ tên:</strong> {cvData?.full_name}
                        </div>
                        <div>
                          <strong>SĐT:</strong> {cvData?.phone}
                        </div>
                        <div>
                          <strong>Email:</strong> {cvData?.email}
                        </div>
                        <div>
                          <strong>Học vấn:</strong> {cvData?.education}
                        </div>
                      </div>

                      <hr />

                      <div>
                        <h4 className="font-semibold mb-2">Kỹ năng</h4>
                        <ul className="list-disc list-inside text-sm">
                          {cvData?.skills?.map((skill, idx) => (
                            <li key={idx}>{skill}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Giới thiệu</h4>
                        <p className="text-sm">{cvData?.summary}</p>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <>
                {console.log("duong dan file pdf",viewingCv.cv_file.file_path)}
                <iframe
                  src={`${viewingCv.cv_file.file_path}#toolbar=0`}
                  className="w-full h-full border-none rounded-lg"
                  title="CV Preview"
                />
                </>
              )}
            </div>
          </div>
        </div>
      )}
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
                <th className="px-6 py-4 text-sm font-semibold text-slate-700 ">
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
                  <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">
                            {item.cvTitle || "CV_Ung_Vien"}
                          </span>

                          <button
                            onClick={() => handleViewCv(item.cvId)}
                            className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1 text-left"
                          >
                            Xem CV chi tiết
                          </button>
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
    </>
  );
}
