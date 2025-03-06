import React from "react";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-xl font-bold">Header</h1>
        </nav>

        {/* Content */}
        <main className="flex-1 p-4 bg-gray-100 overflow-auto">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-3 text-center">
          &copy; 2025 Check Sheet Die Maintenance. Good Morning
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
