import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "lucide-react";

import Footer from "../../../layouts/Footer";
import jobService from "../../../services/jobService";
import cvService from "../../../services/cvService";

export default function JobDetail() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loadingFav, setLoadingFav] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [cvs, setCvs] = useState([]);
  const [selectedCv, setSelectedCv] = useState("");
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [showLoginNotice, setShowLoginNotice] = useState(false);

  const isLoggedIn = () => {
    const user = localStorage.getItem("user");
    return !!user;
  };

  const requireLogin = () => {
    setShowLoginNotice(true);
  };

  const fetchCv = async () => {
    const token = localStorage.getItem("user");
    if (!token) return;

    try {
      const response = await cvService.getMyCvs();
      setCvs(response.data);
    } catch (err) {
      console.error("lỗi, ", err);
    }
  };

  const handleApplyJob = async () => {
    if (!selectedCv) {
      alert("Chưa chọn CV");
      return;
    }

    try {
      await jobService.applyJob(id, selectedCv);
      alert("Ứng tuyển thành công");
      setIsApplyOpen(false);
    } catch (err) {
      console.log(err);
      const errorData = err.response?.data?.data;

      alert(errorData || "Ứng tuyển thất bại, vui lòng thử lại!");

      console.log("Toàn bộ lỗi:", err.response?.data);
    }
  };

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await jobService.getJobDetail(id);
        setJob(response.data);
        setIsFavorited(response.data.favorite);
      } catch (err) {
        console.error("lỗi: ", err);
      }
    };

    fetchJobDetail();
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
        alert("Đã lưu tin tuyển dụng");
      } else {
        setIsFavorited(false);
        alert("Đã bỏ lưu tin tuyển dụng");
      }
    } catch (err) {
      console.error("lỗi ", err);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoadingFav(false);
    }
  };

  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-5 text-slate-700 shadow-sm">
          Không tìm thấy công việc!
        </div>
      </div>
    );

  return (
    <>
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
              Bạn cần đăng nhập để ứng tuyển hoặc lưu tin tuyển dụng này.
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
                      {cv.name || `CV #${cv.id}`}
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
          <section className="mx-auto max-w-7xl px-5 pt-28 pb-1">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link to="/" className="hover:text-slate-900">
                Trang chủ
              </Link>
              <span>/</span>
              <Link to="/job" className="hover:text-slate-900">
                Việc làm
              </Link>
              <span>/</span>
              <span className="font-medium text-slate-900">{job.title}</span>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-5 pb-8">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
              <div className="space-y-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4">
                      <img
                        src={job.companyLogo}
                        alt={job.companyName}
                        className="h-16 w-16 rounded-2xl border border-slate-100 object-cover p-1.5"
                      />

                      <div>
                        <p className="text-base font-medium text-slate-500">
                          {job.companyName}
                        </p>

                        <h1 className="mt-1 text-2xl font-bold text-slate-950 md:text-3xl">
                          {job.title}
                        </h1>

                        <div className="mt-2 flex flex-wrap gap-2 text-sm font-semibold">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700">
                            <MapPin size={15} className="text-blue-600" />
                            {job.workLocation}
                          </span>

                          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-blue-600">
                            {job.jobType}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {formatSalary(job.salary)}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Đăng {formatDate(job.startDay)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
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
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <CalendarDays size={22} />
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">Hạn nộp hồ sơ</p>
                        <p className="mt-1 text-lg font-bold text-slate-950">
                          {formatDate(job.endDay)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
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
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:flex">
                      <FileText size={23} />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-slate-950">
                        Mô tả công việc
                      </h2>

                      <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">
                        {getContent(job.description, "Chưa có mô tả công việc")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:flex">
                      <BriefcaseBusiness size={23} />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-slate-950">
                        Yêu cầu ứng viên
                      </h2>

                      <div className="mt-3 whitespace-pre-line leading-7 text-slate-600">
                        {getContent(
                          job.requirements,
                          "Trao đổi trực tiếp khi phỏng vấn",
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:flex">
                      <Tags size={23} />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-slate-950">
                        Kỹ năng chuyên môn
                      </h2>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.tags?.map((skill, index) => (
                          <span
                            key={index}
                            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                          >
                            {skill}
                          </span>
                        ))}

                        {job.tags?.length === 0 && (
                          <span className="text-sm text-slate-500">
                            Chưa có
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-slate-950">
                      Việc làm liên quan
                    </h2>

                    <Link
                      to="/job"
                      className="text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                      Xem tất cả
                    </Link>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
                  <p className="text-base font-medium text-slate-500">
                    Mức lương
                  </p>

                  <p className="mt-2 text-3xl font-bold text-blue-600">
                    {formatSalary(job.salary)}
                  </p>

                  <div className="mt-5 space-y-3">
                    <button
                      onClick={() => {
                        if (!isLoggedIn()) {
                          requireLogin();
                          return;
                        }

                        setIsApplyOpen(true);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      <Send size={17} />
                      Ứng tuyển ngay
                    </button>

                    <button
                      onClick={handleToggleFavorite}
                      disabled={loadingFav}
                      className={`flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                        isFavorited
                          ? "bg-rose-50 border-rose-500 text-rose-600 shadow-sm"
                          : "border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900"
                      }`}
                    >
                      <Bookmark size={17} />

                      {loadingFav
                        ? "Đang xử lý..."
                        : isFavorited
                          ? "Đã lưu tin tuyển dụng"
                          : "Lưu tin tuyển dụng"}
                    </button>

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

                  <div className="mt-5 space-y-3 border-t border-slate-200 pt-5 text-sm text-slate-600">
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2">
                        <MapPin size={17} />
                        Địa điểm
                      </span>

                      <span className="font-semibold text-slate-900">
                        {job.workLocation}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2">
                        <BriefcaseBusiness size={17} />
                        Loại hình
                      </span>

                      <span className="font-semibold text-slate-900">
                        {job.jobType}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={17} />
                        Hạn nộp hồ sơ
                      </span>

                      <span className="font-semibold text-slate-900">
                        {formatDate(job.endDay)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <Building2 size={23} />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-slate-950">
                        Về công ty
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {job.companyName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
