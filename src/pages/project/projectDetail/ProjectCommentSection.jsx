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
    <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm md:p-10">
      <div className="absolute -right-6 -top-6 rotate-12 text-blue-100">
        <MessageCircleMore size={120} />
      </div>

      <h3 className="relative mb-8 flex items-center gap-3 text-2xl font-black text-slate-900">
        <MessageSquareText className="text-blue-500" size={28} />
        Bình luận dự án
      </h3>

      <div className="relative rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
        <label className="mb-2 block text-sm font-bold text-slate-700">
          Viết bình luận của bạn
        </label>
        <textarea
          rows="4"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Nhập nội dung bình luận về project này..."
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-blue-500"
        />

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleSubmitComment}
            disabled={submittingComment}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={16} />
            {submittingComment ? "Đang gửi..." : "Gửi bình luận"}
          </button>
        </div>
      </div>

      <div className="relative mt-6 space-y-4">
        {commentLoading ? (
          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
            <p className="text-sm font-bold text-slate-400">
              Đang tải bình luận...
            </p>
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 font-black text-slate-700">
                  {comment.fullName?.charAt(0) || "U"}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <h4 className="font-bold text-slate-900">
                      {comment.fullName || "Người dùng"}
                    </h4>
                    <span className="text-xs text-slate-400">
                      {formatCommentTime(comment.createdAt)}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
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
