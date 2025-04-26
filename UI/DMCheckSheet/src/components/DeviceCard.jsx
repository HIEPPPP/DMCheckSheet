import React from "react";
import { Button } from "@mui/material";
import { useStatus } from "../contexts/StatusContext";

const styleMap = {
  OK: { color: "bg-green-500", anim: "animate-pulse", icon: null },
  NG: { color: "bg-red-500", anim: "animate-ping", icon: null },
  Checking: {
    color: "bg-indigo-500",
    anim: "",
    icon: (
      <svg
        className="mr-2 inline-block h-5 w-5 text-white animate-spin"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    ),
  },
  Pending: { color: "bg-amber-500", anim: "animate-bounce", icon: null },
};

const DeviceCard = ({ device, onOpen }) => {
  const { statusMap } = useStatus();
  const key = `${device.deviceCode}-${device.sheetCode}`;
  const status = statusMap[key] || "Pending";

  const { color, anim, icon } = styleMap[status];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-60 border border-gray-200 flex flex-col">
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">
          {device.deviceName}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Mã thiết bị: {device.deviceCode}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Mã CheckSheet: {device.sheetCode}
        </p>
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-600">
            Vị trí:{" "}
            <span className="font-semibold text-blue-600">
              {device.location}
            </span>
          </p>
        </div>

        <div className="text-sm text-gray-500 mt-4 flex items-center">
          <span>Trạng thái:</span>
          <span
            className={`
              inline-flex items-center justify-center
              p-2 rounded-2xl ml-3 text-white
              ${color} ${anim}
            `}
          >
            {icon}
            <span>{status}</span>
          </span>
        </div>
      </div>

      <div className="mt-6">
        <Button
          className="w-full"
          variant="contained"
          onClick={() => onOpen(device)}
        >
          Chi tiết
        </Button>
      </div>
    </div>
  );
};

export default DeviceCard;
