import api from "./api";

const upload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data; // transcript ID or job ID
};

export default { upload };
