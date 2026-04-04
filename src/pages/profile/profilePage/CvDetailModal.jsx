import React from "react";
import {
  Briefcase,
  CheckCircle2,
  Clock3,
  Code2,
  Download,
  Eye,
  Globe,
  GraduationCap,
  Lock,
  Mail,
  MapPin,
  Phone,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

export default function CvDetailModal({ cv, onClose }) {
  if (!cv) return null;

  const cvDetail = cv.content_json || {};

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

  const renderSection = (title, children) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h4 className="mb-4 text-lg font-bold text-slate-900">{title}</h4>
      {children}
    </div>
  );

  const renderList = (items, emptyText = "Chưa có dữ liệu") => {
    if (!items || items.length === 0) {
      return <p className="text-sm text-slate-500">{emptyText}</p>;
    }

    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
          >
            {typeof item === "string"
              ? item
              : item?.name || JSON.stringify(item)}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[28px] bg-slate-50 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Chi tiết CV</h3>
            <p className="mt-1 text-sm text-slate-500">
              {cv.title || `CV #${cv.id}`}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={22} />
          </button>
        </div>

        <div className="max-h-[calc(90vh-88px)] overflow-y-auto p-6">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {renderTypeBadge(cv.type)}
            {renderStatusBadge(cv.is_approved)}

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {cv.is_public ? "Công khai" : "Riêng tư"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {renderSection(
              "Thông tin cơ bản",
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <UserRound size={16} className="mt-0.5 text-slate-400" />
                  <div>
                    <p className="font-semibold">Họ và tên</p>
                    <p>{cvDetail.fullName || "Chưa có dữ liệu"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase size={16} className="mt-0.5 text-slate-400" />
                  <div>
                    <p className="font-semibold">Vị trí ứng tuyển</p>
                    <p>{cvDetail.position || "Chưa có dữ liệu"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={16} className="mt-0.5 text-slate-400" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>{cvDetail.email || "Chưa có dữ liệu"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 text-slate-400" />
                  <div>
                    <p className="font-semibold">Số điện thoại</p>
                    <p>{cvDetail.phone || "Chưa có dữ liệu"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 text-slate-400" />
                  <div>
                    <p className="font-semibold">Địa chỉ</p>
                    <p>{cvDetail.address || "Chưa có dữ liệu"}</p>
                  </div>
                </div>
              </div>,
            )}

            {renderSection(
              "Kỹ năng",
              renderList(cvDetail.skills, "Chưa có kỹ năng"),
            )}

            {renderSection(
              "Học vấn",
              Array.isArray(cvDetail.education) &&
                cvDetail.education.length > 0 ? (
                <div className="space-y-3">
                  {cvDetail.education.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200"
                    >
                      <div className="flex items-start gap-3">
                        <GraduationCap
                          size={18}
                          className="mt-0.5 text-slate-500"
                        />
                        <div className="text-sm text-slate-700">
                          <p className="font-semibold">
                            {item.school || item.major || "Thông tin học vấn"}
                          </p>
                          <p className="mt-1 text-slate-500">
                            {[item.major, item.startDate, item.endDate]
                              .filter(Boolean)
                              .join(" • ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">Chưa có học vấn</p>
              ),
            )}

            {renderSection(
              "Kinh nghiệm",
              Array.isArray(cvDetail.experience) &&
                cvDetail.experience.length > 0 ? (
                <div className="space-y-3">
                  {cvDetail.experience.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200"
                    >
                      <div className="text-sm text-slate-700">
                        <p className="font-semibold">
                          {item.company ||
                            item.position ||
                            "Kinh nghiệm làm việc"}
                        </p>
                        <p className="mt-1 text-slate-500">
                          {[item.position, item.startDate, item.endDate]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                        {item.description && (
                          <p className="mt-2 leading-6 text-slate-600">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">Chưa có kinh nghiệm</p>
              ),
            )}

            {renderSection(
              "Mục tiêu nghề nghiệp",
              <p className="text-sm leading-7 text-slate-700">
                {cvDetail.objective || "Chưa có mục tiêu nghề nghiệp"}
              </p>,
            )}

            {renderSection(
              "Thông tin hệ thống",
              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  <span className="font-semibold">CV ID:</span> {cv.id}
                </p>
                <p>
                  <span className="font-semibold">Ngày tạo:</span>{" "}
                  {cv.created_at
                    ? new Date(cv.created_at).toLocaleString("vi-VN")
                    : "Chưa có"}
                </p>
                <p>
                  <span className="font-semibold">Ngày cập nhật:</span>{" "}
                  {cv.updated_at
                    ? new Date(cv.updated_at).toLocaleString("vi-VN")
                    : "Chưa có"}
                </p>
                <p>
                  <span className="font-semibold">Lượt xem:</span>{" "}
                  {cv.view_count ?? 0}
                </p>
                <p>
                  <span className="font-semibold">Lượt tải:</span>{" "}
                  {cv.download_count ?? 0}
                </p>
                <p className="flex items-center gap-2">
                  {cv.is_public ? <Globe size={16} /> : <Lock size={16} />}
                  <span>{cv.is_public ? "CV công khai" : "CV riêng tư"}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Eye size={16} />
                  <span>{cv.view_count ?? 0} lượt xem</span>
                </p>
                <p className="flex items-center gap-2">
                  <Download size={16} />
                  <span>{cv.download_count ?? 0} lượt tải</span>
                </p>
              </div>,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
