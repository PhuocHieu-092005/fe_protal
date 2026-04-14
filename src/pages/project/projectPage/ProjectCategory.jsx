import React, { useEffect, useMemo, useState } from "react";
import Footer from "../../../layouts/Footer";
import ProjectHero from "./ProjectHero";
import ProjectFilterSidebar from "./ProjectFilterSidebar";
import ProjectCard from "./ProjectCard";
import { getPublicProjects } from "../../../services/projectService";
import technologyService from "../../../services/technologyService";
import Pagination from "../../../components/common/Pagination";

export default function ProjectCategory() {
  const [filters, setFilters] = useState({
    title: "",
    priceType: "",
    technologyId: "",
    page: 0,
    size: 9,
  });

  const [keyword, setKeyword] = useState("");
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    number: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchProjects = async (customFilters = filters) => {
    setLoading(true);
    try {
      const params = {
        title: customFilters.title || "",
        technologyId: customFilters.technologyId || "",
        page: customFilters.page ?? 0,
        size: customFilters.size ?? 9,
      };

      const res = await getPublicProjects(params);
      const content = res?.data?.content || [];

      setProjects(content);
      setPageInfo({
        totalElements: res?.data?.totalElements || 0,
        totalPages: res?.data?.totalPages || 0,
        number: res?.data?.number || 0,
      });
    } catch (err) {
      console.error("Lỗi fetch projects:", err);
      setProjects([]);
      setPageInfo({
        totalElements: 0,
        totalPages: 0,
        number: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTechnologies = async () => {
    try {
      const res = await technologyService.getAllTechnologies();
      const techs = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
          ? res.data
          : [];
      setTechnologies(techs);
    } catch (err) {
      console.error("Lỗi fetch technologies:", err);
      setTechnologies([]);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  useEffect(() => {
    fetchProjects(filters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters.page, filters.technologyId, filters.size]);

  const filteredProjects = useMemo(() => {
    if (!filters.priceType) return projects;

    return projects.filter((project) => {
      const projectPriceType = project.priceType || project.price_type || "";
      return projectPriceType === filters.priceType;
    });
  }, [projects, filters.priceType]);

  const handleSearch = () => {
    const nextFilters = {
      ...filters,
      title: keyword.trim(),
      page: 0,
    };

    setFilters(nextFilters);
    fetchProjects(nextFilters);
  };

  const handleApplyFilters = (tempFilters) => {
    const nextFilters = {
      ...filters,
      ...tempFilters,
      title: keyword.trim(),
      technologyId: tempFilters.technologyId
        ? Number(tempFilters.technologyId)
        : "",
      page: 0,
    };

    setFilters(nextFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      title: "",
      priceType: "",
      technologyId: "",
      page: 0,
      size: 9,
    };

    setKeyword("");
    setFilters(resetFilters);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <main className="mt-16 flex-grow pb-20">
        <ProjectHero
          keyword={keyword}
          onKeywordChange={setKeyword}
          onSearch={handleSearch}
        />

        <div className="mx-auto mt-12 max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr]">
            <ProjectFilterSidebar
              filters={filters}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              technologies={technologies}
            />

            <div>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Danh sách đồ án
                  </h2>
                  <div className="mt-2 h-1 w-12 bg-blue-600"></div>
                </div>

                <p className="text-sm font-medium text-slate-500">
                  Tìm thấy{" "}
                  <span className="text-blue-600">
                    {filters.priceType
                      ? filteredProjects.length
                      : pageInfo.totalElements}
                  </span>{" "}
                  đồ án
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-[380px] animate-pulse rounded-2xl border border-slate-100 bg-white shadow-sm"
                    />
                  ))}
                </div>
              ) : (
                <>
                  {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {filteredProjects.map((p) => (
                        <ProjectCard key={p.id} project={p} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-20">
                      <div className="mb-4 text-slate-300">
                        <svg
                          className="h-16 w-16"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>

                      <p className="font-medium text-slate-500">
                        Không tìm thấy đồ án nào phù hợp với bộ lọc.
                      </p>

                      <button
                        onClick={handleResetFilters}
                        className="mt-4 font-bold text-blue-600 hover:underline"
                      >
                        Xóa tất cả bộ lọc
                      </button>
                    </div>
                  )}
                </>
              )}

              {pageInfo.totalPages > 1 && !filters.priceType && (
                <div className="mt-12 flex justify-center">
                  <Pagination
                    currentPage={pageInfo.number + 1}
                    totalPages={pageInfo.totalPages}
                    setCurrentPage={(p) =>
                      setFilters((prev) => ({ ...prev, page: p - 1 }))
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
