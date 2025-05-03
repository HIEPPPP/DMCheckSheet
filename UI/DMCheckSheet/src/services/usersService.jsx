import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/Users",
  headers: {
    "Content-Type": "application/json",
  },
});

// Xử lý lỗi chung
const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  return null;
};

export const getListUser = async () => {
  try {
    const res = await apiClient.get("/");
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getUserByUsername = async (username) => {
  try {
    const res = await apiClient.get(`${username}/username`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const createUser = async (userData) => {
  try {
    const res = await apiClient.post("/", userData);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const res = await apiClient.put(`/${userId}`, userData);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await apiClient.delete(`/${userId}`);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};
