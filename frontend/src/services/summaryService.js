import api from "./api";

const getSummary = async (meetingId) => {
  const res = await api.get(`/summary/${meetingId}`);
  return res.data; // { transcript, summary, tasks }
};

export default { getSummary };
