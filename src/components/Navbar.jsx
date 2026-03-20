import React, { useState } from "react";
import "../assets/global.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpFrom";

export default function Navbar() {
  const [authMode, setAuthMode] = useState(null); // null | 'signin' | 'signup'

  const closeAuth = () => setAuthMode(null);

  return (
    <>
      <div className="navbar bg-base-100 shadow-md px-4 md:px-10">
        <div className="flex-1">
          <a className="text-xl font-bold text-primary cursor-pointer">
            Job Portal
          </a>
        </div>

        <div className="flex-none hidden md:flex">
          <ul className="menu menu-horizontal px-1 font-medium">
            <li>
              <a className="hover:text-primary">Home</a>
            </li>
            <li>
              <a>Job</a>
            </li>
            <li>
              <a>CV</a>
            </li>
            <li>
              <a>Project</a>
            </li>
          </ul>
        </div>

        <div className="flex-1 flex justify-end items-center gap-2">
          <button
            onClick={() => setAuthMode("signin")}
            className="btn rounded-full px-6 bg-black text-white border-2 border-transparent transition-all duration-300 hover:bg-white hover:text-black hover:border-black"
          >
            Sign in
          </button>
          <button
            onClick={() => setAuthMode("signup")}
            className="btn btn-primary rounded-full px-6 shadow-md"
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
