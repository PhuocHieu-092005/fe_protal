import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jobService from "../../../services/jobService";
// Import alertUtils
import { alertUtils } from "../../../helpers/alertUtils";

export default function CreateJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    jobType: "", // Giá trị mặc định
    workLocation: "",
    startDay: "",
    endDay: "",
    jdFile: null,
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      jdFile: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("requirements", formData.requirements);
    data.append("salary", formData.salary);
    data.append("jobType", formData.jobType);
    data.append("workLocation", formData.workLocation);
    data.append("tags", formData.tags);
    if (formData.jdFile) {
      data.append("jdFile", formData.jdFile);
    }
    if (formData.startDay) {
      data.append("startDay", `${formData.startDay}T00:00:00`);
    }
    if (formData.endDay) {
      data.append("endDay", `${formData.endDay}T23:59:59`);
    }

    try {
      const response = await jobService.createJob(data);

      // Thông báo thành công đẹp ở góc màn hình
      alertUtils.success(response.message || "Đăng tin tuyển dụng thành công!");

      navigate("/job/manage");
    } catch (err) {
      console.error(err);

      // LẤY MESSAGE LỖI TỪ BACKEND
      const errorMsg = err.response?.data?.message;
      console.log(errorMsg);

      if (
        errorMsg &&
        (errorMsg.includes("verified") || errorMsg.includes("xác thực"))
      ) {
        // Thông báo lỗi xác thực bằng Modal ở giữa màn hình cho trang trọng
        alertUtils.error(
          "Tài khoản chưa xác thực",
          "Tài khoản công ty của bạn chưa được xác thực. Vui lòng đợi Admin phê duyệt hồ sơ trước khi đăng bài.",
        );
      } else {
        // Các lỗi khác hiện Toast hoặc Modal tùy độ dài
        alertUtils.error(
          errorMsg || "Có lỗi xảy ra khi đăng bài. Vui lòng thử lại.",
        );
      }
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6 text-slate-700 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">
            Tạo Bài Tuyển Dụng Mới (Create New Job)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Cung cấp thông tin chi tiết để tìm kiếm ứng viên phù hợp nhất.
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* 1. Thông tin chung */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm">
                1
              </span>
              Thông tin chung (General Information)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-sm font-semibold text-slate-600">
                Vị trí tuyển dụng
              </label>
              <div className="md:col-span-3">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="VD: Tuyển dụng lập trình viên React tháng 4"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>

              <label className="text-sm font-semibold text-slate-600">
                Mức lương
              </label>
              <div className="md:col-span-3">
                <input
                  name="salary"
                  type="text"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="VD: 15.000.000"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
              <label className="text-sm font-semibold text-slate-600">
                Loại hình
              </label>
              <div className="md:col-span-3">
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all cursor-pointer"
                >
                  <option value="" disabled>
                    -- Chọn loại hình công việc --
                  </option>
                  <option value="INTERNSHIP">Thực tập (Internship)</option>
                  <option value="PARTTIME">Bán thời gian (Part-time)</option>
                  <option value="FULLTIME">Toàn thời gian (Full-time)</option>
                  <option value="FREELANCE">Tự do (Freelance)</option>
                </select>
              </div>

              <label className="text-sm font-semibold text-slate-600">
                Địa điểm
              </label>
              <div className="md:col-span-3">
                <select
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all cursor-pointer"
                >
                  <option value="" disabled>
                    -- Chọn tỉnh/thành phố --
                  </option>
                  <option value="">TẤT CẢ KHU VỰC</option>
                  <option value="HANOI">Hà Nội </option>
                  <option value="TPHCM">Thành phố Hồ Chí Minh </option>
                  <option value="MIENBAC">Miền Bắc </option>
                  <option value="MIENTRUNG">Miền Trung </option>
                  <option value="MIENNAM">Miền Nam </option>
                  <option value="REMOTE">Làm việc từ xa (Remote)</option>
                </select>
              </div>

              <label className="text-sm font-semibold text-slate-600">
                Mô tả công việc
              </label>
              <div className="md:col-span-3">
                <textarea
                  rows="4"
                  name="description"
                  onChange={handleChange}
                  placeholder="Mô tả chi tiết nhiệm vụ và trách nhiệm..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                ></textarea>
              </div>
            </div>
          </section>

          {/* 2. Yêu cầu & Kỹ năng */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm">
                2
              </span>
              Kỹ năng & Yêu cầu (Requirements)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-sm font-semibold text-slate-600">
                Yêu cầu ứng viên
              </label>
              <div className="md:col-span-3">
                <textarea
                  rows="4"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Kỹ năng chuyên môn, kinh nghiệm làm việc..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                ></textarea>
              </div>

              <label className="text-sm font-semibold text-slate-600">
                Từ khóa (Tags)
              </label>
              <div className="md:col-span-3 flex flex-wrap gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <input
                  type="text"
                  placeholder="VD: REACT,HTML"
                  onChange={handleChange}
                  name="tags"
                  value={formData.tags}
                  className="bg-transparent outline-none text-xs flex-1 min-w-[100px]"
                />
              </div>
            </div>
          </section>

          {/* 3. File đính kèm */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm">
                3
              </span>
              Hồ sơ đính kèm (JD File)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="text-sm font-semibold text-slate-600">
                Tải lên JD
              </label>
              <div className="md:col-span-3 relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-all">
                  <span className="text-3xl text-slate-400 mb-2">📁</span>
                  <p className="text-xs text-slate-500 font-medium text-center">
                    {formData.jdFile ? (
                      <span className="text-blue-600 font-bold">
                        Đã chọn: {formData.jdFile.name}
                      </span>
                    ) : (
                      "Nhấn để chọn file PDF hoặc DOCX"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* <div className="md:col-span-3 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-all cursor-pointer">
                <span className="text-3xl text-slate-400 mb-2">📁</span>
                <p className="text-xs text-slate-500 font-medium text-center">
                  Nhấn để chọn file hoặc kéo thả tại đây (PDF, DOCX)
                </p>
              </div> */}

          {/* 4. Thời hạn */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm">
                4
              </span>
              Thời hạn tuyển dụng
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-sm font-semibold text-slate-600">
                Ngày gian bắt đầu nhận hồ sơ
              </label>
              <div className="md:col-span-3">
                <input
                  name="startDay"
                  type="date"
                  value={formData.startDay}
                  onChange={handleChange}
                  className="bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-sm font-semibold text-slate-600">
                Hạn chót nhận hồ sơ
              </label>
              <div className="md:col-span-3">
                <input
                  name="endDay"
                  type="date"
                  value={formData.endDay}
                  onChange={handleChange}
                  className="bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Footer nút bấm */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={() => navigate("/job/manage")}
              className="px-8 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="bg-slate-900 hover:bg-blue-700 text-white px-10 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200"
            >
              Đăng Bài Tuyển Dụng (Submit Job)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
