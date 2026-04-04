import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import cvService from "../../../services/cvService";
import CvPreview from "../../template/components/CvPreview";
import Footer from "../../../layouts/Footer";
import Loading from "../../../components/common/Loading";

export default function CvDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cvInfo, setCvInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultSections = [
    { id: "objective" },
    { id: "education" },
    { id: "experience" },
    { id: "skills" },
  ];

  useEffect(() => {
    let isMounted = true;
    const fetchCvDetail = async () => {
      try {
        setLoading(true);
        setError(null); // Reset lỗi mỗi lần fetch lại
        const response = await cvService.previewCv(id);
        if (isMounted) {
          if (response && response.code === 200) {
            setCvInfo(response.data);
          } else if (response && response.data && !response.code) {
            setCvInfo(response.data);
          } else {
            setError("Không tìm thấy dữ liệu CV.");
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Lỗi khi fetch CV chi tiết:", err);
          setError(
            "Có lỗi xảy ra hoặc bạn không có quyền xem CV này. Vui lòng đăng nhập.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) fetchCvDetail();

    // Cleanup fn
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] px-4 text-center">
        <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <svg
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Ối! Có lỗi xảy ra, Vui lòng đăng nhập để xem CV này.
        </h2>
        <p className="text-slate-500 mb-8 max-w-md">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Quay lại trang trước
        </button>
      </div>
    );
  }
  if (!cvInfo) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* Sửa lại phần margin top để không bị gấp đôi khoảng cách */}
      <main className="mt-28 px-6 flex-1 max-w-5xl mx-auto w-full pb-16">
        {/* 3. Breadcrumb hiện đại hơn */}
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-8">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Trang chủ
          </Link>
          <svg
            className="w-4 h-4 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <Link to="/cv" className="hover:text-indigo-600 transition-colors">
            Hồ sơ ứng viên
          </Link>
          <svg
            className="w-4 h-4 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-slate-800 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100 flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-indigo-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            {cvInfo.type === "FORM"
              ? cvInfo.data?.personalInfo?.fullName || "Chưa cập nhật tên"
              : "Hồ sơ PDF"}
          </span>
        </nav>

        {/* HIỂN THỊ DỰA VÀO TYPE */}
        {cvInfo.type === "FORM" ? (
          <div className="w-full animate-fade-in-up">
            <CvPreview
              cvData={cvInfo.data}
              avatarPreview={cvInfo.data.avatar}
              sections={defaultSections}
            />
          </div>
        ) : (
          /* Giao diện PDF */
          <div className="w-full bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center animate-fade-in-up">
            {/* Header của phần PDF */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-6 border-b border-slate-100 pb-6 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                    Hồ sơ đính kèm
                  </h2>
                  <p className="text-slate-500 text-sm mt-0.5">
                    Định dạng file PDF
                  </p>
                </div>
              </div>

              <a
                href={cvInfo.data}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Tải xuống
              </a>
            </div>

            {/* Vùng chứa Iframe */}
            <div className="w-full bg-slate-50 p-2 rounded-2xl border border-slate-200">
              <iframe
                src={`${cvInfo.data}#toolbar=0`}
                className="w-full h-[800px] rounded-xl bg-white shadow-inner"
                title="CV PDF Preview"
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
