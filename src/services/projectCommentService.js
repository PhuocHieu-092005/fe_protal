import api from "./api";

const getCommentsByProject = async (projectId) => {
  const response = await api.get(`/comment-projects/${projectId}/comments`);
  return response.data;
};

const addCommentToProject = async (projectId, payload) => {
  const response = await api.post(
    `/comment-projects/${projectId}/comments`,
    payload,
  );
  return response.data;
};

const projectCommentService = {
  getCommentsByProject,
  addCommentToProject,
};

export default projectCommentService;