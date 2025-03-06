import axios from "axios";

export const login = async (username, password) => {
  try {
    const res = await axios.post("http://localhost:5118/api/Auth", {
      username,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.response?.data || error.message);
    return null;
  }
};
