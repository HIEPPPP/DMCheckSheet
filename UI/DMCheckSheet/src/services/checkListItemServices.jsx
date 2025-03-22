import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5118/api/CheckListItem",
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  return null;
};

export const getListItem = async (pageNumber, pageSize) => {
  try {
    const res = await apiClient.get("/", {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getListItemById = async (itemId) => {
  try {
    const res = await apiClient.get(`/${itemId}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const createListItem = async (itemData) => {
  try {
    const res = await apiClient.post("/", itemData);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateListItem = async (itemId, itemData) => {
  try {
    const res = await apiClient.put(`/${itemId}`, itemData);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteListItem = async (itemId) => {
  try {
    await apiClient.delete(`/${itemId}`);
    return true;
  } catch (error) {
    return handleError(error);
  }
};
