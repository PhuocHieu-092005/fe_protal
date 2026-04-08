import React, { useEffect, useState } from "react";
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
import projectService from "../../../services/projectService";

export default function MyProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Khởi tạo lấy dữ liệu từ API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Sau này sếp mở comment dòng này khi đã có API thật
        // const res = await projectService.getMyProjects();
        // setProjects(res.data);

        // Demo dữ liệu để sếp xem giao diện trước
        setProjects([
          {
            id: 1,
            title: "Hệ thống quản lý điểm HITU",
            status: "APPROVED",
            views: 245,
            downloads: 12,
            price: "50,000",
            date: "20/03/2026",
          },
          {
            id: 2,
            title: "Website bán linh kiện điện tử Laravel",
            status: "PENDING",
            views: 0,
            downloads: 0,
            price: "Free",
            date: "01/04/2026",
          },
          {
            id: 3,
            title: "App Flutter đặt lịch sân bóng",
            status: "REJECTED",
            views: 0,
            downloads: 0,
            price: "100,000",
            date: "05/04/2026",
          },
        ]);
      } catch (error) {
        console.error("Lỗi lấy danh sách đồ án:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Hàm render Badge trạng thái
  const renderStatus = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold border border-emerald-100">
            <CheckCircle2 size={12} /> ĐÃ DUYỆT
          </span>
        );
      case "PENDING":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold border border-amber-100">
            <Clock3 size={12} /> ĐANG CHỜ
          </span>
        );
      case "REJECTED":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-bold border border-rose-100">
            <AlertCircle size={12} /> BỊ TỪ CHỐI
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
              Đồ Án Của Tôi
            </h1>
            <p className="text-slate-500 font-medium">
              Nơi lưu trữ và quản lý các sản phẩm sáng tạo của bạn.
            </p>
          </div>
          <Link
            to="/project/create"
            className="bg-zinc-900 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-zinc-200 flex items-center gap-2 group"
          >
            <Plus
              size={20}
              className="group-hover:rotate-90 transition-transform"
            />{" "}
            Đăng đồ án mới
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Tổng sản phẩm
            </p>
            <h3 className="text-3xl font-black text-zinc-900 mt-1">
              {projects.length}
            </h3>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm border-b-4 border-b-blue-500">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Tổng lượt xem
            </p>
            <h3 className="text-3xl font-black text-blue-600 mt-1">
              {projects.reduce((sum, p) => sum + p.views, 0)}
            </h3>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Số dư ví (Xu)
            </p>
            <h3 className="text-3xl font-black text-emerald-600 mt-1">
              1,200,000đ
            </h3>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm đồ án trong kho..."
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Project Table */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-400 tracking-widest">
                  <th className="px-8 py-5">Thông tin đồ án</th>
                  <th className="px-6 py-5 text-center">Trạng thái</th>
                  <th className="px-6 py-5 text-center">Tương tác</th>
                  <th className="px-6 py-5">Giá</th>
                  <th className="px-8 py-5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {projects.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="font-bold text-zinc-800 text-sm group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Ngày đăng: {item.date}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        {renderStatus(item.status)}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-4">
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                          <Eye size={14} className="text-slate-300" />{" "}
                          {item.views}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                          <Download size={14} className="text-slate-300" />{" "}
                          {item.downloads}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`text-sm font-bold ${item.price === "Free" ? "text-emerald-500" : "text-zinc-700"}`}
                      >
                        {item.price} {item.price !== "Free" && "đ"}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-100 transition-all shadow-sm shadow-transparent hover:shadow-slate-100">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-100 transition-all shadow-sm shadow-transparent hover:shadow-slate-100">
                          <Trash2 size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-zinc-900 hover:bg-white rounded-xl border border-transparent hover:border-slate-100 transition-all shadow-sm shadow-transparent hover:shadow-slate-100">
                          <ExternalLink size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {projects.length === 0 && !loading && (
            <div className="py-20 text-center">
              <div className="text-4xl mb-4">📭</div>
              <p className="text-slate-400 font-medium">
                Bạn chưa có đồ án nào. Hãy đăng ngay!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
