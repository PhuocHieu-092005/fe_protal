import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, Info } from "lucide-react";
import { changePassword } from "../../../services/userService";

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.old_password.trim() || !formData.new_password.trim()) {
      return "Vui lòng nhập đầy đủ mật khẩu cũ và mới.";
    }
    if (formData.new_password.length < 6) {
      return "Mật khẩu mới phải có ít nhất 6 ký tự.";
    }
    if (formData.old_password === formData.new_password) {
      return "Mật khẩu mới phải khác mật khẩu cũ.";
    }
    if (formData.new_password !== formData.confirm_password) {
      return "Xác nhận mật khẩu mới không khớp.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    const errorText = validateForm();
    if (errorText) {
      setMessage({ type: "error", text: errorText });
      return;
    }

    try {
      setLoading(true);
      const response = await changePassword({
        old_password: formData.old_password,
        new_password: formData.new_password,
      });
      setMessage({
        type: "success",
        text: response?.message || "Đổi mật khẩu thành công.",
      });
      setFormData({ old_password: "", new_password: "", confirm_password: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.response?.data?.message || "Không thể đổi mật khẩu.",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordInput = ({ label, field, placeholder, showKey }) => (
    <div className="space-y-2">
      <label className="text-[13px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
          <Lock size={18} />
        </div>
        <input
          type={showPassword[showKey] ? "text" : "password"}
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-700 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50"
        />
        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => ({ ...prev, [showKey]: !prev[showKey] }))
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {showPassword[showKey] ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
      {/* Header Section */}
      <div className="flex items-center gap-5 border-b border-slate-50 pb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Thay đổi mật khẩu
          </h2>
          <p className="text-sm text-slate-500">
            Bảo mật tài khoản của bạn bằng mật khẩu mạnh hơn
          </p>
        </div>
      </div>

      {/* Alert Message */}
      {message.text && (
        <div
          className={`mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
              : "bg-red-50 text-red-700 ring-1 ring-red-100"
          }`}
        >
          <div
            className={`h-2 w-2 rounded-full ${message.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}
          />
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {renderPasswordInput({
            label: "Mật khẩu hiện tại",
            field: "old_password",
            placeholder: "••••••••",
            showKey: "old",
          })}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {renderPasswordInput({
              label: "Mật khẩu mới",
              field: "new_password",
              placeholder: "••••••••",
              showKey: "new",
            })}
            {renderPasswordInput({
              label: "Xác nhận mật khẩu",
              field: "confirm_password",
              placeholder: "••••••••",
              showKey: "confirm",
            })}
          </div>
        </div>

        {/* Hint Box */}
        <div className="flex items-start gap-3 rounded-2xl bg-blue-50/50 p-4 text-[13px] leading-relaxed text-blue-700 ring-1 ring-blue-100/50">
          <Info size={18} className="shrink-0 mt-0.5" />
          <p>
            <span className="font-bold">Gợi ý:</span> Mật khẩu nên có ít nhất 6
            ký tự, bao gồm chữ cái và số để đảm bảo tính bảo mật cao nhất.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={loading}
            className="h-12 flex-1 rounded-xl bg-black px-8 text-sm font-bold text-white shadow-lg shadow-black/10 transition-all hover:bg-slate-800 hover:shadow-black/20 disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
          </button>

          <button
            type="button"
            onClick={() =>
              setFormData({
                old_password: "",
                new_password: "",
                confirm_password: "",
              })
            }
            className="h-12 rounded-xl border border-slate-200 bg-white px-8 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300"
          >
            Làm mới
          </button>
        </div>
      </form>
    </div>
  );
}
