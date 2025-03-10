import React from "react";
import SearchBar from "./SearchBar";
import DeviceCard from "./DeviceCard";

const Device = () => {
  // Dữ liệu mẫu
  const sampleDevice = {
    code: "DEV12345",
    name: "Máy ép nhiệt",
    form: "F001",
  };

  return (
    <div>
      <SearchBar />
      <div>
        <DeviceCard device={sampleDevice} />
      </div>
    </div>
  );
};

export default Device;
