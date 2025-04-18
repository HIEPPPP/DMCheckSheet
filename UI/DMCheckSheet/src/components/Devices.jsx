import React, { useEffect, useState } from "react";
import { getListDevice } from "../services/deviceServices";
import { useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar";
import DeviceCard from "./DeviceCard";
import { Button, TextField } from "@mui/material";
import { getListCheckSheetDevices } from "../services/checkSheetDeviceServices";
import { QrCode } from "@mui/icons-material";

const Device = () => {
  const [devices, setDevices] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [sheetCodeInput, setSheetCodeInput] = useState("");
  const [checkSheetDevices, setCheckSheetDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeviceAndSheetCode = async () => {
      const res = await getListCheckSheetDevices();
      if (!res) {
        console.error("Không tìm thấy dữ liệu cho mã qrData");
        return;
      }
      const deviceCheckDaily = res.filter((item) => item.frequency === 1);
      setCheckSheetDevices(deviceCheckDaily);
    };

    fetchDeviceAndSheetCode();
  }, []);

  const handleCheckNowClick = () => {
    setShowScanner(true);
  };

  const handleSubmitSheetCode = () => {
    if (sheetCodeInput.trim()) {
      const parts = sheetCodeInput.split("-");
      if (parts.length !== 2) {
        alert("Vui lòng nhập mã QR hợp lệ (định dạng DEVICE-CHECKSHEET)");
        return;
      }
      const [deviceCode, checkSheetCode] = parts;

      if (deviceCode.trim() && checkSheetCode.trim()) {
        const exists = checkSheetDevices.some(
          (item) =>
            item.sheetCode === checkSheetCode && item.deviceCode === deviceCode
        );
        exists
          ? navigate(`/checkSheet/${sheetCodeInput}`)
          : alert("Không tìm thấy mã QR này");
      } else {
        alert("Vui lòng nhập mã QR hợp lệ");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center gap-3">
        <SearchBar />
        <Button variant="outlined" onClick={handleCheckNowClick} color="info">
          <QrCode className="mr-3" />
          <p className="font-bold text-3xl">CHECK</p>
        </Button>
      </div>

      {showScanner && (
        <div className="mt-5 flex items-center gap-3">
          {/* Thay thế bằng component quét QR */}
          <TextField
            label="Nhập mã SheetCode"
            value={sheetCodeInput.toUpperCase()}
            onChange={(e) => setSheetCodeInput(e.target.value)}
          />
          <Button variant="outlined" onClick={handleSubmitSheetCode}>
            Gửi
          </Button>
        </div>
      )}

      <div className="flex mt-10 gap-5 justify-center flex-wrap">
        {checkSheetDevices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
};

export default Device;
