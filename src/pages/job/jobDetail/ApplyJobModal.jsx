import React, { useState } from "react";

export default function ApplyJobModal({ isOpen, onClose, jobTitle, company }) {
  const cvs = [
    {
      id: 1,
      name: "CV React Fresher 2026",
      updatedAt: "Cập nhật 2 tháng trước",
      status: "",
    },
    {
      id: 2,
      name: "CV Backend Intern",
      updatedAt: "Cập nhật 1 tháng trước",
      status: "Công khai",
    },
    {
      id: 3,
      name: "CV UI/UX Portfolio",
      updatedAt: "Cập nhật 3 ngày trước",
      status: "Riêng tư",
    },
  ];

  const [selectedCv, setSelectedCv] = useState(1);
  const [note, setNote] = useState(
    "Xin chào, tôi rất hứng thú với cơ hội ứng tuyển vị trí Frontend Developer Intern này. Tôi đã có kinh nghiệm với React, TailwindCSS và rất mong muốn được học hỏi thêm từ đội ngũ của quý công ty.",
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Ứng tuyển vị trí {jobTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{company}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4">
          {/* Select CV */}
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Chọn CV của bạn
            </h3>

            <div className="mt-4 space-y-3">
              {cvs.map((cv) => {
                const isSelected = selectedCv === cv.id;

                return (
                  <button
                    type="button"
                    key={cv.id}
                    onClick={() => setSelectedCv(cv.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50/40"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z"
                          />
                        </svg>
                      </div>

                      <div>
                        <p className="text-lg font-semibold text-slate-900">
                          {cv.name}
                        </p>
                        <p className="mt-0.5 text-sm text-slate-500">
                          {cv.updatedAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {cv.status && (
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            cv.status === "Công khai"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {cv.status}
                        </span>
                      )}

                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                          isSelected ? "border-indigo-500" : "border-slate-300"
                        }`}
                      >
                        {isSelected && (
                          <div className="h-3.5 w-3.5 rounded-full bg-indigo-500" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Note */}
          <div className="mt-6">
            <h3 className="text-base font-semibold text-slate-900">
              Thư giới thiệu / Ghi chú
            </h3>

            <div className="mt-3 rounded-2xl border border-slate-200 p-4">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={500}
                rows={4}
                className="w-full resize-none text-sm text-slate-700 outline-none"
                placeholder="Viết một lời nhắn ngắn gọn gửi đến nhà tuyển dụng..."
              />
              <div className="mt-2 text-right text-xs text-slate-500">
                {note.length} / 500
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            <button className="rounded-xl bg-slate-950 px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-800">
              Gửi ứng tuyển
            </button>

            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-base font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
