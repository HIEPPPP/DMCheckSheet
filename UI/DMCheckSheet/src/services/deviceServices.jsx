import axios from "axios";

export const getListDevice = async () => {
  try {
    const res = await axios.get("http://localhost:5118/api/Device");
    return res.data;
  } catch (error) {
    console.log(
      "Lỗi khi lấy danh sách thiết bị",
      error.response?.data || error.message
    );
    return null;
  }
};

export const addDevice = async (deviceData) => {
  try {
    const response = await axios.post(API_URL, deviceData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm thiết bị:", error);
    throw error;
  }
};
