import React, { useState } from "react";
import {
  User,
  FileText,
  ClipboardCheck,
  BarChart3,
  Briefcase,
  Star,
  Heart,
  Lock,
  LogOut,
  ChevronDown,
  ChevronUp,
  UserRoundPen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const [openMenus, setOpenMenus] = useState({
    profile: true,
    job: true,
    account: true,
  });

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
    window.location.reload();
  };

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <aside className="w-1/4 bg-white rounded-lg shadow-sm p-4 h-fit border border-gray-100 select-none">
      <nav className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div
            onClick={() => toggleMenu("profile")}
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-md transition-all"
          >
            <div className="flex items-center gap-3 text-blue-600 font-bold">
              <User size={20} />
              <span className="text-sm tracking-wider">HỒ SƠ ỨNG VIÊN</span>
            </div>
            {openMenus.profile ? (
              <ChevronUp size={16} className="text-gray-400" />
            ) : (
              <ChevronDown size={16} className="text-gray-400" />
            )}
          </div>

          {openMenus.profile && (
            <ul className="flex flex-col gap-1 ml-9 mt-1 animate-in fade-in duration-300">
              <li>
                <button
                  onClick={() => setActiveTab("update-profile")}
                  className={`flex items-center gap-3 p-2 text-sm w-full rounded-md transition-all ${
                    activeTab === "update-profile"
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <UserRoundPen size={16} />
                  Cập nhật hồ sơ
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveTab("cv-manager")}
                  className={`flex items-center gap-3 p-2 text-sm w-full rounded-md transition-all ${
                    activeTab === "cv-manager"
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FileText size={16} />
                  Quản lý CV & Trạng thái
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveTab("evaluations")}
                  className={`flex items-center gap-3 p-2 text-sm w-full rounded-md transition-all ${
                    activeTab === "evaluations"
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <ClipboardCheck size={16} />
                  Đánh giá của giảng viên
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveTab("project-stats")}
                  className={`flex items-center gap-3 p-2 text-sm w-full rounded-md transition-all ${
                    activeTab === "project-stats"
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <BarChart3 size={16} />
                  Thống kê đồ án
                </button>
              </li>
            </ul>
          )}
        </div>

        <div className="flex flex-col">
          <div
            onClick={() => toggleMenu("job")}
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-md transition-all"
          >
            <div className="flex items-center gap-3 text-gray-700 font-bold">
              <Briefcase size={20} />
              <span className="text-sm tracking-wider">QUẢN LÝ CÔNG VIỆC</span>
            </div>
            {openMenus.job ? (
              <ChevronUp size={16} className="text-gray-400" />
            ) : (
              <ChevronDown size={16} className="text-gray-400" />
            )}
          </div>

          {openMenus.job && (
            <ul className="flex flex-col gap-1 ml-9 mt-1 animate-in fade-in duration-300">
              <li>
                <button
                  onClick={() => setActiveTab("applied-cv")}
                  className={`flex items-center gap-3 p-2 text-sm w-full rounded-md transition-all ${
                    activeTab === "applied-cv"
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Star size={16} />
                  CV đã ứng tuyển
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveTab("favorite-jobs")}
                  className={`flex items-center gap-3 p-2 text-sm w-full rounded-md transition-all ${
                    activeTab === "favorite-jobs"
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Heart size={16} />
                  Công việc yêu thích
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("favorite-projects")}
                  className={`flex items-center gap-3 p-2 text-sm w-full rounded-md transition-all ${
                    activeTab === "favorite-projects"
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Heart size={16} />
                  Dự án yêu thích
                </button>
              </li>
            </ul>
          )}
        </div>

        <div className="flex flex-col">
          <div
            onClick={() => toggleMenu("account")}
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-md transition-all"
          >
            <div className="flex items-center gap-3 text-gray-700 font-bold">
              <Lock size={20} />
              <span className="text-sm tracking-wider">TÀI KHOẢN</span>
            </div>
            {openMenus.account ? (
              <ChevronUp size={16} className="text-gray-400" />
            ) : (
              <ChevronDown size={16} className="text-gray-400" />
            )}
          </div>

          {openMenus.account && (
            <ul className="flex flex-col gap-1 ml-9 mt-1 animate-in fade-in duration-300">
              <li>
                <button
                  onClick={() => setActiveTab("change-password")}
                  className={`flex items-center gap-3 p-2 text-sm w-full rounded-md transition-all ${
                    activeTab === "change-password"
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Thay đổi mật khẩu
                </button>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-2 text-sm text-red-500 hover:bg-red-50 rounded-md transition-all w-full text-left mt-1"
                >
                  <LogOut size={16} />
                  Đăng xuất
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
