import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ArrowLeft,
  Upload,
  Link as LinkIcon,
  DollarSign,
  Code2,
  Image as ImageIcon,
  X,
  BookOpen,
  Info,
  Rocket,
} from "lucide-react";

import projectService from "../../../services/projectService";
import technologyService from "../../../services/technologyService";
import courseService from "../../../services/courseService";

export default function CreateProject() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [availableTechs, setAvailableTechs] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course_id: "",
    source_code_url: "",
    demo_url: "",
    price_type: "FREE",
    price_download: "",
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [techRes, courseRes] = await Promise.all([
          technologyService.getAllTechnologies(),
          courseService.getAllCourses(),
        ]);

        const techs = Array.isArray(techRes)
          ? techRes
          : Array.isArray(techRes?.data)
            ? techRes.data
            : [];

        const courses = Array.isArray(courseRes)
          ? courseRes
          : Array.isArray(courseRes?.data)
            ? courseRes.data
            : [];

        setAvailableTechs(techs);
        setAvailableCourses(courses);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khởi tạo:", error);
        setAvailableTechs([]);
        setAvailableCourses([]);
      }
    };

    fetchInitialData();
  }, []);

  const formatNumber = (value) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseNumber = (value) => {
    return value.replace(/,/g, "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "price_download") {
      const onlyNumber = parseNumber(value).replace(/[^0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        price_download: onlyNumber,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTechSelect = (e) => {
    const techId = Number(e.target.value);
    if (!techId) return;

    const selectedTech = availableTechs.find((tech) => tech.id === techId);

    if (selectedTech && !selectedTechs.some((tech) => tech.id === techId)) {
      setSelectedTechs((prev) => [...prev, selectedTech]);
    }

    e.target.value = "";
  };

  const removeTech = (techId) => {
    setSelectedTechs((prev) => prev.filter((tech) => tech.id !== techId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return Swal.fire("Lưu ý", "Vui lòng nhập tên đề tài!", "warning");
    }

    if (!formData.course_id) {
      return Swal.fire("Lưu ý", "Vui lòng chọn học phần!", "warning");
    }

    if (selectedTechs.length === 0) {
      return Swal.fire(
        "Lưu ý",
        "Vui lòng chọn ít nhất 1 công nghệ!",
        "warning",
      );
    }

    if (formData.price_type === "PAID" && !formData.price_download) {
      return Swal.fire("Lưu ý", "Vui lòng nhập giá bán code!", "warning");
    }

    const data = new FormData();

    data.append("courseId", String(formData.course_id));
    data.append("title", formData.title.trim());
    data.append("description", formData.description.trim());
    data.append("sourceCodeUrl", formData.source_code_url.trim());
    data.append("demoUrl", formData.demo_url.trim());
    data.append("priceType", formData.price_type);

    const priceValue =
      formData.price_type === "FREE"
        ? "0"
        : String(Number(formData.price_download || 0));

    data.append("priceDownload", priceValue);

    selectedTechs.forEach((tech) => {
      data.append("technologyIds", String(tech.id));
    });

    images.forEach((file) => {
      data.append("images", file);
    });

    console.log("===== FORM DATA SEND =====");
    for (const pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    Swal.fire({
      title: "Đang xử lý...",
      text: "Vui lòng chờ trong giây lát",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await projectService.createProject(data);
      await Swal.fire("Thành công!", "Đồ án đã được gửi duyệt.", "success");
      navigate("/my-projects");
    } catch (error) {
      console.log("Lỗi chi tiết từ Server:", error.response?.data);
      // --- Bắt 413 VÀ bắt luôn trường hợp Server ngắt kết nối đột ngột ---
      if (
        error?.response?.status === 413 ||
        error?.message === "Network Error"
      ) {
        Swal.fire(
          "Ảnh quá nặng! 🚀",
          "Tổng dung lượng hình ảnh bạn tải lên vượt quá giới hạn của máy chủ. Vui lòng nén ảnh lại hoặc chọn ảnh nhẹ hơn rồi thử lại nhé!",
          "error",
        );
        return;
      }
      const errorMsg =
        error.response?.data?.data ||
        error.response?.data?.message ||
        "Lỗi hệ thống!";

      Swal.fire("Thất bại", errorMsg, "error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 px-4 pb-16 pt-24 font-sans text-left text-zinc-900 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-500 transition-all hover:text-blue-600"
            >
              <ArrowLeft size={18} />
              Quay lại danh sách
            </button>

            <h1 className="flex items-center gap-3 text-4xl font-black tracking-tight">
              <Rocket className="text-blue-600" size={36} />
              Đăng Đồ Án Mới
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-2xl px-6 py-3 font-bold text-slate-400 hover:bg-slate-100"
            >
              Hủy bỏ
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-2xl bg-zinc-900 px-8 py-3 font-bold text-white shadow-xl shadow-zinc-200 transition-all hover:bg-blue-600"
            >
              Gửi duyệt đồ án
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          <div className="space-y-8 lg:col-span-2">
            <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="absolute left-0 top-0 h-full w-2 bg-blue-600"></div>

              <h2 className="mb-8 flex items-center gap-2 text-xl font-black">
                <Info size={22} className="text-blue-600" />
                1. Nội dung đồ án
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 ml-1 block text-sm font-bold text-zinc-500">
                    Tên đề tài <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="VD: Hệ thống quản lý..."
                    className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 font-semibold outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 ml-1 flex items-center gap-2 text-sm font-bold text-zinc-500">
                      <BookOpen size={16} />
                      Học phần <span className="text-rose-500">*</span>
                    </label>

                    <select
                      name="course_id"
                      value={formData.course_id}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 font-semibold outline-none focus:border-blue-500 focus:bg-white"
                    >
                      <option value="">Chọn môn học...</option>
                      {availableCourses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 ml-1 flex items-center gap-2 text-sm font-bold text-zinc-500">
                      <Code2 size={16} />
                      Công nghệ
                    </label>

                    <div className="flex min-h-[58px] flex-wrap items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-2">
                      {selectedTechs.map((tech) => (
                        <span
                          key={tech.id}
                          className="flex items-center gap-1.5 rounded-xl border border-slate-100 bg-white px-3 py-1.5 text-xs font-black shadow-sm"
                        >
                          {tech.name}
                          <X
                            size={14}
                            onClick={() => removeTech(tech.id)}
                            className="cursor-pointer text-slate-300 hover:text-rose-500"
                          />
                        </span>
                      ))}

                      <select
                        defaultValue=""
                        onChange={handleTechSelect}
                        className="ml-2 cursor-pointer bg-transparent text-xs font-bold text-slate-500 outline-none"
                      >
                        <option value="" disabled>
                          + Chọn công nghệ
                        </option>

                        {availableTechs
                          .filter(
                            (tech) =>
                              !selectedTechs.some(
                                (item) => item.id === tech.id,
                              ),
                          )
                          .map((tech) => (
                            <option key={tech.id} value={tech.id}>
                              {tech.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 ml-1 block text-sm font-bold text-zinc-500">
                    Mô tả chi tiết
                  </label>
                  <textarea
                    name="description"
                    rows="6"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Mô tả chức năng..."
                    className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 font-medium outline-none focus:border-blue-500 focus:bg-white"
                  ></textarea>
                </div>
              </div>
            </section>

            <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-8 flex items-center gap-2 text-xl font-black">
                <ImageIcon size={22} className="text-emerald-500" />
                2. Hình ảnh minh họa
              </h2>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {previews.map((src, index) => (
                  <div
                    key={index}
                    className="group relative aspect-video overflow-hidden rounded-3xl border-2 border-slate-100 shadow-md"
                  >
                    <img
                      src={src}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="rounded-full bg-white p-2 text-rose-500 shadow-xl hover:scale-110"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}

                <label className="group flex aspect-video cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 transition-all hover:border-blue-300 hover:bg-blue-50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 transition-all group-hover:bg-blue-100 group-hover:text-blue-600">
                    <Upload size={24} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest">
                    Tải ảnh
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-8 flex items-center gap-2 text-left text-xl font-black">
                <LinkIcon size={22} className="text-indigo-500" />
                3. Link & Giá
              </h2>

              <div className="space-y-8 text-left">
                <div>
                  <label className="mb-3 ml-1 flex items-center gap-2 text-sm font-bold text-zinc-500">
                    <i className="fa-brands fa-github text-lg"></i>
                    GitHub
                  </label>
                  <input
                    name="source_code_url"
                    type="url"
                    value={formData.source_code_url}
                    onChange={handleInputChange}
                    placeholder="https://github.com/..."
                    className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 ml-1 flex items-center gap-2 text-sm font-bold text-zinc-500">
                    <i className="fa-brands fa-youtube text-lg text-red-600"></i>
                    Video Demo
                  </label>
                  <input
                    name="demo_url"
                    type="url"
                    value={formData.demo_url}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/..."
                    className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-semibold outline-none"
                  />
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <label className="mb-4 ml-1 flex items-center gap-2 text-sm font-bold text-zinc-500">
                    <DollarSign size={18} className="text-emerald-500" />
                    Chi phí
                  </label>

                  <div className="mb-4 flex rounded-2xl bg-slate-100 p-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          price_type: "FREE",
                          price_download: "",
                        }))
                      }
                      className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
                        formData.price_type === "FREE"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-slate-500"
                      }`}
                    >
                      Miễn phí
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          price_type: "PAID",
                        }))
                      }
                      className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
                        formData.price_type === "PAID"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-slate-500"
                      }`}
                    >
                      Bán Code
                    </button>
                  </div>

                  <div
                    className={`relative transition-all duration-300 ${
                      formData.price_type === "FREE"
                        ? "pointer-events-none opacity-30"
                        : "opacity-100"
                    }`}
                  >
                    <input
                      name="price_download"
                      type="text"
                      value={formatNumber(formData.price_download)}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 pr-16 text-center text-xl font-black outline-none focus:border-emerald-500"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-400">
                      VNĐ
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
}
