import React from "react";
import { Award, Star, UserCheck } from "lucide-react";

export default function TeacherEvaluationSection({ evaluations = [] }) {
  if (!evaluations.length) {
    return (
      <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
        <div className="absolute -right-6 -top-6 rotate-12 text-amber-100">
          <Star size={120} fill="currentColor" />
        </div>

        <h3 className="relative mb-6 flex items-center gap-3 text-xl font-black text-slate-900">
          <Star className="text-amber-400" fill="currentColor" size={24} />
          Đánh giá từ giảng viên
        </h3>

        <div className="relative rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 py-8 text-center">
          <Award className="mx-auto mb-3 text-slate-300" size={38} />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Chưa có đánh giá chính thức
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
      <div className="absolute -right-6 -top-6 rotate-12 text-amber-100">
        <Star size={120} fill="currentColor" />
      </div>

      <div className="relative mb-6 flex items-start justify-between gap-4">
        <h3 className="flex items-center gap-3 text-xl font-black text-slate-900">
          <Star className="text-amber-400" fill="currentColor" size={24} />
          Đánh giá từ giảng viên
        </h3>

        <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-amber-700">
          {evaluations.length} đánh giá
        </span>
      </div>

      <div className="relative space-y-4">
        {evaluations.map((item) => (
          <article
            key={item.id}
            className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <UserCheck size={16} className="text-emerald-500" />
                  <span>{item.teacherName}</span>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  {item.createdAtLabel}
                </p>
              </div>

              {item.score !== null && item.score !== undefined && (
                <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-amber-500 px-3 text-sm font-black text-white shadow-sm">
                  {item.score}
                </div>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {item.suggestions}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
