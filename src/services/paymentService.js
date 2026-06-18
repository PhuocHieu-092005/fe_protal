import api from "./api";

export const createProjectPaymentLink = async (projectId) => {
  const response = await api.post(`/payments/projects/${projectId}/create-link`);
  return response.data;
};

export const getMyPurchasedProjects = async () => {
  const response = await api.get("/payments/purchases/me");
  return response.data;
};

const paymentService = {
  createProjectPaymentLink,
  getMyPurchasedProjects,
};

export default paymentService;
