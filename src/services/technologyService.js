import api from "./api";

export const getAllTechnologies = async () => {
  const response = await api.get("/technologies");
  return response.data;
};

const technologyService = {
  getAllTechnologies,
};

export default technologyService;