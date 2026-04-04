import api from "./api";

export const changePassword = async (payload) => {
  const response = await api.put("/user/change-password", payload);
  return response.data;
};