import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar";
import DeviceCard from "./DeviceCard";
import { Button } from "@mui/material";
import { QrCode } from "@mui/icons-material";
import { getListCheckSheetDevices } from "../services/checkSheetDeviceServices";
import { Html5Qrcode } from "html5-qrcode";

function Device() {
  const [showScanner, setShowScanner] = useState(false);
  const [checkSheetDevices, setCheckSheetDevices] = useState([]);
  const qrCodeRef = useRef(null);
  const navigate = useNavigate();

  // Load danh sách check-sheet frequency = 1
  useEffect(() => {
    (async () => {
      try {
        const res = await getListCheckSheetDevices();
        if (Array.isArray(res)) {
          setCheckSheetDevices(res.filter((i) => i.frequency === 1));
        }
      } catch (e) {
        console.error("Lỗi fetch checkSheetDevices:", e);
      }
    })();
  }, []);

  // Xử lý khi quét thành công
  const handleScannedCode = useCallback(
    (decodedText) => {
      const [deviceCode = "", sheetCode = ""] = decodedText
        .split("-")
        .map((s) => s.trim());
      if (!deviceCode || !sheetCode) {
        alert("Mã QR không hợp lệ (phải có định dạng DEVICE-CHECKSHEET)");
      } else {
        const exists = checkSheetDevices.some(
          (it) => it.deviceCode === deviceCode && it.sheetCode === sheetCode
        );
        if (exists) {
          navigate(`/checkSheet/${decodedText}`);
        } else {
          alert("Không tìm thấy mã QR này");
        }
      }
    },
    [checkSheetDevices, navigate]
  );

  // Khi showScanner = true => start camera
  useEffect(() => {
    if (!showScanner) return;

    // 1) Feature-detect
    if (
      !navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== "function"
    ) {
      alert("Trình duyệt của bạn không hỗ trợ truy cập camera.");
      setShowScanner(false);
      return;
    }

    const regionId = "qr-reader";
    // cleanup instance cũ nếu có
    if (qrCodeRef.current) {
      qrCodeRef.current
        .stop()
        .catch(() => {})
        .finally(() => {
          qrCodeRef.current = null;
        });
    }

    const html5QrCode = new Html5Qrcode(regionId);
    qrCodeRef.current = html5QrCode;
    const config = { fps: 10, qrbox: 250 };

    html5QrCode
      .start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          handleScannedCode(decodedText);
          html5QrCode
            .stop()
            .catch((e) => console.error("Stop error:", e))
            .finally(() => setShowScanner(false));
        },
        (err) => {
          // chỉ log để debug, không show alert cho mỗi lỗi nhỏ
          console.warn("Scan warning:", err);
        }
      )
      .catch((err) => {
        // Log chi tiết để bạn inspect trong DevTools
        console.error("HTML5Qrcode.start() error:", err);
        // Build message hiển thị
        let msg = "";
        if (err && typeof err === "object") {
          msg = err.message || err.name || JSON.stringify(err);
        } else {
          msg = String(err);
        }
        alert("Không thể truy cập camera: " + msg);
        setShowScanner(false);
      });

    // Cleanup khi unmount hoặc tắt scanner
    return () => {
      if (qrCodeRef.current) {
        qrCodeRef.current.stop().catch((e) => {
          console.error("Cleanup stop error:", e);
        });
        qrCodeRef.current = null;
      }
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
            style={{ width: 300, height: 300, margin: "auto" }}
          />
        </div>
      )}

      <div className="flex mt-10 gap-5 justify-center flex-wrap">
        {checkSheetDevices.map((dev) => (
          <DeviceCard key={dev.id} device={dev} />
        ))}
      </div>
    </div>
  );
}

export default Device;
