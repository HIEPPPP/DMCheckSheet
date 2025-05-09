import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value, onChange }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Tìm kiếm thiết bị..."
        className="w-[380px] py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700"
        onChange={handleInputChange}
        value={value}
      />
      <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
    </div>
  );
};

export default SearchBar;
