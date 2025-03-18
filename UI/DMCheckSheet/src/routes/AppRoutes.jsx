import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import CheckListItem from "../pages/CheckListItem";
import MainLayout from "../layouts/MainLayout";
import Users from "../components/Admin/Users";
import DeviceTypeMST from "../components/Admin/DeviceTypeMST";
import DeviceMST from "../components/Admin/DeviceMST";
import CheckListItemMST from "../components/Admin/CheckListItemMST";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Routes có Sidebar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checklist" element={<CheckListItem />} />
        <Route path="/users" element={<Users />} />
        <Route path="/deviceMST" element={<DeviceMST />} />
        <Route path="/deviceTypeMST" element={<DeviceTypeMST />} />
        <Route path="/checkListItemMST" element={<CheckListItemMST />} />
      </Route>

      {/* Routes không có Sidebar */}
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
