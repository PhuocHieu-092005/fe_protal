import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  FolderOpen,
  Eye,
  Download,
  Plus,
  Search,
  CalendarDays,
  Pencil,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import projectService from "../../../services/projectService";
import Pagination from "../../../components/common/Pagination";
import Swal from "sweetalert2";

import { alertUtils } from "../../../helpers/alertUtils";
const ITEMS_PER_PAGE = 6;

const getStatusStyle = (status) => {
  switch (status) {
    case "APPROVED":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    case "PENDING":
      return "bg-amber-100 text-amber-700 border border-amber-200";
    case "REJECTED":
      return "bg-rose-100 text-rose-700 border border-rose-200";
    default:
      return "bg-slate-100 text-slate-600 border border-slate-200";
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "APPROVED":
      return "Đã duyệt";
    case "PENDING":
      return "Chờ duyệt";
    case "REJECTED":
      return "Bị từ chối";
    default:
      return status || "Không rõ";
  }
};

const formatDate = (value) => {
  if (!value) return "Chưa rõ";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Chưa rõ";
  return date.toLocaleDateString("vi-VN");
};

export default function MyProjects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMyProjects = async () => {
    try {
      setLoading(true);
      const response = await projectService.getMyProjects();
      const list = response?.data || [];
      setProjects(list);
    } catch (error) {
      console.error("Lỗi lấy danh sách project cá nhân:", error);
      Swal.fire("Lỗi", "Không thể tải danh sách đồ án cá nhân", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProjects();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, statusFilter]);

  const visibleProjects = useMemo(() => {
    return projects.filter((item) => item.status !== "CLOSE");
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return visibleProjects.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      const matchKeyword = title.includes(keyword.toLowerCase());

      const matchStatus =
        statusFilter === "ALL" ? true : item.status === statusFilter;

      return matchKeyword && matchStatus;
    });
  }, [visibleProjects, keyword, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: visibleProjects.length,
      pending: visibleProjects.filter((p) => p.status === "PENDING").length,
      approved: visibleProjects.filter((p) => p.status === "APPROVED").length,
      rejected: visibleProjects.filter((p) => p.status === "REJECTED").length,
    };
  }, [visibleProjects]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProjects.slice(start, end);
  }, [filteredProjects, currentPage]);

  const handleDelete = async (projectId) => {
    // 1. Sử dụng alertUtils để hỏi xác nhận xóa
    const confirmed = await alertUtils.confirmDelete(
      "Xóa đồ án?",
      "Đồ án sẽ được đóng và không còn hiển thị trong danh sách của bạn.",
    );

    if (!confirmed) return;

    try {
      // 2. Thực hiện gọi API xóa
      await projectService.deleteProject(projectId);

      // 3. Thông báo thành công bằng Toast ở góc
      alertUtils.success("Đã xóa đồ án thành công.");

      // 4. Load lại danh sách đồ án
      fetchMyProjects();
    } catch (error) {
      console.error("Lỗi xóa project:", error?.response?.data || error);

      const errorMsg =
        error?.response?.data?.data ||
        error?.response?.data?.message ||
        "Không thể xóa đồ án.";

      // 5. Thông báo lỗi chi tiết bằng Modal
      alertUtils.error("Thất bại", errorMsg);
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-xl font-black text-slate-900">
            <BarChart3 className="text-blue-600" size={22} />
            Thống kê đồ án
          </h2>

          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
            Quản lý đồ án bạn đã tạo, theo dõi trạng thái duyệt, lượt xem và
            lượt tải.
          </p>
        </div>

        <button
          onClick={() => navigate("/project/create")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-blue-700"
        >
          <Plus size={16} />
          Tạo dự án mới
        </button>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Tổng đồ án</p>
          <h3 className="mt-1 text-2xl font-black text-slate-900">
            {stats.total}
          </h3>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-xs text-amber-700">Chờ duyệt</p>
          <h3 className="mt-1 text-2xl font-black text-amber-800">
            {stats.pending}
          </h3>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-xs text-emerald-700">Đã duyệt</p>
          <h3 className="mt-1 text-2xl font-black text-emerald-800">
            {stats.approved}
          </h3>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3">
          <p className="text-xs text-rose-700">Bị từ chối</p>
          <h3 className="mt-1 text-2xl font-black text-rose-800">
            {stats.rejected}
          </h3>
        </div>
      </div>

      <div className="mb-5 flex flex-col gap-3 xl:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Tìm theo tên đồ án..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="min-w-[190px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="PENDING">Chờ duyệt</option>
          <option value="APPROVED">Đã duyệt</option>
          <option value="REJECTED">Bị từ chối</option>
        </select>
      </div>

      {loading ? (
        <div className="grid w-full grid-cols-1 gap-3 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[190px] animate-pulse rounded-2xl border border-slate-100 bg-slate-50"
            />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 py-12 text-center">
          <FolderOpen size={40} className="mx-auto mb-3 text-slate-300" />

          <h3 className="text-lg font-bold text-slate-700">
            Chưa có đồ án nào
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Hãy đăng đồ án đầu tiên của bạn để bắt đầu.
          </p>

          <button
            onClick={() => navigate("/project/create")}
            className="mt-5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
          >
            Tạo đồ án mới
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Hiển thị{" "}
              <span className="font-bold text-blue-600">
                {paginatedProjects.length}
              </span>{" "}
              /{" "}
              <span className="font-bold text-slate-700">
                {filteredProjects.length}
              </span>{" "}
              đồ án
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-3 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {paginatedProjects.map((project) => {
              const thumbnail =
                project.images?.[0]?.imageUrl ||
                project.images?.[0]?.image_url ||
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";

              const priceType = project.priceType || project.price_type;
              const priceDownload =
                project.priceDownload ?? project.price_download ?? 0;
              const viewCount = project.viewCount ?? project.view_count ?? 0;
              const downloadCount =
                project.downloadCount ?? project.download_count ?? 0;
              const adminNote = project.adminNote || project.admin_note;
              const createdAt = project.createdAt || project.created_at;

              return (
                <div
                  key={project.id}
                  className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* RESPONSIVE UI: mobile vẫn giữ bố cục ngang nhưng ảnh nhỏ hơn, desktop sm trở lên giữ kích thước cũ */}
                  <div className="grid min-w-0 grid-cols-[96px_minmax(0,1fr)] sm:grid-cols-[150px_minmax(0,1fr)]">
                    <div className="relative h-full min-h-[132px] bg-slate-100 sm:h-[190px]">
                      <img
                        src={thumbnail}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />

                      <span
                        className={`absolute left-2 top-2 inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold sm:left-2.5 sm:top-2.5 sm:px-2.5 sm:py-1 sm:text-[10px] ${getStatusStyle(
                          project.status,
                        )}`}
                      >
                        {getStatusLabel(project.status)}
                      </span>
                    </div>

                    <div className="min-w-0 p-2.5 sm:p-3">
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          {/* RESPONSIVE UI: mobile giảm font và giữ line-clamp để tiêu đề nằm ngang dài hơn */}
                          <h3 className="line-clamp-2 text-[13px] font-black leading-5 text-slate-900 sm:text-[16px] sm:leading-snug">
                            {project.title}
                          </h3>

                          <p className="mt-1 line-clamp-1 text-[11px] leading-5 text-slate-500 sm:mt-1.5 sm:line-clamp-2 sm:text-[12px]">
                            {project.description ||
                              "Chưa có mô tả cho đồ án này."}
                          </p>
                        </div>

                        <div className="shrink-0 rounded-xl bg-slate-50 px-2 py-1.5 text-right sm:px-2.5 sm:py-2">
                          <p className="text-[9px] text-slate-500 sm:text-[10px]">
                            Giá
                          </p>

                          <p className="mt-0.5 text-[13px] font-black text-slate-900 sm:mt-1 sm:text-base">
                            {priceType === "PAID"
                              ? `${Number(priceDownload).toLocaleString(
                                  "vi-VN",
                                )}đ`
                              : "0đ"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1 sm:mt-2.5 sm:gap-1.5">
                        {project.technologies?.length > 0 ? (
                          project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech.id || tech.name}
                              className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold text-slate-600 sm:px-2.5 sm:py-1 sm:text-[10px]"
                            >
                              {tech.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400">
                            Chưa có công nghệ
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-semibold text-slate-700 sm:mt-3 sm:gap-2 sm:text-[11px]">
                        <div className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 sm:px-2.5 sm:py-1">
                          <Eye size={12} />
                          <span>{viewCount}</span>
                          <span className="hidden text-slate-500 sm:inline">
                            lượt xem
                          </span>
                        </div>

                        <div className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 sm:px-2.5 sm:py-1">
                          <Download size={12} />
                          <span>{downloadCount}</span>
                          <span className="hidden text-slate-500 sm:inline">
                            lượt tải
                          </span>
                        </div>

                        <div className="hidden items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 sm:inline-flex">
                          <span className="text-slate-500">Hình thức:</span>
                          <span>
                            {priceType === "PAID" ? "Bán code" : "Miễn phí"}
                          </span>
                        </div>

                        <div className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 sm:px-2.5 sm:py-1">
                          <CalendarDays size={12} />
                          <span>{formatDate(createdAt)}</span>
                        </div>
                      </div>

                      {adminNote && (
                        <div className="mt-2 rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-2 sm:mt-2.5">
                          <p className="mb-1 text-[11px] font-bold text-rose-700">
                            Ghi chú từ admin
                          </p>

                          <p className="line-clamp-2 text-[11px] leading-5 text-rose-600">
                            {adminNote}
                          </p>
                        </div>
                      )}

                      <div className="mt-2.5 flex flex-wrap items-center gap-1 sm:mt-3 sm:gap-1.5">
                        <button
                          onClick={() => navigate(`/project/${project.id}`)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700 transition-all hover:bg-slate-50 sm:px-2.5 sm:py-1.5 sm:text-[11px]"
                        >
                          Chi tiết
                          <ArrowRight size={13} />
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/project/edit/${project.id}`)
                          }
                          className="inline-flex items-center gap-1 rounded-lg border border-blue-200 px-2 py-1 text-[10px] font-semibold text-blue-600 transition-all hover:bg-blue-50 sm:px-2.5 sm:py-1.5 sm:text-[11px]"
                        >
                          <Pencil size={13} />
                          Sửa
                        </button>

                        <button
                          onClick={() => handleDelete(project.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-rose-200 px-2 py-1 text-[10px] font-semibold text-rose-600 transition-all hover:bg-rose-50 sm:px-2.5 sm:py-1.5 sm:text-[11px]"
                        >
                          <Trash2 size={13} />
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}
