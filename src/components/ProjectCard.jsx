import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden w-full h-full flex flex-col">
      <div className="h-36 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {project.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Tác giả: {project.author}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">Lượt xem</div>
            <div className="text-sm font-semibold text-slate-700">
              {project.views}
            </div>
          </div>
        </div>

        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
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
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {project.downloads} lượt tải
          </span>
          <button className="rounded-full bg-black px-3 py-1 text-white text-xs font-medium hover:bg-slate-800 transition">
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
