import React from "react";
import SearchBar from "./SearchBar";
import DeviceCard from "./DeviceCard";
import { Button } from "@mui/material";

const Device = () => {
  // Dữ liệu mẫu
  const sampleDevice = {
    code: "DEV12345",
    name: "Máy ép nhiệt",
    form: "F001",
  };

  return (
    <div>
      <div className="flex justify-end items-center">
        <SearchBar />
        <Button variant="contained">CHECK NOW</Button>
      </div>
      <div className="flex mt-10 gap-5 justify-center flex-wrap">
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
        <DeviceCard device={sampleDevice} />
      </div>
    </div>
  );
};

export default Device;
