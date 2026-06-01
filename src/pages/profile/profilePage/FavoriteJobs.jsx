import { useEffect, useState, useMemo } from "react";
import jobService from "../../../services/jobService";
import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  Bookmark,
  Building2,
  MessageSquare,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import Pagination from "../../../components/common/Pagination"; // Import component phân trang của bạn
//import notification
import { alertUtils } from "../../../helpers/alertUtils";
export default function FavoriteJobs() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Cấu hình phân trang ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng công việc trên mỗi trang

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await jobService.getMyFavorites();
      setFavorites(response.data.data || []);
      setCurrentPage(1); // Reset về trang 1 khi load dữ liệu mới
    } catch (err) {
      console.error("Lỗi lấy danh sách yêu thích: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (jobId) => {
    try {
      const response = await jobService.toggleFavorite(jobId, "ghi chú");
      if (!response.data.data) {
        alertUtils.success("Đã bỏ lưu bài viết");
        fetchFavorites();
      }
    } catch (err) {
      console.error("Lỗi khi bỏ lưu: ", err);
    }
  };

  const formatSalary = (salary) => {
    if (!salary || salary === "0") return "Thỏa thuận";
    if (isNaN(salary)) return salary;
    return `${Number(salary).toLocaleString("vi-VN")} VNĐ`;
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // --- Logic tính toán dữ liệu hiển thị trên trang hiện tại ---
  const totalPages = useMemo(() => {
    return Math.ceil(favorites.length / itemsPerPage);
  }, [favorites]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return favorites.slice(indexOfFirstItem, indexOfLastItem);
  }, [favorites, currentPage]);

  return (
    <section className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in duration-500 flex flex-col min-h-[600px]">
      {/* HEADER */}
      <div className="px-6 py-4 border-b border-gray-100 bg-slate-50/50 flex justify-between items-center">
        <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Briefcase size={20} className="text-blue-600" />
          Việc làm đã lưu ({favorites.length})
        </h1>
      </div>

      {/* LIST - gap-0 và divide-y để sát nhau */}
      <div className="flex-1 flex flex-col gap-0 divide-y divide-gray-100">
        {loading ? (
          <div className="p-10 text-center text-slate-400 animate-pulse font-medium">
            Đang tải danh sách...
          </div>
        ) : currentItems.length > 0 ? (
          currentItems.map((fav) => (
            <div
              key={fav.id}
              className="group relative flex items-center gap-5 p-5 hover:bg-slate-50/80 transition-all"
            >
              {/* 1. ICON THAY THẾ LOGO (Vì API thiếu trường logo) */}
              <div className="w-16 h-16 shrink-0 rounded-xl border border-gray-100 bg-white flex items-center justify-center text-slate-300 group-hover:text-blue-500 group-hover:border-blue-100 transition-all shadow-sm">
                <Building2 size={28} />
              </div>

              {/* 2. THÔNG TIN CHÍNH */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Link
                    to={`/job/${fav.jobId}`}
                    className="text-[17px] font-bold text-slate-900 hover:text-blue-600 transition-colors truncate"
                  >
                    {fav.jobTitle}
                  </Link>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-extrabold rounded uppercase">
                    Mới
                  </span>
                </div>

                <p className="text-[14px] text-slate-500 font-semibold mb-2">
                  {fav.companyName}
                </p>

                {/* Ghi chú nhỏ nếu có */}
                {fav.note && fav.note !== "ghi chú" && (
                  <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold italic">
                    <MessageSquare size={12} />
                    <span>Ghi chú: {fav.note}</span>
                  </div>
                )}
              </div>

              {/* 3. THÔNG TIN PHỤ BÊN PHẢI */}
              <div className="hidden lg:flex flex-col items-end gap-2 text-right min-w-[160px]">
                <p className="text-[16px] font-bold text-blue-600">
                  {formatSalary(fav.salary)}
                </p>

                <div className="flex items-center gap-1.5 text-slate-400 text-[12px] font-medium">
                  <Clock size={14} />
                  <span>
                    {new Date(fav.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                <Link
                  to={`/job/${fav.jobId}`}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
                >
                  Xem chi tiết <ChevronRight size={14} />
                </Link>
              </div>

              {/* 4. NÚT BOOKMARK (Bỏ lưu) */}
              <div className="ml-4">
                <button
                  onClick={() => handleToggleFavorite(fav.jobId)}
                  className="p-3.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-90"
                  title="Bỏ lưu"
                >
                  <Bookmark size={22} fill="currentColor" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 text-center">
            <p className="text-slate-400 font-medium">
              Bạn chưa lưu công việc nào.
            </p>
            <Link
              to="/job"
              className="mt-4 inline-block text-blue-600 font-bold hover:underline"
            >
              Khám phá việc làm ngay
            </Link>
          </div>
        )}
      </div>

      {/* --- PHẦN PHÂN TRANG --- */}
      {!loading && totalPages > 1 && (
        <div className="py-6 border-t border-gray-100 bg-white">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
}
