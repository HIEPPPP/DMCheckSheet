import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/UI/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F5F5] text-[#333] ">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
