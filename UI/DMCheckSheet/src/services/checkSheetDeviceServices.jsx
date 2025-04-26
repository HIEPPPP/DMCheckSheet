import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/CheckSheetDevice",
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  return null;
};

const getListCheckSheetDevices = async () => {
  try {
    const res = await apiClient.get("/");
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

const getCheckSheetDeviceById = async (id) => {
  try {
    const res = await apiClient.get(`/${id}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

const getByDeviceAndCheckSheetCode = async (deviceCode, sheetCode) => {
  try {
    const res = await apiClient.get(`checkSheetItemList`, {
      params: {
        deviceCode: deviceCode,
        checkSheetCode: sheetCode,
      },
    });
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

const createCheckSheetDevice = async (data) => {
  try {
    const res = await apiClient.post("/", data);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

const updateCheckSheetDevice = async (id, data) => {
  try {
    const res = await apiClient.put(`/${id}`, data);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

const deleteCheckSheetDevice = async (id) => {
  try {
    const res = await apiClient.delete(`/${id}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export {
  getListCheckSheetDevices,
  getCheckSheetDeviceById,
  createCheckSheetDevice,
  updateCheckSheetDevice,
  deleteCheckSheetDevice,
  getByDeviceAndCheckSheetCode,
};
