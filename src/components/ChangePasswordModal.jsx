import React, { useState } from "react";
import authService from "../services/authService";

export default function ChangePasswordModal({ onClose, onBack }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!oldPassword.trim() || !newPassword.trim()) {
      setError("Vui lòng nhập đầy đủ mật khẩu cũ và mật khẩu mới.");
      return;
    }

    try {
      setLoading(true);
      const res = await authService.changePassword({
        old_password: oldPassword,
        new_password: newPassword,
      });
      setSuccess(res?.message || "Cập nhật mật khẩu thành công.");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError(
        err.response?.data?.data ||
          err.response?.data?.message ||
          "Không thể đổi mật khẩu.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-500 w-[450px] max-w-full mx-4 md:p-8 p-6 text-left text-sm rounded-3xl shadow-2xl relative transition-all">
      <button
        onClick={onClose}
        className="absolute top-4 right-6 text-3xl font-bold text-gray-400 hover:text-red-500 transition-all"
      >
        ×
      </button>

      <div className="flex justify-center mb-5">
        <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center shadow-sm">
          <div className="text-5xl text-indigo-500">🔒</div>
        </div>
      </div>

      <h2 className="text-4xl font-extrabold mb-3 text-center text-slate-800">
        Đổi Mật Khẩu
      </h2>

      <p className="text-center text-gray-500 text-xl leading-relaxed mb-8">
        Bạn cần đăng nhập để thay đổi mật khẩu.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 ml-2 font-bold text-2xl text-slate-700">
            Mật khẩu cũ
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 outline-none rounded-full py-5 px-8 text-xl focus:border-indigo-500 focus:bg-white transition-all"
            placeholder="Nhập mật khẩu cũ"
            required
          />
        </div>

        <div>
          <label className="block mb-2 ml-2 font-bold text-2xl text-slate-700">
            Mật khẩu mới
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 outline-none rounded-full py-5 px-8 text-xl focus:border-indigo-500 focus:bg-white transition-all"
            placeholder="Nhập mật khẩu mới"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-base text-center font-medium">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 text-base text-center font-medium">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 py-5 rounded-full text-white font-bold text-2xl hover:bg-indigo-700 hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="text-indigo-600 font-extrabold text-2xl hover:underline"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}
