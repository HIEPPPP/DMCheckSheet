// Device.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Popover } from "@mui/material";
import { Html5QrcodeScanner } from "html5-qrcode";

import SearchBar from "./SearchBar";
import DeviceCard from "./DeviceCard";
import DeviceDetail from "./DeviceDetail";
import {
  CheckBoxOutlineBlank,
  CheckBoxOutlineBlankRounded,
  CheckBoxRounded,
  QrCode,
  VisibilityOffTwoTone,
  VisibilityTwoTone,
} from "@mui/icons-material";
import { getListCheckSheetDevices } from "../services/checkSheetDeviceServices";
import {
  getResultBySheetDeviceToday,
  getResultToDay,
} from "../services/checkResultServices";

function Device() {
  const [showScanner, setShowScanner] = useState(false);
  const [checkSheetDevices, setCheckSheetDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const [showConfirmer, setShowConfirmer] = useState(false);
  const [resultMap, setResultMap] = useState({});
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

  useEffect(() => {
    if (!showConfirmer) {
      // khi tắt chế độ xem confirmer thì clear map
      setResultMap({});
      return;
    }
    async function fetchResultsToday() {
      try {
        const today = new Date().toISOString().split("T")[0];
        // Giả sử API này trả về mảng [{ deviceCode, sheetCode, confirmedBy, ... }]
        const results = await getResultToDay(today);
        const map = {};
        results.forEach((r) => {
          const key = `${r.deviceCode}-${r.sheetCode}`;
          map[key] = r.confirmedBy;
        });
        setResultMap(map);
      } catch (err) {
        console.error("Lỗi fetch results today:", err);
      }
    }
    fetchResultsToday();
  }, [showConfirmer]);

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

  const handleToggleConfirm = async () => {
    // newState là giá trị của showConfirmer sẽ được cập nhật
    const newState = !showConfirmer;
    setShowConfirmer(newState);

    try {
      const res = await getListCheckSheetDevices();
      if (!Array.isArray(res)) return;

      // Khi newState === true: chỉ lấy item.isConfirm === true
      // Khi newState === false: lấy tất cả (chỉ tách theo frequency)
      const filtered = res.filter(
        (item) =>
          item.frequency === 1 && (newState ? item.isConfirm === true : true)
      );

      setCheckSheetDevices(filtered);
    } catch (err) {
      console.error("Lỗi fetch checkSheetDevices:", err);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between gap-5 px-4">
        <div className="">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <div className="flex gap-2 mt-2 float-end items-center">
            <p className="text-gray-600 font-bold">Cần xác nhận</p>
            {showConfirmer ? (
              // <VisibilityTwoTone onClick={handleToggleConfirm} />
              <CheckBoxRounded
                onClick={handleToggleConfirm}
                sx={{ fontSize: 35, color: "#2196F3" }}
              />
            ) : (
              // <VisibilityOffTwoTone onClick={handleToggleConfirm} />
              <CheckBoxOutlineBlankRounded
                onClick={handleToggleConfirm}
                sx={{ fontSize: 35, color: "#2196F3" }}
              />
            )}
          </div>
        </div>
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
        {filteredDevices.map((device) => {
          const key = `${device.deviceCode}-${device.sheetCode}`;
          return (
            <DeviceCard
              key={device.id}
              device={device}
              showConfirmer={showConfirmer}
              confirmedBy={resultMap[key]}
              onOpen={(d, e) => handleOpen(d, e)}
            />
          );
        })}
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
