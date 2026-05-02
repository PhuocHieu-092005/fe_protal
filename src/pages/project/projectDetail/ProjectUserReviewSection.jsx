import React from "react";
import { MessageCircleMore, Star, User } from "lucide-react";

export default function ProjectUserReviewSection() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm md:p-10">
      <div className="absolute -right-6 -top-6 rotate-12 text-blue-100">
        <MessageCircleMore size={120} />
      </div>

      <h3 className="relative mb-8 flex items-center gap-3 text-2xl font-black text-slate-900">
        <Star className="text-blue-500" fill="currentColor" size={28} />
        Đánh giá người dùng
      </h3>

      <div className="relative rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
        <User className="mx-auto mb-3 text-slate-300" size={40} />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Chưa có đánh giá từ người dùng
        </p>
      </div>
    </section>
  );
}
