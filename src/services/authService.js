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
};
export default authService;
