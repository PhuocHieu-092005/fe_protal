import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import projectService from "../services/projectService";
import { Download, Eye } from "lucide-react";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";

// --- Helper Functions (Giữ nguyên) ---
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

// --- ProjectCard: Thu nhỏ size chữ và padding để hợp với card 220px ---
const ProjectCard = ({ project }) => {
  return (
    <div className="flex h-full min-h-[310px] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-400 hover:shadow-md md:min-h-[330px]">
      {/* Ảnh */}
      <div className="relative h-28 w-full overflow-hidden bg-slate-100 md:h-36">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur-sm md:right-3 md:top-3 md:px-2.5 md:py-1 md:text-[11px]">
          <Eye size={13} className="text-slate-500" />
          <span>{project.views.toLocaleString()}</span>
        </div>
      </div>

      {/* Nội dung */}
      <div className="flex flex-1 flex-col p-3 md:p-4">
        <h3 className="line-clamp-2 text-[14px] font-bold leading-tight text-slate-900 md:text-[17px] md:leading-snug">
          {project.title}
        </h3>

        <p className="mt-1.5 text-[12px] text-slate-900 md:text-sm">
          Tác giả:{" "}
          <span className="font-bold text-slate-750">{project.author}</span>
        </p>

        <p className="mt-2 line-clamp-2 flex-1 text-[11px] leading-5 text-slate-600 md:text-sm md:leading-6">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {project.techStack.slice(0, 2).map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="rounded-md bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-600 md:text-[11px]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-sm text-slate-500 md:mt-4 md:pt-4">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 md:text-xs">
            <Download size={13} className="text-slate-400" />
            {project.downloads} tải
          </span>

          <Link
            to={`/project/${project.id}`}
            className="group inline-flex items-center gap-1 rounded-lg !bg-slate-900 px-2.5 py-1 text-[10px] font-bold !text-white shadow-sm transition-all md:px-3.5 md:py-1.5 md:text-[12px]"
          >
            <span>Chi tiết</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 transition-transform group-hover:translate-x-0.5 md:h-3.5 md:w-3.5"
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

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await projectService.getPublicProjects({
          page: 0,
          size: 8,
        });
        const list = normalizeProjectsResponse(res);
        setProjects(list.map(mapProjectForCard));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const { row1, row2 } = useMemo(() => {
    if (!projects.length) return { row1: [], row2: [] };
    const midpoint = Math.ceil(projects.length / 2);
    const r1 = projects.slice(0, midpoint);
    const r2 = projects.slice(midpoint);
    return { row1: [...r1, ...r1], row2: [...r2, ...r2] };
  }, [projects]);

  if (loading) return <div className="py-20 text-center">Đang tải...</div>;

  return (
    <div className="relative mx-auto w-full max-w-7xl bg-white py-10 md:py-16">
      <style>{`
        .marquee-forward { animation: scrollForward 35s linear infinite; }
        .marquee-reverse { animation: scrollReverse 35s linear infinite; }
        
        @keyframes scrollForward { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scrollReverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        
        /* Hiệu ứng dừng khi di chuột vào container */
        .marquee-container:hover .marquee-inner {
          animation-play-state: paused !important;
        }

        @media (max-width: 768px) {
          .marquee-forward, .marquee-reverse { animation-duration: 25s; }
        }
      `}</style>

      <div className="mb-8 px-4 text-center md:mb-10">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
          Đồ án sinh viên nổi bật
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
          Các giải pháp công nghệ sáng tạo được đánh giá cao, phù hợp để tham
          khảo ý tưởng và cách triển khai thực tế.
        </p>
      </div>

      <div className="flex flex-col gap-5 overflow-hidden py-2 md:gap-8">
        {/* Row 1 */}
        <div className="marquee-container relative flex overflow-hidden">
          <div className="marquee-inner marquee-forward flex">
            {row1.map((project, index) => (
              <div
                key={`r1-${index}`}
                className="mx-2 w-[220px] flex-shrink-0 md:mx-3 md:w-[310px]"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="marquee-container relative flex overflow-hidden">
          <div className="marquee-inner marquee-reverse flex">
            {row2.map((project, index) => (
              <div
                key={`r2-${index}`}
                className="mx-2 w-[220px] flex-shrink-0 md:mx-3 md:w-[310px]"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient phủ hai bên: Chỉ hiện trên Desktop */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-32 bg-gradient-to-r from-white via-white/80 to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-32 bg-gradient-to-l from-white via-white/80 to-transparent md:block" />
    </div>
  );
};

export default ProjectList;
