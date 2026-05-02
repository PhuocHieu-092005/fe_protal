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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CompanyProfileSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const [openMenus, setOpenMenus] = useState({
    company: true,
    recruitment: true,
    account: true,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <aside className="h-fit w-1/4 select-none rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
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
                  onClick={() => setActiveTab("posted-jobs")}
                  className={`flex w-full items-center gap-3 rounded-md p-2 text-sm transition-all ${
                    activeTab === "posted-jobs"
                      ? "bg-blue-50 font-semibold text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Briefcase size={16} />
                  Tin tuyển dụng đã đăng
                </button>
              </li>

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
  );
}
