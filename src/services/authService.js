import axiosInstance from "./api";
const authService = {
  /**
   * Đăng ký company + student
   */
  register: async (data) => {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  },
  /**
   * Đăng nhập
   */
  login: async (data) => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  },

  /**
   * Xác thực email
   */
  verifyEmail: async (token) => {
    const response = await axiosInstance.get(`/auth/verify?token=${token}`);
    return response.data;
  },
  // quên mật khẩu
 forgotPassword: async (email) => {
    const response = await axiosInstance.post("/auth/forgot-password", {
      email,
    });
    return response.data;
  },
// thay đổi mật khẩu
  changePassword: async (data) => {
    const response = await axiosInstance.put("/user/change-password", data);
    return response.data;
  },
};
export default authService;
