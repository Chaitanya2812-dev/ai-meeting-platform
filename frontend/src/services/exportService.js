import api from "./api";

const exportMarkdown = async (meetingId) => {
  const token = localStorage.getItem("token");
  // The backend markdown endpoint uses GET
  window.open(`${api.defaults.baseURL}/export/markdown/${meetingId}?token=${token}`, "_blank");
};

const exportEmail = async (meetingId, toEmail) => {
  const res = await api.post(`/export/email/${meetingId}`, { toEmail });
  return res.data;
};

export default { exportMarkdown, exportEmail };
