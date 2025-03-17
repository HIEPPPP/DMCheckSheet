import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5118/api/Device",
  headers: {
    "Content-Type": "application/json",
  },
});

// Xử lý lỗi chung
const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  return null;
};

// Lấy danh sách thiết bị
export const getListDevice = async () => {
  try {
    const res = await apiClient.get("/");
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

// Lấy thiết bị theo ID
export const getDeviceById = async (deviceId) => {
  try {
    const res = await apiClient.get(`/${deviceId}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

// Tạo mới thiết bị
export const createDevice = async (deviceData) => {
  try {
    const res = await apiClient.post("/", deviceData);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

// Cập nhật thiết bị
export const updateDevice = async (deviceId, deviceData) => {
  try {
    const res = await apiClient.put(`/${deviceId}`, deviceData);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

// Xóa thiết bị
export const deleteDevice = async (deviceId) => {
  try {
    await apiClient.delete(`/${deviceId}`);
    return true;
  } catch (error) {
    return handleError(error);
  }
};
