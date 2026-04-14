import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
      {/* PHẦN TRÊN: ẢNH + LƯỢT XEM */}
      <div className="relative h-36 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span>{project.views}</span>
        </div>
      </div>

      {/* PHẦN DƯỚI: THÔNG TIN */}
      <div className="flex flex-1 flex-col p-4">
        <div>
          <h3 className="line-clamp-2 text-lg font-bold leading-7 text-slate-900">
            {project.title}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Tác giả:{" "}
            <span className="font-semibold text-slate-700">
              {project.author}
            </span>
          </p>
        </div>

        <p className="mt-3 flex-1 line-clamp-3 text-sm leading-7 text-slate-600">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v10m0 0l-4-4m4 4l4-4M5 20h14"
              />
            </svg>
            <span>
              <span className="font-semibold text-slate-700">
                {project.downloads}
              </span>{" "}
              lượt tải
            </span>
          </span>

          <Link
            to={`/project/${project.id}`}
            className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
