import React, { useState } from "react";
import authService from "../services/authService";

export default function ForgotPasswordModal({
  onClose,
  onBackToLogin,
  defaultEmail = "",
}) {
  const [email, setEmail] = useState(defaultEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Vui lòng nhập email.");
      return;
    }

    try {
      setLoading(true);
      const res = await authService.forgotPassword(email.trim());
      setSuccess(res?.message || "Mật khẩu mới đã được gửi qua email.");
    } catch (err) {
      setError(
        err.response?.data?.data ||
          err.response?.data?.message ||
          "Không thể gửi yêu cầu quên mật khẩu.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-[460px] max-w-full mx-4 p-6 md:p-8 rounded-3xl shadow-2xl relative text-left">
      <button
        onClick={onClose}
        className="absolute top-4 right-5 text-3xl font-bold text-gray-400 hover:text-red-500 transition-all"
      >
        ×
      </button>

      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center">
          <span className="text-3xl">✉️</span>
        </div>
      </div>

      <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-3">
        Quên Mật Khẩu
      </h2>

      <p className="text-center text-gray-500 text-base leading-7 mb-6">
        Nhập email đã đăng ký để nhận hướng dẫn
        <br />
        đặt lại mật khẩu.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 ml-1 font-semibold text-gray-700">
            Địa chỉ Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn"
            className="w-full bg-gray-50 border border-gray-200 outline-none rounded-full py-3 px-6 focus:border-indigo-500 focus:bg-white transition-all"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm text-center">{success}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 py-3.5 rounded-full text-white font-bold text-base hover:bg-indigo-700 hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? "Đang gửi..." : "Gửi liên kết đặt lại"}
        </button>
      </form>

      <div className="mt-5 text-center">
        <button
          onClick={onBackToLogin}
          className="text-indigo-600 font-bold hover:underline"
        >
          Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
}
