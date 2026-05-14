import React from "react";
import {
  BadgeDollarSign,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Handshake,
  Layers3,
  Lock,
  ShoppingCart,
  Send,
  User,
  ShieldCheck,
} from "lucide-react";

export default function ProjectSidebar({
  currentUserRole,
  isPaidProject,
  priceDownload,
  sourceCodeUrl,
  demoUrl,
  technologies,
  studentName,
  projectId,
  projectStatus,
  adminNote,
  onOpenRequestModal,
  onBuyProject,
  buyingProject,
  isPurchased,
}) {
  return (
    <>
      {/* GIÁ SOURCE */}
      <section className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <Lock size={15} className="text-blue-600" />
              Giá truy cập source
            </div>

            <h3 className="mt-2 text-2xl font-black text-blue-600">
              {isPaidProject
                ? `${Number(priceDownload).toLocaleString("vi-VN")}đ`
                : "Miễn phí"}
            </h3>

            <p className="mt-1 text-xs font-medium text-slate-500">
              {isPaidProject
                ? "Thanh toán một lần • Truy cập vĩnh viễn"
                : "Truy cập source code miễn phí"}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-black text-white ${
              isPaidProject ? "bg-blue-600" : "bg-emerald-500"
            }`}
          >
            {isPaidProject ? "Có phí" : "Free"}
          </span>
        </div>
      </section>

      {/* HỢP TÁC PROJECT */}
      {currentUserRole === "COMPANY" && (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Handshake size={18} />
            </div>

            <div>
              <h3 className="text-sm font-black text-slate-900">
                Hợp tác project
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Doanh nghiệp quan tâm đến dự án này? Gửi yêu cầu hợp tác để trao
                đổi chi tiết.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenRequestModal}
            disabled={checkingAccessRequest || Boolean(existingAccessRequest)}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-black transition disabled:cursor-not-allowed disabled:opacity-90 ${getRequestButtonStyle()}`}
          >
            <Send size={15} />
            {getRequestButtonText()}
          </button>

          {existingAccessRequest && (
            <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-xs font-semibold text-slate-500">
                Trạng thái:{" "}
                <span className={`font-black ${getRequestStatusTextColor()}`}>
                  {getRequestStatusLabel()}
                </span>
              </p>

              {approvalNote && (
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Ghi chú:{" "}
                  <span className="font-semibold text-slate-700">
                    {approvalNote}
                  </span>
                </p>
              )}
            </div>
          )}
        </section>
      )}

      {/* TÀI NGUYÊN */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 text-base font-black text-slate-900">
          <BookOpen size={18} className="text-blue-600" />
          Tài nguyên
        </h3>

        <div className="space-y-2">
          {sourceCodeUrl && (
            <>
              {isPaidProject && !isPurchased ? (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Lock size={16} className="text-blue-600" />
                      <div>
                        <p className="text-sm font-black text-slate-900">
                          GitHub Source
                        </p>
                        <p className="text-xs text-slate-500">
                          Source code đang bị khóa
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-black text-white">
                      LOCKED
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    Mua source để mở khóa mã nguồn.
                  </p>

                  <button
                    type="button"
                    onClick={onBuyProject}
                    disabled={buyingProject}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-black text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <ShoppingCart size={16} />
                    {buyingProject ? "Đang tạo link..." : "Mua source code"}
                  </button>
                </div>
              ) : (
                <a
                  href={sourceCodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 transition hover:bg-blue-50"
                >
                  <div>
                    <p className="text-sm font-black text-slate-900">
                      GitHub Source
                    </p>
                    <p className="text-xs text-slate-500">
                      Xem mã nguồn trên GitHub
                    </p>
                  </div>

                  {isPaidProject ? (
                    <CheckCircle2 className="text-emerald-500" size={18} />
                  ) : (
                    <ExternalLink className="text-blue-600" size={17} />
                  )}
                </a>
              )}
            </>
          )}

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 transition hover:bg-blue-50"
            >
              <div>
                <p className="text-sm font-black text-slate-900">Video Demo</p>
                <p className="text-xs text-slate-500">
                  Xem video giới thiệu dự án
                </p>
              </div>

              <ExternalLink className="text-blue-600" size={17} />
            </a>
          )}
        </div>
      </section>

      {/* CÔNG NGHỆ */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 text-base font-black text-slate-900">
          <Layers3 size={18} className="text-blue-600" />
          Công nghệ
        </h3>

        <div className="flex flex-wrap gap-2">
          {technologies?.length > 0 ? (
            technologies.map((tech) => (
              <span
                key={tech.id}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600"
              >
                {tech.name}
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-400">Chưa có công nghệ</span>
          )}
        </div>
      </section>

      {/* TÁC GIẢ */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-400">
          Tác giả
        </p>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-sm font-black text-emerald-700">
            {studentName?.charAt(0) || "U"}
          </div>

          <div>
            <p className="text-sm font-black text-slate-900">{studentName}</p>
            <p className="text-xs text-slate-500">Sinh viên thực hiện</p>
          </div>
        </div>
      </section>

      {/* THÔNG TIN THÊM */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-base font-black text-slate-900">
          <BadgeDollarSign size={18} className="text-blue-600" />
          Thông tin thêm
        </h3>

        <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-xs">
          <div>
            <p className="text-slate-400">Mã đồ án</p>
            <p className="mt-1 font-bold text-slate-900">#{projectId}</p>
          </div>

          <div>
            <p className="text-slate-400">Trạng thái</p>
            <p className="mt-1 font-bold text-emerald-600">
              {projectStatus || "PENDING"}
            </p>
          </div>

          <div>
            <p className="text-slate-400">Loại</p>
            <p className="mt-1 font-bold text-slate-900">
              {isPaidProject ? "Bán code" : "Miễn phí"}
            </p>
          </div>

          <div>
            <p className="text-slate-400">Giá bán</p>
            <p className="mt-1 font-black text-blue-600">
              {isPaidProject
                ? `${Number(priceDownload).toLocaleString("vi-VN")}đ`
                : "0đ"}
            </p>
          </div>
        </div>
      </section>

      {/* GHI CHÚ ADMIN */}
      {adminNote && (
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-black text-amber-700">
            <ShieldCheck size={17} />
            Ghi chú từ admin
          </h3>

          <p className="text-xs leading-5 text-amber-700">{adminNote}</p>
        </section>
      )}
    </>
  );
}
