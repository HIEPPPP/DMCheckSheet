import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5118/api/CheckSheetItem",
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  return null;
};

export const getListItem = async () => {
  try {
    const res = await apiClient.get("/");
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getItemById = async (itemId) => {
  try {
    const res = await apiClient.get(`/${itemId}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getItemBySheetCode = async (sheetCode) => {
  try {
    const res = await apiClient.get(`/${sheetCode}/sheetCode`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const createDevice = async (itemData) => {
  try {
    const res = await apiClient.post("/", itemData);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateDevice = async (itemId, itemData) => {
  try {
    const res = await apiClient.put(`/${itemId}`, itemData);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateCancelFlag = async (itemId) => {
  try {
    await apiClient.put(`/${itemId}/cancel`);
    return true;
  } catch (error) {
    return handleError(error);
  }
};
