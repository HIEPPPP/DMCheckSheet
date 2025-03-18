import React from "react";
import { useEffect } from "react";
import { getListDevice } from "../services/deviceServices";

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

  const [devices, setDevices] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListDevice();
      if (res) setDevices(res);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-end items-center">
        <SearchBar />
        <Button variant="contained">CHECK NOW</Button>
      </div>
      <div className="flex mt-10 gap-5 justify-center flex-wrap">
        {devices.map((device) => (
          <DeviceCard key={device.deviceId} device={device} />
        ))}
      </div>
    </div>
  );
};

export default Device;
