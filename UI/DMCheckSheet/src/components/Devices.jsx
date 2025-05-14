import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Popover, Alert } from "@mui/material";
import { Html5Qrcode } from "html5-qrcode";
import SearchBar from "./SearchBar";
import DeviceCard from "./DeviceCard";
import DeviceDetail from "./DeviceDetail";
import {
  CheckBoxOutlineBlankRounded,
  CheckBoxRounded,
  QrCode,
  Close,
} from "@mui/icons-material";
import { getListCheckSheetDevices } from "../services/checkSheetDeviceServices";
import {
  getResultBySheetDeviceToday,
  getResultToDay,
} from "../services/checkResultServices";

function Device() {
  const [showScanner, setShowScanner] = useState(false);
  const [scannerError, setScannerError] = useState("");
  const [checkSheetDevices, setCheckSheetDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showConfirmer, setShowConfirmer] = useState(false);
  const [resultMap, setResultMap] = useState({});
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  // scan handler must be defined before starting scanner
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

  // Fetch devices
  useEffect(() => {
    (async () => {
      try {
        const res = await getListCheckSheetDevices();
        if (Array.isArray(res)) {
          setCheckSheetDevices(res.filter((item) => item.frequency === 1));
        }
      } catch (err) {
        console.error("Lỗi fetch checkSheetDevices:", err);
      }
    })();
  }, []);

  // Confirmer toggle
  useEffect(() => {
    if (!showConfirmer) {
      setResultMap({});
      return;
    }
    (async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const results = await getResultToDay(today);
        const map = {};
        results.forEach((r) => {
          map[`${r.deviceCode}-${r.sheetCode}`] = r.confirmedBy;
        });
        setResultMap(map);
      } catch (err) {
        console.error("Lỗi fetch results today:", err);
      }
    })();
  }, [showConfirmer]);

  // Filter devices by search
  const filteredDevices = checkSheetDevices.filter((device) => {
    const term = searchTerm.toLowerCase();
    return (
      device.deviceName?.toLowerCase().includes(term) ||
      device.deviceCode?.toLowerCase().includes(term) ||
      device.sheetCode?.toLowerCase().includes(term) ||
      device.sheetName?.toLowerCase().includes(term)
    );
  });

  // Open detail popover
  const handleOpen = async (device, event) => {
    setAnchorEl(event.currentTarget);
    const today = new Date().toISOString().split("T")[0];
    try {
      const result = await getResultBySheetDeviceToday(
        device.deviceCode,
        device.sheetCode,
        today
      );
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

  // Start/stop scanner
  const startScanner = useCallback(async () => {
    setScannerError("");
    const qrRegionId = "qr-reader";
    let html5Qrcode;
    try {
      html5Qrcode = new Html5Qrcode(qrRegionId);
      scannerRef.current = html5Qrcode;
    } catch (err) {
      console.error("Không thể tạo instance Html5Qrcode:", err);
      setScannerError(
        "Trình duyệt không hỗ trợ camera hoặc không thể khởi tạo scanner."
      );
      setShowScanner(false);
      return;
    }

    try {
      // Try environment facing camera
      await html5Qrcode.start(
        { facingMode: { exact: "environment" } },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          html5Qrcode.stop().catch(() => {});
          setShowScanner(false);
          handleScannedCode(decodedText);
        },
        (error) => {} // silent
      );
    } catch (err) {
      console.warn(
        "Không thể khởi động máy quét environment, thử fallback:",
        err
      );
      try {
        await html5Qrcode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            html5Qrcode.stop().catch(() => {});
            setShowScanner(false);
            handleScannedCode(decodedText);
          }
        );
      } catch (err2) {
        console.error("Không thể khởi động máy quét:", err2);
        setScannerError(
          "Không thể truy cập camera. Vui lòng kiểm tra quyền camera."
        );
        setShowScanner(false);
      }
    }
  }, [handleScannedCode]);

  useEffect(() => {
    if (showScanner) {
      startScanner();
    } else {
      try {
        scannerRef.current?.stop()?.catch(() => {});
      } catch {}
    }
  }, [showScanner, startScanner]);

  const handleToggleConfirm = async () => {
    const newState = !showConfirmer;
    setShowConfirmer(newState);
    try {
      const res = await getListCheckSheetDevices();
      if (!Array.isArray(res)) return;
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
    <div>
      <div className="flex justify-between gap-5 px-4">
        <div>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <div className="flex gap-2 mt-2 float-end items-center">
            <p className="text-gray-600 font-bold">Cần xác nhận</p>
            {showConfirmer ? (
              <CheckBoxRounded
                onClick={handleToggleConfirm}
                sx={{ fontSize: 35, color: "#2196F3" }}
              />
            ) : (
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
          onClick={() => {
            setScannerError("");
            setShowScanner((prev) => !prev);
          }}
          startIcon={<QrCode />}
        >
          <span className="font-bold text-xl">
            {showScanner ? "TẮT SCAN" : "CHECK"}
          </span>
        </Button>
      </div>

      {scannerError && (
        <div className="mt-4 px-4">
          <Alert severity="error" onClose={() => setScannerError("")}>
            {" "}
            {scannerError}{" "}
          </Alert>
        </div>
      )}

      {showScanner && !scannerError && (
        <div className="mt-5 relative">
          <div
            id="qr-reader"
            className="mx-auto"
            style={{ width: 300, height: 300 }}
          />
          <IconButton
            onClick={() => setShowScanner(false)}
            sx={{ position: "absolute", top: 0, right: "calc(50% - 150px)" }}
          >
            <Close />
          </IconButton>
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
