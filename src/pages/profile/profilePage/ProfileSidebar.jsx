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
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const [openMenus, setOpenMenus] = useState({
    profile: true,
    job: true,
    account: true,
  });

  // RESPONSIVE UI: state mở drawer menu mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // RESPONSIVE UI: chọn tab trên mobile xong tự đóng drawer
  const handleMobileTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* RESPONSIVE UI: nút 3 gạch mobile, từ md trở lên ẩn */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition-all hover:bg-slate-50"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Menu size={20} />
            </div>

            <div>
              <p className="text-sm font-black text-slate-900">
                Danh mục hồ sơ
              </p>
              <p className="text-xs text-slate-400">Bấm để mở menu quản lý</p>
            </div>
          </div>

          <ChevronDown size={18} className="text-slate-400" />
        </button>
      </div>

      {/* RESPONSIVE UI: drawer mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <aside className="absolute left-0 top-0 flex h-full w-[82vw] max-w-[330px] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  Hồ sơ sinh viên
                </h2>
                <p className="text-xs text-slate-400">
                  Quản lý thông tin cá nhân
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <div className="mb-5">
                <div className="mb-2 flex items-center gap-2 px-2 text-xs font-black uppercase tracking-wider text-blue-600">
                  <User size={16} />
                  Hồ sơ ứng viên
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleMobileTabChange("update-profile")}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
                      activeTab === "update-profile"
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <UserRoundPen size={17} />
                    Cập nhật hồ sơ
                  </button>

                  <button
                    onClick={() => handleMobileTabChange("cv-manager")}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
                      activeTab === "cv-manager"
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <FileText size={17} />
                    Quản lý CV & Trạng thái
                  </button>

                  <button
                    onClick={() => handleMobileTabChange("evaluations")}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
                      activeTab === "evaluations"
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <ClipboardCheck size={17} />
                    Đánh giá của giảng viên
                  </button>

                  <button
                    onClick={() => handleMobileTabChange("project-stats")}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
                      activeTab === "project-stats"
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <BarChart3 size={17} />
                    Thống kê đồ án
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <div className="mb-2 flex items-center gap-2 px-2 text-xs font-black uppercase tracking-wider text-slate-500">
                  <Briefcase size={16} />
                  Quản lý công việc
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleMobileTabChange("favorite-jobs")}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
                      activeTab === "favorite-jobs"
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Heart size={17} />
                    Công việc yêu thích
                  </button>

                  <button
                    onClick={() => handleMobileTabChange("favorite-projects")}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
                      activeTab === "favorite-projects"
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Heart size={17} />
                    Dự án yêu thích
                  </button>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 px-2 text-xs font-black uppercase tracking-wider text-slate-500">
                  <Lock size={16} />
                  Tài khoản
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleMobileTabChange("change-password")}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
                      activeTab === "change-password"
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Lock size={17} />
                    Thay đổi mật khẩu
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-500 transition-all hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Đăng xuất
                  </button>
                </div>
              </div>
            </nav>
          </aside>
        </div>
      )}

      {/* RESPONSIVE UI: sidebar desktop giữ nguyên, từ md trở lên hiện */}
      <aside className="sticky hidden w-1/4 select-none rounded-lg border border-gray-100 bg-white p-4 shadow-sm h-fit md:block">
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
                <span className="text-sm tracking-wider">
                  QUẢN LÝ CÔNG VIỆC
                </span>
              </div>
              {openMenus.job ? (
                <ChevronUp size={16} className="text-gray-400" />
              ) : (
                <ChevronDown size={16} className="text-gray-400" />
              )}
            </div>

            {openMenus.job && (
              <ul className="flex flex-col gap-1 ml-9 mt-1 animate-in fade-in duration-300">
                {/* <li>
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
              </li> */}

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
    </>
  );
};

export default ProfileSidebar;
