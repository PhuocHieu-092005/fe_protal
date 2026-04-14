import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Download, User } from "lucide-react";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group">
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden">
        <img
          src={
            project.images?.[0]?.imageUrl ||
            "https://via.placeholder.com/400x225"
          }
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
              project.price_type === "FREE"
                ? "bg-emerald-500 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {project.price_type === "FREE" ? "Miễn phí" : "Có phí"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 text-left">
        <h3 className="text-lg font-black text-slate-900 mb-2 truncate">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 text-slate-400 text-xs mb-6">
          <User size={14} />
          <span className="font-medium">{project.student_name}</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Eye size={14} /> {project.view_count}
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Download size={14} /> {project.download_count}
            </div>
          </div>
          <div className="text-blue-600 font-black">
            {project.price_type === "FREE"
              ? "0đ"
              : `${project.price_download?.toLocaleString()}đ`}
          </div>
        </div>

        {/* NÚT BẤM QUAN TRỌNG */}
        <button
          onClick={() => navigate(`/project/${project.id}`)}
          className="w-full py-3 bg-zinc-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors"
        >
          Xem chi tiết đồ án
        </button>
      </div>
    </div>
  );
}
