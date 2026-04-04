import React, { useEffect, useState } from "react";
import Footer from "../../../layouts/Footer";
import ProjectHero from "./ProjectHero";
import ProjectFilterSidebar from "./ProjectFilterSidebar";
import ProjectCard from "./ProjectCard";
import { getPublicProjects } from "../../../services/projectService";
import Pagination from "../../../components/common/Pagination";

export default function ProjectCategory() {
  const [filters, setFilters] = useState({
    title: "",
    priceType: "",
    page: 0,
    size: 9,
  });
  const [projects, setProjects] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    number: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await getPublicProjects({
        title: filters.title,
        page: filters.page,
        size: filters.size,
      });
      setProjects(res?.data?.content || []);
      setPageInfo({
        totalElements: res?.data?.totalElements || 0,
        totalPages: res?.data?.totalPages || 0,
        number: res?.data?.number || 0,
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <main className="mt-20 flex-grow pb-20">
        <ProjectHero
          keyword={filters.title}
          onKeywordChange={(v) => setFilters({ ...filters, title: v })}
          onSearch={(e) => {
            e.preventDefault();
            fetchProjects();
          }}
        />

        <div className="mx-auto max-w-7xl px-6 mt-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
            <ProjectFilterSidebar
              filters={filters}
              onChange={(f, v) => setFilters({ ...filters, [f]: v, page: 0 })}
            />

            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">
                  Cơ hội việc làm
                </h2>
                <div className="mt-2 h-1 w-16 bg-blue-600"></div>
                <p className="mt-4 text-slate-500 italic">
                  Những cơ hội việc làm mới nhất dành cho lập trình viên
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-80 animate-pulse bg-white rounded-2xl"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {projects.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </div>
              )}

              {pageInfo.totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination
                    currentPage={pageInfo.number + 1}
                    totalPages={pageInfo.totalPages}
                    setCurrentPage={(p) =>
                      setFilters({ ...filters, page: p - 1 })
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
