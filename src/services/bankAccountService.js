import api from "./api";

export const createBankAccount = async (data) => {
  const response = await api.post("/bank-accounts", data);
  return response.data;
};

export const getMyBankAccounts = async () => {
  const response = await api.get("/bank-accounts/me");
  return response.data;
};

export const deleteBankAccount = async (id) => {
  const response = await api.delete(`/bank-accounts/${id}`);
  return response.data;
};

const bankAccountService = {
  createBankAccount,
  getMyBankAccounts,
  deleteBankAccount,
};

export default bankAccountService;
