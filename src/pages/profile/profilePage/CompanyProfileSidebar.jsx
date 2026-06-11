import React, { useState } from "react";
import {
  Building2,
  Briefcase,
  Users,
  Lock,
  LogOut,
  ChevronDown,
  ChevronUp,
  FileEdit,
  Heart,
  Handshake,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function CompanyProfileSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const [openMenus, setOpenMenus] = useState({
    company: true,
    recruitment: true,
    account: true,
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  // RESPONSIVE UI: state mở drawer mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  // RESPONSIVE UI: chọn tab mobile xong tự đóng drawer
  const handleMobileTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* RESPONSIVE UI: nút 3 gạch mobile */}
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
                Danh mục công ty
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
                  Hồ sơ công ty
                </h2>
                <p className="text-xs text-slate-400">
                  Quản lý thông tin doanh nghiệp
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
                  <Building2 size={16} />
                  Hồ sơ công ty
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleMobileTabChange("company-profile")}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
                      activeTab === "company-profile"
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <FileEdit size={17} />
                    Cập nhật thông tin công ty
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <div className="mb-2 flex items-center gap-2 px-2 text-xs font-black uppercase tracking-wider text-slate-500">
                  <Briefcase size={16} />
                  Tuyển dụng
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleMobileTabChange("applicants")}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
                      activeTab === "applicants"
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Users size={17} />
                    Ứng viên đã ứng tuyển
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
                    Dự án đã thích
                  </button>

                  <button
                    onClick={() =>
                      handleMobileTabChange("project-access-requests")
                    }
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
                      activeTab === "project-access-requests"
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Handshake size={17} />
                    Yêu cầu hợp tác project
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

      {/* RESPONSIVE UI: desktop giữ sidebar cũ, mobile ẩn */}
      <aside className="hidden h-fit w-1/4 select-none rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:block">
        <nav className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div
              onClick={() => toggleMenu("company")}
              className="flex cursor-pointer items-center justify-between rounded-md p-3 transition-all hover:bg-gray-50"
            >
              <div className="flex items-center gap-3 font-bold text-blue-600">
                <Building2 size={20} />
                <span className="text-sm tracking-wider">HỒ SƠ CÔNG TY</span>
              </div>

              {openMenus.company ? (
                <ChevronUp size={16} className="text-gray-400" />
              ) : (
                <ChevronDown size={16} className="text-gray-400" />
              )}
            </div>

            {openMenus.company && (
              <ul className="ml-9 mt-1 flex flex-col gap-1">
                <li>
                  <button
                    onClick={() => setActiveTab("company-profile")}
                    className={`flex w-full items-center gap-3 rounded-md p-2 text-sm transition-all ${
                      activeTab === "company-profile"
                        ? "bg-blue-50 font-semibold text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <FileEdit size={16} />
                    Cập nhật thông tin công ty
                  </button>
                </li>
              </ul>
            )}
          </div>

          <div className="flex flex-col">
            <div
              onClick={() => toggleMenu("recruitment")}
              className="flex cursor-pointer items-center justify-between rounded-md p-3 transition-all hover:bg-gray-50"
            >
              <div className="flex items-center gap-3 font-bold text-gray-700">
                <Briefcase size={20} />
                <span className="text-sm tracking-wider">TUYỂN DỤNG</span>
              </div>

              {openMenus.recruitment ? (
                <ChevronUp size={16} className="text-gray-400" />
              ) : (
                <ChevronDown size={16} className="text-gray-400" />
              )}
            </div>

            {openMenus.recruitment && (
              <ul className="ml-9 mt-1 flex flex-col gap-1">
                <li>
                  <button
                    onClick={() => setActiveTab("applicants")}
                    className={`flex w-full items-center gap-3 rounded-md p-2 text-sm transition-all ${
                      activeTab === "applicants"
                        ? "bg-blue-50 font-semibold text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Users size={16} />
                    Ứng viên đã ứng tuyển
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setActiveTab("favorite-projects")}
                    className={`flex w-full items-center gap-3 rounded-md p-2 text-sm transition-all ${
                      activeTab === "favorite-projects"
                        ? "bg-blue-50 font-semibold text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Heart size={16} />
                    Dự án đã thích
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setActiveTab("project-access-requests")}
                    className={`flex w-full items-center gap-3 rounded-md p-2 text-sm transition-all ${
                      activeTab === "project-access-requests"
                        ? "bg-blue-50 font-semibold text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Handshake size={16} />
                    Yêu cầu hợp tác project
                  </button>
                </li>
              </ul>
            )}
          </div>

          <div className="flex flex-col">
            <div
              onClick={() => toggleMenu("account")}
              className="flex cursor-pointer items-center justify-between rounded-md p-3 transition-all hover:bg-gray-50"
            >
              <div className="flex items-center gap-3 font-bold text-gray-700">
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
              <ul className="ml-9 mt-1 flex flex-col gap-1">
                <li>
                  <button
                    onClick={() => setActiveTab("change-password")}
                    className={`flex w-full items-center gap-3 rounded-md p-2 text-sm transition-all ${
                      activeTab === "change-password"
                        ? "bg-blue-50 font-semibold text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Thay đổi mật khẩu
                  </button>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-3 rounded-md p-2 text-left text-sm text-red-500 transition-all hover:bg-red-50"
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
}
