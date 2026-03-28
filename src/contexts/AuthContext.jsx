import React, { createContext, useState, useContext, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Khôi phục trạng thái đăng nhập khi reload trang
  useEffect(() => {
    const initializeAuth = () => {
      const savedToken = localStorage.getItem("accessToken");
      const savedUser = localStorage.getItem("user");
      if (savedToken && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setIsLoggedIn(true);
        } catch (error) {
          // console.error("Lỗi parse user data:", error);
          // localStorage.removeItem('accessToken');
          // localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // ====================== ĐĂNG NHẬP ======================
  const login = async (data) => {
    const response = await authService.login(data);
    const user = response.data;
    const currentUser = {
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      avatar_url:
        user.avatar_url ||
        "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
    };

    // Lưu vào state
    setUser(currentUser);
    setIsLoggedIn(true);

    // Lưu vào localStorage
    localStorage.setItem("accessToken", user.access_token);
    localStorage.setItem("user", JSON.stringify(currentUser));

    return response;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    user,
    isLoggedIn,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
