
import api from "./api";

const jobService = {
  // Lấy danh sách tất cả các công việc (dành cho sinh viên xem)
  getAllJobs: async () => {
    const response = await api.get("/jobs/active");
    return response.data;
  },
  toggleFavorite: async (jobId, note = "") => {
    return await api.post(`/students/favorites/${jobId}`, { note });
  },
  applyJob: async (jobId, cvId) => {
    return (await api.post(`/job/${jobId}/apply`, { cvId })).data;
  },
  getJobApplicatons: async (jobId) => {
    const response = await api.get(`/companies/jobs/${jobId}/applications`);
    return response.data;
  },
  getApplicatonsApproved: async () => {
    const response = await api.get(`/companies/jobs/applications/approved`);
    return response.data;
  },
  // Lấy chi tiết một công việc
  getJobDetail: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  // DÀNH CHO CÔNG TY: Đăng tin tuyển dụng mới
  createJob: async (jobData) => {
    return await api.post("/companies/jobs", jobData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // DÀNH CHO CÔNG TY: Lấy danh sách tin đã đăng của chính mình
  getMyJobs: async () => {
    return await api.get("/companies/me/jobs");
  },

  // DÀNH CHO CÔNG TY: Cập nhật tin đăng
  updateJob: async (id, jobData) => {
    return await api.put(`/companies/jobs/${id}`, jobData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // DÀNH CHO CÔNG TY: Xóa/Đóng tin tuyển dụng
  deleteJob: async (id) => {
    return await api.patch(`/companies/jobs/${id}/close`);
  },
  // eslint-disable-next-line no-dupe-keys
  applyJob: async (jobId, cvId) => {
    return await api.post(`/job/${jobId}/apply`, {
      cvId: cvId,
    });
  },
  reviewApplication: async (applicationId, data) => {
    return await api.patch(
      `/companies/applications/${applicationId}/status`,
      data,
    );
  },
  getMyFavorites: async () => {
    return await api.get("/students/favorites");
  },
  searchByTitle: async (title) => {
    return await api.get('/jobs/search', {
      params: { title: title }
    });
  },
  filterJobs: async (filters) => {
    const params = new URLSearchParams();
    if (filters.location)
      params.append("location", filters.location);
    if (filters.type)
      params.append("type", filters.type)
    if (filters.minSalary)
      params.append("minSalary", filters.minSalary);
    if (filters.maxSalary)
      params.append("maxSalary", filters.maxSalary);
    if (filters.tags && filters.tags.length > 0)
      filters.tags.forEach(tag => params.append("tags", tag));
    return api.get(`/jobs/filter?${params.toString()}`);
  }

};

export default jobService;
