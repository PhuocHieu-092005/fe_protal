import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import projectService from "../../../services/projectService";
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

export default function CreateProject() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]); // Lưu File objects để gửi đi
  const [previews, setPreviews] = useState([]); // Lưu URL xem trước
  const [techInput, setTechInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course_id: "",
    source_code_url: "",
    demo_url: "",
    price_type: "FREE",
    price_download: 0,
    technologies: [], // Hiện tại sếp đang lưu tên, lát nữa đệ tử chỉ cách map ID
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addTech = (e) => {
    if (e.key === "Enter" && techInput.trim()) {
      e.preventDefault();
      if (!formData.technologies.includes(techInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          technologies: [...prev.technologies, techInput.trim()],
        }));
      }
      setTechInput("");
    }
  };

  const removeTech = (tech) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  // --- LOGIC XỬ LÝ GỬI DỮ LIỆU ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.course_id) {
      return Swal.fire("Lưu ý", "Sếp chọn môn học giùm đệ tử cái!", "warning");
    }

    // 1. Dùng FormData để gói cả file và text
    const data = new FormData();

    // 2. Map đúng tên trường CamelCase như trong file Java ProjectRequest
    data.append("courseId", parseInt(formData.course_id));
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("sourceCodeUrl", formData.source_code_url);
    data.append("demoUrl", formData.demo_url);
    data.append("priceType", formData.price_type); // FREE hoặc PAID
    data.append("priceDownload", formData.price_download);

    // 3. Xử lý Technology IDs (Backend cần số Long)
    // Tạm thời đệ tử gửi ID là 1 và 2. Sau này sếp phải lấy ID từ API nhen!
    const mockIds = [1, 2];
    mockIds.forEach((id) => data.append("technologyIds", id));

    // 4. Xử lý Ảnh (Tên trường phải là "images" như trong Java)
    if (images.length > 0) {
      images.forEach((file) => data.append("images", file));
    }

    Swal.fire({ title: "Đang tải...", didOpen: () => Swal.showLoading() });

    try {
      await projectService.createProject(data);
      Swal.fire("Ngon lành!", "Đồ án đã gửi duyệt thành công.", "success");
      navigate("/my-projects");
    } catch (error) {
      console.log("Lỗi chi tiết:", error.response?.data);
      Swal.fire(
        "Thất bại",
        error.response?.data?.message ||
          "Lỗi 400: Sai cấu trúc dữ liệu rồi sếp!",
        "error",
      );
    }
  };
  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-16 px-4 md:px-10 font-sans text-zinc-900 text-left">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-4 transition-all font-bold text-sm"
            >
              <ArrowLeft size={18} /> Quay lại danh sách
            </button>
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
              <Rocket className="text-blue-600" size={36} /> Đăng Đồ Án Mới
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-2xl font-bold text-slate-400 hover:bg-slate-100"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleSubmit}
              className="bg-zinc-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 shadow-xl shadow-zinc-200 transition-all"
            >
              Gửi duyệt đồ án
            </button>
          </div>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
              <h2 className="text-xl font-black mb-8 flex items-center gap-2">
                <Info size={22} className="text-blue-600" /> 1. Nội dung đồ án
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-zinc-500 mb-2 ml-1">
                    Tên đề tài <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="VD: Hệ thống quản lý..."
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 outline-none font-semibold"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-zinc-500 mb-2 ml-1 flex items-center gap-2">
                      <BookOpen size={16} /> Học phần{" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="course_id"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 outline-none font-semibold appearance-none"
                      value={formData.course_id}
                      onChange={handleInputChange}
                    >
                      <option value="">Chọn môn học...</option>
                      <option value="1">Đồ án chuyên ngành</option>
                      <option value="2">Phát triển ứng dụng Web</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-500 mb-2 ml-1 flex items-center gap-2">
                      <Code2 size={16} /> Công nghệ
                    </label>
                    <div className="flex flex-wrap gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100 min-h-[58px]">
                      {formData.technologies.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm border border-slate-100"
                        >
                          {tag}{" "}
                          <X
                            size={14}
                            onClick={() => removeTech(tag)}
                            className="text-slate-300 hover:text-rose-500 cursor-pointer"
                          />
                        </span>
                      ))}
                      <input
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={addTech}
                        placeholder="+ Add"
                        className="bg-transparent outline-none text-xs ml-2 w-16 font-bold"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-500 mb-2 ml-1">
                    Mô tả chi tiết
                  </label>
                  <textarea
                    name="description"
                    rows="6"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Mô tả chức năng..."
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500 outline-none font-medium"
                  ></textarea>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black mb-8 flex items-center gap-2">
                <ImageIcon size={22} className="text-emerald-500" /> 2. Hình ảnh
                minh họa
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {previews.map((src, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-3xl overflow-hidden border-2 border-slate-100 relative group shadow-md"
                  >
                    <img
                      src={src}
                      className="w-full h-full object-cover"
                      alt="preview"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="bg-white text-rose-500 p-2 rounded-full shadow-xl hover:scale-110"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
                <label className="aspect-video rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all text-slate-400 group">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
                    <Upload size={24} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest">
                    Tải ảnh
                  </span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black mb-8 flex items-center gap-2 text-left">
                <LinkIcon size={22} className="text-indigo-500" /> 3. Link & Giá
              </h2>
              <div className="space-y-8 text-left">
                <div>
                  <label className="block text-sm font-bold text-zinc-500 mb-3 ml-1 flex items-center gap-2">
                    <i className="fa-brands fa-github text-lg"></i> GitHub
                  </label>
                  <input
                    name="source_code_url"
                    type="url"
                    value={formData.source_code_url}
                    onChange={handleInputChange}
                    placeholder="https://github.com/..."
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-500 mb-3 ml-1 flex items-center gap-2">
                    <i className="fa-brands fa-youtube text-lg text-red-600"></i>{" "}
                    Video Demo
                  </label>
                  <input
                    name="demo_url"
                    type="url"
                    value={formData.demo_url}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/..."
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-semibold text-sm"
                  />
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <label className="block text-sm font-bold text-zinc-500 mb-4 ml-1 flex items-center gap-2">
                    <DollarSign size={18} className="text-emerald-500" /> Chi
                    phí
                  </label>
                  <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-4">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, price_type: "FREE" })
                      }
                      className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${formData.price_type === "FREE" ? "bg-white shadow-sm text-blue-600" : "text-slate-500"}`}
                    >
                      Miễn phí
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, price_type: "PAID" })
                      }
                      className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${formData.price_type === "PAID" ? "bg-white shadow-sm text-blue-600" : "text-slate-500"}`}
                    >
                      Bán Code
                    </button>
                  </div>
                  <div
                    className={
                      formData.price_type === "FREE"
                        ? "opacity-30 pointer-events-none"
                        : ""
                    }
                  >
                    <input
                      name="price_download"
                      type="number"
                      value={formData.price_download}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500 outline-none font-black text-xl text-center"
                    />
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
