import api from "./api";

export const sendAiChatMessage = async (message) => {
  const response = await api.post("/ai/chat", { message });
  return response.data;
};

const aiService = {
  sendAiChatMessage,
};

export default aiService;
