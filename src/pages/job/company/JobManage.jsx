import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jobService from "../../../services/jobService";
import companyService from "../../../services/companyService"; // Import thêm service này
import {
  Plus,
  Eye,
  Edit3,
  Trash2,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react";
import { alertUtils } from "../../../helpers/alertUtils";
export default function JobManage() {
  const [jobs, setJobs] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [stats, setStats] = useState({ view: 0, approved: 0 });
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // 1. Lấy thông tin công ty để check xác thực
      const compRes = await companyService.getMyCompanyProfile();
      setCompanyInfo(compRes.data);

      // 2. Lấy danh sách jobs
      const res = await jobService.getMyJobs();
      const jobList = res.data.data || [];
      setJobs(jobList);

      // Tính toán thống kê
      let cntView = 0;
      let cntA = 0;
      jobList.forEach((job) => {
        cntView += job.viewCount || 0;
        if (job.status === "APPROVED") cntA++;
      });
      setStats({ view: cntView, approved: cntA });
    } catch (err) {
      console.error("Lỗi tải dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseJob = async (id) => {
    // 1. Sử dụng alertUtils để hiện bảng hỏi xác nhận đẹp mắt
    const confirmed = await alertUtils.confirmDelete(
      "Đóng tin tuyển dụng?",
      "Bạn có chắc muốn đóng tin tuyển dụng này? Hành động này không thể hoàn tác.",
    );

    // 2. Nếu người dùng bấm Hủy (Cancel) thì dừng lại
    if (!confirmed) return;

    try {
      // 3. Gọi API để đóng tin
      await jobService.deleteJob(id);

      // 4. Load lại danh sách dữ liệu
      fetchData(); // hoặc fetchJobs() tùy theo tên hàm trong file của bạn

      // 5. Thông báo thành công bằng Toast ở góc
      alertUtils.success("Đã đóng tin tuyển dụng thành công!");
    } catch (err) {
      console.error("Lỗi khi đóng tin:", err);
      // 6. Thông báo lỗi nếu có vấn đề từ Server
      alertUtils.error(
        "Lỗi",
        "Không thể đóng tin tuyển dụng lúc này. Vui lòng thử lại.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* CẢNH BÁO CHƯA XÁC THỰC */}
        {companyInfo && !companyInfo.isVerified && (
          <div className="mb-6 flex items-center gap-3 bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-800 shadow-sm">
            <AlertCircle className="shrink-0" size={24} />
            <div>
              <p className="font-bold">Tài khoản chưa được xác thực!</p>
              <p className="text-sm">
                Hồ sơ công ty của bạn đang chờ Admin phê duyệt. Bạn sẽ không thể
                đăng tin tuyển dụng mới cho đến khi được xác thực.
              </p>
            </div>
          </div>
        )}

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Quản lý tuyển dụng
            </h1>
            <p className="text-slate-500 mt-1">
              Chào mừng {companyInfo?.companyName}, quản lý các chiến dịch của
              bạn.
            </p>
          </div>
          <Link
            to={companyInfo?.isVerified ? "/job/create" : "#"}
            onClick={(e) => !companyInfo?.isVerified && e.preventDefault()}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg ${
              companyInfo?.isVerified
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            <Plus size={20} /> Đăng tin mới
          </Link>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <BarChart3 size={24} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Tin đang đăng
              </span>
            </div>
            <p className="text-4xl font-black text-slate-900">{jobs.length}</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <Eye size={24} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Lượt xem tin
              </span>
            </div>
            <p className="text-4xl font-black text-slate-900">{stats.view}</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                <CheckCircle size={24} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Jobs đã duyệt
              </span>
            </div>
            <p className="text-4xl font-black text-slate-900">
              {stats.approved}
            </p>
          </div>
        </div>

        {/* TABLE LIST */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-800">
              Danh sách tin tuyển dụng
            </h3>
          </div>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-400">
                <tr>
                  <th className="px-6 py-4">Vị trí & ID</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4">Ứng tuyển</th>
                  <th className="px-6 py-4">Hạn chót</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-slate-400">
                      Bạn chưa có tin tuyển dụng nào.
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <p className="font-bold text-slate-900 text-sm">
                          {job.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          ID: #{job.id}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                            job.status === "APPROVED"
                              ? "bg-emerald-50 text-emerald-600"
                              : job.status === "REJECTED"
                                ? "bg-rose-50 text-rose-600"
                                : "bg-orange-50 text-orange-600"
                          }`}
                        >
                          {job.status === "APPROVED" ? (
                            <CheckCircle size={12} />
                          ) : (
                            <Clock size={12} />
                          )}
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <button
                          onClick={() =>
                            navigate(`/companies/jobs/${job.id}/applications`)
                          }
                          className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all"
                        >
                          <Users size={14} /> {job.quantityApply || 0} đơn
                        </button>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-500 font-medium">
                        {new Date(job.endDay).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate(`/job/edit/${job.id}`)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => handleCloseJob(job.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="block md:hidden ">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 flex flex-col gap-3 border-b-2 border-slate-300"
              >
                {/* Hàng 1: Tiêu đề và Trạng thái */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {job.title}
                    </h4>
                    <span className="text-xs text-slate-400">
                      ID: #{job.id}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      job.status === "APPROVED"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                {/* Hàng 2: Thông tin ứng tuyển & Hạn chót */}
                <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                  <button
                    onClick={() =>
                      navigate(`/companies/jobs/${job.id}/applications`)
                    }
                    className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-lg font-bold"
                  >
                    <Users size={12} /> {job.quantityApply || 0} đơn ứng tuyển
                  </button>
                  <span className="text-slate-400">
                    Hạn: {new Date(job.endDay).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                {/* Hàng 3: Các nút chức năng (Thao tác) */}
                <div className="flex justify-end gap-3 pt-2 border-t border-dashed border-slate-100">
                  <button
                    onClick={() => navigate(`/job/edit/${job.id}`)}
                    className="flex items-center gap-1 text-xs font-semibold text-slate-600 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <Edit3 size={14} /> Sửa
                  </button>
                  <button
                    onClick={() => handleCloseJob(job.id)}
                    className="flex items-center gap-1 text-xs font-semibold text-rose-600 px-3 py-1.5 bg-rose-50/50 rounded-lg"
                  >
                    <Trash2 size={14} /> Đóng
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
