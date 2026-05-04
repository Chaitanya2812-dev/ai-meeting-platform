import api from "./api";

const exportData = async (meetingId, type) => {
  const res = await api.post(`/export/${meetingId}`, { type });
  return res.data; // confirmation
};

export default { exportData };
