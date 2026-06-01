import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Eye,
  FileText,
  LockKeyhole,
  MapPin,
  Send,
  Tags,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import Footer from "../../../layouts/Footer";
import jobService from "../../../services/jobService";
import cvService from "../../../services/cvService";
import PostCard from "../../../components/PostCard";
// Import alertUtils
import { alertUtils } from "../../../helpers/alertUtils";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loadingFav, setLoadingFav] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [cvs, setCvs] = useState([]);
  const [selectedCv, setSelectedCv] = useState("");
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [showLoginNotice, setShowLoginNotice] = useState(false);
  const [user, setUser] = useState(null);

  const isLoggedIn = () => !!user;
  const checkLogin = () => {
    const user = localStorage.getItem("user");
    if (user) setUser(JSON.parse(user));
  };
  const requireLogin = () => {
    setShowLoginNotice(true);
  };

  // TÍNH NĂNG: Tự động cuộn lên đầu trang khi ID thay đổi (bấm vào job liên quan)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const fetchCv = async () => {
    const token = localStorage.getItem("user");
    if (!token) return;
    try {
      const response = await cvService.getMyCvs();
      setCvs(response.data);
    } catch (err) {
      console.error("lỗi lấy CV: ", err);
    }
  };

  const handleApplyJob = async () => {
    if (!selectedCv) {
      alertUtils.error("Vui lòng chọn CV để ứng tuyển");
      return;
    }
    try {
      await jobService.applyJob(id, selectedCv);
      alertUtils.success("Ứng tuyển thành công");
      setIsApplyOpen(false);
    } catch (err) {
      console.log(err);
      const errorData = err.response?.data?.data || err.response?.data?.message;
      alertUtils.error(errorData || "Ứng tuyển thất bại, vui lòng thử lại!");
    }
  };

  useEffect(() => {
    const fetchJobData = async () => {
      checkLogin();
      try {
        const response = await jobService.getJobDetail(id);
        const currentJob = response.data;
        setJob(currentJob);
        setIsFavorited(currentJob.favorite);

        const allJobsRes = await jobService.getAllJobs();
        const allJobs = allJobsRes.data || [];

        const filtered = allJobs
          .filter((item) => String(item.id) !== String(id))
          .map((item) => {
            const commonTags =
              item.tags?.filter((tag) => currentJob.tags?.includes(tag)) || [];
            return { ...item, score: commonTags.length };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, 4);

        setRelatedJobs(filtered);
      } catch (err) {
        console.error("lỗi fetch data: ", err);
      }
    };

    fetchJobData();
    fetchCv();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "---";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const formatSalary = (salary) => {
    if (!salary) return "Thỏa thuận";
    return `${salary.toLocaleString()} VNĐ`;
  };

  const getContent = (value, fallback) => {
    if (!value || value === "undefined") return fallback;
    return value;
  };

  const getCvTitle = (cv) => {
    return cv.title || cv.cvTitle || cv.name || `CV #${cv.id}`;
  };

  const handleToggleFavorite = async () => {
    if (!isLoggedIn()) {
      requireLogin();
      return;
    }
    try {
      setLoadingFav(true);
      const response = await jobService.toggleFavorite(id, "ghi chú");
      if (response.data.data) {
        setIsFavorited(true);
        alertUtils.success("Đã lưu tin tuyển dụng");
      } else {
        setIsFavorited(false);
        alertUtils.success("Đã bỏ lưu tin tuyển dụng");
      }
    } catch (err) {
      alertUtils.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoadingFav(false);
    }
  };

  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-bold">
        Đang tải dữ liệu...
      </div>
    );

  return (
    <>
      {/* Modals Login & Apply (Giữ nguyên logic của bạn) */}
      {showLoginNotice && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <LockKeyhole size={28} />
            </div>
            <h2 className="mt-4 text-center text-2xl font-bold text-slate-900">
              Cần đăng nhập
            </h2>
            <p className="mt-3 text-center text-sm leading-6 text-slate-500">
              Bạn cần đăng nhập để ứng tuyển hoặc lưu tin này.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowLoginNotice(false)}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Để sau
              </button>
              <button
                onClick={() => setShowLoginNotice(false)}
                className="flex-1 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Tôi đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}

      {isApplyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-900">
              Ứng tuyển ngay
            </h2>
            <p className="mt-2 text-slate-500">
              Vị trí:{" "}
              <span className="font-semibold text-slate-900">{job.title}</span>
            </p>
            <div className="mt-7">
              <label className="text-sm font-medium text-slate-700">
                Chọn CV của bạn
              </label>
              {cvs.length > 0 ? (
                <select
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition-all focus:border-slate-950"
                  value={selectedCv}
                  onChange={(e) => setSelectedCv(e.target.value)}
                >
                  <option value="">Chọn CV</option>
                  {cvs.map((cv) => (
                    <option key={cv.id} value={cv.id}>
                      {getCvTitle(cv)}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="mt-2 rounded-2xl border border-dashed border-slate-300 p-4 text-center">
                  <p className="text-sm text-slate-500">Bạn chưa có CV nào.</p>
                  <Link
                    to="/template/edit"
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    Tạo CV ngay
                  </Link>
                </div>
              )}
            </div>
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setIsApplyOpen(false)}
                className="flex-1 rounded-2xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleApplyJob}
                className="flex-1 rounded-2xl bg-slate-950 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:bg-slate-300"
              >
                Xác nhận nộp
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-slate-50 flex flex-col">
        <main className="flex-grow">
          {/* Breadcrumbs */}
          <section className="mx-auto max-w-7xl px-5 pt-28 pb-1">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link to="/job" className="hover:text-slate-900">
                Việc làm
              </Link>
              <span>/</span>
              <span className="font-medium text-slate-900 truncate max-w-[200px]">
                {job.title}
              </span>
            </div>
          </section>

          {/* Main Content Grid */}
          <section className="mx-auto max-w-7xl px-5 pb-8">
            <div className="grid grid-cols-1 gap-1 lg:grid-cols-[1fr_340px]">
              {/* Cột trái: Chi tiết công việc */}
              <div className="space-y-1">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-white p-2 shadow-sm">
                      <img
                        src={
                          job.companyLogo ||
                          "https://cdn-icons-png.flaticon.com/512/4091/4091968.png"
                        }
                        alt={job.companyName}
                        className="h-full w-full rounded-xl object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                        {job.companyName}
                      </p>
                      <h1 className="mt-1 text-2xl font-black leading-tight text-slate-950 md:text-3xl">
                        {job.title}
                      </h1>
                      <div className="mt-3 flex flex-col gap-1">
                        <p className="text-2xl font-black text-blue-600">
                          {formatSalary(job.salary)}
                        </p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          Đăng ngày: {formatDate(job.startDay)}
                        </p>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-600">
                          <MapPin size={16} className="text-blue-600" />{" "}
                          {job.workLocation}
                        </span>
                        <span className="inline-flex items-center rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-600 border border-blue-100">
                          {job.jobType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <BriefcaseBusiness size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Loại hình</p>
                      <p className="mt-1 text-lg font-bold text-slate-950">
                        {job.jobType}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <CalendarDays size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Hạn nộp</p>
                      <p className="mt-1 text-lg font-bold text-slate-950">
                        {formatDate(job.endDay)}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <Eye size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Lượt xem</p>
                      <p className="mt-1 text-lg font-bold text-slate-950">
                        {job.viewCount} lượt
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Box */}
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2 mb-4">
                    <FileText size={23} className="text-blue-600" /> Mô tả công
                    việc
                  </h2>
                  <p className="whitespace-pre-line leading-7 text-slate-600">
                    {getContent(job.description, "Chưa có mô tả công việc")}
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2 mb-4">
                    <BriefcaseBusiness size={23} className="text-blue-600" />{" "}
                    Yêu cầu ứng viên
                  </h2>
                  <p className="whitespace-pre-line leading-7 text-slate-600">
                    {getContent(
                      job.requirements,
                      "Trao đổi trực tiếp khi phỏng vấn",
                    )}
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2 mb-4">
                    <Tags size={23} className="text-blue-600" /> Kỹ năng chuyên
                    môn
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.tags?.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.tags?.length === 0 && (
                      <span className="text-sm text-slate-500">Chưa có</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Cột phải: Sidebar */}
              <div className="space-y-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    Mức lương
                  </p>
                  <p className="mt-2 text-3xl font-black text-blue-600">
                    {formatSalary(job.salary)}
                  </p>
                  <div className="mt-6 space-y-3">
                    {user && user.role === "STUDENT" && (
                      <>
                        <button
                          onClick={() => {
                            if (!isLoggedIn()) {
                              requireLogin();
                              return;
                            }
                            setIsApplyOpen(true);
                          }}
                          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
                        >
                          <Send size={17} /> Ứng tuyển ngay
                        </button>
                        <button
                          onClick={handleToggleFavorite}
                          disabled={loadingFav}
                          className={`flex w-full items-center justify-center gap-2 rounded-2xl border-2 py-4 text-sm font-bold transition ${isFavorited ? "bg-rose-50 border-rose-500 text-rose-600" : "border-slate-200 text-slate-700 hover:border-slate-900"}`}
                        >
                          <Bookmark
                            size={17}
                            fill={isFavorited ? "currentColor" : "none"}
                          />{" "}
                          {loadingFav
                            ? "Đang xử lý..."
                            : isFavorited
                              ? "Đã lưu tin"
                              : "Lưu tin tuyển dụng"}
                        </button>
                      </>
                    )}
                    {job.jdFileUrl && (
                      <a
                        href={job.jdFileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Tải File JD
                      </a>
                    )}
                  </div>
                  <div className="mt-6 space-y-1 border-t border-slate-100 pt-5 text-sm text-slate-600">
                    <div className="flex items-center justify-between gap-4">
                      <span>Địa điểm</span>
                      <span className="font-semibold text-slate-900">
                        {job.workLocation}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Loại hình</span>
                      <span className="font-semibold text-slate-900">
                        {job.jobType}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Hạn nộp</span>
                      <span className="font-semibold text-slate-900">
                        {formatDate(job.endDay)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2 mb-4">
                    <Building2 size={20} className="text-blue-600" /> Về công ty
                  </h2>
                  <p className="text-sm leading-7 text-slate-600">
                    {job.companyName}
                  </p>
                </div>
              </div>
            </div>

            {/* PHẦN VIỆC LÀM LIÊN QUAN: NẰM NGANG, GAP NHỎ, HIỆU ỨNG ĐƠN GIẢN */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Việc làm liên quan
                  </h2>
                  <div className="h-1 w-12 bg-blue-600 mt-1.5 rounded-full"></div>
                </div>
                <Link
                  to="/job"
                  className="group flex items-center gap-1.5 text-blue-600 font-bold text-sm hover:text-blue-800 transition-all"
                >
                  Xem tất cả{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>

              {relatedJobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {" "}
                  {/* Gap nhỏ (gap-3) */}
                  {relatedJobs.map((item) => (
                    <Link
                      key={item.id}
                      to={`/job/${item.id}`}
                      className="bg-white rounded-2xl border border-slate-200 p-4 transition-all duration-200 hover:border-blue-400 hover:-translate-y-0.5 flex flex-col"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 shrink-0 rounded-xl border border-slate-100 p-1 bg-white">
                          <img
                            src={
                              item.companyLogo ||
                              "https://cdn-icons-png.flaticon.com/512/4091/4091968.png"
                            }
                            alt=""
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase truncate">
                            {item.companyName}
                          </p>
                          <p className="text-[10px] text-blue-600 font-bold">
                            {item.jobType}
                          </p>
                        </div>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1 line-clamp-2 h-10 leading-5">
                        {item.title}
                      </h3>
                      <p className="text-base font-black text-blue-600 mb-3">
                        {formatSalary(item.salary)}
                      </p>
                      <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                          <MapPin size={10} /> {item.workLocation}
                        </span>
                        <span className="text-[10px] font-bold text-blue-600 flex items-center gap-0.5">
                          Chi tiết <ChevronRight size={12} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center bg-white rounded-3xl border border-slate-100">
                  <p className="text-slate-400 text-sm font-medium">
                    Đang tìm kiếm công việc tương tự...
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
