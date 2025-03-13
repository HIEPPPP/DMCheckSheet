import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiList,
  FiLogIn,
  FiSettings,
  FiUsers,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import logo from "../assets/img/settings.png"; // Kiểm tra lại đường dẫn
import { FcMultipleDevices } from "react-icons/fc";
import { TypeSpecimen, TypeSpecimenRounded } from "@mui/icons-material";
import { BsTypeBold } from "react-icons/bs";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isAdmin = true; // Giả định user là Admin (Thay đổi theo logic của bạn)

  const menuItems = [
    { name: "Devices", path: "/dashboard", icon: <FiHome size={22} /> },
    { name: "Check List", path: "/checklist", icon: <FiList size={22} /> },
    { name: "Login", path: "/login", icon: <FiLogIn size={22} /> },
  ];

  const adminItems = [
    { name: "User Management", path: "/users", icon: <FiUsers size={22} /> },
    {
      name: "Device",
      path: "/deviceMST",
      icon: <FcMultipleDevices size={22} />,
    },
    {
      name: "Device Type",
      path: "/deviceTypeMST",
      icon: <TypeSpecimenRounded size={22} />,
    },
    { name: "Settings", path: "/settings", icon: <FiSettings size={22} /> },
  ];

  return (
    <div className="relative flex">
      {/* Sidebar */}
      <div
        className={`h-screen bg-[#F5F5F5] text-[#333] transition-all duration-300 flex flex-col shadow-lg ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Logo + Title */}
        <div className="flex items-center p-4">
          <img
            src={logo}
            alt="Logo"
            className="w-8 h-8 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
          <span
            className={`text-xl font-bold ml-3 transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            Die Maintenance
          </span>
        </div>

        {/* Menu chính */}
        <ul className="mt-4 space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out ${
                    isActive
                      ? "bg-[#009DDC] text-white"
                      : "hover:bg-[#E0E0E0] text-[#333]"
                  }`
                }
              >
                <div className="w-10 flex justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <span
                  className={`ml-2 transition-all duration-300 overflow-hidden whitespace-nowrap ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Khoảng cách để tách phần Admin */}
        {isAdmin && (
          <>
            <hr className="my-4 mx-3 border-t border-gray-300" />{" "}
            {/* Đường kẻ */}
            <ul className="space-y-2">
              {adminItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out ${
                        isActive
                          ? "bg-[#009DDC] text-white"
                          : "hover:bg-[#E0E0E0] text-[#333]"
                      }`
                    }
                  >
                    <div className="w-10 flex justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <span
                      className={`ml-2 transition-all duration-300 overflow-hidden whitespace-nowrap ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {item.name}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
