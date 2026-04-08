import api from "./api";

const jobService = {
  // Lấy danh sách tất cả các công việc (dành cho sinh viên xem)
  getAllJobs: async (params) => {
    return await api.get("/job-posts", { params });
  },

  // Lấy chi tiết một công việc
  getJobDetail: async (id) => {
    return await api.get(`/job-posts/${id}`);
  },

  // DÀNH CHO CÔNG TY: Đăng tin tuyển dụng mới
  createJob: async (jobData) => {
    return await api.post("/job-posts", jobData);
  },

  // DÀNH CHO CÔNG TY: Lấy danh sách tin đã đăng của chính mình
  getMyJobs: async () => {
    return await api.get("/job-posts/my-jobs");
  },

  // DÀNH CHO CÔNG TY: Cập nhật tin đăng
  updateJob: async (id, jobData) => {
    return await api.put(`/job-posts/${id}`, jobData);
  },

  // DÀNH CHO CÔNG TY: Xóa/Đóng tin tuyển dụng
  deleteJob: async (id) => {
    return await api.delete(`/job-posts/${id}`);
  }
};

export default jobService;