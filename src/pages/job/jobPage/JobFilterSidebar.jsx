import React, { useState } from "react";
import { useJobs } from "../../../contexts/JobContext";
import jobService from "../../../services/jobService";

export default function JobFilterSidebar() {
  const { fetchActiveJobs, setJobs } = useJobs();
  const skills = [
    "ReactJS",
    "NodeJS",
    "Java",
    "Flutter",
    "UI/UX",
    "SQL",
    "html",
  ];

  const handleToggleSkillTags = (skill) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(skill)
        ? prev.tags.filter((item) => item !== skill)
        : [...prev.tags, skill],
    }));
  };
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    minSalary: "",
    maxSalary: "",
    tags: [],
  });

  const handleReset = () => {
    setFilters({
      location: "",
      type: "",
      minSalary: "",
      maxSalary: "",
      tags: [],
    });
    fetchActiveJobs();
  };
  const handleSubmit = async () => {
    try {
      const response = await jobService.filterJobs(filters);
      setJobs(response.data.data);
    } catch (err) {
      console.log("lỗi: ", err);
    }
  };
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Bộ lọc</h3>
        <button
          onClick={handleReset}
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          Đặt lại
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Khu vực làm việc
          </label>
          <select
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none"
          >
            <option value="">TẤT CẢ KHU VỰC</option>
            <option value="TUYENQUANG">Tuyên Quang </option>
            <option value="LAOCAI">Lào Cai </option>
            <option value="THAINGUYEN">Thái Nguyên </option>
            <option value="PHUTHO">Phú Thọ </option>
            <option value="BACNINH">Bắc Ninh </option>
            <option value="HUNGYEN">Hưng Yên </option>
            <option value="HAIPHONG">Hải Phòng </option>
            <option value="NINHBINH">Ninh Bình </option>
            <option value="QUANGTRI">Quảng Trị </option>
            <option value="DANANG">Đà Nẵng </option>
            <option value="QUANGNGAI">Quảng Ngãi </option>
            <option value="GIALAI">Gia Lai </option>
            <option value="KHANHHOA">Khánh Hòa </option>
            <option value="LAMDONG">Lâm Đồng </option>
            <option value="DAKLAK">Đắk Lắk </option>
            <option value="HOCHIMINH">TP. Hồ Chí Minh </option>
            <option value="DONGNAI">Đồng Nai </option>
            <option value="TAYNINH">Tây Ninh</option>
            <option value="CANTHO">Cần Thơ </option>
            <option value="VINHLONG">Vĩnh Long </option>
            <option value="DONGTHAP">Đồng Tháp </option>
            <option value="CAMAU">Cà Mau </option>
            <option value="ANGIANG">An Giang </option>
            <option value="HANOI">Hà Nội</option>
            <option value="HUE">Huế</option>
            <option value="LAICHAU">Lai Châu</option>
            <option value="DIENBIEN">Điện Biên</option>
            <option value="SONLA">Sơn La</option>
            <option value="LANGSON">Lạng Sơn</option>
            <option value="QUANGNINH">Quảng Ninh</option>
            <option value="THANHHOA">Thanh Hóa</option>
            <option value="NGHEAN">Nghệ An</option>
            <option value="HATINH">Hà Tĩnh</option>
            <option value="CAOBANG">Cao Bằng</option>
            <option value="REMOTE">Làm việc từ xa (Remote)</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Mức lương (VNĐ)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Từ"
              value={filters.minSalary}
              onChange={(e) =>
                setFilters({ ...filters, minSalary: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
            />
            <span className="text-slate-400">-</span>
            <input
              type="number"
              placeholder="Đến"
              value={filters.maxSalary}
              onChange={(e) =>
                setFilters({ ...filters, maxSalary: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Loại hình công việc
          </label>

          <div className="space-y-2 text-sm text-slate-600">
            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
              <input
                type="radio"
                name="jobType"
                checked={filters.type === "FULLTIME"}
                onChange={() => setFilters({ ...filters, type: "FULLTIME" })}
                className="w-4 h-4 accent-slate-900"
              />
              Toàn thời gian (Full-time)
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
              <input
                type="radio"
                name="jobType"
                checked={filters.type === "PARTTIME"}
                onChange={() => setFilters({ ...filters, type: "PARTTIME" })}
                className="w-4 h-4 accent-slate-900"
              />
              Bán thời gian (Part-time)
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
              <input
                type="radio"
                name="jobType"
                checked={filters.type === "INTERNSHIP"}
                onChange={() => setFilters({ ...filters, type: "INTERNSHIP" })}
                className="w-4 h-4 accent-slate-900"
              />
              Thực tập (Internship)
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
              <input
                type="radio"
                name="jobType"
                checked={filters.type === "FREELANCE"}
                onChange={() => setFilters({ ...filters, type: "Freelance" })}
                className="w-4 h-4 accent-slate-900"
              />
              Tự do (Freelance)
            </label>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Kỹ năng chuyên môn
          </label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => {
              const isSelected = filters.tags.includes(skill);
              return (
                <button
                  type="button"
                  key={skill}
                  onClick={() => handleToggleSkillTags(skill)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-slate-950 text-white border border-slate-950 shadow-sm"
                      : "border border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900 bg-white"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-slate-900 hover:bg-black active:scale-95 shadow-lg shadow-slate-200 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all"
        >
          Áp dụng lọc
        </button>
      </div>
    </aside>
  );
}
