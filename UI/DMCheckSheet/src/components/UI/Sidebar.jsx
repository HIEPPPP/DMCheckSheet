import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiList,
  FiLogIn,
  FiSettings,
  FiUsers,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiKey,
  FiLogOut,
  FiUser,
  FiAirplay,
} from "react-icons/fi";

import { FcMultipleDevices } from "react-icons/fc";
import {
  Assignment,
  ContentPasteOutlined,
  DoneAllOutlined,
  OpenInFullOutlined,
  SdCardAlertOutlined,
  SourceOutlined,
  TypeSpecimen,
  TypeSpecimenRounded,
} from "@mui/icons-material";
import { BsFilePdf, BsTypeBold } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/img/settings.png";
import LogoutButton from "../LogoutButton";
import { getAuthData } from "../../services/authService";
import { jwtDecode } from "jwt-decode";
import { CgFileDocument } from "react-icons/cg";
import { AuthContext } from "../../contexts/AuthContext";
import { Avatar } from "@mui/material";

const Sidebar = () => {
  // const user = {
  //   name: "MR. HIEP",
  //   role: "Administrator",
  //   avatar: "https://i.pravatar.cc/40", // Ảnh đại diện ngẫu nhiên
  // };
  const user = useContext(AuthContext);
  const fullName = user.auth.fullName;
  const username = user.auth.username;
  const [isOpen, setIsOpen] = useState(true);

  const token = localStorage.getItem("token");

  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const userRole =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (Array.isArray(userRole)) {
        isAdmin = userRole.includes("Admin");
      } else {
        isAdmin = userRole === "Admin";
      }
    } catch (error) {
      console.error("Lỗi giải mã token:", error);
    }
  }

  const menuItems = [
    { name: "Daily Check", path: "/dashboard", icon: <FiHome size={22} /> },
    {
      name: "Usage Check",
      path: "/deviceNeeded",
      icon: <CgFileDocument size={22} />,
    },
    { name: "PDF", path: "/pdf", icon: <BsFilePdf size={22} /> },
    {
      name: "NG Update",
      path: "/resultAction",
      icon: <SdCardAlertOutlined size={22} />,
    },
    { name: "User", path: "/user", icon: <FiUser size={22} /> },
  ];

  const adminItems = [
    {
      name: "Device - Sheet",
      path: "/deviceSheetMST",
      icon: <OpenInFullOutlined size={22} />,
    },
    {
      name: "Device",
      path: "/deviceMST",
      icon: <FcMultipleDevices size={22} />,
    },
    {
      name: "Check Sheet",
      path: "/checkSheetMST",
      icon: <ContentPasteOutlined size={22} />,
      // icon: <TypeSpecimenRounded size={22} />,
    },
    {
      name: "Content",
      path: "/checkSheetItemMST",
      icon: <SourceOutlined size={22} />,
    },
    {
      name: "Result",
      path: "/checkListItemMST",
      icon: <DoneAllOutlined size={22} />,
    },
    // { name: "Settings", path: "/settings", icon: <FiSettings size={22} /> },
    { name: "User Management", path: "/users", icon: <FiUsers size={22} /> },
  ];

  const handleToggleSidebar = () => {};
  return (
    <div className="relative flex">
      {/* Sidebar */}
      <div
        className={`h-screen bg-[#F5F5F5] text-[#333] transition-all duration-200 flex flex-col shadow-lg ${
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
        {/* User Info + Logout */}
        <div className="mt-auto px-1 py-4 bg-[#F5F5F5] flex justify-center items-center rounded-lg mx-3">
          {isOpen && (
            <div className="flex items-center">
              <Avatar
                sx={{ bgcolor: "primary.main" }}
                className="w-10 h-10 rounded-full mr-2"
              >
                {fullName?.charAt(0).toUpperCase()}
              </Avatar>
              <div className="ml-3">
                <p className="font-semibold">{fullName}</p>
                <p className="text-sm text-gray-500">{username}</p>
              </div>
            </div>
          )}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
