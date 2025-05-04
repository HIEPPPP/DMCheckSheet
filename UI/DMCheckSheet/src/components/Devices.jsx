// Device.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Popover } from "@mui/material";
import { Html5QrcodeScanner } from "html5-qrcode";

import SearchBar from "./SearchBar";
import DeviceCard from "./DeviceCard";
import DeviceDetail from "./DeviceDetail";
import { QrCode } from "@mui/icons-material";
import { getListCheckSheetDevices } from "../services/checkSheetDeviceServices";
import { getResultBySheetDeviceToday } from "../services/checkResultServices";

function Device() {
  const [showScanner, setShowScanner] = useState(false);
  const [checkSheetDevices, setCheckSheetDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const navigate = useNavigate();

  // Fetch devices
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getListCheckSheetDevices();
        if (Array.isArray(res)) {
          setCheckSheetDevices(res.filter((item) => item.frequency === 1));
        }
      } catch (err) {
        console.error("Lỗi fetch checkSheetDevices:", err);
      }
    }
    fetchData();
  }, []);

  // Filtered list based on search term
  const filteredDevices = checkSheetDevices.filter((device) => {
    const term = searchTerm.toLowerCase();
    return (
      device.deviceName?.toLowerCase().includes(term) ||
      device.deviceCode?.toLowerCase().includes(term) ||
      device.sheetCode?.toLowerCase().includes(term) ||
      device.sheetName?.toLowerCase().includes(term)
    );
  });

  // Open device detail
  const handleOpen = async (device, event) => {
    setAnchorEl(event.currentTarget);
    const today = new Date().toISOString().split("T")[0];

    try {
      const result = await getResultBySheetDeviceToday(
        device.deviceCode,
        device.sheetCode,
        today
      );
      console.log("Result:", result);

      setSelectedDevice({
        ...device,
        checkedBy: result?.checkedBy || "",
        confirmedBy: result?.confirmedBy || "",
      });
    } catch (err) {
      console.error("Lỗi fetch result:", err);
      setSelectedDevice(device);
    }
  };

  console.log("Selected device:", selectedDevice);

  const handleClose = () => {
    setSelectedDevice(null);
    setAnchorEl(null);
  };

  // QR scanner logic
  const handleScannedCode = useCallback(
    (decodedText) => {
      const parts = decodedText.split("-");
      if (parts.length !== 2) {
        alert("Mã QR không hợp lệ (phải có định dạng DEVICE-CHECKSHEET)");
        return;
      }
      const [deviceCode, sheetCode] = parts.map((p) => p.trim());
      const exists = checkSheetDevices.some(
        (item) => item.deviceCode === deviceCode && item.sheetCode === sheetCode
      );
      if (exists) navigate(`/checkSheet/${decodedText}`);
      else alert("Không tìm thấy mã QR này");
    },
    [checkSheetDevices, navigate]
  );

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
      (error) => console.warn("Scan error:", error)
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [showScanner, handleScannedCode]);

  return (
    <div>
      <div className="flex justify-between items-center gap-3">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
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
        {filteredDevices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onOpen={(d, e) => handleOpen(d, e)}
          />
        ))}
      </div>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        {selectedDevice && <DeviceDetail device={selectedDevice} />}
      </Popover>
    </div>
  );
}

export default Device;
