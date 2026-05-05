import api from "./api";

const exportMarkdown = async (meetingId) => {
  const token = localStorage.getItem("token");
  // The backend markdown endpoint uses GET
  window.open(`${api.defaults.baseURL}/export/markdown/${meetingId}?token=${token}`, "_blank");
};

export default { exportMarkdown };
