import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/ResultAction",
  headers: {
    "Content-Type": "application/json",
  },
});

// Xử lý lỗi chung
const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  return null;
};

export const getListResultAction = async () => {
  try {
    const res = await apiClient.get("/");
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getListResultActionNG = async () => {
  try {
    const res = await apiClient.get("/resultNG");
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getResultActionById = async (id) => {
  try {
    const res = await apiClient.get(`/${id}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getResultActionByResultId = async (resultId) => {
  try {
    const res = await apiClient.get(`${resultId}/resultId`);
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

export const updateResultAction = async (id, data) => {
  try {
    const res = await apiClient.put(`/${id}`, data);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateResultActionByResultId = async (resultId, data) => {
  try {
    const res = await apiClient.put(`/${resultId}/resultId`, data);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteResultAction = async (id) => {
  try {
    await apiClient.delete(`/${id}`);
    return true;
  } catch (error) {
    return handleError(error);
  }
};
