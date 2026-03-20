import React, { useState, useEffect } from "react";
import "../assets/global.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpFrom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [authMode, setAuthMode] = useState(null); // null | 'signin' | 'signup'
  const [scrolled, setScrolled] = useState(false);

  const closeAuth = () => setAuthMode(null);

  // Role giả lập
  const role = "student"; // test: student | company | teacher

  // Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Class chung cho các mục Menu
  const menuLinkStyles = `
    transition-colors duration-300 
    active:bg-transparent active:text-gray-400 
    focus:bg-transparent 
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
          <a
            className={`text-xl font-bold cursor-pointer transition-colors duration-300 ${
              scrolled ? "text-black" : "text-primary"
            }`}
          >
            Job Portal
          </a>
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

        {/* BUTTONS */}
        <div className="flex-1 flex justify-end items-center gap-2">
          <button
            onClick={() => setAuthMode("signin")}
            className={`btn rounded-full px-6 border-2 transition-all duration-300 ${
              scrolled
                ? "bg-black text-white border-black hover:bg-gray-200 hover:text-black"
                : "bg-black text-white border-transparent hover:bg-gray-200 hover:text-black hover:border-black"
            }`}
          >
            Sign in
          </button>

          <button
            onClick={() => setAuthMode("signup")}
            className={`btn rounded-full px-6 shadow-md transition-all duration-300 ${
              scrolled ? "bg-white text-black hover:bg-gray-200" : "btn-primary"
            }`}
          >
            Sign up
          </button>
        </div>
      </div>

      {/* MODAL CONTAINER */}
      {authMode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
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
