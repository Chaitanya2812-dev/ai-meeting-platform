// import api from "./api";

// /**
//  * Upload audio/video file to Node.js backend.
//  * Backend forwards to FastAPI for transcription, then calls Groq for summary + tasks.
//  * Returns: { success, meetingId, transcript, summary, decisions, tasks }
//  */
// const upload = async (file, title = "My Meeting") => {
//   const formData = new FormData();
//   formData.append("audio", file); // Backend expects field name "audio"
//   formData.append("title", title);

//   const res = await api.post("/upload", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return res.data;
// };

// export default { upload };


// -------------------------------------

import api from "./api";

const upload = async (file, title = "My Meeting", language = "en") => {  // ADD language param
  const formData = new FormData();
  formData.append("audio", file);
  formData.append("title", title);
  formData.append("language", language);  // ADD THIS LINE

  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export default { upload };