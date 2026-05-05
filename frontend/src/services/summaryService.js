import api from "./api";

/**
 * Fetch a single meeting by ID.
 * Returns: { _id, title, transcript, summary, decisions, tasks, createdAt }
 */
const getMeeting = async (meetingId) => {
  const res = await api.get(`/meeting/${meetingId}`);
  return res.data;
};

/**
 * Fetch all meetings for the logged-in user.
 * Returns: Array of meetings (without transcript field)
 */
const getAllMeetings = async () => {
  const res = await api.get("/meetings");
  return res.data;
};

export default { getMeeting, getAllMeetings };
