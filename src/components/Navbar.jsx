import React from "react";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-10">
      {/* LEFT - Logo */}
      <div className="flex-1">
        <a className="text-xl font-bold text-primary">Job Portal</a>
      </div>
      {/* CENTER - Menu */}
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
        </ul>
      </div>
      {/* RIGHT - Auth */}
      <div className="flex-1 flex justify-end items-center gap-2">
        <button className="btn btn-ghost rounded-full px-4">Sign in</button>
        <button className="btn btn-primary rounded-full px-6 shadow-md">
          Sign up
        </button>
      </div>
    </div>
  );
}
