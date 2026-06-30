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
  Menu,
  X,
  ChevronRight,
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (user) {
      fetchInitialData();

      connectWebSocket(user.email, () => {
        alertUtils.success("Bạn vừa có thông báo mới!");
        fetchInitialData();
      });

      return () => disconnectWebSocket();
    }

    setNotifications([]);
    setUnreadCount(0);
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

        if (isMounted) {
          setCompanyProfile(getCompanyData(res));
        }
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

        setUnreadCount((current) => Math.max(0, current - 1));
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

  const navLinks = [
    { name: "Trang chủ", path: "/" },
    { name: "Công việc", path: "/job" },
    { name: "Dự án", path: "/project" },
    { name: "Mẫu CV", path: "/template", hideForCompany: true },
  ];

  return (
    <>
      <nav
        className={`navbar fixed left-0 top-0 z-50 flex h-20 w-full items-center px-4 transition-colors duration-300 ease-in-out md:px-10 ${
          scrolled
            ? "border-b border-zinc-200/50 bg-white/90 shadow-sm backdrop-blur-sm"
            : "bg-white shadow-none"
        }`}
      >
        {/* MOBILE: Hamburger */}
        <div className="mr-2 flex-none lg:hidden">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="rounded-xl p-2 text-zinc-600 transition-colors hover:bg-zinc-100"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex-1">
          <Link
            to="/"
            className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-zinc-900" : "text-blue-600"
            }`}
          >
            <span className="hidden sm:inline">Cổng thông tin việc làm</span>

            <span className="inline font-black tracking-tighter sm:hidden">
              HITC<span className="text-zinc-800">JOB</span>
            </span>
          </Link>
        </div>

        {/* Menu desktop */}
        <ul className="menu menu-horizontal hidden gap-1 px-1 lg:flex">
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

        {/* Auth section */}
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          {/* Notification */}
          <div className="relative">
            {user && (
              <button
                type="button"
                onClick={handleBellClick}
                aria-label="Thông báo"
                className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all sm:h-11 sm:w-11 ${
                  isShow
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-950 hover:text-slate-950"
                }`}
              >
                <Bell size={18} className="sm:h-5 sm:w-5" />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-bold text-white sm:h-5 sm:min-w-5 sm:text-[11px]">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>
            )}

            {isShow && (
              <div className="fixed left-3 right-3 top-[72px] z-[100] max-h-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-80 sm:max-h-none">
                {/* Header notification */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-slate-900 sm:text-sm">
                      Thông báo
                    </p>

                    <p className="mt-0.5 truncate text-[10px] text-slate-500 sm:text-xs">
                      {unreadCount > 0
                        ? `Bạn có ${unreadCount} thông báo`
                        : "Không có thông báo mới"}
                    </p>
                  </div>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 sm:h-9 sm:w-9">
                    <Bell size={16} className="sm:h-[18px] sm:w-[18px]" />
                  </div>
                </div>

                {/* Notification list */}
                <div className="max-h-[280px] overflow-y-auto sm:max-h-72">
                  {notifications.length > 0 ? (
                    notifications.map((e) => (
                      <button
                        type="button"
                        key={e.id}
                        onClick={() => clickDetailNotification(e)}
                        className="block w-full border-b border-slate-100 px-3 py-2.5 text-left transition hover:bg-slate-50 sm:px-4 sm:py-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[12px] font-bold text-slate-800 sm:text-sm">
                              {e.type}
                            </p>

                            <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-500 sm:text-xs sm:leading-5">
                              {e.title || "Bạn có thông báo mới"}
                            </p>

                            {e.sentAt && (
                              <p className="mt-1 text-[9px] text-slate-400 sm:text-[10px]">
                                {new Date(e.sentAt).toLocaleString("vi-VN")}
                              </p>
                            )}
                          </div>

                          {!e.read && (
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-7 text-center sm:py-8">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 sm:h-12 sm:w-12">
                        <Bell size={20} className="sm:h-[22px] sm:w-[22px]" />
                      </div>

                      <p className="text-[12px] font-semibold text-slate-500 sm:text-sm">
                        Không có thông báo nào
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Purchased projects */}
          {user && ["STUDENT", "COMPANY"].includes(user.role) && (
            <Link
              to="/profile?tab=purchased-projects"
              title="Project đã mua"
              className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all sm:h-11 sm:w-11 ${
                location.pathname === "/profile" &&
                location.search.includes("purchased-projects")
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-600 hover:text-blue-600"
              }`}
            >
              <ShoppingBag size={18} className="sm:h-5 sm:w-5" />
            </Link>
          )}

          {!isLoggedIn ? (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setAuthMode("signin")}
                className="px-2 py-2 text-xs font-semibold sm:px-4 sm:text-sm"
              >
                Đăng nhập
              </button>

              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className="whitespace-nowrap rounded-full bg-zinc-900 px-3 py-2 text-[10px] font-medium text-zinc-50 shadow-sm transition-all hover:bg-zinc-800 sm:px-6 sm:py-2.5 sm:text-sm"
              >
                Đăng ký
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`flex min-w-0 max-w-[150px] items-center gap-2 rounded-full border p-1 pr-2 transition-all sm:max-w-[260px] sm:pr-4 ${
                scrolled
                  ? "border-zinc-300 bg-white/80"
                  : "border-zinc-200 bg-zinc-50"
              }`}
            >
              <AvatarSlot
                src={displayAvatarUrl}
                className="h-7 w-7 shrink-0 rounded-full object-cover sm:h-8 sm:w-8"
              />

              <span className="min-w-0 truncate text-xs font-semibold text-zinc-800 sm:text-sm">
                {displayName}
              </span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-zinc-900/30 backdrop-blur-[2px]"
            onClick={() => setMobileNavOpen(false)}
          />

          <div className="fixed left-0 top-0 z-[70] flex h-full w-72 animate-in flex-col bg-white shadow-2xl duration-300 slide-in-from-left">
            <div className="flex items-center justify-between border-b border-zinc-50 p-6">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 text-sm font-black text-white">
                  H
                </div>

                <span className="font-black tracking-tighter text-zinc-800">
                  HITCJOB
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="p-2 text-zinc-400 transition-colors hover:text-zinc-800"
              >
                <X size={20} />
              </button>
            </div>

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
                        className={`flex items-center justify-between border-b border-zinc-50/50 px-6 py-4 transition-all ${
                          isActive
                            ? "bg-blue-50/30 text-blue-600"
                            : "text-zinc-600 hover:bg-zinc-50"
                        }`}
                      >
                        <span
                          className={`text-[15px] font-bold ${
                            isActive ? "text-blue-600" : "text-zinc-700"
                          }`}
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
                    className={`flex items-center justify-between border-b border-zinc-50/50 px-6 py-4 transition-all ${
                      location.pathname === "/job/manage"
                        ? "bg-blue-50/30 text-blue-600"
                        : "text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    <span
                      className={`text-[15px] font-bold ${
                        location.pathname === "/job/manage"
                          ? "text-blue-600"
                          : "text-zinc-700"
                      }`}
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

            <div className="border-t border-zinc-50 p-6">
              {!isLoggedIn ? (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileNavOpen(false);
                      setAuthMode("signin");
                    }}
                    className="w-full rounded-xl border border-zinc-200 py-3 text-sm font-bold text-zinc-700"
                  >
                    Đăng nhập
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileNavOpen(false);
                      setAuthMode("signup");
                    }}
                    className="w-full rounded-xl bg-zinc-900 py-3 text-sm font-bold text-white"
                  >
                    Đăng ký
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3">
                  <AvatarSlot
                    src={displayAvatarUrl}
                    className="h-10 w-10 rounded-full object-cover"
                    alt=""
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-zinc-800">
                      {displayName}
                    </p>

                    <p className="text-[10px] font-medium uppercase text-zinc-400">
                      {user?.role}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Sidebar profile */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-zinc-900/20 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          <div
            className={`fixed right-0 top-0 z-[70] flex h-full w-72 transform flex-col bg-white p-6 shadow-2xl transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="mb-8 flex items-center gap-4 border-b border-zinc-100 pb-6">
              <AvatarSlot
                src={displayAvatarUrl}
                className="h-12 w-12 rounded-xl border border-zinc-100 object-cover"
              />

              <div>
                <span className="block font-bold leading-tight text-zinc-900">
                  {displayName}
                </span>

                <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-blue-600">
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
                className={`flex items-center gap-3 rounded-lg px-4 py-3 font-semibold transition-all duration-200 ${
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
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 font-semibold transition-all duration-200 ${
                      location.pathname === "/my-projects"
                        ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
                        : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <FolderOpen size={20} />
                    <span>Dự án của tôi</span>
                  </Link>

                  <Link
                    to="/my-wallet"
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 font-semibold transition-all duration-200 ${
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
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 font-semibold transition-all duration-200 ${
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
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 font-semibold transition-all duration-200 ${
                    location.pathname === "/evaluations"
                      ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <FileSignature size={20} />
                  <span>Đánh giá Dự án</span>
                </Link>
              )}

              {user?.role === "ADMIN" && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 font-semibold transition-all duration-200 ${
                    location.pathname === "/admin/dashboard"
                      ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <ShieldHalf size={20} />
                  <span>Quản trị hệ thống</span>
                </Link>
              )}

              <div className="my-4 border-t border-zinc-100" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-bold text-red-600 transition-all duration-200 hover:bg-red-50"
              >
                <LogOut size={20} />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Auth modal */}
      {authMode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 p-4 backdrop-blur-md">
          <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
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
      {/* Notification detail modal */}
      {showDetailModal && selectedNotif && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md animate-in overflow-hidden rounded-2xl bg-white shadow-2xl duration-200 fade-in zoom-in">
            <div className="flex items-center justify-between border-b border-gray-100 bg-slate-50 p-6">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                {selectedNotif.type}
              </span>

              <button
                type="button"
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 transition-colors hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {selectedNotif.title}
              </h3>

              <p className="mb-4 flex items-center gap-2 text-sm text-gray-400">
                <Bell size={14} />
                {new Date(selectedNotif.sentAt).toLocaleString("vi-VN")}
              </p>

              <div className="rounded-xl border border-gray-100 bg-slate-50 p-4">
                <p className="leading-relaxed text-gray-700">
                  {selectedNotif.content}
                </p>
              </div>
            </div>

            <div className="flex justify-end bg-gray-50 p-4">
              <button
                type="button"
                onClick={() => setShowDetailModal(false)}
                className="rounded-xl bg-blue-600 px-6 py-2 text-sm font-bold text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95"
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
