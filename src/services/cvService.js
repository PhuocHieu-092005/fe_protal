import api from "./api";

const cvService = {
  getMyCvs: async () => {
    const response = await api.get("/cvs/my-cvs");
    return response.data;
  },
};

export default cvService;