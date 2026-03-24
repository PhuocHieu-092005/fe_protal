import React, { useState } from "react";

const TemplateDetail = () => {
  const [cvData, setCvData] = useState({
    fullName: "Nguyễn Văn A",
    birthday: "01/01/1998",
    gender: "Nam",
    phone: "0123 456 789",
    email: "nguyenvana@email.com",
    address: "123 Đường ABC, TP.HCM",
    objective:
      "Mong muốn làm việc tại vị trí lập trình viên React, ứng dụng những kiến thức đã học để phát triển các dự án web hiện đại.",
    school: "Đại học XYZ",
    major: "Kỹ thuật phần mềm",
    eduTime: "2018 - 2022",
    company: "Công ty ABC",
    position: "Lập trình viên",
    expTime: "2020 - 2021",
    skills: "ReactJS, JavaScript, HTML/CSS, Tailwind CSS",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCvData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-6 mt-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* LEFT - 1/4 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Tạo CV mẫu</h2>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-emerald-50 px-4 py-3 font-medium text-emerald-700">
                  ✓ Thông tin cá nhân
                </div>
                <div className="rounded-2xl px-4 py-3 text-slate-600">
                  Tóm tắt
                </div>
                <div className="rounded-2xl px-4 py-3 text-slate-600">
                  Trình độ học vấn
                </div>
                <div className="rounded-2xl px-4 py-3 text-slate-600">
                  Kinh nghiệm
                </div>
                <div className="rounded-2xl px-4 py-3 text-slate-600">
                  Kỹ năng
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Họ và tên
                  </label>
                  <input
                    name="fullName"
                    value={cvData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Ngày sinh
                  </label>
                  <input
                    name="birthday"
                    value={cvData.birthday}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Giới tính
                  </label>
                  <input
                    name="gender"
                    value={cvData.gender}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Số điện thoại
                  </label>
                  <input
                    name="phone"
                    value={cvData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    name="email"
                    value={cvData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Địa chỉ
                  </label>
                  <input
                    name="address"
                    value={cvData.address}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button className="rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50">
                    Hủy bỏ
                  </button>
                  <button className="rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700">
                    Lưu CV
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - 3/4 */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
              <div className="grid gap-8 md:grid-cols-3">
                {/* Sidebar preview */}
                <div className="rounded-3xl bg-slate-100 p-6">
                  <div className="mx-auto h-28 w-28 rounded-full bg-slate-300" />
                  <h3 className="mt-4 text-center text-2xl font-bold text-slate-900">
                    {cvData.fullName}
                  </h3>

                  <div className="mt-5 space-y-3 text-sm text-slate-700">
                    <p>🎂 {cvData.birthday}</p>
                    <p>
                      {cvData.gender === "Nam" ? "👨‍💼" : "👩‍💼"} {cvData.gender}
                    </p>
                    <p>📞 {cvData.phone}</p>
                    <p>✉️ {cvData.email}</p>
                    <p>📍 {cvData.address}</p>
                  </div>
                </div>

                {/* Main preview */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h4 className="border-b border-slate-200 pb-3 text-xl font-bold text-slate-900">
                      MỤC TIÊU NGHỀ NGHIỆP
                    </h4>
                    <p className="mt-4 leading-7 text-slate-700">
                      {cvData.objective}
                    </p>
                  </div>

                  <div>
                    <h4 className="rounded-xl bg-indigo-600 px-4 py-3 text-lg font-bold text-white">
                      TRÌNH ĐỘ HỌC VẤN
                    </h4>
                    <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                      <p className="text-lg font-semibold text-slate-900">
                        {cvData.school}
                      </p>
                      <p className="mt-1 text-slate-700">{cvData.major}</p>
                      <p className="mt-1 text-slate-500">{cvData.eduTime}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="rounded-xl bg-indigo-600 px-4 py-3 text-lg font-bold text-white">
                      KINH NGHIỆM LÀM VIỆC
                    </h4>
                    <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                      <p className="text-lg font-semibold text-slate-900">
                        {cvData.company}
                      </p>
                      <p className="mt-1 text-slate-700">{cvData.position}</p>
                      <p className="mt-1 text-slate-500">{cvData.expTime}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="rounded-xl bg-indigo-600 px-4 py-3 text-lg font-bold text-white">
                      KỸ NĂNG
                    </h4>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {cvData.skills.split(",").map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end right */}
        </div>
      </div>
    </section>
  );
};

export default TemplateDetail;
