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

// --- ProjectCard: sửa UI giống kiểu JobCard, đơn giản hơn ---
const ProjectCard = ({ project }) => {
  return (
    <div className="flex h-full min-h-[330px] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      {/* Ảnh */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-100">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
        />

        {/* Lượt xem */}
        <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-sm backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 text-slate-700"
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

      {/* Nội dung */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[17px] font-bold leading-snug text-slate-900">
          {project.title}
        </h3>

        <p className="mt-2 text-sm text-slate-900">
          Tác giả:{" "}
          <span className="font-bold text-slate-750">{project.author}</span>
        </p>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-slate-600">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="rounded-lg bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600"
            >
              {tech}
            </span>
          ))}
        </div>

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
            className="group inline-flex items-center gap-1.5 rounded-lg !bg-slate-900 px-3.5 py-1.5 text-[12px] font-bold !text-white shadow-sm transition-all duration-200 hover:!bg-slate-700 active:scale-95"
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

// --- ProjectList: Giữ logic cũ, sửa hover và khoảng cách ---
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
        console.error("Lỗi lấy danh sách đồ án public:", error);
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
      <div className="mx-auto w-full max-w-7xl bg-white py-16">
        <div className="mb-10 px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Đồ án sinh viên nổi bật
          </h1>

          <p className="mx-auto mt-2 max-w-2xl italic text-gray-500">
            Các giải pháp công nghệ sáng tạo được đánh giá cao bởi Khoa.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[330px] animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      </div>
    );
  }

  if (errorText) {
    return (
      <div className="mx-auto w-full max-w-7xl bg-white py-16">
        <div className="mb-10 px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Đồ án sinh viên nổi bật
          </h1>

          <p className="mx-auto mt-2 max-w-2xl italic text-gray-500">
            Các giải pháp công nghệ sáng tạo được đánh giá cao bởi Khoa.
          </p>
        </div>

        <div className="px-4 text-center text-red-500">{errorText}</div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-7xl bg-white py-16">
      <style>{`
        .marquee-forward {
          animation: scrollForward 23s linear infinite;
        }

        .marquee-reverse {
          animation: scrollReverse 23s linear infinite;
        }

        @keyframes scrollForward {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollReverse {
          0% {
            transform: translateX(-50%);
          }

          100% {
            transform: translateX(0);
          }
        }

        .marquee-container:hover .marquee-inner {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mb-10 px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Đồ án sinh viên nổi bật
        </h1>

        <p className="mx-auto mt-2 max-w-2xl italic text-gray-500">
          Các giải pháp công nghệ sáng tạo được đánh giá cao bởi Khoa.
        </p>
      </div>

      <div className="flex flex-col gap-8 overflow-hidden py-2">
        <div className="marquee-container relative flex overflow-hidden">
          <div className="marquee-inner marquee-forward flex">
            {row1.map((project, index) => (
              <div
                key={`row1-${project.id || index}-${index}`}
                className="mx-1.5 w-[310px] flex-shrink-0 transition-all duration-300"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        <div className="marquee-container relative flex overflow-hidden">
          <div className="marquee-inner marquee-reverse flex">
            {row2.map((project, index) => (
              <div
                key={`row2-${project.id || index}-${index}`}
                className="mx-1.5 w-[310px] flex-shrink-0 transition-all duration-300"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-white via-white/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-white via-white/80 to-transparent" />
    </div>
  );
};

export default ProjectList;
