import React, { useState, useEffect } from "react";
import CvFilterSidebar from "./CvFilterSidebar";
import CvGridView from "./CvGridView";
import Footer from "../../../layouts/Footer";
import cvService from "../../../services/cvService";
export default function CvCategory() {
  // State lưu trữ dữ liệu trả về từ API
  const [cvs, setCvs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  //State quản lý phân trang
  const [page, setPage] = useState(0);

  //State quản lý bộ lọc đang được áp dụng
  const [filters, setFilters] = useState({
    keyword: "",
    type: "",
    techs: [],
  });

  // Gọi API mỗi khi page hoặc filters thay đổi
  useEffect(() => {
    fetchCvs();
  }, [page, filters]);

  const fetchCvs = async () => {
    try {
      setLoading(true);
      // Gọi service API
      const response = await cvService.getPublicCvs({
        ...filters,
        page: page,
        size: 8,
      });

      if (response.code === 200 && response.data) {
        setCvs(response.data.content);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Lỗi fetch danh sách CV:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý khi user bấm nút "Áp dụng" ở Sidebar
  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
    setPage(0); // Khi lọc mới thì luôn quay về trang đầu tiên
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <main className="mt-24 px-6">
        {/* Hero Section */}
        <div className="w-full mb-10 text-center bg-white/50 backdrop-blur-md py-12 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-[40px] font-bold text-slate-900 mb-4">
            Hồ Sơ Ứng Viên
          </h1>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto italic">
            Khám phá kho hồ sơ và kinh nghiệm đồ án của sinh viên, giúp doanh
            nghiệp dễ dàng tìm kiếm ứng viên phù hợp.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex gap-6 pb-6 min-h-[1000px] max-w-7xl mx-auto">
          {/* Truyền hàm nhận filter xuống Sidebar */}
          <CvFilterSidebar onApplyFilter={handleApplyFilter} />

          {/* Truyền data xuống GridView */}
          <CvGridView
            cards={cvs}
            loading={loading}
            currentPage={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
