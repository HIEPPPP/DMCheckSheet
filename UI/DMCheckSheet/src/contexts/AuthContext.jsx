import React, { createContext, useState, useEffect } from "react";
import { getAuthData, clearAuthData } from "../services/authService";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Lấy auth ban đầu từ localStorage (có thể là null hoặc object chứa token,...)
  const [auth, setAuth] = useState(getAuthData());

  const loginUser = (data) => {
    setAuth(data);
  };

  const logoutUser = () => {
    setAuth(null);
    clearAuthData();
  };

  // Kiểm tra token hết hạn mỗi khi auth thay đổi
  useEffect(() => {
    if (auth && auth.token) {
      try {
        const decoded = jwtDecode(auth.token);
        // decoded.exp là thời gian hết hạn tính theo giây, chuyển sang mili giây để so sánh
        if (decoded.exp * 1000 < Date.now()) {
          console.warn("Token đã hết hạn, tự động đăng xuất.");
          logoutUser();
        }
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
        logoutUser();
      }
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
