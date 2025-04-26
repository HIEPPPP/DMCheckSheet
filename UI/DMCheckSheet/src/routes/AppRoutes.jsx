import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import Users from "../components/Admin/Users";
import DeviceMST from "../pages/DeviceMST";
import CheckSheetMST from "../pages/CheckSheetMST";
import CheckSheetItemMST from "../pages/CheckSheetItemMST";
import DeviceCheckSheetMST from "../pages/DeviceCheckSheetMST";
import CheckSheet from "../pages/CheckSheet";
import PrivateRoute from "./PrivateRoute";
import ResultAction from "../pages/ResultAction";
import CheckSheetContainer from "../pages/CheckSheetContainer";

const AppRoutes = () => (
  <Routes>
    {/* Routes có Sidebar - cần đăng nhập */}
    <Route
      element={
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      }
    >
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/deviceMST" element={<DeviceMST />} />
      <Route path="/checkSheetMST" element={<CheckSheetMST />} />
      <Route path="/checkSheetItemMST" element={<CheckSheetItemMST />} />
      <Route path="/deviceSheetMST" element={<DeviceCheckSheetMST />} />
      <Route path="/checkSheet/:code" element={<CheckSheet />} />
      <Route path="/resultAction" element={<ResultAction />} />
    </Route>

    {/* Route không cần login */}
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
