import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import projectService from "../services/projectService";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";

// --- Helper Functions (Giữ nguyên 100%) ---
function normalizeProjectsResponse(res) {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.content)) return res.content;
  if (Array.isArray(res?.data?.content)) return res.data.content;
  if (Array.isArray(res?.data?.data)) return res.data.data;
  if (Array.isArray(res?.data?.data?.content)) return res.data.data.content;
  return [];
}

function mapProjectForCard(project) {
  const technologies = Array.isArray(project?.technologies)
    ? project.technologies.map((tech) => tech?.name).filter(Boolean)
    : [];

  const firstImage =
    project?.images?.[0]?.imageUrl ||
    project?.images?.[0]?.image_url ||
    project?.projectImages?.[0]?.imageUrl ||
    project?.projectImages?.[0]?.image_url ||
    project?.thumbnailUrl ||
    project?.thumbnail_url ||
    project?.image ||
    FALLBACK_IMAGE;

  const author =
    project?.student_name ||
    project?.studentName ||
    project?.student?.full_name ||
    project?.student?.fullName ||
    project?.student?.user?.full_name ||
    project?.student?.user?.fullName ||
    "Sinh viên";

  return {
    id: project?.id,
    title: project?.title || "Chưa có tiêu đề",
    author,
    techStack: technologies,
    views: project?.viewCount ?? project?.view_count ?? 0,
    downloads: project?.downloadCount ?? project?.download_count ?? 0,
    image: firstImage,
    description: project?.description || "Chưa có mô tả",
    raw: project,
  };
}

// --- ProjectCard: Chỉ sửa UI hiển thị, không thêm hiệu ứng mới ---
const ProjectCard = ({ project }) => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200">
      {/* PHẦN TRÊN: ẢNH + LƯỢT XEM */}
      <div className="relative h-36 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
        />

        {/* Badge Mắt xem: Sửa lại cho tinh tế (Glassmorphism nhẹ) */}
        <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-800 shadow-sm backdrop-blur-sm border border-slate-200/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
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

      {/* PHẦN DƯỚI: THÔNG TIN */}
      <div className="flex flex-1 flex-col p-4">
        <div>
          <h3 className="line-clamp-2 text-[17px] font-bold leading-snug text-slate-900">
            {project.title}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Tác giả:{" "}
            <span className="font-semibold text-slate-700">
              {project.author}
            </span>
          </p>
        </div>

        <p className="mt-3 flex-1 line-clamp-3 text-sm leading-relaxed text-slate-600">
          {project.description}
        </p>

        {/* Tags: Đổi sang màu Indigo nhẹ để có điểm nhấn hơn xám cũ */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-600 border border-indigo-100"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-slate-400"
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
            <span className="text-xs">
              <span className="font-bold text-slate-700">
                {project.downloads}
              </span>{" "}
              lượt tải
            </span>
          </span>

          <Link
            to={`/project/${project.id}`}
            className="rounded-full bg-slate-900 px-4 py-1.5 text-[11px] font-bold text-white transition hover:bg-blue-600"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- ProjectList: Giữ nguyên hiệu ứng marquee và hover ban đầu ---
const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setErrorText("");
        const res = await projectService.getPublicProjects({
          page: 0,
          size: 8,
        });
        const list = normalizeProjectsResponse(res);
        const mapped = list.map(mapProjectForCard);
        setProjects(mapped);
      } catch (error) {
        setErrorText("Không thể tải danh sách đồ án.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const { row1, row2 } = useMemo(() => {
    if (!projects.length) return { row1: [], row2: [] };
    const midpoint = Math.ceil(projects.length / 2);
    const firstHalf = projects.slice(0, midpoint);
    const secondHalf = projects.slice(midpoint);
    const safeRow1 = firstHalf.length ? firstHalf : projects;
    const safeRow2 = secondHalf.length ? secondHalf : safeRow1;
    return {
      row1: [...safeRow1, ...safeRow1],
      row2: [...safeRow2, ...safeRow2],
    };
  }, [projects]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-7xl bg-white py-20">
        <div className="mb-12 px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Đồ án sinh viên nổi bật
          </h1>
          <p className="mx-auto mt-2 max-w-2xl italic text-gray-500">
            Các giải pháp công nghệ sáng tạo được đánh giá cao bởi Khoa.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[430px] animate-pulse rounded-[28px] bg-slate-100"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-7xl bg-white py-20">
      <style>{`
        .marquee-forward { animation: scrollForward 23s linear infinite; }
        .marquee-reverse { animation: scrollReverse 23s linear infinite; }
        @keyframes scrollForward { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scrollReverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .marquee-container:hover .marquee-inner { animation-play-state: paused; }
      `}</style>

      <div className="mb-12 px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Đồ án sinh viên nổi bật
        </h1>
        <p className="mx-auto mt-2 max-w-2xl italic text-gray-500">
          Các giải pháp công nghệ sáng tạo được đánh giá cao bởi Khoa.
        </p>
      </div>

      <div className="flex flex-col gap-10 overflow-hidden py-4">
        <div className="marquee-container relative flex overflow-visible group">
          <div className="marquee-inner marquee-forward flex">
            {row1.map((project, index) => (
              <div
                key={`row1-${project.id || index}-${index}`}
                className="mx-1 w-[310px] flex-shrink-0 transition-all duration-300 hover:z-50 hover:scale-105"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        <div className="marquee-container relative flex overflow-visible group">
          <div className="marquee-inner marquee-reverse flex">
            {row2.map((project, index) => (
              <div
                key={`row2-${project.id || index}-${index}`}
                className="mx-1 w-[310px] flex-shrink-0 transition-all duration-300 hover:z-50 hover:scale-105"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-gradient-to-r from-white via-white/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-gradient-to-l from-white via-white/80 to-transparent" />
    </div>
  );
};

export default ProjectList;
