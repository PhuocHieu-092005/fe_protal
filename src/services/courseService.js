import api from "./api";

export const getAllCourses = async () => {
  const response = await api.get("/courses");
  return response.data;
};

const courseService = {
  getAllCourses,
};

export default courseService;