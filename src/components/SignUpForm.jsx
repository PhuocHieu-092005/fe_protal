import React, { useState } from "react";
import authService from "../services/authService";
import { alertUtils } from "../helpers/alertUtils";

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

export default function SignUpForm({ onClose, onSwitchSignIn }) {
  const [role, setRole] = useState("STUDENT");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedFullName) {
      errors.full_name =
        role === "STUDENT"
          ? "Vui lòng nhập họ và tên"
          : "Vui lòng nhập tên doanh nghiệp";
    }

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
      const registerData = {
        full_name: fullName.trim(),
        email: email.trim(),
        password,
        role,
      };

      await authService.register(registerData);

      alertUtils.success(
        "Đăng ký tài khoản thành công! Vui lòng kiểm tra email để xác thực.",
      );

      onSwitchSignIn();
    } catch (err) {
      const errorData = err.response?.data;

      if (errorData?.data && typeof errorData.data === "object") {
        setFieldErrors(errorData.data);
      }

      setError(getApiErrorMessage(errorData, "Đăng ký thất bại!"));
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field, value, setter) => {
    setter(value);
    setError("");
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="relative mx-auto max-h-[92vh] w-full max-w-[340px] overflow-y-auto rounded-3xl bg-white p-5 text-left text-sm text-gray-500 shadow-2xl sm:max-w-[450px] sm:p-6 md:p-10">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-2 p-2 text-2xl font-bold text-gray-400 hover:text-red-500 sm:text-3xl"
      >
        ×
      </button>

      <h2 className="mb-5 pr-6 text-center text-2xl font-extrabold text-slate-800 sm:mb-6 sm:text-3xl">
        Tạo Tài Khoản
      </h2>

      <div className="mb-5 flex rounded-full bg-gray-100 p-1 sm:mb-6">
        <button
          type="button"
          onClick={() => setRole("STUDENT")}
          className={`flex-1 rounded-full py-2 text-xs font-bold transition-all sm:py-2.5 sm:text-sm ${
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
          className={`flex-1 rounded-full py-2 text-xs font-bold transition-all sm:py-2.5 sm:text-sm ${
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
          <label className="mb-1.5 ml-3 block text-xs font-semibold text-gray-700 sm:ml-4 sm:text-sm">
            Họ và tên
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) =>
              handleFieldChange("full_name", e.target.value, setFullName)
            }
            className={`w-full rounded-full border px-5 py-2.5 text-xs outline-none focus:border-indigo-500 sm:px-6 sm:py-3 sm:text-sm ${
              fieldErrors.full_name ? "border-red-400" : "border-gray-300"
            }`}
            placeholder={
              role === "STUDENT"
                ? "Nhập họ và tên của bạn"
                : "Nhập tên doanh nghiệp"
            }
          />

          {fieldErrors.full_name && (
            <p className="ml-3 mt-1.5 text-xs font-medium text-red-500 sm:ml-4">
              {fieldErrors.full_name}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 ml-3 block text-xs font-semibold text-gray-700 sm:ml-4 sm:text-sm">
            Địa chỉ Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              handleFieldChange("email", e.target.value, setEmail)
            }
            className={`w-full rounded-full border px-5 py-2.5 text-xs outline-none focus:border-indigo-500 sm:px-6 sm:py-3 sm:text-sm ${
              fieldErrors.email ? "border-red-400" : "border-gray-300"
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
          <label className="mb-1.5 ml-3 block text-xs font-semibold text-gray-700 sm:ml-4 sm:text-sm">
            Mật khẩu
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              handleFieldChange("password", e.target.value, setPassword)
            }
            className={`w-full rounded-full border px-5 py-2.5 text-xs outline-none focus:border-indigo-500 sm:px-6 sm:py-3 sm:text-sm ${
              fieldErrors.password ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Tạo mật khẩu"
          />

          {fieldErrors.password && (
            <p className="ml-3 mt-1.5 text-xs font-medium text-red-500 sm:ml-4">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="!mt-6 w-full rounded-full bg-indigo-600 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-700 disabled:opacity-70 sm:!mt-8 sm:py-4 sm:text-base"
        >
          {loading ? "Đang tạo tài khoản..." : "Tạo Tài Khoản"}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-gray-700 sm:mt-6 sm:text-sm">
        Đã có tài khoản?{" "}
        <button
          type="button"
          onClick={onSwitchSignIn}
          className="font-extrabold text-blue-600 hover:underline"
        >
          Đăng nhập
        </button>
      </p>
    </div>
  );
}
