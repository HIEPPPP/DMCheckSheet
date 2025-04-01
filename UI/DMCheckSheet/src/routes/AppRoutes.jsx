import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import Users from "../components/Admin/Users";
import DeviceMST from "../pages/DeviceMST";
import CheckSheetMST from "../pages/CheckSheetMST";
import CheckSheetItemMST from "../pages/CheckSheetItemMST";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Routes có Sidebar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/deviceMST" element={<DeviceMST />} />
        <Route path="/checkSheetMST" element={<CheckSheetMST />} />
        <Route path="/checkSheetItemMST" element={<CheckSheetItemMST />} />
      </Route>

      {/* Routes không có Sidebar */}
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
