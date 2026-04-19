import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  // state trạng thái yêu thích
  // const [isFavorite, setIsFavorite] = useState(false);

  // const handleFavoriteClick = (e) => {
  //   e.preventDefault(); // Tránh bị chuyển trang khi bấm tim
  //   setIsFavorite(!isFavorite);
  // };

  return (
    /* SỬA TẠI ĐÂY: Thêm h-fit để card không bao giờ cao hơn nội dung của chính nó */
    <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg h-fit w-full">
      {/* Top: Logo & Title */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={job.companyLogo}
            alt={job.companyName}
            className="h-14 w-14 rounded-2xl border border-slate-100 object-cover p-2 flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm text-slate-500 truncate">{job.company}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900 line-clamp-1">
              {job.title}
            </h3>
          </div>
        </div>

        {/* <button
          onClick={handleFavoriteClick}
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 text-xl leading-none ${
            isFavorite
              ? "border-red-100 bg-red-50 text-red-500 scale-110"
              : "border-slate-200 bg-white text-slate-400 hover:border-red-100 hover:bg-red-50 hover:text-red-400"
          }`}
        >
          ♥
        </button> */}
      </div>

      {/* Info Badges */}
      <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1.5 whitespace-nowrap">
          {job.workLocation}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5 whitespace-nowrap">
          {job.jobType}
        </span>
     
      </div>

      {/* Salary & Time */}
      <div className="mt-5">
        <p className="text-lg font-bold text-slate-900">{job.salary}</p>
        <p className="mt-1 text-sm text-slate-500">Đăng {job.startDay}</p>
      </div>

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {job.tags &&
          job.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
            >
              {tag}
            </span>
          ))}
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-3">
        <Link
          to={`/job/${job.id}`}
          className="flex-1 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800flex-1 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 text-center"
        >
          Xem chi tiết
        </Link>

       
      </div>
    </div>
  );
}
