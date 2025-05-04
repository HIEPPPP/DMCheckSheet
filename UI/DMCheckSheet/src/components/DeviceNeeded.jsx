import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getListCheckSheetDevices } from "../services/checkSheetDeviceServices";
import DeviceCardNeeded from "./DeviceCardNeeded";
import { useNavigate } from "react-router-dom";

const DeviceNeeded = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [checkSheetDevices, setCheckSheetDevices] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getListCheckSheetDevices();
        if (Array.isArray(res)) {
          setCheckSheetDevices(res.filter((item) => item.frequency !== 1));
        }
      } catch (err) {
        console.error("Lỗi fetch checkSheetDevices:", err);
      }
    };
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

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpen = (device, event) => {
    const deviceCode = device.deviceCode;
    const sheetCode = device.sheetCode;

    console.log(deviceCode, sheetCode);

    if (deviceCode.trim() && sheetCode.trim()) {
      const exists = checkSheetDevices.some(
        (item) => item.sheetCode === sheetCode && item.deviceCode === deviceCode
      );
      exists
        ? navigate(`/checkSheet/${deviceCode}-${sheetCode}`)
        : alert("Không tìm thấy mã QR này");
    } else {
      alert("Vui lòng nhập mã QR hợp lệ");
    }
  };

  return (
    <>
      <div className="relative w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Tìm kiếm thiết bị..."
          className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700"
          onChange={handleInputChange}
          value={searchTerm}
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
      </div>

      <div className="flex mt-10 gap-5 justify-center flex-wrap">
        {filteredDevices.map((device) => (
          <DeviceCardNeeded
            key={device.id}
            device={device}
            onOpen={(d, e) => handleOpen(d, e)}
          />
        ))}
      </div>
    </>
  );
};

export default DeviceNeeded;
