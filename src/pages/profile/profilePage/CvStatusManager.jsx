import React, { useEffect, useState } from "react";
import {
  FileText,
  Globe,
  Lock,
  Eye,
  Download,
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  Code2,
  UserRound,
} from "lucide-react";
import cvService from "../../../services/cvService";
import CvDetailModal from "./CvDetailModal";

export default function CvStatusManager() {
  const [cvList, setCvList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCv, setSelectedCv] = useState(null);

  const fetchMyCvs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await cvService.getMyCvs();
      const normalized = Array.isArray(response) ? response : [];

      setCvList(normalized);
    } catch (err) {
      console.error("Lỗi lấy danh sách CV:", err);
      setError("Không thể tải danh sách CV. Vui lòng thử lại.");
      setCvList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCvs();
  }, []);

  const renderStatusBadge = (isApproved) => {
    if (isApproved === true) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          <CheckCircle2 size={14} />
          Đã duyệt
        </span>
      );
    }

    if (isApproved === false) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          <Clock3 size={14} />
          Chờ duyệt
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
        <XCircle size={14} />
        Không rõ
      </span>
    );
  };

  const renderTypeBadge = (type) => {
    return (
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
        {type === "FORM"
          ? "CV Form"
          : type === "UPLOAD"
            ? "CV Upload"
            : type || "CV"}
      </span>
    );
  };

  if (loading) {
    return (
      <section className="w-3/4 rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Quản lý CV & Trạng thái
          </h2>
          <p className="mt-2 text-gray-500">Đang tải danh sách CV...</p>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="h-5 w-1/3 animate-pulse rounded bg-slate-100" />
              <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-slate-100" />
              <div className="mt-3 h-4 w-1/4 animate-pulse rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-3/4 rounded-lg border border-red-100 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900">
          Quản lý CV & Trạng thái
        </h2>
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
          {error}
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-3/4 rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Quản lý CV & Trạng thái
            </h2>
            <p className="mt-2 text-gray-500">
              Theo dõi danh sách CV hiện tại của bạn và trạng thái phê duyệt.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
            Tổng CV: {cvList.length}
          </div>
        </div>

        {cvList.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
            <FileText className="mx-auto mb-4 text-slate-400" size={42} />
            <h3 className="text-xl font-semibold text-slate-800">
              Bạn chưa có CV nào
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Hãy tạo CV mới hoặc upload CV để bắt đầu ứng tuyển.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {cvList.map((cv) => (
              <article
                key={cv.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold text-slate-900">
                        {cv.title || `CV #${cv.id}`}
                      </h3>
                      {renderTypeBadge(cv.type)}
                      {renderStatusBadge(cv.is_approved)}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        <span>
                          Tạo:{" "}
                          {cv.created_at
                            ? new Date(cv.created_at).toLocaleDateString(
                                "vi-VN",
                              )
                            : "Chưa có"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {cv.is_public ? (
                          <>
                            <Globe size={16} />
                            <span>Công khai</span>
                          </>
                        ) : (
                          <>
                            <Lock size={16} />
                            <span>Riêng tư</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Eye size={16} />
                        <span>Lượt xem: {cv.view_count ?? 0}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Download size={16} />
                        <span>Lượt tải: {cv.download_count ?? 0}</span>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <UserRound size={16} />
                        <span>
                          {cv.content_json?.fullName ||
                            "Chưa có họ tên trong CV"}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                        <Code2 size={16} />
                        <span>
                          {cv.content_json?.position ||
                            "Chưa có vị trí ứng tuyển"}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {(cv.content_json?.skills || []).map((skill, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedCv(cv)}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Xem chi tiết
                    </button>

                    <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                      Chỉnh sửa
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <CvDetailModal cv={selectedCv} onClose={() => setSelectedCv(null)} />
    </>
  );
}
