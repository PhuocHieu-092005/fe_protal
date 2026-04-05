import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [authMode, setAuthMode] = useState(null); //mở form sign in, sign up
  const [scrolled, setScrolled] = useState(false); //sroll navbar
  const [menuOpen, setMenuOpen] = useState(false); //mở sidebar sau khi đã đăng nhập

  const { user, isLoggedIn, logout } = useAuth(); //quản lý trạng thái đăng nhập & thông tin user

  const closeAuth = () => setAuthMode(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    window.location.href = "/";
  };

  const menuLinkStyles = `
        px-4 py-2 rounded-xl transition-all duration-300 font-semibold
        ${scrolled ? "text-black hover:text-gray-600" : "text-gray-700 hover:text-gray-900"}
        active:!bg-gray-200/70 focus:!bg-transparent
    `;

  return (
    <>
      <div
        className={`navbar fixed top-0 left-0 w-full z-50 px-4 md:px-10 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-md h-16"
            : "bg-white shadow-md h-20"
        }`}
      >
        {/* LOGO: Giữ nguyên logic đổi từ Xanh (Primary) sang Đen khi cuộn */}
        <div className="flex-1">
          <Link
            to="/"
            className={`text-2xl font-bold cursor-pointer transition-colors duration-300 ${
              scrolled ? "text-black" : "text-blue-600"
            }`}
          >
            Cổng thông tin việc làm
          </Link>
        </div>

        {/* MENU: Giữ nguyên các mục menu */}
        <ul className="hidden lg:flex menu menu-horizontal px-1 font-medium gap-1">
          <li>
            <Link to="/" className={menuLinkStyles}>
              Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/job" className={menuLinkStyles}>
              Công việc
            </Link>
          </li>
          <li>
            <Link to="/cv" className={menuLinkStyles}>
              CV
            </Link>
          </li>
          <li>
            <Link to="/project" className={menuLinkStyles}>
              Đồ án
            </Link>
          </li>
          {user?.role !== "COMPANY" && (
            <li>
              <Link to="/template" className={menuLinkStyles}>
                Mẫu CV
              </Link>
            </li>
          )}
        </ul>

        {/* AUTH / USER */}
        <div className="flex-1 flex justify-end items-center gap-3">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setAuthMode("signin")}
                className="btn btn-ghost rounded-full px-6 font-bold active:scale-95 transition-all"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setAuthMode("signup")}
                className="btn rounded-full px-8 bg-black text-white border-none hover:bg-gray-800 active:scale-95 transition-all"
              >
                Đăng ký
              </button>
            </>
          ) : (
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-3 p-1 pr-4 rounded-full bg-gray-50 hover:bg-gray-100 transition-all border border-gray-100 active:scale-95"
            >
              <img
                src={user?.avatar_url}
                alt="avatar"
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="font-bold text-gray-800 text-sm">
                {user?.full_name}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Sidebar khi đã login: Sửa lại màu chữ cho hài hòa */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-[70] p-6 flex flex-col transform transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-50">
              <img
                src={user.avatar_url}
                alt="avatar"
                className="w-14 h-14 rounded-2xl border-2 border-blue-50 shadow-md object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-bold text-gray-900 block leading-tight">
                  {user?.full_name}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  Ứng viên
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-700 font-bold active:bg-gray-100"
              >
                Hồ sơ cá nhân
              </Link>
              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-700 font-bold active:bg-gray-100"
              >
                Cài đặt
              </Link>
              <div className="my-4 border-t border-gray-50"></div>
              <button
                onClick={handleLogout}
                className="px-4 py-3 hover:bg-red-50 rounded-xl text-left transition-colors text-red-600 font-bold active:bg-red-100"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal Auth: Giữ nguyên logic của bạn */}
      {authMode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="relative w-full flex justify-center">
            {authMode === "signin" ? (
              <SignInForm
                onClose={closeAuth}
                onSwitchSignUp={() => setAuthMode("signup")}
              />
            ) : (
              <SignUpForm
                onClose={closeAuth}
                onSwitchSignIn={() => setAuthMode("signin")}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
