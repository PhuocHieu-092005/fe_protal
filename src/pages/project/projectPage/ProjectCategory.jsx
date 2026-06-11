import React, { useEffect, useMemo, useState } from "react";
import Footer from "../../../layouts/Footer";
import ProjectHero from "./ProjectHero";
import ProjectFilterSidebar from "./ProjectFilterSidebar";
import ProjectCard from "./ProjectCard";
import { getPublicProjects } from "../../../services/projectService";
import technologyService from "../../../services/technologyService";
import Pagination from "../../../components/common/Pagination";
import { SlidersHorizontal, X } from "lucide-react";

export default function ProjectCategory() {
  const [filterOpen, setFilterOpen] = useState(false);

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
    setFilterOpen(false);
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
    setFilterOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <main className="mt-16 flex-grow pb-20">
        <ProjectHero
          keyword={keyword}
          onKeywordChange={setKeyword}
          onSearch={handleSearch}
        />

        <div className="mx-auto mt-8 w-[90%] max-w-[1450px] lg:mt-10">
          <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Danh sách đồ án
              </h2>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Tìm thấy{" "}
                <span className="font-bold text-blue-600">
                  {filters.priceType
                    ? filteredProjects.length
                    : pageInfo.totalElements}
                </span>{" "}
                đồ án
              </p>
            </div>

            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm"
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            <div className="hidden lg:block">
              <ProjectFilterSidebar
                filters={filters}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
                technologies={technologies}
              />
            </div>

            <div className="min-w-0">
              <div className="mb-7 hidden items-center justify-between lg:flex">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Danh sách đồ án
                  </h2>
                  <div className="mt-2 h-1 w-12 rounded-full bg-blue-600"></div>
                </div>

                <p className="text-sm font-medium text-slate-500">
                  Tìm thấy{" "}
                  <span className="font-bold text-blue-600">
                    {filters.priceType
                      ? filteredProjects.length
                      : pageInfo.totalElements}
                  </span>{" "}
                  đồ án
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
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
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
                      {filteredProjects.map((p) => (
                        <ProjectCard key={p.id} project={p} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-20">
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

      {filterOpen && (
        <>
          <div
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setFilterOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 z-[90] w-[78%] max-w-[310px] overflow-y-auto bg-white p-3 shadow-2xl lg:hidden">
            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Bộ lọc</h2>

              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <ProjectFilterSidebar
              filters={filters}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              technologies={technologies}
            />
          </div>
        </>
      )}
    </div>
  );
}
