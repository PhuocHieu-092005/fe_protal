// src/services/studentService.js
import axiosInstance from "./api";

const studentService = {
  getProfileMe: async () => {
    const response = await axiosInstance.get("/students/me");
    return response.data.data; 
  },

  // Nhận vào formData đã được đóng gói đầy đủ cả chữ và file
  updateProfileMe: async (formData) => {
    const response = await axiosInstance.put("/students/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      }
    });
    return response.data;
  }
};

export default studentService;