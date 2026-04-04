import api from "./api";

export const getPublicProjects = async (params = {}) => {
  const queryParams = {
    title: params.title || undefined,
    technologyId: params.technologyId || undefined,
    page: params.page ?? 0,
    size: params.size ?? 9,
  };

  const response = await api.get("/projects", {
    params: queryParams,
  });

  return response.data;
};