import React, { useState, useEffect } from "react";
import "../assets/global.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpFrom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [authMode, setAuthMode] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeAuth = () => setAuthMode(null);

  // Giả lập role và trạng thái login
  const role = "student";
  let isLoggedIn = false; //chỉnh chỗ này để vào trạng thái đăng nhập
  const user = {
    name: "Nguyễn Văn A",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuLinkStyles = `
    transition-colors duration-300 
    ${scrolled ? "text-black hover:text-gray-600" : "text-gray-700 hover:text-gray-600"}
  `;

  return (
    <>
      <div
        className={`navbar fixed top-0 left-0 w-full z-50 px-4 md:px-10 transition-all duration-300 ${
          scrolled
            ? "bg-gray-100/60 backdrop-blur-md shadow-md"
            : "bg-base-100 shadow-md"
        }`}
      >
        {/* LOGO */}
        <div className="flex-1">
          <Link
            to="/"
            className={`text-xl font-bold cursor-pointer transition-colors duration-300 ${
              scrolled ? "text-black" : "text-primary"
            }`}
          >
            Job Portal
          </Link>
        </div>

        {/* MENU */}
        <ul className="menu menu-horizontal px-1 font-medium">
          <li>
            <Link to="/" className={menuLinkStyles}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/job" className={menuLinkStyles}>
              Job
            </Link>
          </li>
          <li>
            <Link to="/cv" className={menuLinkStyles}>
              CV
            </Link>
          </li>
          <li>
            <Link to="/project" className={menuLinkStyles}>
              Project
            </Link>
          </li>
          {role !== "company" && role !== "teacher" && (
            <li>
              <Link to="/template" className={menuLinkStyles}>
                Template
              </Link>
            </li>
          )}
        </ul>

        {/* AUTH / USER */}
        <div className="flex-1 flex justify-end items-center gap-2">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setAuthMode("signin")}
                className="btn rounded-full px-6 bg-black text-white"
              >
                Sign in
              </button>
              <button
                onClick={() => setAuthMode("signup")}
                className="btn rounded-full px-6 btn-primary"
              >
                Sign up
              </button>
            </>
          ) : (
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2"
            >
              <img
                src={user.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full border"
              />
              <span className="font-medium">{user.name}</span>
            </button>
          )}
        </div>
      </div>

      {/*Side bar */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 w-64 h-full 
                 bg-gradient-to-l from-white/70 to-transparent 
                 backdrop-blur-md shadow-lg z-50 p-4 flex flex-col 
                 transform transition-transform duration-300 
                 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex items-center gap-2 mb-6">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full border"
              />
              <span className="font-semibold ">{user.name}</span>
            </div>
            <Link
              to="/profile"
              className="px-4 py-2 hover:bg-white/30 rounded transition-colors text-white"
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="px-4 py-2 hover:bg-white/30 rounded transition-colors  text-white"
            >
              Settings
            </Link>
            <button className="px-4 py-2 hover:bg-white/30 rounded text-left transition-colors  text-white">
              Logout
            </button>
          </div>
        </>
      )}

      {/* MODAL AUTH */}
      {authMode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
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
