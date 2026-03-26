import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuth = async () => {
      const token = searchParams.get("token");
      localStorage.setItem("accessToken", token);
      const res = await axios.get("http://localhost:8080/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res", res);

      // lưu user
      localStorage.setItem("user", JSON.stringify(res.data.data));
      // reload
      window.location.href = "/";
    };

    handleOAuth(); // gọi function async
  }, [searchParams, navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Đang xử lý đăng nhập Google...
        </h2>
        <p>Vui lòng đợi trong giây lát...</p>
      </div>
    </div>
  );
}
