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
  Settings,
  LogOut,
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
      // eslint-disable-next-line react-hooks/immutability
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
        {/* MENU CHÍNH (DESKTOP) */}
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
              className="relative p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              onClick={handleBellClick}
            >
              Thông báo ({unreadCount})
            </button>
            {isShow && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                <div className="p-3 border-b bg-gray-50 font-bold text-sm text-gray-700">
                  Thông báo
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((e) => (
                      <div
                        key={e.id}
                        className="p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
                        onClick={() => clickDetailNotification(e)}
                      >
                        <p className="text-sm text-gray-800 font-medium">
                          {e.type}
                        </p>
                        <p className="text-xs text-gray-500">
                          {e.title || "Bạn có thông báo mới"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-center text-sm text-gray-400">
                      Không có thông báo nào
                    </p>
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
            className={`fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-[70] p-6 flex flex-col transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
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
              {/* 1. HỒ SƠ CÁ NHÂN */}
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

              {/* 2. DÀNH RIÊNG CHO SINH VIÊN */}
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

              {/* 3. DÀNH RIÊNG CHO CÔNG TY */}
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

              {/* 4. DÀNH RIÊNG CHO GIẢNG VIÊN */}
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

              {/* 5. DÀNH RIÊNG CHO ADMIN */}
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

              {/* ĐĂNG XUẤT */}
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
      {showDetailModal && selectedNotif && (
        //inset 0 bằng với top:0,left:0,right....
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

            {/* Footer Modal */}
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
