import React, { useEffect, useState } from "react";
import Footer from "../../../layouts/Footer";
import ProjectHero from "./ProjectHero";
import ProjectFilterSidebar from "./ProjectFilterSidebar";
import ProjectCard from "./ProjectCard";
import { getPublicProjects } from "../../../services/projectService";
import Pagination from "../../../components/common/Pagination";

export default function ProjectCategory() {
  // 1. State quản lý bộ lọc chính
  const [filters, setFilters] = useState({
    title: "",
    priceType: "",
    technologyId: "",
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

  // 2. Hàm gọi API lấy danh sách đồ án
  const fetchProjects = async () => {
    setLoading(true);
    try {
      // Gửi toàn bộ object filters lên API
      const res = await getPublicProjects(filters);
      setProjects(res?.data?.content || []);
      setPageInfo({
        totalElements: res?.data?.totalElements || 0,
        totalPages: res?.data?.totalPages || 0,
        number: res?.data?.number || 0,
      });
    } catch (err) {
      console.error("Lỗi fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  // 3. Effect theo dõi sự thay đổi của filters để gọi lại API
  // (Khi nhấn Áp dụng hoặc chuyển trang, filters thay đổi -> fetchProjects chạy)
  useEffect(() => {
    fetchProjects();
    // Cuộn lên đầu trang khi chuyển trang hoặc lọc
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters.page, filters.priceType, filters.technologyId, filters.size]);

  // 4. Xử lý khi nhấn nút "Tìm kiếm" ở Hero
  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, page: 0 }));
    fetchProjects();
  };

  // 5. Xử lý khi nhấn nút "Áp dụng" ở Sidebar (Nhận toàn bộ filter tạm thời từ con)
  const handleApplyFilters = (tempFilters) => {
    setFilters({
      ...tempFilters,
      page: 0, // Reset về trang 1 khi áp dụng bộ lọc mới
    });
  };

  // 6. Xử lý khi nhấn nút "Đặt lại"
  const handleResetFilters = () => {
    setFilters({
      title: "",
      priceType: "",
      technologyId: "",
      page: 0,
      size: 9,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      {/* mt-16 hoặc mt-20 tùy vào độ cao Header của bạn để sát khít */}
      <main className="mt-16 flex-grow pb-20">
        {/* Phần Hero: Tìm kiếm theo Title */}
        <ProjectHero
          filters={filters}
          onChange={(field, value) =>
            setFilters((prev) => ({ ...prev, [field]: value }))
          }
          onSearch={handleSearch}
        />

        <div className="mx-auto max-w-7xl px-6 mt-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr]">
            {/* Sidebar: Lọc theo PriceType và Technology */}
            <ProjectFilterSidebar
              filters={filters}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              technologies={[]} // Bạn hãy truyền list technologies lấy từ API vào đây
            />

            {/* Danh sách kết quả */}
            <div>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Danh sách đồ án
                  </h2>
                  <div className="mt-2 h-1 w-12 bg-blue-600"></div>
                </div>
                <p className="text-sm text-slate-500 font-medium">
                  Tìm thấy{" "}
                  <span className="text-blue-600">
                    {pageInfo.totalElements}
                  </span>{" "}
                  đồ án
                </p>
              </div>

              {loading ? (
                // Skeleton Loading
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-[380px] animate-pulse bg-white rounded-2xl border border-slate-100 shadow-sm"
                    />
                  ))}
                </div>
              ) : (
                <>
                  {projects.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {projects.map((p) => (
                        <ProjectCard key={p.id} project={p} />
                      ))}
                    </div>
                  ) : (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                      <div className="text-slate-300 mb-4">
                        <svg
                          className="w-16 h-16"
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
                      <p className="text-slate-500 font-medium">
                        Không tìm thấy đồ án nào phù hợp với bộ lọc.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="mt-4 text-blue-600 font-bold hover:underline"
                      >
                        Xóa tất cả bộ lọc
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Phân trang */}
              {pageInfo.totalPages > 1 && (
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
