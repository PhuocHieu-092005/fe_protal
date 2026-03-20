import React, { useState, useEffect } from "react";
import "../assets/global.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpFrom";

export default function Navbar() {
  const [authMode, setAuthMode] = useState(null); // null | 'signin' | 'signup'
  const [scrolled, setScrolled] = useState(false);

  const closeAuth = () => setAuthMode(null);

  // Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <div className="flex-none hidden md:flex">
          <ul className="menu menu-horizontal px-1 font-medium">
            <li>
              <a
                className={`transition-colors duration-300 ${
                  scrolled
                    ? "text-black hover:text-gray-600"
                    : "hover:text-primary"
                }`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                className={`transition-colors duration-300 ${
                  scrolled
                    ? "text-black hover:text-gray-600"
                    : "hover:text-primary"
                }`}
              >
                Job
              </a>
            </li>
            <li>
              <a
                className={`transition-colors duration-300 ${
                  scrolled
                    ? "text-black hover:text-gray-600"
                    : "hover:text-primary"
                }`}
              >
                CV
              </a>
            </li>
            <li>
              <a
                className={`transition-colors duration-300 ${
                  scrolled
                    ? "text-black hover:text-gray-600"
                    : "hover:text-primary"
                }`}
              >
                Project
              </a>
            </li>
            <li>
              <a
                className={`transition-colors duration-300 ${
                  scrolled
                    ? "text-black hover:text-gray-600"
                    : "hover:text-primary"
                }`}
              >
                Template
              </a>
            </li>
          </ul>
        </div>

        {/* BUTTON */}
        <div className="flex-1 flex justify-end items-center gap-2">
          <button
            onClick={() => setAuthMode("signin")}
            className={`btn rounded-full px-6 border-2 transition-all duration-300 ${
              scrolled
                ? "bg-black text-white border-black hover:bg-gray-800"
                : "bg-black text-white border-transparent hover:bg-white hover:text-black hover:border-black"
            }`}
          >
            Sign in
          </button>

          <button
            onClick={() => setAuthMode("signup")}
            className={`btn rounded-full px-6 shadow-md transition-all duration-300 ${
              scrolled ? "bg-white text-black hover:bg-gray-800" : "btn-primary"
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
