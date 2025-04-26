import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/CheckSheet",
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  return null;
};

// export const getListItem = async (pageNumber, pageSize) => {
//   try {
//     const res = await apiClient.get("/", {
//       params: {
//         pageNumber: pageNumber,
//         pageSize: pageSize,
//       },
//     });
//     return res.data.data;
//   } catch (error) {
//     return handleError(error);
//   }
// };

export const getListCheckSheet = async () => {
  try {
    const res = await apiClient.get("/");
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getCheckSheet = async (itemId) => {
  try {
    const res = await apiClient.get(`/${itemId}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const createCheckSheet = async (itemData) => {
  try {
    const res = await apiClient.post("/", itemData);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateCheckSheet = async (itemId, itemData) => {
  try {
    const res = await apiClient.put(`/${itemId}`, itemData);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateCancelFlagCS = async (itemId) => {
  try {
    await apiClient.put(`/${itemId}/cancel`);
    return true;
  } catch (error) {
    return handleError(error);
  }
};
