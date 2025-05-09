import axios from "axios";

// Khóa lưu trữ trong localStorage
export const TOKEN_KEY = "token";
export const USERNAME_KEY = "username";
export const FULLNAME_KEY = "fullName";
export const ROLES_KEY = "roles";

export const saveAuthData = ({ token, username, fullName, roles }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(FULLNAME_KEY, fullName);
  localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
};

export const getAuthData = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  const username = localStorage.getItem(USERNAME_KEY);
  const fullName = localStorage.getItem(FULLNAME_KEY);
  const roles = JSON.parse(localStorage.getItem(ROLES_KEY));
  return { token, username, fullName, roles };
};

export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(FULLNAME_KEY);
  localStorage.removeItem(ROLES_KEY);
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/Auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor để tự động thêm Authorization header nếu có token
apiClient.interceptors.request.use((config) => {
  const auth = getAuthData();
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

// Xử lý lỗi chung
const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  return null;
};

export const login = async (userName, password) => {
  try {
    const res = await apiClient.post("/login", { userName, password });
    const { token, username, fullName, roles } = res.data;
    // Lưu các giá trị vào localStorage qua hàm tiện ích
    saveAuthData({ token, username, fullName, roles });
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const register = async (user) => {
  try {
    const res = await apiClient.post("/register", user);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const res = await apiClient.post("/change-password", {
      oldPassword,
      newPassword,
    });
    return res.data; // { message: "Đổi mật khẩu thành công!" }
  } catch (error) {
    console.error(
      "Change Password Error:",
      error.response?.data || error.message
    );
    return null;
  }
};
