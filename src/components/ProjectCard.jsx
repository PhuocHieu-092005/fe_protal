import React from "react";
import { Link } from "react-router-dom";
const ProjectCard = ({ project }) => {
  return (
    <div className="flex h-full min-h-[335px] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      {/* ẢNH PROJECT */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-100">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
        />

        {/* Lượt xem */}
        <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-sm backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>

          <span>{project.views.toLocaleString()}</span>
        </div>
      </div>

      {/* NỘI DUNG */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[17px] font-bold leading-snug text-slate-900">
          {project.title}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Tác giả:{" "}
          <span className="font-semibold text-slate-700">{project.author}</span>
        </p>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-slate-600">
          {project.description}
        </p>

        {/* Công nghệ */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="rounded-md bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-600"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v10m0 0l-4-4m4 4l4-4M5 20h14"
              />
            </svg>

            <span className="text-xs">
              <span className="font-bold text-slate-700">
                {project.downloads}
              </span>{" "}
              lượt tải
            </span>
          </span>
          <Link
            to={`/project/${project.id}`}
            className="group inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-[12px] font-bold text-white transition-all duration-200 hover:bg-slate-700 active:scale-95"
          >
            <span>Chi tiết</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
