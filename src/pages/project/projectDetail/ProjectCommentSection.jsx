import React from "react";
import { MessageCircleMore, MessageSquareText, Send, User } from "lucide-react";

export default function ProjectCommentSection({
  comments,
  commentLoading,
  commentContent,
  setCommentContent,
  submittingComment,
  handleSubmitComment,
  formatCommentTime,
}) {
  return (
    <section className="relative overflow-hidden rounded-none border border-slate-100 bg-white p-4 shadow-sm md:p-10">
      <div className="absolute -right-6 -top-6 rotate-12 text-blue-100">
        <MessageCircleMore size={120} />
      </div>

      <h3 className="relative mb-5 flex items-center gap-3 text-xl font-black text-slate-900 md:mb-8 md:text-2xl">
        <MessageSquareText className="text-blue-500" size={28} />
        Bình luận Dự án
      </h3>

      {/* RESPONSIVE UI: mobile giảm bo/gap/padding, desktop giữ style cũ */}
      <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4 md:rounded-[2rem] md:p-5">
        <label className="mb-2 block text-sm font-bold text-slate-700">
          Viết bình luận của bạn
        </label>
        <textarea
          rows="4"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Nhập nội dung bình luận về project này..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 md:rounded-2xl"
        />

        <div className="mt-3 flex justify-end md:mt-4">
          <button
            type="button"
            onClick={handleSubmitComment}
            disabled={submittingComment}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto md:rounded-2xl"
          >
            <Send size={16} />
            {submittingComment ? "Đang gửi..." : "Gửi bình luận"}
          </button>
        </div>
      </div>

      {/* RESPONSIVE UI: chỉ danh sách bình luận có thanh cuộn riêng, không làm trang quá dài */}
      <div className="relative mt-4 max-h-[420px] overflow-y-auto rounded-2xl border border-slate-100 md:mt-6 md:max-h-[560px] md:space-y-4 md:rounded-none md:border-0 md:pr-2">
        {commentLoading ? (
          <div className="border border-dashed border-slate-200 bg-slate-50 py-10 text-center md:rounded-[2rem]">
            <p className="text-sm font-bold text-slate-400">
              Đang tải bình luận...
            </p>
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border-b border-slate-100 bg-white p-4 last:border-b-0 md:rounded-[2rem] md:border md:border-slate-100 md:p-5 md:shadow-sm"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-black text-slate-700 md:h-12 md:w-12 md:rounded-2xl">
                  {comment.fullName?.charAt(0) || "U"}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <h4 className="break-words font-bold text-slate-900">
                      {comment.fullName || "Người dùng"}
                    </h4>
                    <span className="text-xs text-slate-400">
                      {formatCommentTime(comment.createdAt)}
                    </span>
                  </div>

                  <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="border border-dashed border-slate-200 bg-slate-50 py-10 text-center md:rounded-[2rem]">
            <User className="mx-auto mb-3 text-slate-300" size={40} />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Chưa có bình luận nào
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
