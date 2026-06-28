import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Link, useLocation } from "react-router-dom";
import notificationService from "../services/notificationService";
import companyService from "../services/companyService";
import {
  UserCircle,
  FolderOpen,
  Wallet,
  Briefcase,
  FileSignature,
  ShieldHalf,
  LogOut,
  Bell,
  ShoppingBag,
  Menu, // Icon mở menu mobile
  X, // Icon đóng menu mobile
  ChevronRight, // Mũi tên nhỏ cho menu mobile
} from "lucide-react";
import { connectWebSocket, disconnectWebSocket } from "../services/wsService";
import { alertUtils } from "../helpers/alertUtils";

function getCompanyData(response) {
  return response?.data || response || null;
}

function getCompanyAvatarUrl(company) {
  return company?.avatarUrl || company?.avatar_url || "";
}

function AvatarSlot({ src, className, alt = "avatar" }) {
  if (!src) {
    return <span aria-label={alt} className={`${className} inline-block`} />;
  }

  return <img src={src} className={className} alt={alt} />;
}

export default function Navbar() {
  const [authMode, setAuthMode] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false); // State cho mobile drawer
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [companyProfile, setCompanyProfile] = useState(null);
  const { user, isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const scrollTimeoutRef = useRef(null);
  const lastScrolledRef = useRef(false);

  const closeAuth = () => setAuthMode(null);
  const displayAvatarUrl =
    user?.role === "COMPANY"
      ? getCompanyAvatarUrl(companyProfile) || user?.avatar_url || ""
      : user?.avatar_url || "";

  const displayName =
    user?.role === "COMPANY"
      ? companyProfile?.companyName || user?.full_name
      : user?.full_name;

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) return;
      scrollTimeoutRef.current = setTimeout(() => {
        const isScrolled = window.scrollY > 20;
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
      connectWebSocket(user.email, (message) => {
        alertUtils.success("Bạn vừa có thông báo mới!");
        fetchInitialData();
      });
      return () => disconnectWebSocket();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  useEffect(() => {
    if (user?.role !== "COMPANY") {
      setCompanyProfile(null);
      return;
    }
    let isMounted = true;
    const fetchCompanyProfile = async () => {
      try {
        const res = await companyService.getMyCompanyProfile();
        if (isMounted) setCompanyProfile(getCompanyData(res));
      } catch (error) {
        console.error("Lỗi lấy thông tin công ty cho navbar:", error);
      }
    };
    const handleCompanyProfileUpdated = (event) => {
      setCompanyProfile(getCompanyData(event.detail));
    };
    fetchCompanyProfile();
    window.addEventListener(
      "company-profile-updated",
      handleCompanyProfileUpdated,
    );
    return () => {
      isMounted = false;
      window.removeEventListener(
        "company-profile-updated",
        handleCompanyProfileUpdated,
      );
    };
  }, [user?.role, user?.email]);

  const fetchInitialData = async () => {
    try {
      const res = await notificationService.getNotifications();
      setNotifications(res);
      setUnreadCount(res.length);
    } catch (err) {
      console.error("Lỗi khi load thông báo", err);
    }
  };

  const handleBellClick = async () => {
    setIsShow(!isShow);
    try {
      if (user) {
        const res = await notificationService.getNotifications();
        setNotifications(res);
        setUnreadCount(res.length);
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

  // Danh sách link cho mobile drawer (Basic: No icons)
  const navLinks = [
    { name: "Trang chủ", path: "/" },
    { name: "Công việc", path: "/job" },
    { name: "Dự án", path: "/project" },
    { name: "Mẫu CV", path: "/template", hideForCompany: true },
  ];

  return (
    <>
      <nav
        className={`navbar fixed top-0 left-0 w-full z-50 px-4 md:px-10 flex items-center h-20 transition-colors duration-300 ease-in-out ${
          scrolled
            ? "bg-white/90 shadow-sm border-b border-zinc-200/50 backdrop-blur-sm"
            : "bg-white shadow-none"
        }`}
      >
        {/* MOBILE: Hamburger Icon (Chỉ hiện dưới lg) */}
        <div className="flex-none lg:hidden mr-2">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* LOGO: flex-1 để Laptop căn giữa menu */}
        <div className="flex-1">
          <Link
            to="/"
            className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-zinc-900" : "text-blue-600"
            }`}
          >
            <span className="hidden sm:inline">Cổng thông tin việc làm</span>
            <span className="sm:hidden inline font-black tracking-tighter">
              HITC<span className="text-zinc-800">JOB</span>
            </span>
          </Link>
        </div>

        {/* MENU CHÍNH LAPTOP: Giữ nguyên 100% giao diện cũ */}
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
              Dự án
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

        {/* AUTH SECTION: flex-1 justify-end để cân bằng layout Laptop */}
        <div className="flex-1 flex justify-end items-center gap-2 sm:gap-3">
          <div className="relative">
            {user && (
              <button
                type="button"
                onClick={handleBellClick}
                className={`relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border transition-all ${
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
            )}

            {isShow && (
              <div className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl z-50">
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

          {user && ["STUDENT", "COMPANY"].includes(user.role) && (
            <Link
              to="/profile?tab=purchased-projects"
              title="Project đã mua"
              className={`relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border transition-all ${
                location.pathname === "/profile" &&
                location.search.includes("purchased-projects")
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-600 hover:text-blue-600"
              }`}
            >
              <ShoppingBag size={20} />
            </Link>
          )}

          {!isLoggedIn ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setAuthMode("signin")}
                className="text-xs sm:text-sm font-semibold px-2 sm:px-4 py-2"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setAuthMode("signup")}
                className="bg-zinc-900 text-zinc-50 text-[10px] sm:text-sm font-medium px-3 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-zinc-800 transition-all shadow-sm whitespace-nowrap"
              >
                Đăng ký
              </button>
            </div>
          ) : (
            <button
              onClick={() => setMenuOpen(true)}
              className={`flex min-w-0 max-w-[150px] sm:max-w-[260px] items-center gap-2 rounded-full border p-1 pr-2 sm:pr-4 transition-all ${
                scrolled
                  ? "bg-white/80 border-zinc-300"
                  : "bg-zinc-50 border-zinc-200"
              }`}
            >
              <AvatarSlot
                src={displayAvatarUrl}
                className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-full object-cover"
              />
              <span className="min-w-0 truncate text-xs sm:text-sm font-semibold text-zinc-800">
                {displayName}
              </span>
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE DRAWER: Tối giản & Chuyên nghiệp */}
      {mobileNavOpen && (
        <>
          <div
            className="fixed inset-0 bg-zinc-900/30 backdrop-blur-[2px] z-[60]"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="fixed top-0 left-0 w-72 h-full bg-white z-[70] shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            {/* Header Drawer */}
            <div className="p-6 border-b border-zinc-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded font-black text-sm">
                  H
                </div>
                <span className="font-black text-zinc-800 tracking-tighter">
                  HITCJOB
                </span>
              </div>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-2 text-zinc-400 hover:text-zinc-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Items: No Icons, With Arrows */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="flex flex-col">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    (!link.hideForCompany || user?.role !== "COMPANY") && (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileNavOpen(false)}
                        className={`flex items-center justify-between px-6 py-4 transition-all border-b border-zinc-50/50 ${
                          isActive
                            ? "text-blue-600 bg-blue-50/30"
                            : "text-zinc-600 hover:bg-zinc-50"
                        }`}
                      >
                        <span
                          className={`font-bold text-[15px] ${isActive ? "text-blue-600" : "text-zinc-700"}`}
                        >
                          {link.name}
                        </span>
                        <ChevronRight
                          size={16}
                          className={
                            isActive ? "text-blue-600" : "text-zinc-300"
                          }
                        />
                      </Link>
                    )
                  );
                })}

                {user?.role === "COMPANY" && (
                  <Link
                    to="/job/manage"
                    onClick={() => setMobileNavOpen(false)}
                    className={`flex items-center justify-between px-6 py-4 transition-all border-b border-zinc-50/50 ${
                      location.pathname === "/job/manage"
                        ? "text-blue-600 bg-blue-50/30"
                        : "text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    <span
                      className={`font-bold text-[15px] ${location.pathname === "/job/manage" ? "text-blue-600" : "text-zinc-700"}`}
                    >
                      Quản lý tuyển dụng
                    </span>
                    <ChevronRight
                      size={16}
                      className={
                        location.pathname === "/job/manage"
                          ? "text-blue-600"
                          : "text-zinc-300"
                      }
                    />
                  </Link>
                )}
              </div>
            </div>

            {/* Footer Drawer */}
            <div className="p-6 border-t border-zinc-50">
              {!isLoggedIn ? (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setMobileNavOpen(false);
                      setAuthMode("signin");
                    }}
                    className="w-full py-3 rounded-xl border border-zinc-200 font-bold text-zinc-700 text-sm"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => {
                      setMobileNavOpen(false);
                      setAuthMode("signup");
                    }}
                    className="w-full py-3 rounded-xl bg-zinc-900 text-white font-bold text-sm"
                  >
                    Đăng ký
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50">
                  <AvatarSlot
                    src={displayAvatarUrl}
                    className="w-10 h-10 rounded-full object-cover"
                    alt=""
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-zinc-800 truncate">
                      {displayName}
                    </p>
                    <p className="text-[10px] text-zinc-400 font-medium uppercase">
                      {user?.role}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* SIDEBAR PROFILE (Laptop): Giữ nguyên logic cũ */}
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
              <AvatarSlot
                src={displayAvatarUrl}
                className="w-12 h-12 rounded-xl object-cover border border-zinc-100"
              />
              <div>
                <span className="font-bold text-zinc-900 block leading-tight">
                  {displayName}
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
                className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-3 ${location.pathname === "/profile" ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" : "text-zinc-700 hover:bg-zinc-50"}`}
              >
                <UserCircle size={20} />
                <span>Hồ sơ cá nhân</span>
              </Link>
              {user?.role === "STUDENT" && (
                <>
                  <Link
                    to="/my-projects"
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-3 ${location.pathname === "/my-projects" ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" : "text-zinc-700 hover:bg-zinc-50"}`}
                  >
                    <FolderOpen size={20} />
                    <span>Dự án của tôi</span>
                  </Link>
                  <Link
                    to="/my-wallet"
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-3 ${location.pathname === "/my-wallet" ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" : "text-zinc-700 hover:bg-zinc-50"}`}
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
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-3 ${location.pathname === "/job/manage" ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" : "text-zinc-700 hover:bg-zinc-50"}`}
                >
                  <Briefcase size={20} />
                  <span>Quản lý tuyển dụng</span>
                </Link>
              )}
              {user?.role === "TEACHER" && (
                <Link
                  to="/evaluations"
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-3 ${location.pathname === "/evaluations" ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" : "text-zinc-700 hover:bg-zinc-50"}`}
                >
                  <FileSignature size={20} />
                  <span>Đánh giá Dự án</span>
                </Link>
              )}
              {user?.role === "ADMIN" && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-3 ${location.pathname === "/admin/dashboard" ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" : "text-zinc-700 hover:bg-zinc-50"}`}
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

      {/* AUTH MODALS & NOTIF MODAL: Giữ nguyên logic */}
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
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedNotif.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                <Bell size={14} />
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
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg active:scale-95"
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
