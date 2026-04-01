import React, { useState, useRef } from "react";
import { Camera, Save, Edit3 } from "lucide-react";
import studentService from "../../../services/studentService";
import Swal from "sweetalert2";

const ProfileForm = ({ profile, setProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Lưu file ảnh
  const [previewUrl, setPreviewUrl] = useState(null); // Lưu link ảnh tạm
  const fileInputRef = useRef(null);

  // 1. Xử lý khi gõ phím
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // 2. Xử lý khi chọn file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        Swal.fire("Lỗi", "Kích thước ảnh không được vượt quá 1MB", "error");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 3. Hàm lưu dữ liệu
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("fullName", profile.full_name || "");
      formData.append("phone", profile.phone || "");
      formData.append("address", profile.address || "");
      formData.append("course", profile.course || "");

      if (profile.gender !== null && profile.gender !== undefined) {
        formData.append("gender", profile.gender);
      }

      // Đóng gói file ảnh
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      await studentService.updateProfileMe(formData);

      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Thông tin và ảnh đại diện đã được cập nhật!",
        timer: 2000,
      });

      setIsEditing(false);
      setSelectedFile(null); // Reset file sau khi lưu
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể cập nhật thông tin. Vui lòng kiểm tra lại kết nối.",
      });
    }
  };
  // up ảnh lên clound
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || "User")}&background=random`;

  return (
    <section className="w-3/4 bg-white rounded-lg shadow-sm p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Cập nhật hồ sơ</h2>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 ${
            isEditing
              ? "bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
          } text-white`}
        >
          {isEditing ? (
            <>
              {" "}
              <Save size={18} /> Lưu thay đổi{" "}
            </>
          ) : (
            <>
              {" "}
              <Edit3 size={18} /> Chỉnh sửa thông tin{" "}
            </>
          )}
        </button>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-10 relative">
        <div className="w-32 h-32 rounded-full border-4 border-blue-50 shadow-md overflow-hidden bg-gray-100">
          <img
            src={previewUrl || profile?.avatar_url || defaultAvatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {isEditing && (
          <>
            {/* Nút bấm để mở hộp thoại chọn file */}
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 translate-x-12 bg-white p-2 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-transform active:scale-90"
            >
              <Camera size={18} className="text-blue-600" />
            </button>

            {/* Input file bị ẩn đi */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </>
        )}
        <p className="text-xs text-gray-400 mt-4 italic">
          {isEditing
            ? "Nhấp vào biểu tượng máy ảnh để thay đổi ảnh"
            : "Kích cỡ tệp ảnh tối đa 1MB (*.jpg, *.png)"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Họ tên */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            Họ và tên *
          </label>
          <input
            name="full_name"
            type="text"
            value={profile?.full_name || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`input input-bordered w-full ${!isEditing ? "bg-gray-50" : "border-blue-400 focus:ring-2 focus:ring-blue-100"}`}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Email</label>
          <input
            type="text"
            value={profile?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* MSSV */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            Mã số sinh viên
          </label>
          <input
            type="text"
            value={profile?.mssv || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Số điện thoại */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            Số điện thoại *
          </label>
          <input
            name="phone"
            type="text"
            value={profile?.phone || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`input input-bordered w-full ${!isEditing ? "bg-gray-50" : "border-blue-400"}`}
          />
        </div>

        {/* Giới tính */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">
            Giới tính
          </label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                checked={profile?.gender === true}
                onChange={() =>
                  isEditing && setProfile({ ...profile, gender: true })
                }
                disabled={!isEditing}
                className="radio radio-primary radio-sm"
              />
              <span className="text-sm">Nam</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                checked={profile?.gender === false}
                onChange={() =>
                  isEditing && setProfile({ ...profile, gender: false })
                }
                disabled={!isEditing}
                className="radio radio-primary radio-sm"
              />
              <span className="text-sm">Nữ</span>
            </label>
          </div>
        </div>

        {/* Địa chỉ */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Địa chỉ</label>
          <input
            name="address"
            type="text"
            value={profile?.address || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`input input-bordered w-full ${!isEditing ? "bg-gray-50" : "border-blue-400"}`}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfileForm;
