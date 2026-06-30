import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { API_ORIGIN } from "../config/apiConfig";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getApiErrorMessage = (errorData, fallbackMessage) => {
  if (!errorData) return fallbackMessage;

  if (typeof errorData.data === "string") return errorData.data;

  if (errorData.data && typeof errorData.data === "object") {
    return (
      Object.values(errorData.data)[0] || errorData.message || fallbackMessage
    );
  }

  return errorData.message || fallbackMessage;
};

export default function SignInForm({ onClose, onSwitchSignUp }) {
  const [role, setRole] = useState("STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const { login } = useAuth();

  const validateForm = () => {
    const errors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      errors.email = "Vui lòng nhập email";
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email = "Email không đúng định dạng";
    }

    if (!password) {
      errors.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 6) {
      errors.password = "Mật khẩu phải từ 6 ký tự trở lên";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const loginData = {
        email: email.trim(),
        password,
        role,
      };

      await login(loginData);
      onClose();
    } catch (err) {
      const errorData = err.response?.data;

      if (errorData?.data && typeof errorData.data === "object") {
        setFieldErrors(errorData.data);
      }

      setError(getApiErrorMessage(errorData, "Đăng nhập thất bại!"));
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field, value, setter) => {
    setter(value);
    setError("");
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_ORIGIN}/oauth2/authorization/google`;
  };

  if (showForgotPassword) {
    return (
      <ForgotPasswordModal
        onClose={onClose}
        onBackToLogin={() => setShowForgotPassword(false)}
        defaultEmail={email}
      />
    );
  }

  return (
    <div className="relative mx-auto max-h-[92vh] w-full max-w-[340px] overflow-y-auto rounded-3xl bg-white p-5 text-left text-sm text-gray-500 shadow-2xl transition-all [scrollbar-width:none] sm:max-w-[450px] sm:p-6 md:p-8 [&::-webkit-scrollbar]:hidden">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-3 text-2xl font-bold text-gray-400 transition-all hover:text-red-500 sm:text-3xl"
      >
        ×
      </button>

      <h2 className="mb-5 pr-6 text-center text-xl font-extrabold leading-tight text-slate-800 sm:mb-6 sm:text-2xl">
        Cổng Thông Tin Việc Làm
      </h2>

      <div className="mb-5 flex rounded-full bg-gray-100 p-1 sm:mb-6">
        <button
          type="button"
          onClick={() => setRole("STUDENT")}
          className={`flex-1 rounded-full py-2 text-xs font-bold transition-all ${
            role === "STUDENT"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500"
          }`}
        >
          Sinh viên
        </button>

        <button
          type="button"
          onClick={() => setRole("COMPANY")}
          className={`flex-1 rounded-full py-2 text-xs font-bold transition-all ${
            role === "COMPANY"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500"
          }`}
        >
          Doanh nghiệp
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-3 sm:space-y-4"
        noValidate
      >
        <div>
          <label className="mb-1.5 ml-3 block text-xs font-semibold text-gray-700 sm:ml-4">
            Địa chỉ Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              handleFieldChange("email", e.target.value, setEmail)
            }
            className={`w-full rounded-full border bg-gray-50 px-5 py-2.5 text-xs outline-none transition-all focus:border-indigo-500 focus:bg-white sm:px-6 sm:py-3 ${
              fieldErrors.email ? "border-red-400" : "border-gray-200"
            }`}
            placeholder={
              role === "STUDENT"
                ? "Nhập email sinh viên của bạn"
                : "Nhập email doanh nghiệp"
            }
          />

          {fieldErrors.email && (
            <p className="ml-3 mt-1.5 text-xs font-medium text-red-500 sm:ml-4">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 ml-3 block text-xs font-semibold text-gray-700 sm:ml-4">
            Mật khẩu
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              handleFieldChange("password", e.target.value, setPassword)
            }
            className={`w-full rounded-full border bg-gray-50 px-5 py-2.5 text-xs outline-none transition-all focus:border-indigo-500 focus:bg-white sm:px-6 sm:py-3 ${
              fieldErrors.password ? "border-red-400" : "border-gray-200"
            }`}
            placeholder="Nhập mật khẩu"
          />

          {fieldErrors.password && (
            <p className="ml-3 mt-1.5 text-xs font-medium text-red-500 sm:ml-4">
              {fieldErrors.password}
            </p>
          )}
        </div>

        <div className="-mt-1 flex justify-end">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-xs font-bold text-indigo-600 hover:underline"
          >
            Quên mật khẩu?
          </button>
        </div>

        {error && <p className="text-center text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-indigo-600 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-700 hover:shadow-md active:scale-[0.98] disabled:opacity-70 sm:py-3.5"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-gray-600 sm:mt-6">
        Chưa có tài khoản?{" "}
        <button
          type="button"
          onClick={onSwitchSignUp}
          className="font-extrabold text-indigo-600 hover:underline"
        >
          Đăng ký ngay
        </button>
      </p>

      <div className="my-5 flex items-center sm:my-6">
        <div className="flex-1 border-t border-gray-200" />

        <span className="px-3 text-[10px] uppercase text-gray-400 sm:text-xs">
          HOẶC
        </span>

        <div className="flex-1 border-t border-gray-200" />
      </div>

      <div className="flex gap-2 sm:gap-3">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-200 py-2.5 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-50"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="google"
          />
          Google
        </button>

        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#24292e] py-2.5 text-xs font-semibold text-white transition-all hover:bg-black"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </button>
      </div>
    </div>
  );
}
