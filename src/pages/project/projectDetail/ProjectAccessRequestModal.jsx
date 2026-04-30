import React from "react";
import { Handshake, Send, X } from "lucide-react";

export default function ProjectAccessRequestModal({
  open,
  onClose,
  requestReason,
  setRequestReason,
  handleSubmitAccessRequest,
  requestLoading,
  projectTitle,
  studentName,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="flex items-center gap-2 text-2xl font-black text-slate-900">
              <Handshake size={24} className="text-blue-600" />
              Gửi yêu cầu hợp tác
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Gửi yêu cầu hợp tác hoặc xin quyền truy cập project này tới hệ
              thống.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Project
          </p>
          <p className="mt-2 text-base font-bold text-slate-900">
            {projectTitle}
          </p>
          <p className="mt-1 text-sm text-slate-500">Tác giả: {studentName}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            Lý do gửi yêu cầu
          </label>
          <textarea
            rows="6"
            value={requestReason}
            onChange={(e) => setRequestReason(e.target.value)}
            placeholder="Ví dụ: Chúng tôi muốn trao đổi thêm về project này để hợp tác phát triển hoặc xin quyền truy cập..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-blue-500"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={handleSubmitAccessRequest}
            disabled={requestLoading}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={16} />
            {requestLoading ? "Đang gửi..." : "Gửi yêu cầu"}
          </button>
        </div>
      </div>
    </div>
  );
}
