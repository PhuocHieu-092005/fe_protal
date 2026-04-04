import axiosInstance from "./api";

const cvService = {
  /**
   * Tạo CV bằng form
   * @param {FormData} formData - Chứa 'data' (chuỗi JSON) và 'avatar' (File ảnh)
   */
  createCvForm: async (formData) => {
    const response = await axiosInstance.post("/cvs/form", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  /**
   * Upload file CV (PDF)
   * @param {FormData} formData - Chứa 'title' (String) và 'file' (File PDF)
   */
  uploadCv: async (formData) => {
    const response = await axiosInstance.post("/cvs/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  /**
   * Lấy danh sách CV của sinh viên hiện tại
   */
  getMyCvs: async () => {
    const response = await axiosInstance.get("/cvs/my-cvs");
    return response.data;
  },

  /**
   * Xem chi tiết một CV theo ID
   * @param {number|string} id - ID của CV
   */
  getCvById: async (id) => {
    const response = await axiosInstance.get(`/cvs/${id}`);
    return response.data;
  },

  /**
   * Xóa CV của sinh viên
   * @param {number|string} id - ID của CV cần xóa
   */
  deleteCv: async (id) => {
    const response = await axiosInstance.delete(`/cvs/${id}`);
    return response.data;
  },

  /**
   * Lấy nội dung CV để hiển thị preview (HTML/JSON hoặc PDF)
   * @param {number|string} id - ID của CV
   */
  previewCv: async (id) => {
    const response = await axiosInstance.get(`/cvs/${id}/preview`);
    return response.data;
  },

  /**
   * Danh sách CV public đã được duyệt (có phân trang, filter, search)
   * @param {Object} params - Ví dụ: { keyword: 'Java', type: 'FORM', techs: ['ReactJS', 'NodeJS'], page: 0, size: 10 }
   */
  getPublicCvs: async (params) => {
    // Sử dụng config 'params' của Axios để tự động chuyển Object thành Query String trên URL
    const response = await axiosInstance.get("/cvs/public", { params });
    return response.data;
  },
};

export default cvService;
