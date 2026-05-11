import api from "./api";

export const createProjectPaymentLink = async (projectId) => {
  const response = await api.post(`/payments/projects/${projectId}/create-link`);
  return response.data;
};

const paymentService = {
  createProjectPaymentLink,
};

export default paymentService;
