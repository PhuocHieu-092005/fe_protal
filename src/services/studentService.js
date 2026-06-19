import axiosInstance from "./api";

const studentService = {
  getProfileMe: async () => {
    const response = await axiosInstance.get("/students/me");
    return response.data.data;
  },

  searchByMssv: async (mssv) => {
    const response = await axiosInstance.get("/students/search-mssv", {
      params: { mssv },
    });
    return response.data;
  },

  updateProfileMe: async (formData) => {
    const response = await axiosInstance.put("/students/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default studentService;
