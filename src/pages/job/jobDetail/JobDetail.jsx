import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../../layouts/Footer";
import ApplyJobModal from "./ApplyJobModal";

export default function JobDetail() {
  const { id } = useParams();
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const jobData = {
    id,
    title: "Thực tập sinh Frontend Developer",
    company: "FPT Software",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    location: "TP. Hồ Chí Minh",
    type: "Thực tập",
    level: "Fresher / Thực tập sinh",
    salary: "4.000.000 - 8.000.000 VNĐ",
    postedAt: "2 ngày trước",
    deadline: "30/04/2026",
    applicants: 24,
    description:
      "Chúng tôi đang tìm kiếm một Thực tập sinh Frontend Developer nhiệt huyết để gia nhập đội ngũ phát triển sản phẩm. Bạn sẽ có cơ hội làm việc với các công nghệ web hiện đại để xây dựng giao diện tương tác và hỗ trợ phát triển các hệ thống nội bộ quy mô lớn.",
    requirements: [
      "Nắm vững kiến thức cơ bản về HTML, CSS và JavaScript.",
      "Có kinh nghiệm làm việc với ReactJS là một lợi thế lớn.",
      "Sử dụng thành thạo Git và hiểu luồng làm việc nhóm (workflow).",
      "Có tư duy giải quyết vấn đề tốt, logic rõ ràng.",
      "Khả năng đọc hiểu tài liệu chuyên ngành bằng tiếng Anh khá.",
    ],
    benefits: [
      "Được nhận trợ cấp thực tập và thưởng theo năng suất công việc.",
      "Cơ hội làm việc trực tiếp và học hỏi từ các mentor giàu kinh nghiệm.",
      "Môi trường làm việc trẻ trung, năng động, trang thiết bị hiện đại.",
      "Cơ hội trở thành nhân viên chính thức (Full-time) sau kỳ thực tập.",
      "Được trực tiếp tham gia vào các dự án thực tế của công ty.",
    ],
    skills: ["ReactJS", "TailwindCSS", "JavaScript", "Git", "REST API"],
    companyInfo:
      "FPT Software là một trong những công ty công nghệ hàng đầu tại Việt Nam, tiên phong trong lĩnh vực chuyển đổi số, phát triển phần mềm và cung cấp các dịch vụ CNTT cho hàng ngàn khách hàng trên toàn cầu.",
    relatedJobs: [
      {
        id: 2,
        title: "Lập trình viên Backend",
        company: "VNG Corporation",
        location: "TP. Hồ Chí Minh",
      },
      {
        id: 3,
        title: "Thiết kế UI/UX",
        company: "Shopee",
        location: "Remote (Làm việc từ xa)",
      },
      {
        id: 4,
        title: "Lập trình viên Full Stack",
        company: "Tiki",
        location: "Hà Nội",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow">
        <section className="mx-auto max-w-7xl px-6 pt-24 pb-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-900">
              Trang chủ
            </Link>
            <span>/</span>
            <Link to="/job" className="hover:text-slate-900">
              Việc làm
            </Link>
            <span>/</span>
            <span className="text-slate-900">{jobData.title}</span>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <img
                      src={jobData.logo}
                      alt={jobData.company}
                      className="h-16 w-16 rounded-2xl border border-slate-100 object-cover p-2"
                    />

                    <div>
                      <p className="text-sm text-slate-500">
                        {jobData.company}
                      </p>
                      <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
                        {jobData.title}
                      </h1>

                      <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                        <span className="rounded-full bg-slate-100 px-3 py-1.5">
                          {jobData.location}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1.5">
                          {jobData.type}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1.5">
                          {jobData.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-2xl font-bold text-slate-900">
                      {jobData.salary}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Đăng {jobData.postedAt}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Loại hình</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {jobData.type}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Hạn nộp hồ sơ</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {jobData.deadline}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Lượt ứng tuyển</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {jobData.applicants} người
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Mô tả công việc
                </h2>
                <p className="mt-4 leading-7 text-slate-600">
                  {jobData.description}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Yêu cầu ứng viên
                </h2>
                <ul className="mt-4 space-y-3 text-slate-600">
                  {jobData.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-slate-900" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">Quyền lợi</h2>
                <ul className="mt-4 space-y-3 text-slate-600">
                  {jobData.benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-slate-900" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Kỹ năng chuyên môn
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {jobData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-slate-900">
                    Việc làm liên quan
                  </h2>
                  <Link
                    to="/job"
                    className="text-sm font-medium text-slate-600 hover:text-slate-900"
                  >
                    Xem tất cả
                  </Link>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {jobData.relatedJobs.map((job) => (
                    <Link
                      key={job.id}
                      to={`/job/${job.id}`}
                      className="rounded-2xl border border-slate-200 p-4 transition hover:border-slate-900 hover:shadow-sm"
                    >
                      <p className="text-sm text-slate-500">{job.company}</p>
                      <h3 className="mt-1 text-lg font-semibold text-slate-900">
                        {job.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {job.location}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar bên phải */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Mức lương</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {jobData.salary}
                </p>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setIsApplyOpen(true)}
                    className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Ứng tuyển ngay
                  </button>

                  <button className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900">
                    Lưu tin tuyển dụng
                  </button>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-6 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Địa điểm</span>
                    <span className="font-medium text-slate-900">
                      {jobData.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Loại hình</span>
                    <span className="font-medium text-slate-900">
                      {jobData.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cấp bậc</span>
                    <span className="font-medium text-slate-900">
                      {jobData.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Hạn nộp hồ sơ</span>
                    <span className="font-medium text-slate-900">
                      {jobData.deadline}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">Về công ty</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {jobData.companyInfo}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ApplyJobModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        jobTitle={jobData.title}
        company={jobData.company}
      />
    </div>
  );
}
