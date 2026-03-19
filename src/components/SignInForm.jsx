import React, { useState } from "react";

export default function SignInForm({ onClose, onSwitchSignUp }) {
  const [role, setRole] = useState("student");

  return (
    <div className="bg-white text-gray-500 w-[450px] max-w-full mx-4 md:p-8 p-6 text-left text-sm rounded-3xl shadow-2xl relative transition-all">
      {/* Nút Đóng */}
      <button
        onClick={onClose}
        className="absolute top-4 right-6 text-3xl font-bold text-gray-400 hover:text-red-500 transition-all"
      >
        ×
      </button>

      <h2 className="text-3xl font-extrabold mb-6 text-center text-slate-800">
        Job Portal
      </h2>
      {/* select role */}
      <div className="flex bg-gray-100 p-1 rounded-full mb-6">
        <button
          onClick={() => setRole("student")}
          className={`flex-1 py-2 rounded-full font-bold transition-all ${
            role === "student"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500"
          }`}
        >
          Student
        </button>
        <button
          onClick={() => setRole("company")}
          className={`flex-1 py-2 rounded-full font-bold transition-all ${
            role === "company"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500"
          }`}
        >
          Company
        </button>
      </div>
      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block mb-1.5 ml-4 font-semibold text-gray-700">
            Email Address
          </label>
          <input
            className="w-full bg-gray-50 border border-gray-200 outline-none rounded-full py-3 px-6 focus:border-indigo-500 focus:bg-white transition-all"
            type="email"
            placeholder={
              role === "student"
                ? "Enter your student email"
                : "Enter your company email"
            }
          />
        </div>
        {/* Password */}
        <div>
          <label className="block mb-1.5 ml-4 font-semibold text-gray-700">
            Password
          </label>
          <input
            className="w-full bg-gray-50 border border-gray-200 outline-none rounded-full py-3 px-6 focus:border-indigo-500 focus:bg-white transition-all"
            type="password"
            placeholder="Enter your password"
          />
          <div className="text-right mt-2 mr-2">
            <a
              href="#"
              className="text-indigo-600 hover:underline text-xs font-bold"
            >
              Forgot Password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 py-3.5 rounded-full text-white font-bold text-base hover:bg-indigo-700 hover:shadow-md transition-all active:scale-[0.98]"
        >
          Sign in
        </button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        Don’t have an account?{" "}
        <button
          onClick={onSwitchSignUp}
          className="text-indigo-600 font-extrabold hover:underline"
        >
          Sign up
        </button>
      </p>

      {/*Social Login*/}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-3 text-gray-400 text-xs uppercase">Or</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-full hover:bg-gray-50 transition-all font-semibold text-gray-700">
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="google"
          />
          Google
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-[#24292e] py-2.5 rounded-full text-white hover:bg-black transition-all font-semibold">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </button>
      </div>
    </div>
  );
}
