import React, { useEffect, useState } from "react";
import { getListDevice } from "../services/deviceServices";
import { useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar";
import DeviceCard from "./DeviceCard";
import { Button, TextField } from "@mui/material";

const Device = () => {
  const [devices, setDevices] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [sheetCodeInput, setSheetCodeInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListDevice();
      if (res) setDevices(res);
    };
    fetchData();
  }, []);

  const handleCheckNowClick = () => {
    setShowScanner(true);
  };

  const handleSubmitSheetCode = () => {
    if (sheetCodeInput.trim()) {
      navigate(`/checkSheet/${sheetCodeInput}`);
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center gap-3">
        <SearchBar />
        <Button variant="contained" onClick={handleCheckNowClick}>
          CHECK NOW
        </Button>
      </div>

      {showScanner && (
        <div className="mt-5 flex items-center gap-3">
          {/* Thay thế bằng component quét QR nếu có */}
          <TextField
            label="Nhập mã SheetCode"
            value={sheetCodeInput}
            onChange={(e) => setSheetCodeInput(e.target.value)}
          />
          <Button variant="outlined" onClick={handleSubmitSheetCode}>
            Gửi
          </Button>
        </div>
      )}

      <div className="flex mt-10 gap-5 justify-center flex-wrap">
        {devices.map((device) => (
          <DeviceCard key={device.deviceId} device={device} />
        ))}
      </div>
    </div>
  );
};

export default Device;
