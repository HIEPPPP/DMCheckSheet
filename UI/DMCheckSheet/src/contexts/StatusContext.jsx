import React, { createContext, useContext, useEffect, useState } from "react";
import { getResultToDay } from "../services/checkResultServices";

const StatusContext = createContext({
  statusMap: {},
  refreshStatus: () => {},
});

export const StatusProvider = ({ children }) => {
  const [statusMap, setStatusMap] = useState({});

  const refreshStatus = async () => {
    try {
      // console.log("refreshStatus start");
      // 1) Lấy ngày hôm nay
      const today = new Date().toISOString().slice(0, 10);
      // 2) Gọi API trả về toàn bộ kết quả trong ngày
      const results = await getResultToDay(today);
      // 3) Group theo deviceCode–sheetCode
      const groups = results.reduce((acc, r) => {
        const key = `${r.deviceCode}-${r.sheetCode}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(r);
        return acc;
      }, {});
      // 4) Tính từng trạng thái
      const map = {};
      Object.entries(groups).forEach(([key, arr]) => {
        const values = arr.map((r) => r.value);
        const hasNG = values.includes("NG");
        const allOK = values.length > 0 && values.every((v) => v === "OK");
        const anyFilled = values.some((v) => v === "OK" || v === "NG");
        if (hasNG) {
          map[key] = "NG";
        } else if (allOK) {
          map[key] = "OK";
        } else if (!anyFilled) {
          map[key] = "Pending";
        } else {
          map[key] = "Checking";
        }
      });
      // 5) Với những device–sheet chưa bao giờ có record trong ngày, cũng đánh Pending
      //    (nếu có danh sách thiết bị cố định, có thể merge thêm bước này)
      // console.log("refreshStatus build map:", map);
      setStatusMap(map);
    } catch (err) {
      console.error("Không load được status:", err);
    }
  };

  // Chạy lần đầu và mỗi ngày (hoặc khi muốn refresh manual)
  useEffect(() => {
    refreshStatus();
  }, []);

  return (
    <StatusContext.Provider value={{ statusMap, refreshStatus }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
