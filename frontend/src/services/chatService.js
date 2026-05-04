import api from "./api";

const ask = async (meetingId, question) => {
  const res = await api.post(`/chat/${meetingId}`, { question });
  return res.data.answer;
};

export default { ask };
