import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Link, useLocation } from "react-router-dom";
import notificationService from "../services/notificationService";
// Import Lucide Icons
import {
  UserCircle,
  FolderOpen,
  Wallet,
  Briefcase,
  FileSignature,
  ShieldHalf,
  LogOut,
  Bell,
} from "lucide-react";
import { connectWebSocket, disconnectWebSocket } from "../services/wsService";

export default function Navbar() {
  const [authMode, setAuthMode] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const scrollTimeoutRef = useRef(null);
  const lastScrolledRef = useRef(false);

  const closeAuth = () => setAuthMode(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) return;
      scrollTimeoutRef.current = setTimeout(() => {
        const isScrolled = window.scrollY > 100;
        if (isScrolled !== lastScrolledRef.current) {
          setScrolled(isScrolled);
          lastScrolledRef.current = isScrolled;
        }
        scrollTimeoutRef.current = null;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (user) {
      fetchInitialData();
      console.log("giá trị của userId là: ", user);
      console.log("an", user);

      connectWebSocket(user.email, (message) => {
        console.log("Tín hiệu mới", message);
        alert("Bạn vừa có thông báo mới!");
        fetchInitialData();
      });

      return () => disconnectWebSocket();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  const fetchInitialData = async () => {
    try {
      const res = await notificationService.getNotifications();
      setNotifications(res);
      setUnreadCount(res.length);
    } catch (err) {
      console.error("Lỗi khi lần đầu load thông báo", err);
    }
  };

  const handleBellClick = async () => {
    setIsShow(!isShow);

    try {
      if (user) {
        const res = await notificationService.getNotifications();
        setNotifications(res);
        setUnreadCount(res.length);
        console.log(res);
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật thông báo", err);
    }
  };

  const clickDetailNotification = async (notif) => {
    try {
      setSelectedNotif(notif);
      setShowDetailModal(true);

      if (!notif.read) {
        await notificationService.readNotification(notif.id);

        setNotifications((prev) =>
          prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n)),
        );

        setUnreadCount(unreadCount - 1);
      }
    } catch (err) {
      console.error("đã xảy ra lỗi", err);
    }
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    window.location.href = "/";
  };

  const menuLinkStyles = `
    px-4 py-2 rounded-xl transition-colors duration-300 font-semibold text-sm
    ${scrolled ? "text-zinc-800" : "text-zinc-600"}
    hover:text-blue-600 hover:bg-zinc-200/50 
    active:!bg-transparent focus:!bg-transparent
  `;

  return (
    <>
      <nav
        className={`navbar fixed top-0 left-0 w-full z-50 px-4 md:px-10 flex items-center h-20 transition-colors duration-300 ease-in-out ${
          scrolled
            ? "bg-zinc-50 shadow-sm border-b border-zinc-200/50 backdrop-blur-sm"
            : "bg-white shadow-none"
        }`}
      >
        {/* LOGO */}
        <div className="flex-1">
          <Link
            to="/"
            className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-zinc-900" : "text-blue-600"
            }`}
          >
            Cổng thông tin việc làm
          </Link>
        </div>

        {/* MENU CHÍNH DESKTOP */}
        <ul className="hidden lg:flex menu menu-horizontal px-1 gap-1">
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

          {(user?.role === "COMPANY" ||
            user?.role === "TEACHER" ||
            user?.role === "ADMIN") && (
            <li>
              <Link to="/cv" className={menuLinkStyles}>
                CV
              </Link>
            </li>
          )}

          <li>
            <Link to="/project" className={menuLinkStyles}>
              Đồ án
            </Link>
          </li>

          {user?.role !== "COMPANY" ? (
            <li>
              <Link to="/template" className={menuLinkStyles}>
                Mẫu CV
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/job/manage" className={menuLinkStyles}>
                Quản lý tuyển dụng
              </Link>
            </li>
          )}
        </ul>

        {/* AUTH SECTION */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={handleBellClick}
              className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
                isShow
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-950 hover:text-slate-950"
              }`}
            >
              <Bell size={20} />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[11px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {isShow && (
              <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl z-50">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Thông báo
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {unreadCount > 0
                        ? `Bạn có ${unreadCount} thông báo`
                        : "Không có thông báo mới"}
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Bell size={18} />
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((e) => (
                      <div
                        key={e.id}
                        className="cursor-pointer border-b border-slate-100 px-4 py-3 transition hover:bg-slate-50"
                        onClick={() => clickDetailNotification(e)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-800">
                              {e.type}
                            </p>
                            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                              {e.title || "Bạn có thông báo mới"}
                            </p>
                          </div>

                          {!e.read && (
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <Bell size={22} />
                      </div>

                      <p className="text-sm font-semibold text-slate-500">
                        Không có thông báo nào
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setAuthMode("signin")}
                className="text-sm font-semibold px-4 py-2"
              >
                Đăng nhập
              </button>

              <button
                onClick={() => setAuthMode("signup")}
                className="bg-zinc-900 text-zinc-50 text-sm font-medium px-6 py-2.5 rounded-full hover:bg-zinc-800 transition-all shadow-sm"
              >
                Đăng ký
              </button>
            </>
          ) : (
            <button
              onClick={() => setMenuOpen(true)}
              className={`flex items-center gap-2.5 p-1 pr-4 rounded-full transition-all border ${
                scrolled
                  ? "bg-white/80 border-zinc-300"
                  : "bg-zinc-50 border-zinc-200"
              }`}
            >
              <img
                src={
                  user?.avatar_url ||
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                }
                className="w-8 h-8 rounded-full object-cover"
                alt="avatar"
              />

              <span className="font-semibold text-zinc-800 text-sm">
                {user?.full_name}
              </span>
            </button>
          )}
        </div>
      </nav>

      {/* SIDEBAR PROFILE */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-[60]"
            onClick={() => setMenuOpen(false)}
          />

          <div
            className={`fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-[70] p-6 flex flex-col transform transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-zinc-100">
              <img
                src={
                  user?.avatar_url ||
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                }
                className="w-12 h-12 rounded-xl object-cover border border-zinc-100"
                alt="avatar"
              />

              <div>
                <span className="font-bold text-zinc-900 block leading-tight">
                  {user?.full_name}
                </span>

                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1 block">
                  {user?.role === "COMPANY"
                    ? "Nhà tuyển dụng"
                    : "Ứng viên / Sinh viên"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-3 ${
                  location.pathname === "/profile"
                    ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
                    : "text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                <UserCircle size={20} />
                <span>Hồ sơ cá nhân</span>
              </Link>

              {user?.role === "STUDENT" && (
                <>
                  <Link
                    to="/my-projects"
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-3 ${
                      location.pathname === "/my-projects"
                        ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
                        : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <FolderOpen size={20} />
                    <span>Đồ án của tôi</span>
                  </Link>

                  <Link
                    to="/my-wallet"
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-3 ${
                      location.pathname === "/my-wallet"
                        ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
                        : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <Wallet size={20} />
                    <span>Ví của tôi</span>
                  </Link>
                </>
              )}

              {user?.role === "COMPANY" && (
                <Link
                  to="/job/manage"
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-3 ${
                    location.pathname === "/job/manage"
                      ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <Briefcase size={20} />
                  <span>Quản lý tuyển dụng</span>
                </Link>
              )}

              {user?.role === "TEACHER" && (
                <Link
                  to="/evaluations"
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-3 ${
                    location.pathname === "/evaluations"
                      ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <FileSignature size={20} />
                  <span>Đánh giá đồ án</span>
                </Link>
              )}

              {user?.role === "ADMIN" && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-3 ${
                    location.pathname === "/admin/dashboard"
                      ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <ShieldHalf size={20} />
                  <span>Quản trị hệ thống</span>
                </Link>
              )}

              <div className="my-4 border-t border-zinc-100"></div>

              <button
                onClick={handleLogout}
                className="px-4 py-3 hover:bg-red-50 rounded-lg text-left text-red-600 font-bold transition-all duration-200 flex items-center gap-3 w-full"
              >
                <LogOut size={20} />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* AUTH MODALS */}
      {authMode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md">
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

      {/* MODAL CHI TIẾT THÔNG BÁO */}
      {showDetailModal && selectedNotif && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                {selectedNotif.type}
              </span>

              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedNotif.title}
              </h3>

              <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {new Date(selectedNotif.sentAt).toLocaleString("vi-VN")}
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-gray-100">
                <p className="text-gray-700 leading-relaxed">
                  {selectedNotif.content}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
