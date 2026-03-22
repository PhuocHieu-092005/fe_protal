import React, { useState } from "react";

export default function SignUpForm({ onClose, onSwitchSignIn }) {
  const [role, setRole] = useState("student");

  return (
    <div className="bg-white text-gray-500 w-[450px] max-w-full mx-4 md:p-10 p-6 text-left text-sm rounded-3xl shadow-2xl relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-3xl font-bold text-gray-400 hover:text-red-500 p-2"
      >
        ×
      </button>

      <h2 className="text-3xl font-extrabold mb-6 text-center text-slate-800">
        Create Account
      </h2>

      {/* Role Selector */}
      <div className="flex bg-gray-100 p-1 rounded-full mb-6">
        <button
          onClick={() => setRole("student")}
          className={`flex-1 py-2.5 rounded-full font-bold transition-all ${role === "student" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500"}`}
        >
          Student
        </button>
        <button
          onClick={() => setRole("company")}
          className={`flex-1 py-2.5 rounded-full font-bold transition-all ${role === "company" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500"}`}
        >
          Company
        </button>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block mb-1.5 ml-4 font-semibold text-gray-700">
            Full Name
          </label>
          <input
            className="w-full border border-gray-300 rounded-full py-3 px-6 outline-none focus:border-indigo-500"
            type="text"
            placeholder={
              role === "student" ? "Enter your full name" : "Enter company name"
            }
          />
        </div>
        <div>
          <label className="block mb-1.5 ml-4 font-semibold text-gray-700">
            Email Address
          </label>
          <input
            className="w-full border border-gray-300 rounded-full py-3 px-6 outline-none focus:border-indigo-500"
            type="email"
            placeholder={
              role === "student"
                ? "Enter your student email"
                : "Enter business email"
            }
          />
        </div>
        <div>
          <label className="block mb-1.5 ml-4 font-semibold text-gray-700">
            Password
          </label>
          <input
            className="w-full border border-gray-300 rounded-full py-3 px-6 outline-none focus:border-indigo-500"
            type="password"
            placeholder="Create a password"
          />
        </div>

        <button className="w-full !mt-8 bg-indigo-600 py-4 rounded-full text-white font-bold text-base hover:bg-indigo-700 transition-all">
          Create Account
        </button>
      </form>

      <p className="text-center mt-6 text-gray-700">
        Already have an account?{" "}
        <button
          onClick={onSwitchSignIn}
          className="text-blue-600 font-extrabold hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
