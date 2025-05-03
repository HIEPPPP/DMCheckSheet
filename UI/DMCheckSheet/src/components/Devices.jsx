import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Popover } from "@mui/material";
import { Html5QrcodeScanner } from "html5-qrcode";

import SearchBar from "./SearchBar";
import DeviceCard from "./DeviceCard";
import { QrCode } from "@mui/icons-material";
import { getListCheckSheetDevices } from "../services/checkSheetDeviceServices";
import DeviceDetail from "./DeviceDetail";
import { getResultBySheetDeviceToday } from "../services/checkResultServices";

function Device() {
  const [showScanner, setShowScanner] = useState(false);
  const [checkSheetDevices, setCheckSheetDevices] = useState([]);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleOpen = async (device, event) => {
    setAnchorEl(event.currentTarget);

    const today = new Date().toISOString().split("T")[0];

    try {
      const result = await getResultBySheetDeviceToday(
        device.deviceCode,
        device.sheetCode,
        today
      );
      // 3. gộp vào state
      setSelectedDevice({
        ...device,
        checkedBy: result?.checkedBy ? result.checkedBy : "",
        confirmedBy: result?.confirmedBy ? result.confirmedBy : "",
      });
    } catch (err) {
      console.error("Lỗi fetch result:", err);
      setSelectedDevice(device);
    }
  };

  const handleClose = () => {
    setSelectedDevice(null);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Load danh sách check-sheet frequency = 1
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getListCheckSheetDevices();
        if (res && Array.isArray(res)) {
          setCheckSheetDevices(res.filter((item) => item.frequency === 1));
        }
      } catch (err) {
        console.error("Lỗi fetch checkSheetDevices:", err);
      }
    }
    fetchData();
  }, []);

  // Xử lý sau khi quét được mã QR
  const handleScannedCode = useCallback(
    (decodedText) => {
      const parts = decodedText.split("-");
      if (parts.length !== 2) {
        alert("Mã QR không hợp lệ (phải có định dạng DEVICE-CHECKSHEET)");
        return;
      }
      const deviceCode = parts[0].trim();
      const sheetCode = parts[1].trim();
      if (!deviceCode || !sheetCode) {
        alert("Mã QR không hợp lệ");
        return;
      }
      const exists = checkSheetDevices.some(
        (item) => item.deviceCode === deviceCode && item.sheetCode === sheetCode
      );
      if (exists) {
        navigate(`/checkSheet/${decodedText}`);
      } else {
        alert("Không tìm thấy mã QR này");
      }
    },
    [checkSheetDevices, navigate]
  );

  // Khi showScanner = true thì khởi scanner
  useEffect(() => {
    if (!showScanner) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        handleScannedCode(decodedText);
        scanner.clear().catch(() => {});
        setShowScanner(false);
      },
      (error) => {
        console.warn("Scan error:", error);
      }
    );

    // cleanup khi component unmount hoặc tắt scanner
    return () => {
      scanner.clear().catch(() => {});
    };
  }, [showScanner, handleScannedCode]);

  return (
    <div>
      <div className="flex justify-end items-center gap-3">
        <SearchBar />
        <Button
          variant="outlined"
          color="info"
          onClick={() => setShowScanner(true)}
        >
          <QrCode className="mr-3" />
          <span className="font-bold text-3xl">CHECK</span>
        </Button>
      </div>

      {showScanner && (
        <div className="mt-5">
          <div
            id="qr-reader"
            style={{ width: "300px", height: "300px", margin: "auto" }}
          />
        </div>
      )}

      <div className="flex mt-10 gap-5 justify-center flex-wrap">
        {checkSheetDevices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onOpen={(device, e) => handleOpen(device, e)}
          />
        ))}
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {selectedDevice && <DeviceDetail device={selectedDevice} />}
      </Popover>
    </div>
  );
}

export default Device;
