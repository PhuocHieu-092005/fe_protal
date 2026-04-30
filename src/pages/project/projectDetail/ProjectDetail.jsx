import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Award,
  BookOpen,
  ChevronLeft,
  Eye,
  Download,
  User,
  BadgeDollarSign,
  Layers3,
  Lock,
  MessageCircleMore,
  ExternalLink,
} from "lucide-react";
import projectService from "../../../services/projectService";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [isFavorited, setIsFavotired] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);
  const checkFav = async () => {
    try {
      const ok = await projectService.isFavorited(id);
      setIsFavotired(ok);
    } catch (err) {
      console.log("loi", err.data);
    }
  };
  const handleToggleFavorite = async () => {
    setLoadingFav(true);
    try {
      if (isFavorited) {
        await projectService.deleteFavoriteProject(id);
        alert("Đã gỡ thích dự án");
      } else {
        alert("Đã thích dự án");
        await projectService.toggleFavorite(id);
      }
      await checkFav();
    } finally {
      setLoadingFav(false);
    }
  };
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        await checkFav();
        const res = await projectService.getProjectById(id);

        if (res?.data) {
          setProject(res.data);

          const firstImage =
            res.data?.images?.[0]?.imageUrl ||
            res.data?.images?.[0]?.image_url ||
            "";

          setSelectedImage(firstImage);
        }
      } catch (err) {
        console.error("Lỗi fetch detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const imageList = useMemo(() => {
    if (!project?.images || !Array.isArray(project.images)) return [];
    return project.images.map((img) => ({
      id: img.id,
      url: img.imageUrl || img.image_url,
    }));
  }, [project]);

  const courseName = project?.courseName || project?.course_name || "Đồ án";
  const studentName =
    project?.studentName || project?.student_name || "Sinh viên";
  const sourceCodeUrl = project?.sourceCodeUrl || project?.source_code_url;
  const demoUrl = project?.demoUrl || project?.demo_url;
  const priceType = project?.priceType || project?.price_type;
  const priceDownload = project?.priceDownload ?? project?.price_download ?? 0;
  const adminNote = project?.adminNote || project?.admin_note;
  const viewCount = project?.viewCount ?? project?.view_count ?? 0;
  const downloadCount = project?.downloadCount ?? project?.download_count ?? 0;

  const isPaidProject = priceType === "PAID";

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 px-6 pb-20 pt-28 text-left">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-20 text-center shadow-sm">
            <p className="text-lg font-black text-slate-400">ĐANG TẢI...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50/50 px-6 pb-20 pt-28 text-left">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-20 text-center shadow-sm">
            <p className="font-bold text-slate-500">Không tìm thấy đồ án.</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 text-blue-600 underline"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 px-6 pb-20 pt-28 text-left">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-600"
          >
            <ChevronLeft size={20} />
            QUAY LẠI
          </button>

          <button
            onClick={handleToggleFavorite}
            disabled={loadingFav}
            className={`  rounded-2xl border px-4 py-3 text-sm font-medium transition ${
              isFavorited
                ? "bg-rose-50 border-rose-500 text-rose-600 shadow-sm"
                : "border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900" // Style khi chưa lưu
            }`}
          >
            Lưu dự án
          </button>
        </div>
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
          {/* LEFT */}
          <div className="space-y-8 xl:col-span-8">
            <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm md:p-10">
              <span className="mb-6 inline-flex rounded-full bg-blue-50 px-4 py-1 text-[10px] font-black uppercase tracking-wider text-blue-600">
                {courseName}
              </span>

              <h1 className="mb-5 text-3xl font-black leading-tight text-slate-900 md:text-5xl">
                {project.title}
              </h1>

              <p className="mb-8 text-base leading-relaxed text-slate-600 md:text-lg">
                {project.description || "Chưa có mô tả cho đồ án này."}
              </p>

              <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                  <p className="text-xs text-slate-500">Lượt xem</p>
                  <p className="mt-1 flex items-center gap-2 font-bold text-slate-800">
                    <Eye size={16} />
                    {viewCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                  <p className="text-xs text-slate-500">Lượt tải</p>
                  <p className="mt-1 flex items-center gap-2 font-bold text-slate-800">
                    <Download size={16} />
                    {downloadCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                  <p className="text-xs text-slate-500">Hình thức</p>
                  <p className="mt-1 font-bold text-slate-800">
                    {isPaidProject ? "Bán code" : "Miễn phí"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                  <p className="text-xs text-slate-500">Giá</p>
                  <p className="mt-1 font-bold text-slate-800">
                    {isPaidProject
                      ? `${Number(priceDownload).toLocaleString("vi-VN")} VNĐ`
                      : "0 VNĐ"}
                  </p>
                </div>
              </div>

              {imageList.length > 0 && (
                <div className="space-y-5">
                  <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50">
                    <img
                      src={selectedImage || imageList[0]?.url}
                      alt={project.title}
                      className="h-[320px] w-full object-cover md:h-[480px]"
                    />
                  </div>

                  {imageList.length > 1 && (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {imageList.map((img) => {
                        const isActive =
                          (selectedImage || imageList[0]?.url) === img.url;

                        return (
                          <button
                            key={img.id}
                            type="button"
                            onClick={() => setSelectedImage(img.url)}
                            className={`overflow-hidden rounded-2xl border-2 transition-all ${
                              isActive
                                ? "border-blue-500 ring-2 ring-blue-100"
                                : "border-transparent hover:border-slate-200"
                            }`}
                          >
                            <img
                              src={img.url}
                              alt="preview"
                              className="h-24 w-full object-cover md:h-28"
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </section>

            <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm md:p-10">
              <div className="absolute -right-6 -top-6 rotate-12 text-blue-100">
                <MessageCircleMore size={120} />
              </div>

              <h3 className="relative mb-8 flex items-center gap-3 text-2xl font-black text-slate-900">
                <Star className="text-blue-500" fill="currentColor" size={28} />
                Đánh giá người dùng
              </h3>

              <div className="relative rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
                <User className="mx-auto mb-3 text-slate-300" size={40} />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Chưa có đánh giá từ người dùng
                </p>
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <div className="space-y-6 xl:col-span-4">
            {/* pricing */}
            <section
              className={`rounded-[2.5rem] p-8 shadow-sm ${
                isPaidProject
                  ? "border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50"
                  : "border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Giá truy cập source
                  </p>
                  <h3
                    className={`mt-3 text-3xl font-black md:text-4xl ${
                      isPaidProject ? "text-orange-600" : "text-emerald-600"
                    }`}
                  >
                    {isPaidProject
                      ? `${Number(priceDownload).toLocaleString("vi-VN")} VNĐ`
                      : "Miễn phí"}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {isPaidProject
                      ? "Đồ án này thuộc dạng có phí. Link GitHub sẽ mở sau khi tích hợp thanh toán."
                      : "Bạn có thể xem và truy cập source code trực tiếp ngay bây giờ."}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-wider ${
                    isPaidProject
                      ? "bg-orange-500 text-white"
                      : "bg-emerald-500 text-white"
                  }`}
                >
                  {isPaidProject ? "Có phí" : "Miễn phí"}
                </span>
              </div>
            </section>

            {/* resources */}
            <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
              <h3 className="mb-6 flex items-center gap-2 text-2xl font-black text-slate-900">
                <BookOpen size={22} className="text-blue-500" />
                Tài nguyên
              </h3>

              <div className="space-y-4">
                {sourceCodeUrl && (
                  <>
                    {isPaidProject ? (
                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-base font-bold text-slate-900">
                            <Lock size={16} className="text-amber-600" />
                            GitHub Source
                          </span>
                          <span className="rounded-full bg-amber-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                            Locked
                          </span>
                        </div>

                        <p className="mt-3 text-sm leading-relaxed text-slate-600">
                          Source code đang bị khóa cho tới khi hệ thống thanh
                          toán được tích hợp.
                        </p>
                      </div>
                    ) : (
                      <a
                        href={sourceCodeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-blue-200 hover:bg-blue-50"
                      >
                        <div>
                          <p className="text-base font-bold text-slate-900">
                            GitHub Source
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Xem mã nguồn của đồ án
                          </p>
                        </div>
                        <ExternalLink
                          className="text-slate-400 transition-all group-hover:text-blue-600"
                          size={18}
                        />
                      </a>
                    )}
                  </>
                )}

                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-blue-200 hover:bg-blue-50"
                  >
                    <div>
                      <p className="text-base font-bold text-slate-900">
                        Video Demo
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Xem bản trình bày và mô phỏng sản phẩm
                      </p>
                    </div>
                    <ExternalLink
                      className="text-slate-400 transition-all group-hover:text-blue-600"
                      size={18}
                    />
                  </a>
                )}
              </div>
            </section>

            <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
              <h3 className="mb-6 flex items-center gap-2 text-2xl font-black text-slate-900">
                <Layers3 size={20} className="text-slate-500" />
                Công nghệ
              </h3>

              <div className="flex flex-wrap gap-3">
                {project.technologies?.length > 0 ? (
                  project.technologies.map((tech) => (
                    <span
                      key={tech.id}
                      className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600"
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
            </section>

            <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
              <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                TÁC GIẢ
              </p>

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-xl font-black text-slate-900 shadow-sm">
                  {studentName?.charAt(0)}
                </div>
                <div className="text-xl font-bold text-slate-900">
                  {studentName}
                </div>
              </div>
            </section>

            <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-black text-slate-900">
                <BadgeDollarSign size={20} className="text-emerald-500" />
                Thông tin thêm
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Mã đồ án</span>
                  <span className="font-bold text-slate-900">
                    #{project.id}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Trạng thái</span>
                  <span className="font-bold text-slate-900">
                    {project.status || "PENDING"}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Loại</span>
                  <span className="font-bold text-slate-900">
                    {isPaidProject ? "Bán code" : "Miễn phí"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Giá bán</span>
                  <span
                    className={`font-black ${
                      isPaidProject ? "text-orange-600" : "text-emerald-600"
                    }`}
                  >
                    {isPaidProject
                      ? `${Number(priceDownload).toLocaleString("vi-VN")} VNĐ`
                      : "0 VNĐ"}
                  </span>
                </div>
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
              <div className="absolute -right-6 -top-6 rotate-12 text-amber-100">
                <Star size={120} fill="currentColor" />
              </div>

              <h3 className="relative mb-6 flex items-center gap-3 text-xl font-black text-slate-900">
                <Star
                  className="text-amber-400"
                  fill="currentColor"
                  size={24}
                />
                Đánh giá từ giảng viên
              </h3>

              <div className="relative rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 py-8 text-center">
                <Award className="mx-auto mb-3 text-slate-300" size={38} />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Chưa có đánh giá chính thức
                </p>
              </div>
            </section>

            {adminNote && (
              <section className="rounded-[2.5rem] border border-rose-200 bg-rose-50 p-8 shadow-sm">
                <h3 className="mb-3 text-lg font-black text-rose-700">
                  Ghi chú từ admin
                </h3>
                <p className="text-sm leading-relaxed text-rose-600">
                  {adminNote}
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
