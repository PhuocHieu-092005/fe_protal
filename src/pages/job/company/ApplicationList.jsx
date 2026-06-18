import { useEffect, useState } from "react";
import jobService from "../../../services/jobService";
import { useNavigate, useParams } from "react-router-dom";
import cvService from "../../../services/cvService";
import { alertUtils } from "../../../helpers/alertUtils";

const parseCvContent = (content) => {
  if (!content) return {};
  if (typeof content === "string") {
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error("Lỗi parse content_json CV:", error);
      return {};
    }
  }
  return content;
};

const normalizeSkills = (skills) => {
  if (Array.isArray(skills)) return skills;
  if (!skills || typeof skills !== "object") return [];

  return Object.values(skills)
    .flatMap((group) => (Array.isArray(group) ? group : []))
    .filter(Boolean);
};

const formatEducation = (education) => {
  if (Array.isArray(education)) {
    return education
      .map((item) =>
        [item?.school, item?.major, item?.period].filter(Boolean).join(" - "),
      )
      .filter(Boolean)
      .join("; ");
  }
  return education || "";
};

export default function ApplicationList() {
  const [applicants, setApplicants] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [viewingCv, setViewingCv] = useState(null);
  const [reviewData, setReviewData] = useState({
    status: "APPROVED",
    companyNote: "",
  });
  const { id } = useParams();
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
    const fetchApplicants = async () => {
      try {
        const response = await jobService.getJobApplicatons(id);
        setApplicants(response.data);
      } catch (err) {
        console.error("lỗi: ", err);
      }
    };
    fetchApplicants();
  }, [id]);
  const handleViewCv = async (cvId) => {
    if (!cvId) return;
    navigate(`/cv/${cvId}`);
    return;

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
                  const cvData = parseCvContent(viewingCv.content_json);
                  const personalInfo = cvData.personalInfo || {};
                  const fullName =
                    personalInfo.fullName || cvData.full_name || cvData.fullName;
                  const phone = personalInfo.phone || cvData.phone;
                  const email = personalInfo.email || cvData.email;
                  const education = formatEducation(cvData.education);
                  const skills = normalizeSkills(cvData.skills);
                  const summary = cvData.objective || cvData.summary;

                  return (
                    <>
                      <div className="hidden md:block bg-white p-8 rounded-xl shadow-sm space-y-6">
                        <h3 className="text-lg font-bold">
                          Thông tin ứng viên
                        </h3>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Họ tên:</strong> {fullName || "---"}
                          </div>
                          <div>
                            <strong>SĐT:</strong> {phone || "---"}
                          </div>
                          <div>
                            <strong>Email:</strong> {email || "---"}
                          </div>
                          <div>
                            <strong>Học vấn:</strong> {education || "---"}
                          </div>
                        </div>

                        <hr />

                        <div>
                          <h4 className="font-semibold mb-2">Kỹ năng</h4>
                          <ul className="list-disc list-inside text-sm">
                            {skills.length > 0 ? (
                              skills.map((skill, idx) => (
                                <li key={idx}>{skill}</li>
                              ))
                            ) : (
                              <li>---</li>
                            )}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Giới thiệu</h4>
                          <p className="text-sm">{summary || "---"}</p>
                        </div>
                      </div>
                      <div className="block md:hidden bg-white p-8 rounded-xl shadow-sm space-y-6">
                        <h3 className="text-lg font-bold">
                          Thông tin ứng viên
                        </h3>

                        <div className="grid grid-cols-1 gap-4 text-sm">
                          <div>
                            <strong>Họ tên:</strong> {fullName || "---"}
                          </div>
                          <div>
                            <strong>SĐT:</strong> {phone || "---"}
                          </div>
                          <div>
                            <strong>Email:</strong> {email || "---"}
                          </div>
                          <div>
                            <strong>Học vấn:</strong> {education || "---"}
                          </div>
                        </div>

                        <hr />

                        <div>
                          <h4 className="font-semibold mb-2">Kỹ năng</h4>
                          <ul className="list-disc list-inside text-sm">
                            {skills.length > 0 ? (
                              skills.map((skill, idx) => (
                                <li key={idx}>{skill}</li>
                              ))
                            ) : (
                              <li>---</li>
                            )}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Giới thiệu</h4>
                          <p className="text-sm">{summary || "---"}</p>
                        </div>
                      </div>
                    </>
                  );
                })()
              ) : (
                <>
                  {console.log(
                    "duong dan file pdf",
                    viewingCv.cv_file.file_path,
                  )}
                  <div className="w-full h-full flex flex-col gap-3">
                    <div className="flex justify-end">
                      <a
                        href={viewingCv.cv_file?.file_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={viewingCv.title || "CV_Ung_Vien"}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                      >
                        Xem cv ở trang mới
                      </a>
                    </div>

                    <iframe
                      src={`${viewingCv.cv_file?.file_path}#toolbar=0`}
                      className="w-full flex-1 border-none rounded-lg min-h-[50vh]"
                      title="CV Preview"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
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
              {/* Chọn trạng thái */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Kết quả xét duyệt
                </label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    onClick={() =>
                      setReviewData({ ...reviewData, status: "APPROVED" })
                    }
                    className={`py-3 rounded-xl border-2 font-semibold transition-all ${reviewData.status === "APPROVED" ? "border-green-600 bg-green-50 text-green-700" : "border-slate-100 text-slate-400"}`}
                  >
                    Chấp nhận
                  </button>
                  <button
                    onClick={() =>
                      setReviewData({ ...reviewData, status: "REJECTED" })
                    }
                    className={`py-3 rounded-xl border-2 font-semibold transition-all ${reviewData.status === "REJECTED" ? "border-rose-600 bg-rose-50 text-rose-700" : "border-slate-100 text-slate-400"}`}
                  >
                    Từ chối
                  </button>
                </div>
              </div>

              {/* Nhập ghi chú */}
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
      <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Danh sách ứng viên
              </h1>
              <p className="text-slate-500 mt-1">
                Quản lý các hồ sơ đã nộp cho bài đăng #{id}
              </p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
            >
              Quay lại
            </button>
          </div>

          {/* Table Content */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">
                    Bài đăng
                  </th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">
                    Ứng viên
                  </th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">
                    Hồ sơ (CV)
                  </th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">
                    Ngày nộp
                  </th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500 text-right">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applicants.length > 0 ? (
                  applicants.map((app) => (
                    <tr
                      key={app.applicationId}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {app.jobTitle}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                            {app.fullName?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {app.fullName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {app.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">
                            {app.cvTitle || "CV_Ung_Vien"}
                          </span>

                          <button
                            onClick={() => handleViewCv(app.cvId)}
                            className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1 text-left"
                          >
                            Xem CV chi tiết
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {app.appliedAt
                          ? new Date(app.appliedAt).toLocaleDateString("vi-VN")
                          : "---"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            app.status === "PENDING"
                              ? "bg-amber-100 text-amber-700"
                              : app.status === "APPROVED"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setReviewData({
                              status: app.status,
                              companyNote: "",
                            });
                          }}
                          className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-blue-600"
                        >
                          Phản hồi
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
                      Chưa có ứng viên nào nộp hồ sơ.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* LAYOUT DẠNG CARD TRÊN MOBILE (Chỉ hiển thị khi màn hình nhỏ hơn md) */}
          <div className="block md:hidden mx-auto">
            {applicants.length > 0 ? (
              applicants.map((app) => (
                <div
                  key={app.applicationId}
                  className="p-5 flex flex-col gap-4 border-b-2 border-slate-200 last:border-b-0 bg-white"
                >
                  {/* HÀNG 1: THÔNG TIN ỨNG VIÊN & TRẠNG THÁI */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-3">
                      {/* Avatar tròn */}
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                        {app.fullName?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">
                          {app.fullName}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {app.email}
                        </p>
                      </div>
                    </div>

                    {/* Badge trạng thái */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                        app.status === "PENDING"
                          ? "bg-amber-100 text-amber-700"
                          : app.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  {/* HÀNG 2: BÀI ĐĂNG & CHI TIẾT HỒ SƠ CV */}
                  <div className="bg-slate-50 p-3 rounded-xl flex flex-col gap-1.5 text-xs">
                    <div>
                      <span className="text-slate-400 font-medium">
                        Vị trí:{" "}
                      </span>
                      <span className="text-slate-700 font-semibold">
                        {app.jobTitle}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60 border-dashed">
                      <span className="text-slate-700 font-medium truncate max-w-[180px]">
                        📄 {app.cvTitle || "CV_Ung_Vien"}
                      </span>
                      <button
                        onClick={() => handleViewCv(app.cvId)}
                        className="text-blue-600 font-bold hover:underline shrink-0"
                      >
                        Xem CV chi tiết
                      </button>
                    </div>
                  </div>

                  {/* HÀNG 3: NGÀY NỘP & NÚT THAO TÁC */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-400">
                      Ngày nộp:{" "}
                      {app.appliedAt
                        ? new Date(app.appliedAt).toLocaleDateString("vi-VN")
                        : "---"}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setReviewData({
                          status: app.status,
                          companyNote: "",
                        });
                      }}
                      className="px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 rounded-xl font-bold transition-all shadow-sm"
                    >
                      Phản hồi
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400 text-sm bg-white">
                Chưa có ứng viên nào nộp hồ sơ.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
