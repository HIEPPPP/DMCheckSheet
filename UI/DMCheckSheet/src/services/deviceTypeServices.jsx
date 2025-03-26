import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5118/api/checkSheet",
  headers: {
    "Content-Type": "application/json",
  },
});

// Xử lý lỗi chung
const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  return null;
};

// Lấy danh sách loại thiết bị
export const getListCheckSheet = async () => {
  try {
    const res = await apiClient.get("/");
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

// Tạo mới loại thiết bị
export const createDeviceType = async (typeData) => {
  try {
    const res = await apiClient.post("/", typeData);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

// Cập nhật loại thiết bị
export const updateDeviceType = async (typeId, typeData) => {
  try {
    const res = await apiClient.put(`/${typeId}`, typeData);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

// Xóa loại thiết bị
export const deleteDeviceType = async (typeId) => {
  try {
    await apiClient.delete(`/${typeId}`);
    return true;
  } catch (error) {
    return handleError(error);
  }
};
