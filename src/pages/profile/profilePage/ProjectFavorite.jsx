import { useEffect, useState, useMemo } from "react";
import projectService from "../../../services/projectService";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  User,
  Clock,
  Heart,
  ChevronRight,
  Code2,
} from "lucide-react";
import Pagination from "../../../components/common/Pagination"; // Import component phân trang của bạn
import { alertUtils } from "../../../helpers/alertUtils";
export default function FavoriteProjects() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Cấu hình phân trang ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng Dự án trên mỗi trang

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await projectService.getAllFavorite();
      setFavorites(response.data || []);
      setCurrentPage(1); // Reset về trang 1 khi load dữ liệu mới
    } catch (err) {
      console.error("lỗi: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (projectId) => {
    try {
      await projectService.deleteFavoriteProject(projectId);
      alertUtils.success("Đã bỏ lưu Dự án");
      fetchFavorites();
    } catch (err) {
      console.error("lỗi khi bỏ lưu Dự án: ", err);
    }
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
          <FolderKanban size={20} className="text-indigo-600" />
          Dự án đã lưu ({favorites.length})
        </h1>
      </div>

      {/* LIST */}
      <div className="flex-1 flex flex-col gap-0 divide-y divide-gray-100">
        {loading ? (
          <div className="p-10 text-center text-slate-400 animate-pulse font-medium">
            Đang tải danh sách Dự án...
          </div>
        ) : currentItems.length > 0 ? (
          currentItems.map((fav) => (
            <div
              key={fav.id}
              className="group relative flex items-center gap-5 p-5 hover:bg-slate-50/80 transition-all"
            >
              {/* 1. ICON THAY THẾ */}
              <div className="w-16 h-16 shrink-0 rounded-xl border border-indigo-50 bg-indigo-50/30 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <Code2 size={28} />
              </div>

              {/* 2. THÔNG TIN CHÍNH */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Link
                    to={`/project/${fav.project_id}`}
                    className="text-[17px] font-bold text-slate-900 hover:text-indigo-600 transition-colors truncate"
                  >
                    {fav.project_title}
                  </Link>
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[9px] font-extrabold rounded uppercase tracking-wider">
                    Project
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[14px] text-slate-500 font-medium">
                  <User size={14} className="text-slate-400" />
                  <span>
                    Tác giả:{" "}
                    <span className="text-slate-700 font-semibold">
                      {fav.student_name}
                    </span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2.5">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[11px] font-medium rounded-md">
                    Source Code
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[11px] font-medium rounded-md">
                    Tài liệu
                  </span>
                </div>
              </div>

              {/* 3. THÔNG TIN THỜI GIAN */}
              <div className="hidden md:flex flex-col items-end gap-2 text-right min-w-[140px]">
                <div className="flex items-center gap-1.5 text-slate-400 text-[12px] font-medium">
                  <Clock size={14} />
                  <span>
                    Lưu: {new Date(fav.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                <Link
                  to={`/project/${fav.project_id}`}
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-0.5"
                >
                  Xem chi tiết <ChevronRight size={14} />
                </Link>
              </div>

              {/* 4. NÚT HEART */}
              <div className="ml-2">
                <button
                  onClick={() => handleRemoveFavorite(fav.project_id)}
                  className="p-3 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-90"
                  title="Bỏ lưu Dự án"
                >
                  <Heart size={20} fill="currentColor" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 text-center">
            <div className="mb-4 opacity-20 flex justify-center text-slate-400">
              <FolderKanban size={64} />
            </div>
            <p className="text-slate-400 font-medium">
              Bạn chưa lưu Dự án nào.
            </p>
            <Link
              to="/project"
              className="mt-4 inline-block text-indigo-600 font-bold hover:underline"
            >
              Khám phá Dự án ngay
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
