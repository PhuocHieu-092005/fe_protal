import api from "./api";

// 1. DÀNH CHO PUBLIC (Trang chủ)
export const getPublicProjects = async (params = {}) => {
  const queryParams = {
    title: params.title || undefined,
    technologyId: params.technologyId || undefined,
    page: params.page ?? 0,
    size: params.size ?? 9,
  };
  const response = await api.get("/projects", { params: queryParams });
  return response.data;
};
export const deleteFavoriteProject = async(projectId)=>{
  const reponse  =await api.delete(`/project-favorites/projects/${projectId}`);
  return reponse.data;
}
export const toggleFavorite = async(projectId)=>{
  const response = await api.post(`/project-favorites`,{
    project_id:projectId
  });
  return response.data;
}
export const getAllFavorite = async()=>{
  const response =await api.get('/project-favorites/me');
  return response.data;
}
export const isFavorited = async(projectId)=>{
  console.log("id là:",projectId);
  const response = await api.get(`/project-favorites/${projectId}/isFavorited`);
    return response.data.data;
}
export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const getProjectTeacherEvaluations = async (projectId) => {
  const response = await api.get(`/projects/${projectId}/teacher-evaluations`);
  return response.data;
};

export const getMyProjectEvaluations = async () => {
  const response = await api.get("/students/me/project-evaluations");
  return response.data;
};

// 2. DÀNH CHO SINH VIÊN (Portal)
export const getMyProjects = async () => {
  const response = await api.get("/projects/me/projects");
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await api.post("/projects", projectData);
  return response.data;
};

export const updateProject = async (id, formData) => {
  const response = await api.put(`/projects/${id}`, formData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

// 3. DÀNH CHO ADMIN
export const getAdminProjects = async (params = {}) => {
  const queryParams = {
    page: params.page ?? 0,
    size: params.size ?? 10,
  };
  const response = await api.get("/projects/admin", { params: queryParams });
  return response.data;
};

export const updateProjectStatus = async (id, status, adminNote) => {
  const response = await api.patch(`/projects/${id}/status`, {
    status,
    admin_note: adminNote,
  });
  return response.data;
};

const projectService = {
  getPublicProjects,
  getProjectById,
  getProjectTeacherEvaluations,
  getMyProjectEvaluations,
  getMyProjects,
  createProject,
  updateProject,
  deleteProject,
  getAdminProjects,
  updateProjectStatus,
  toggleFavorite,
  isFavorited,
  deleteFavoriteProject,
  getAllFavorite
};

export default projectService;
