import React, { useState } from "react";
import authService from "../services/authService";

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

      alert(
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
    <div className="bg-white text-gray-500 w-full max-w-[340px] sm:max-w-[450px] mx-3 sm:mx-4 p-5 sm:p-6 md:p-10 text-left text-sm rounded-3xl shadow-2xl relative max-h-[92vh] overflow-y-auto">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-4 text-2xl sm:text-3xl font-bold text-gray-400 hover:text-red-500 p-2"
      >
        ×
      </button>

      <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 sm:mb-6 text-center text-slate-800 pr-6">
        Tạo Tài Khoản
      </h2>

      <div className="flex bg-gray-100 p-1 rounded-full mb-5 sm:mb-6">
        <button
          type="button"
          onClick={() => setRole("STUDENT")}
          className={`flex-1 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${
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
          className={`flex-1 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${
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
          <label className="block mb-1.5 ml-3 sm:ml-4 font-semibold text-gray-700 text-xs sm:text-sm">
            Họ và tên
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) =>
              handleFieldChange("full_name", e.target.value, setFullName)
            }
            className={`w-full border rounded-full py-2.5 sm:py-3 px-5 sm:px-6 text-xs sm:text-sm outline-none focus:border-indigo-500 ${
              fieldErrors.full_name ? "border-red-400" : "border-gray-300"
            }`}
            placeholder={
              role === "STUDENT"
                ? "Nhập họ và tên của bạn"
                : "Nhập tên doanh nghiệp"
            }
          />
          {fieldErrors.full_name && (
            <p className="mt-1.5 ml-3 sm:ml-4 text-xs font-medium text-red-500">
              {fieldErrors.full_name}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1.5 ml-3 sm:ml-4 font-semibold text-gray-700 text-xs sm:text-sm">
            Địa chỉ Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) =>
              handleFieldChange("email", e.target.value, setEmail)
            }
            className={`w-full border rounded-full py-2.5 sm:py-3 px-5 sm:px-6 text-xs sm:text-sm outline-none focus:border-indigo-500 ${
              fieldErrors.email ? "border-red-400" : "border-gray-300"
            }`}
            placeholder={
              role === "STUDENT"
                ? "Nhập email sinh viên của bạn"
                : "Nhập email doanh nghiệp"
            }
          />
          {fieldErrors.email && (
            <p className="mt-1.5 ml-3 sm:ml-4 text-xs font-medium text-red-500">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1.5 ml-3 sm:ml-4 font-semibold text-gray-700 text-xs sm:text-sm">
            Mật khẩu
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) =>
              handleFieldChange("password", e.target.value, setPassword)
            }
            className={`w-full border rounded-full py-2.5 sm:py-3 px-5 sm:px-6 text-xs sm:text-sm outline-none focus:border-indigo-500 ${
              fieldErrors.password ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Tạo mật khẩu"
          />
          {fieldErrors.password && (
            <p className="mt-1.5 ml-3 sm:ml-4 text-xs font-medium text-red-500">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full !mt-6 sm:!mt-8 bg-indigo-600 py-3 sm:py-4 rounded-full text-white font-bold text-sm sm:text-base hover:bg-indigo-700 transition-all disabled:opacity-70"
        >
          {loading ? "Đang tạo tài khoản..." : "Tạo Tài Khoản"}
        </button>
      </form>

      <p className="text-center mt-5 sm:mt-6 text-gray-700 text-xs sm:text-sm">
        Đã có tài khoản?{" "}
        <button
          type="button"
          onClick={onSwitchSignIn}
          className="text-blue-600 font-extrabold hover:underline"
        >
          Đăng nhập
        </button>
      </p>
    </div>
  );
}
