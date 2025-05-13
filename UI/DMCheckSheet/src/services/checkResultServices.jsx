import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/CheckResult",
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

export const getResultsBySheetAndDate = async (
  sheetCode,
  deviceCode,
  today
) => {
  try {
    const res = await apiClient.get(
      `/bySheetAndDate?sheetCode=${sheetCode}&deviceCode=${deviceCode}&today=${today}`
    );
    return res.data.data ?? [];
  } catch (error) {
    return handleError(error);
  }
};

export const getResultBySheetDeviceToday = async (
  deviceCode,
  sheetCode,
  today
) => {
  try {
    const res = await apiClient.get(
      `/bySheetDeviceToday?deviceCode=${deviceCode}&sheetCode=${sheetCode}&today=${today}`
    );
    return res.data.data ?? [];
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

export const getResultToDay = async (today) => {
  try {
    const res = await apiClient.get(`/today?today=${today}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const createResults = async (data) => {
  try {
    const res = await apiClient.post("/", data);
    return res.data.data ?? [];
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

export const getResultByResultId = async (resultId) => {
  try {
    const res = await apiClient.get(`/${resultId}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const confirmResult = async (data) => {
  try {
    const res = await apiClient.put("/confirm", data);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const approveResult = async (sheetCode, deviceCode, month, username) => {
  try {
    const res = await apiClient.put(
      `/approve?sheetCode=${sheetCode}&deviceCode=${deviceCode}&month=${month}&username=${username}`
    );
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const confirmedMonthResult = async (
  sheetCode,
  deviceCode,
  month,
  username
) => {
  try {
    const res = await apiClient.put(
      `/confirmedMonth?sheetCode=${sheetCode}&deviceCode=${deviceCode}&month=${month}&username=${username}`
    );
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateConfirmNG = async (resultId, data) => {
  try {
    const res = await apiClient.put(`/${resultId}/updateIsConfirmNG`, data);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getCheckSheetRows = async (sheetCode, deviceCode, monthref) => {
  try {
    const res = await apiClient.get(
      `/checkSheetRow?sheetCode=${sheetCode}&deviceCode=${deviceCode}&monthRef=${monthref}`
    );
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getApprovedByMonth = async (sheetCode, deviceCode, month) => {
  try {
    const res = await apiClient.get(
      `/approvedByMonth?sheetCode=${sheetCode}&deviceCode=${deviceCode}&month=${month}`
    );
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getConfirmedByMonth = async (sheetCode, deviceCode, month) => {
  try {
    const res = await apiClient.get(
      `/confirmedByMonth?sheetCode=${sheetCode}&deviceCode=${deviceCode}&month=${month}`
    );
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getListResultApprovedConfirmedMonth = async (month) => {
  try {
    const res = await apiClient.get(`/approvedConfirmedMonth?month=${month}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getCheckSheetCols = async (sheetCode, deviceCode, month) => {
  try {
    const res = await apiClient.get(
      `/checkSheetCol?sheetCode=${sheetCode}&deviceCode=${deviceCode}&month=${month}`
    );
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getCheckSheetColsTop10 = async (sheetCode, deviceCode) => {
  try {
    const res = await apiClient.get(
      `/checkSheetColTop10?sheetCode=${sheetCode}&deviceCode=${deviceCode}`
    );
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
};
