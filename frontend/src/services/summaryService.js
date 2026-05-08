// import api from "./api";

// /**
//  * Fetch a single meeting by ID.
//  * Returns: { _id, title, transcript, summary, decisions, tasks, createdAt }
//  */
// const getMeeting = async (meetingId) => {
//   const res = await api.get(`/meeting/${meetingId}`);
//   return res.data;
// };

// /**
//  * Fetch all meetings for the logged-in user.
//  * Returns: Array of meetings (without transcript field)
//  */
// const getAllMeetings = async () => {
//   const res = await api.get("/meetings");
//   return res.data;
// };

// export default { getMeeting, getAllMeetings };


// --------------------------------------------


import api from "./api";

const getMeeting = async (meetingId) => {
  const res = await api.get(`/meeting/${meetingId}`);
  return res.data;
};

const getAllMeetings = async () => {
  const res = await api.get("/meetings");
  return res.data;
};

const renameMeeting = async (meetingId, title) => {
  const res = await api.patch(`/meeting/${meetingId}`, { title });
  return res.data;
};

const deleteMeeting = async (meetingId) => {
  const res = await api.delete(`/meeting/${meetingId}`);
  return res.data;
};

export default { getMeeting, getAllMeetings, renameMeeting, deleteMeeting };
