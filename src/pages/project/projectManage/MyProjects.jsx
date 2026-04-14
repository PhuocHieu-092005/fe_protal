import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Plus,
  Search,
  Eye,
  Download,
  Edit,
  Trash2,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import Swal from "sweetalert2";
import projectService from "../../../services/projectService";
import Pagination from "../../../components/common/Pagination";

const ITEMS_PER_PAGE = 5;

export default function MyProjects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectService.getMyProjects();
      const list = res?.data || [];
      setProjects(list);
    } catch (error) {
      console.error("Lỗi lấy danh sách đồ án:", error);
      Swal.fire("Lỗi", "Không thể tải danh sách đồ án", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, statusFilter]);

  const renderStatus = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-600">
            <CheckCircle2 size={12} /> ĐÃ DUYỆT
          </span>
        );
      case "PENDING":
        return (
          <span className="flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-600">
            <Clock3 size={12} /> ĐANG CHỜ
          </span>
        );
      case "REJECTED":
        return (
          <span className="flex items-center gap-1.5 rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-[10px] font-bold text-rose-600">
            <AlertCircle size={12} /> BỊ TỪ CHỐI
          </span>
        );
      case "CLOSE":
        return (
          <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600">
            <AlertCircle size={12} /> ĐÃ ĐÓNG
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (value) => {
    if (!value) return "Chưa rõ";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "Chưa rõ";
    return d.toLocaleDateString("vi-VN");
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      const matchKeyword = title.includes(keyword.toLowerCase());

      const matchStatus =
        statusFilter === "ALL" ? true : item.status === statusFilter;

      return matchKeyword && matchStatus;
    });
  }, [projects, keyword, statusFilter]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProjects.slice(start, end);
  }, [filteredProjects, currentPage]);

  const totalViews = useMemo(() => {
    return projects.reduce(
      (sum, p) => sum + (p.viewCount ?? p.view_count ?? 0),
      0,
    );
  }, [projects]);

  const handleDelete = async (projectId) => {
    const result = await Swal.fire({
      title: "Xóa đồ án?",
      text: "Bạn sẽ không thể hoàn tác thao tác này.",
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
      fetchProjects();
    } catch (error) {
      console.error("Lỗi xóa project:", error?.response?.data || error);
      Swal.fire(
        "Thất bại",
        error?.response?.data?.message || "Không thể xóa đồ án.",
        "error",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 px-6 pb-12 pt-28 text-left">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900">
              Đồ Án Của Tôi
            </h1>
            <p className="font-medium text-slate-500">
              Nơi lưu trữ và quản lý các sản phẩm sáng tạo của bạn.
            </p>
          </div>

          <Link
            to="/project/create"
            className="group flex items-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 font-bold text-white shadow-xl shadow-zinc-200 transition-all hover:bg-blue-600"
          >
            <Plus
              size={20}
              className="transition-transform group-hover:rotate-90"
            />
            Đăng đồ án mới
          </Link>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Tổng sản phẩm
            </p>
            <h3 className="mt-1 text-3xl font-black text-zinc-900">
              {projects.length}
            </h3>
          </div>

          <div className="rounded-3xl border border-b-4 border-b-blue-500 border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Tổng lượt xem
            </p>
            <h3 className="mt-1 text-3xl font-black text-blue-600">
              {totalViews}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Số đồ án hiển thị
            </p>
            <h3 className="mt-1 text-3xl font-black text-emerald-600">
              {filteredProjects.length}
            </h3>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm đồ án trong kho..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full rounded-xl border border-transparent bg-slate-50 py-2.5 pl-12 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="PENDING">Đang chờ</option>
            <option value="APPROVED">Đã duyệt</option>
            <option value="REJECTED">Bị từ chối</option>
            <option value="CLOSE">Đã đóng</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <th className="px-8 py-5">Thông tin đồ án</th>
                  <th className="px-6 py-5 text-center">Trạng thái</th>
                  <th className="px-6 py-5 text-center">Tương tác</th>
                  <th className="px-6 py-5">Giá</th>
                  <th className="px-8 py-5 text-right">Thao tác</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {paginatedProjects.map((item) => {
                  const viewCount = item.viewCount ?? item.view_count ?? 0;
                  const downloadCount =
                    item.downloadCount ?? item.download_count ?? 0;
                  const priceType = item.priceType || item.price_type;
                  const priceDownload =
                    item.priceDownload ?? item.price_download ?? 0;
                  const createdAt = item.createdAt || item.created_at;
                  const adminNote = item.adminNote || item.admin_note;

                  return (
                    <tr
                      key={item.id}
                      className="group transition-colors hover:bg-slate-50/50"
                    >
                      <td className="px-8 py-5">
                        <Link
                          to={`/project/${item.id}`}
                          className="block text-sm font-bold text-zinc-800 transition-colors hover:text-blue-600"
                        >
                          {item.title}
                        </Link>

                        <div className="mt-0.5 text-[11px] text-slate-400">
                          Ngày đăng: {formatDate(createdAt)}
                        </div>

                        {adminNote && (
                          <div className="mt-2 max-w-[320px] rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-xs text-rose-600">
                            <span className="font-bold">Ghi chú:</span>{" "}
                            {adminNote}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-center">
                          {renderStatus(item.status)}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-4">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                            <Eye size={14} className="text-slate-300" />
                            {viewCount}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                            <Download size={14} className="text-slate-300" />
                            {downloadCount}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`text-sm font-bold ${
                            priceType === "FREE"
                              ? "text-emerald-500"
                              : "text-zinc-700"
                          }`}
                        >
                          {priceType === "FREE"
                            ? "Free"
                            : `${Number(priceDownload).toLocaleString("vi-VN")}đ`}
                        </span>
                      </td>

                      <td className="px-8 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate(`/project/edit/${item.id}`)}
                            className="rounded-xl border border-transparent p-2 text-slate-400 shadow-sm shadow-transparent transition-all hover:border-slate-100 hover:bg-white hover:text-blue-600 hover:shadow-slate-100"
                            title="Chỉnh sửa"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="rounded-xl border border-transparent p-2 text-slate-400 shadow-sm shadow-transparent transition-all hover:border-slate-100 hover:bg-white hover:text-rose-600 hover:shadow-slate-100"
                            title="Xóa đồ án"
                          >
                            <Trash2 size={18} />
                          </button>

                          <button
                            onClick={() => navigate(`/project/${item.id}`)}
                            className="rounded-xl border border-transparent p-2 text-slate-400 shadow-sm shadow-transparent transition-all hover:border-slate-100 hover:bg-white hover:text-zinc-900 hover:shadow-slate-100"
                            title="Xem chi tiết đồ án"
                          >
                            <ExternalLink size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredProjects.length === 0 && !loading && (
            <div className="py-20 text-center">
              <div className="mb-4 text-4xl">📭</div>
              <p className="font-medium text-slate-400">
                Bạn chưa có đồ án nào. Hãy đăng ngay!
              </p>
            </div>
          )}
        </div>

        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
