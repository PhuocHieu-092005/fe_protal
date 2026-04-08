import api from "./api";

export const getMyWallet = async () => {
  const response = await api.get("/wallets/me");
  return response.data; // Trả về { balance, lastUpdated, ... }
};

export const getTransactionHistory = async () => {
  const response = await api.get("/wallets/transactions");
  return response.data; // Trả về danh sách lịch sử nạp/rút/bán đồ án
};

export const requestWithdrawal = async (data) => {
  // data: { amount, bankName, accountNumber, accountHolder }
  const response = await api.post("/withdrawals", data);
  return response.data;
};

const walletService = {
  getMyWallet,
  getTransactionHistory,
  requestWithdrawal,
};

export default walletService;