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

const ITEMS_PER_PAGE = 4;

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
    const result = await Swal.fire({
      title: "Xóa đồ án?",
      text: "Đồ án sẽ được đóng và không còn hiển thị trong danh sách của bạn.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#e11d48",
    });

    if (!result.isConfirmed) return;

    try {
      await projectService.deleteProject(projectId);
      await Swal.fire("Thành công", "Đã xóa đồ án.", "success");
      fetchMyProjects();
    } catch (error) {
      console.error("Lỗi xóa project:", error?.response?.data || error);

      const errorMsg =
        error?.response?.data?.data ||
        error?.response?.data?.message ||
        "Không thể xóa đồ án.";

      Swal.fire("Thất bại", errorMsg, "error");
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-black text-slate-900">
            <BarChart3 className="text-blue-600" size={30} />
            Thống kê đồ án
          </h2>
          <p className="mt-2 max-w-2xl text-slate-500">
            Quản lý toàn bộ đồ án bạn đã tạo, theo dõi trạng thái duyệt, lượt
            xem và lượt tải một cách trực quan hơn.
          </p>
        </div>

        <button
          onClick={() => navigate("/project/create")}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white transition-all hover:bg-blue-700"
        >
          <Plus size={18} />
          Đăng đồ án mới
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Tổng đồ án</p>
          <h3 className="mt-2 text-3xl font-black text-slate-900">
            {stats.total}
          </h3>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm text-amber-700">Chờ duyệt</p>
          <h3 className="mt-2 text-3xl font-black text-amber-800">
            {stats.pending}
          </h3>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm text-emerald-700">Đã duyệt</p>
          <h3 className="mt-2 text-3xl font-black text-emerald-800">
            {stats.approved}
          </h3>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
          <p className="text-sm text-rose-700">Bị từ chối</p>
          <h3 className="mt-2 text-3xl font-black text-rose-800">
            {stats.rejected}
          </h3>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4 xl:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Tìm theo tên đồ án..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition-all focus:border-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="min-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-500"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="PENDING">Chờ duyệt</option>
          <option value="APPROVED">Đã duyệt</option>
          <option value="REJECTED">Bị từ chối</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-[320px] animate-pulse rounded-3xl border border-slate-100 bg-slate-50"
            />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 py-16 text-center">
          <FolderOpen size={48} className="mx-auto mb-4 text-slate-300" />
          <h3 className="text-xl font-bold text-slate-700">
            Chưa có đồ án nào
          </h3>
          <p className="mt-2 text-slate-500">
            Hãy đăng đồ án đầu tiên của bạn để bắt đầu.
          </p>
          <button
            onClick={() => navigate("/project/create")}
            className="mt-5 rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
          >
            Đăng đồ án mới
          </button>
        </div>
      ) : (
        <>
          <div className="mb-5 flex items-center justify-between">
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

          <div className="grid grid-cols-1 gap-6">
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
                  className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
                    <div className="relative h-[260px] lg:h-full">
                      <img
                        src={thumbnail}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />

                      <span
                        className={`absolute left-4 top-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(
                          project.status,
                        )}`}
                      >
                        {getStatusLabel(project.status)}
                      </span>
                    </div>

                    <div className="flex flex-col p-6 lg:p-7">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 text-2xl font-black text-slate-900">
                            {project.title}
                          </h3>

                          <p className="mt-3 line-clamp-3 max-w-3xl text-[15px] leading-7 text-slate-500">
                            {project.description ||
                              "Chưa có mô tả cho đồ án này."}
                          </p>
                        </div>

                        <div className="shrink-0">
                          <div className="rounded-2xl bg-slate-50 px-5 py-4 text-right">
                            <p className="text-xs text-slate-500">Giá</p>
                            <p className="mt-1 text-2xl font-black text-slate-900">
                              {priceType === "PAID"
                                ? `${Number(priceDownload).toLocaleString("vi-VN")}đ`
                                : "0đ"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies?.length > 0 ? (
                          project.technologies.slice(0, 5).map((tech) => (
                            <span
                              key={tech.id || tech.name}
                              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600"
                            >
                              {tech.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-400">
                            Chưa có công nghệ
                          </span>
                        )}
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
                        <div className="rounded-2xl bg-slate-50 px-4 py-4">
                          <p className="text-xs text-slate-500">Lượt xem</p>
                          <p className="mt-2 flex items-center gap-2 text-lg font-bold text-slate-800">
                            <Eye size={16} />
                            {viewCount}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 px-4 py-4">
                          <p className="text-xs text-slate-500">Lượt tải</p>
                          <p className="mt-2 flex items-center gap-2 text-lg font-bold text-slate-800">
                            <Download size={16} />
                            {downloadCount}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 px-4 py-4">
                          <p className="text-xs text-slate-500">Hình thức</p>
                          <p className="mt-2 text-lg font-bold text-slate-800">
                            {priceType === "PAID" ? "Bán code" : "Miễn phí"}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 px-4 py-4">
                          <p className="text-xs text-slate-500">Ngày tạo</p>
                          <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                            <CalendarDays size={16} />
                            {formatDate(createdAt)}
                          </p>
                        </div>
                      </div>

                      {adminNote && (
                        <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3">
                          <p className="mb-1 text-sm font-bold text-rose-700">
                            Ghi chú từ admin
                          </p>
                          <p className="text-sm leading-6 text-rose-600">
                            {adminNote}
                          </p>
                        </div>
                      )}

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => navigate(`/project/${project.id}`)}
                          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-50"
                        >
                          Chi tiết
                          <ArrowRight size={16} />
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/project/edit/${project.id}`)
                          }
                          className="inline-flex items-center gap-2 rounded-2xl border border-blue-200 px-5 py-3 font-semibold text-blue-600 transition-all hover:bg-blue-50"
                        >
                          <Pencil size={16} />
                          Chỉnh sửa
                        </button>

                        <button
                          onClick={() => handleDelete(project.id)}
                          className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 px-5 py-3 font-semibold text-rose-600 transition-all hover:bg-rose-50"
                        >
                          <Trash2 size={16} />
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
