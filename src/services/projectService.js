import api from "./api";

// 1. DÀNH CHO PUBLIC
export const getPublicProjects = async (params = {}) => {
  // Bỏ /api vì baseURL đã có rồi sếp nhé
  const response = await api.get("/projects", { params });
  return response.data;
};

// 2. DÀNH CHO SINH VIÊN (Gửi bằng FormData)
export const createProject = async (formData) => {
  const response = await api.post("/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// 3. DÀNH CHO ADMIN
export const getAdminProjects = async () => {
  // Sửa từ /api/projects/admin thành /projects/admin
  const response = await api.get("/projects/admin");
  return response.data;
};

export const updateProjectStatus = async (id, status) => {
  const response = await api.patch(`/projects/${id}/status`, null, {
    params: { status }
  });
  return response.data;
};

const projectService = {
  getPublicProjects,
  createProject,
  getAdminProjects,
  updateProjectStatus
};
export default projectService;