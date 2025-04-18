import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5118/api/ResultAction",
  headers: {
    "Content-Type": "application/json",
  },
});

// Xử lý lỗi chung
const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  return null;
};

export const getListCheckResult = async () => {
  try {
    const res = await apiClient.get("/");
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getCheckResultById = async (id) => {
  try {
    const res = await apiClient.get(`/${id}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const createResultAction = async (data) => {
  try {
    const res = await apiClient.post("/", data);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateResult = async (id, data) => {
  try {
    const res = await apiClient.put(`/${id}`, data);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteResult = async (id) => {
  try {
    await apiClient.delete(`/${id}`);
    return true;
  } catch (error) {
    return handleError(error);
  }
};
