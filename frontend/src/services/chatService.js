import api from "./api";

/**
 * Send a question about a specific meeting to the Groq-powered chatbot.
 * Returns: the answer string.
 */
const ask = async (meetingId, question) => {
  const res = await api.post(`/chat/${meetingId}`, { question });
  return res.data.answer;
};

export default { ask };
