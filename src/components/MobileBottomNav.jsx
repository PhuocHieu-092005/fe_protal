import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Briefcase,
  FolderOpen,
  FileText,
  UserCircle,
  Building2,
  ClipboardCheck,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function MobileBottomNav() {
  const { user, isLoggedIn } = useAuth();

  /*
    RESPONSIVE MOBILE:
    - Menu đáy mobile đổi theo role.
    - Chỉ render UI điều hướng, không đụng logic đăng nhập/API.
  */
  const navItems = [
    {
      label: "Trang chủ",
      path: "/",
      icon: Home,
    },
    {
      label: "Công việc",
      path: "/job",
      icon: Briefcase,
    },
    {
      label: "Dự án",
      path: "/project",
      icon: FolderOpen,
    },

    ...(!isLoggedIn || user?.role === "STUDENT"
      ? [
          {
            label: "Mẫu CV",
            path: "/template",
            icon: FileText,
          },
        ]
      : []),

    ...(user?.role === "STUDENT"
      ? [
          {
            label: "Hồ sơ",
            path: "/profile",
            icon: UserCircle,
          },
        ]
      : []),

    ...(user?.role === "COMPANY"
      ? [
          {
            label: "Tuyển dụng",
            path: "/job/manage",
            icon: Building2,
          },
          {
            label: "Hồ sơ",
            path: "/profile",
            icon: UserCircle,
          },
        ]
      : []),

    ...(user?.role === "TEACHER"
      ? [
          {
            label: "CV",
            path: "/cv",
            icon: FileText,
          },
          {
            label: "Đánh giá",
            path: "/evaluations",
            icon: ClipboardCheck,
          },
        ]
      : []),

    ...(user?.role === "ADMIN"
      ? [
          {
            label: "CV",
            path: "/cv",
            icon: FileText,
          },
          {
            label: "Quản trị",
            path: "/admin/dashboard",
            icon: LayoutDashboard,
          },
        ]
      : []),

    ...(!isLoggedIn
      ? [
          {
            label: "Đăng nhập",
            path: "/profile",
            icon: UserCircle,
          },
        ]
      : []),
  ].slice(0, 5);

  return (
    /*
      RESPONSIVE MOBILE:
      - Chỉ hiện dưới md.
      - fixed bottom để giống thanh menu app mobile.
      - pb safe-area để tránh bị che trên iPhone.
    */
    <nav className="fixed bottom-0 left-0 right-0 z-[80] border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto grid h-16 max-w-md grid-cols-5">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={`${item.path}-${item.label}`}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-all ${
                  isActive
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-blue-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
                      isActive ? "bg-blue-50" : "bg-transparent"
                    }`}
                  >
                    <Icon size={21} strokeWidth={isActive ? 2.6 : 2.1} />
                  </div>
                  <span className="max-w-[64px] truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
