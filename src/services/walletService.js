import api from "./api";

export const getMyWallet = async () => {
  const response = await api.get("/wallets/me");
  return response.data;
};

export const getTransactionHistory = async () => {
  const response = await api.get("/wallets/transactions");
  return response.data;
};

export const requestWithdrawal = async (data) => {
  const response = await api.post("/withdrawals", data);
  return response.data;
};

export const getMyWithdrawalRequests = async () => {
  const response = await api.get("/withdrawals/me");
  return response.data;
};

const walletService = {
  getMyWallet,
  getTransactionHistory,
  requestWithdrawal,
  getMyWithdrawalRequests,
};

export default walletService;
