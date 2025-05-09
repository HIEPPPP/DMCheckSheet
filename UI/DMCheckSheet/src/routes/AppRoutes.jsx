import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import Users from "../pages/Users";
import DeviceMST from "../pages/DeviceMST";
import CheckSheetMST from "../pages/CheckSheetMST";
import CheckSheetItemMST from "../pages/CheckSheetItemMST";
import DeviceCheckSheetMST from "../pages/DeviceCheckSheetMST";
import CheckSheet from "../pages/CheckSheet";
import PrivateRoute from "./PrivateRoute";
import ResultAction from "../pages/ResultAction";
import User from "../pages/User";
import DeviceNeeded from "../components/DeviceNeeded";
import PDFContainer from "../pages/PDFContainer";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { StatusProvider } from "../contexts/StatusContext";
import { Navigate } from "react-router-dom";
import Approve from "../pages/Approve";
import CheckSheetUsage from "../pages/CheckSheetUsage";

const AppRoutes = () => {
  const { auth } = useContext(AuthContext);
  const isAuthenticated = Boolean(auth && auth.token);

  // Nếu chưa đăng nhập, chỉ render trang Login và redirect tất cả về trang /login
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Nếu đã đăng nhập, bọc StatusProvider quanh các route private
  return (
    <StatusProvider>
      <Routes>
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deviceNeeded" element={<DeviceNeeded />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user" element={<User />} />
          <Route path="/deviceMST" element={<DeviceMST />} />
          <Route path="/checkSheetMST" element={<CheckSheetMST />} />
          <Route path="/checkSheetItemMST" element={<CheckSheetItemMST />} />
          <Route path="/deviceSheetMST" element={<DeviceCheckSheetMST />} />
          <Route path="/checkSheet/:code" element={<CheckSheet />} />
          <Route path="/checkSheetUsage/:code" element={<CheckSheetUsage />} />
          <Route path="/resultAction" element={<ResultAction />} />
          <Route path="/pdf" element={<PDFContainer />} />
          <Route path="/approve" element={<Approve />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </StatusProvider>
  );
};

export default AppRoutes;
