import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import {
  Building2,
  BadgeCheck,
  ShieldCheck,
  Mail,
  Image as ImageIcon,
} from "lucide-react";
import companyService from "../../../services/companyService";

const DEFAULT_COMPANY_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="data:image/jpeg;base64,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" width="200" height="200">
      <rect width="100%" height="100%" fill="#e2e8f0"/>
      <circle cx="100" cy="78" r="32" fill="#94a3b8"/>
      <rect x="50" y="122" width="100" height="42" rx="20" fill="#94a3b8"/>
      <text x="100" y="188" text-anchor="middle" font-size="18" fill="#475569" font-family="Arial">
        Company
      </text>
    </svg>
  `);

function getReadableCompanyError(error) {
  const responseData = error?.response?.data;
  const rawData = responseData?.data;
  const rawMessage = responseData?.message;

  if (rawData && typeof rawData === "object") {
    const firstError = Object.values(rawData)[0];
    if (typeof firstError === "string" && firstError.trim()) {
      return firstError;
    }
  }

  if (typeof rawData === "string" && rawData.trim()) {
    return rawData;
  }

  if (
    typeof rawMessage === "string" &&
    rawMessage.trim() &&
    rawMessage !== "Có lỗi xảy ra khi xử lý yêu cầu"
  ) {
    return rawMessage;
  }

  if (typeof error?.message === "string" && error.message.trim()) {
    return error.message;
  }

  return "Không thể cập nhật thông tin công ty. Hãy kiểm tra lại dữ liệu nhập.";
}

export default function CompanyProfileForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [companyInfo, setCompanyInfo] = useState(null);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    taxCode: "",
    website: "",
    address: "",
    phone: "",
    description: "",
    location: "",
  });

  const fetchCompanyProfile = async () => {
    try {
      setLoading(true);
      const res = await companyService.getMyCompanyProfile();
      const data = res?.data || null;

      setCompanyInfo(data);
      setSelectedAvatarFile(null);

      setFormData({
        companyName: data?.companyName || "",
        taxCode: data?.taxCode || "",
        website: data?.website || "",
        address: data?.address || "",
        phone: data?.phone || "",
        description: data?.description || "",
        location: data?.location || "",
      });
    } catch (error) {
      console.error(
        "Lỗi lấy thông tin công ty:",
        error?.response?.data || error,
      );
      Swal.fire("Lỗi", "Không thể tải thông tin công ty!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedAvatarFile(file);
  };

  const previewAvatar = useMemo(() => {
    if (selectedAvatarFile) {
      return URL.createObjectURL(selectedAvatarFile);
    }

    if (companyInfo?.avatarUrl) {
      return companyInfo.avatarUrl;
    }

    return DEFAULT_COMPANY_AVATAR;
  }, [selectedAvatarFile, companyInfo]);

  useEffect(() => {
    return () => {
      if (selectedAvatarFile && previewAvatar?.startsWith("blob:")) {
        URL.revokeObjectURL(previewAvatar);
      }
    };
  }, [selectedAvatarFile, previewAvatar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.companyName.trim()) {
      Swal.fire("Lưu ý", "Vui lòng nhập tên công ty!", "warning");
      return;
    }

    if (!formData.taxCode.trim()) {
      Swal.fire("Lưu ý", "Vui lòng nhập mã số thuế!", "warning");
      return;
    }

    if (!/^\d{13}$/.test(formData.taxCode.trim())) {
      Swal.fire("Lưu ý", "Mã số thuế phải đúng 13 chữ số!", "warning");
      return;
    }

    if (!formData.phone.trim()) {
      Swal.fire("Lưu ý", "Vui lòng nhập số điện thoại!", "warning");
      return;
    }

    if (!/^\d{10,13}$/.test(formData.phone.trim())) {
      Swal.fire("Lưu ý", "Số điện thoại phải từ 10 đến 13 chữ số!", "warning");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        companyName: formData.companyName.trim(),
        taxCode: formData.taxCode.trim(),
        website: formData.website.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
      };

      // Chỉ gửi avatarUrl khi người dùng thực sự chọn file ảnh
      if (selectedAvatarFile) {
        payload.avatarUrl = selectedAvatarFile;
      }

      const res = await companyService.updateMyCompanyProfile(payload);
      const updatedData = res?.data || null;

      setCompanyInfo(updatedData);
      setSelectedAvatarFile(null);

      setFormData({
        companyName: updatedData?.companyName || payload.companyName || "",
        taxCode: updatedData?.taxCode || payload.taxCode || "",
        website: updatedData?.website || payload.website || "",
        address: updatedData?.address || payload.address || "",
        phone: updatedData?.phone || payload.phone || "",
        description: updatedData?.description || payload.description || "",
        location: updatedData?.location || payload.location || "",
      });

      Swal.fire(
        "Thành công",
        "Cập nhật thông tin công ty thành công!",
        "success",
      );
    } catch (error) {
      console.error(
        "Lỗi cập nhật thông tin công ty:",
        error?.response?.data || error,
      );

      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: getReadableCompanyError(error),
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="flex-1 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="flex min-h-[400px] flex-col items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"></div>
          <p className="mt-4 text-sm font-medium text-slate-400">
            Đang tải thông tin công ty...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-5 border-b border-slate-100 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-4xl font-bold text-slate-900">
            Thông tin công ty
          </h2>
          <p className="mt-2 text-slate-500">
            Cập nhật hồ sơ công ty để tăng độ tin cậy và thu hút ứng viên tốt
            hơn.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Trạng thái
            </p>
            <p className="mt-1 font-bold text-slate-900">
              {companyInfo?.status || "Chưa rõ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Xác minh
            </p>
            <p className="mt-1 font-bold text-slate-900">
              {companyInfo?.isVerified ? "Đã xác minh" : "Chưa xác minh"}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col items-center gap-4 rounded-3xl bg-slate-50 p-6">
        <img
          src={previewAvatar}
          alt="Avatar công ty"
          className="h-28 w-28 rounded-full border-4 border-white object-cover shadow"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_COMPANY_AVATAR;
          }}
        />

        <div className="text-center">
          <p className="text-sm font-medium text-slate-600">
            Ảnh đại diện công ty
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Nếu không chọn ảnh mới, hệ thống sẽ giữ ảnh cũ hoặc dùng ảnh mặc
            định để hiển thị.
          </p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <Building2 size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Tên công ty
            </span>
          </div>
          <p className="font-bold text-slate-900">
            {companyInfo?.companyName || "Chưa rõ"}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <Mail size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Email
            </span>
          </div>
          <p className="break-words font-bold text-slate-900">
            {companyInfo?.email || "Chưa rõ"}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <ShieldCheck size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Mã số thuế
            </span>
          </div>
          <p className="font-bold text-slate-900">
            {companyInfo?.taxCode || "Chưa rõ"}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <BadgeCheck size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              ID công ty
            </span>
          </div>
          <p className="font-bold text-slate-900">
            #{companyInfo?.id || "N/A"}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-600">
            Tên công ty *
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            placeholder="Nhập tên công ty..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition-all focus:border-black focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-600">
            Mã số thuế *
          </label>
          <input
            type="text"
            value={formData.taxCode}
            onChange={(e) => handleChange("taxCode", e.target.value)}
            placeholder="Nhập mã số thuế..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition-all focus:border-black focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-600">
            Website
          </label>
          <input
            type="text"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
            placeholder="https://your-company.com"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition-all focus:border-black focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-600">
            Số điện thoại *
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Nhập số điện thoại..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition-all focus:border-black focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-600">
            Địa chỉ
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Nhập địa chỉ công ty..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition-all focus:border-black focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-600">
            Khu vực / địa điểm
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Ví dụ: TP.HCM, Hà Nội..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition-all focus:border-black focus:bg-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-bold text-slate-600">
            Ảnh đại diện công ty
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-4 transition-all hover:border-slate-400 hover:bg-slate-100">
            <ImageIcon size={18} className="text-slate-500" />
            <span className="text-sm font-medium text-slate-600">
              {selectedAvatarFile
                ? selectedAvatarFile.name
                : "Chọn file ảnh từ máy tính"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>

          <p className="mt-2 text-xs text-slate-400">
            Backend đang yêu cầu avatarUrl là file ảnh, không phải link text.
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-bold text-slate-600">
            Mô tả công ty
          </label>
          <textarea
            rows={6}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Giới thiệu ngắn gọn về công ty..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition-all focus:border-black focus:bg-white"
          />
        </div>

        <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-black px-6 py-3 text-sm font-black text-white transition-all hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? "Đang lưu..." : "Lưu thông tin công ty"}
          </button>

          <button
            type="button"
            onClick={fetchCompanyProfile}
            className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-black text-slate-600 transition-all hover:bg-slate-50"
          >
            Tải lại dữ liệu
          </button>
        </div>
      </form>
    </section>
  );
}
