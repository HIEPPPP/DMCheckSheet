import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Tìm kiếm theo tên thiết bị..."
        className="w-full  py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={18} />
    </div>
  );
};

export default SearchBar;
