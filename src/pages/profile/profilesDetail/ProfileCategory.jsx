import React from "react";
import StudentProfileCategory from "./StudentProfileCategory";
import CompanyProfileCategory from "./CompanyProfileCategory";

export default function ProfileCategory() {
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <p className="text-gray-500">Không tìm thấy thông tin người dùng.</p>
      </div>
    );
  }

  if (user.role === "STUDENT") {
    return <StudentProfileCategory />;
  }

  if (user.role === "COMPANY") {
    return <CompanyProfileCategory />;
  }

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <p className="text-red-500">
        Không xác định vai trò tài khoản: {user.role}
      </p>
    </div>
  );
}
