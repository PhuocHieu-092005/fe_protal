import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext"; // ← Import Context
import authService from "../services/authService"; // Nếu cần gọi trực tiếp

export default function SignUpForm({ onClose, onSwitchSignIn }) {
  const [role, setRole] = useState("STUDENT");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth(); // Dùng để tự động login sau khi đăng ký thành công (tùy chọn)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const registerData = {
        full_name: fullName.trim(),
        email: email.trim(),
        password: password,
        role: role, // STUDENT hoặc COMPANY
      };

      // Gọi API đăng ký
      const response = await authService.register(registerData);

      console.log("Đăng ký thành công:", response);

      alert(
        "Đăng ký tài khoản thành công! Vui lòng kiểm tra email để xác thực.",
      );
      // Tùy chọn: Tự động chuyển sang form đăng nhập
      onSwitchSignIn();
    } catch (err) {
      if (
        err.response?.data?.data &&
        typeof err.response.data.data === "object"
      ) {
        const validationErrors = Object.values(err.response.data.data);
        setError(validationErrors[0]); // Hiển thị lỗi đầu tiên
      } else {
        setError(err.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-500 w-[450px] max-w-full mx-4 md:p-10 p-6 text-left text-sm rounded-3xl shadow-2xl relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-3xl font-bold text-gray-400 hover:text-red-500 p-2"
      >
        ×
      </button>

      <h2 className="text-3xl font-extrabold mb-6 text-center text-slate-800">
        Tạo Tài Khoản
      </h2>

      {/* Role Selector */}
      <div className="flex bg-gray-100 p-1 rounded-full mb-6">
        <button
          onClick={() => setRole("STUDENT")}
          className={`flex-1 py-2.5 rounded-full font-bold transition-all ${
            role === "STUDENT"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500"
          }`}
        >
          Sinh viên
        </button>
        <button
          onClick={() => setRole("COMPANY")}
          className={`flex-1 py-2.5 rounded-full font-bold transition-all ${
            role === "COMPANY"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500"
          }`}
        >
          Doanh nghiệp
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1.5 ml-4 font-semibold text-gray-700">
            Họ và tên
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-3 px-6 outline-none focus:border-indigo-500"
            placeholder={
              role === "STUDENT"
                ? "Nhập họ và tên của bạn"
                : "Nhập tên doanh nghiệp"
            }
            required
          />
        </div>

        <div>
          <label className="block mb-1.5 ml-4 font-semibold text-gray-700">
            Địa chỉ Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-3 px-6 outline-none focus:border-indigo-500"
            placeholder={
              role === "STUDENT"
                ? "Nhập email sinh viên của bạn"
                : "Nhập email doanh nghiệp"
            }
            required
          />
        </div>

        <div>
          <label className="block mb-1.5 ml-4 font-semibold text-gray-700">
            Mật khẩu
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-3 px-6 outline-none focus:border-indigo-500"
            placeholder="Tạo mật khẩu"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full !mt-8 bg-indigo-600 py-4 rounded-full text-white font-bold text-base hover:bg-indigo-700 transition-all disabled:opacity-70"
        >
          {loading ? "Đang tạo tài khoản..." : "Tạo Tài Khoản"}
        </button>
      </form>

      <p className="text-center mt-6 text-gray-700">
        Đã có tài khoản?{" "}
        <button
          onClick={onSwitchSignIn}
          className="text-blue-600 font-extrabold hover:underline"
        >
          Đăng nhập
        </button>
      </p>
    </div>
  );
}
