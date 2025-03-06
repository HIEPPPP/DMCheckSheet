import { useState, useEffect } from "react";
import { FaBars, FaHome, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024); // Tablet < 1024px

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Trang chủ", icon: <FaHome />, path: "/" },
    { name: "Check thiết bị", icon: <FaClipboardList />, path: "/checklist" },
    { name: "Đăng xuất", icon: <FaSignOutAlt />, path: "/logout" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 p-5 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } ${isTablet ? "absolute z-50" : ""}`}
    >
      <button onClick={toggleSidebar} className="text-white text-2xl mb-5">
        <FaBars />
      </button>
      {/* Danh sách Menu */}
      <nav className="flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-4 text-white p-2 rounded-md hover:bg-gray-700"
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
