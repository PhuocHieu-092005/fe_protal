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
      <section
        className={`rounded-[2.5rem] p-8 shadow-sm ${
          isPaidProject
            ? "border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50"
            : "border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              Giá truy cập source
            </p>
            <h3
              className={`mt-3 text-3xl font-black md:text-4xl ${
                isPaidProject ? "text-orange-600" : "text-emerald-600"
              }`}
            >
              {isPaidProject
                ? `${Number(priceDownload).toLocaleString("vi-VN")} VNĐ`
                : "Miễn phí"}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {isPaidProject
                ? "Đồ án này thuộc dạng có phí. Link GitHub sẽ mở sau khi tích hợp thanh toán."
                : "Bạn có thể xem và truy cập source code trực tiếp ngay bây giờ."}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-wider ${
              isPaidProject ? "bg-orange-500 text-white" : "bg-emerald-500 text-white"
            }`}
          >
            {isPaidProject ? "Có phí" : "Miễn phí"}
          </span>
        </div>
      </section>

      {currentUserRole === "COMPANY" && (
        <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-black text-slate-900">
            <Handshake size={20} className="text-blue-600" />
            Hợp tác project
          </h3>

          <p className="mb-5 text-sm leading-relaxed text-slate-600">
            Nếu bạn là doanh nghiệp và muốn hợp tác hoặc xin quyền truy cập project này,
            hãy gửi yêu cầu để admin xem xét và phản hồi.
          </p>

          <button
            type="button"
            onClick={onOpenRequestModal}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-blue-600"
          >
            <Send size={16} />
            Gửi yêu cầu hợp tác
          </button>
        </section>
      )}

      <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
        <h3 className="mb-6 flex items-center gap-2 text-2xl font-black text-slate-900">
          <BookOpen size={22} className="text-blue-500" />
          Tài nguyên
        </h3>

        <div className="space-y-4">
          {sourceCodeUrl && (
            <>
              {isPaidProject && !isPurchased ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-base font-bold text-slate-900">
                      <Lock size={16} className="text-amber-600" />
                      GitHub Source
                    </span>
                    <span className="rounded-full bg-amber-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                      Locked
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Source code đang bị khóa. Bấm mua để tạo link thanh toán payOS và mở khóa sau khi thanh toán thành công.
                  </p>

                  <button
                    type="button"
                    onClick={onBuyProject}
                    disabled={buyingProject}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-600 px-5 py-3 text-sm font-black text-white shadow-sm transition-all hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-orange-300"
                  >
                    <ShoppingCart size={17} />
                    {buyingProject ? "Đang tạo link..." : "Mua source code"}
                  </button>
                </div>
              ) : (
                <a
                  href={sourceCodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-blue-200 hover:bg-blue-50"
                >
                  <div>
                    <p className="text-base font-bold text-slate-900">GitHub Source</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Xem mã nguồn của đồ án
                    </p>
                  </div>
                  {isPaidProject ? (
                    <CheckCircle2
                      className="text-emerald-500 transition-all group-hover:text-emerald-600"
                      size={20}
                    />
                  ) : (
                    <ExternalLink
                      className="text-slate-400 transition-all group-hover:text-blue-600"
                      size={18}
                    />
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
              className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-blue-200 hover:bg-blue-50"
            >
              <div>
                <p className="text-base font-bold text-slate-900">Video Demo</p>
                <p className="mt-1 text-xs text-slate-500">
                  Xem bản trình bày và mô phỏng sản phẩm
                </p>
              </div>
              <ExternalLink
                className="text-slate-400 transition-all group-hover:text-blue-600"
                size={18}
              />
            </a>
          )}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
        <h3 className="mb-6 flex items-center gap-2 text-2xl font-black text-slate-900">
          <Layers3 size={20} className="text-slate-500" />
          Công nghệ
        </h3>

        <div className="flex flex-wrap gap-3">
          {technologies?.map((tech) => (
            <span
              key={tech.id}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600"
            >
              {tech.iconUrl && (
                <img
                  src={tech.iconUrl}
                  alt=""
                  className="h-4 w-4 rounded object-contain"
                />
              )}
              {tech.name}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
        <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
          Tác giả
        </p>

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-xl font-black text-slate-900 shadow-sm">
            {studentName?.charAt(0)}
          </div>
          <div className="text-xl font-bold text-slate-900">{studentName}</div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-black text-slate-900">
          <BadgeDollarSign size={20} className="text-emerald-500" />
          Thông tin thêm
        </h3>

        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-slate-500">Mã đồ án</span>
            <span className="font-bold text-slate-900">#{projectId}</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-slate-500">Trạng thái</span>
            <span className="font-bold text-slate-900">{projectStatus || "PENDING"}</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-slate-500">Loại</span>
            <span className="font-bold text-slate-900">
              {isPaidProject ? "Bán code" : "Miễn phí"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Giá bán</span>
            <span
              className={`font-black ${
                isPaidProject ? "text-orange-600" : "text-emerald-600"
              }`}
            >
              {isPaidProject
                ? `${Number(priceDownload).toLocaleString("vi-VN")} VNĐ`
                : "0 VNĐ"}
            </span>
          </div>
        </div>
      </section>

      {adminNote && (
        <section className="rounded-[2.5rem] border border-rose-200 bg-rose-50 p-8 shadow-sm">
          <h3 className="mb-3 text-lg font-black text-rose-700">Ghi chú từ admin</h3>
          <p className="text-sm leading-relaxed text-rose-600">{adminNote}</p>
        </section>
      )}
    </>
  );
}
