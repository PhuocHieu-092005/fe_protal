import React, { useEffect, useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import projectService from "../services/projectService";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";

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
        console.error(
          "Lỗi lấy danh sách đồ án public:",
          error?.response?.data || error,
        );
        setErrorText("Không thể tải danh sách đồ án.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const { row1, row2 } = useMemo(() => {
    if (!projects.length) {
      return { row1: [], row2: [] };
    }

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

  if (errorText) {
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

        <div className="px-4 text-center text-red-500">{errorText}</div>
      </div>
    );
  }

  if (!projects.length) {
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

        <div className="px-4 text-center text-slate-500">
          Hiện chưa có đồ án nào để hiển thị.
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-7xl bg-white py-20">
      <style>{`
        .marquee-forward { animation: scrollForward 23s linear infinite; }
        .marquee-reverse { animation: scrollReverse 23s linear infinite; }

        @keyframes scrollForward {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scrollReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .marquee-container:hover .marquee-inner {
          animation-play-state: paused;
        }
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
                className="mx-4 w-[310px] flex-shrink-0 transition-all duration-300 hover:z-50 hover:scale-105"
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
                className="mx-4 w-[310px] flex-shrink-0 transition-all duration-300 hover:z-50 hover:scale-105"
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
