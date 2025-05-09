import React, { useState } from "react";
import { useStatus } from "../contexts/StatusContext";
import { Button } from "@mui/material";

const styleMap = {
  OK: { color: "bg-green-500", anim: "animate-pulse", icon: null },
  NG: { color: "bg-red-500", anim: "animate-ping", icon: null },
  Checking: {
    color: "bg-indigo-500",
    anim: "",
    icon: (
      <svg
        className="mr-2 inline-block h-4 w-4 text-white animate-spin"
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

const DeviceCard = ({ device, onOpen, showConfirmer, confirmedBy }) => {
  const { statusMap } = useStatus();
  const key = `${device.deviceCode}-${device.sheetCode}`;
  const status = statusMap[key] || "Pending";

  const { color, anim, icon } = styleMap[status];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 w-72 border border-gray-200 flex flex-col transition-transform hover:scale-[1.02] hover:shadow-xl duration-200">
      <div className="flex-grow">
        <h2 className="text-base font-bold text-gray-800">
          {device.deviceName}
        </h2>
        <div className="text-sm text-gray-500 mt-3 space-y-1">
          <p>
            <span className="font-medium text-gray-700">Mã thiết bị:</span>{" "}
            {device.deviceCode}
          </p>
          <p>
            <span className="font-medium text-gray-700">Mã CheckSheet:</span>{" "}
            {device.sheetCode}
          </p>
          <p>
            <span className="font-medium text-gray-700">Vị trí:</span>{" "}
            <span className="font-semibold text-blue-600">
              {device.location}
            </span>
          </p>
          {showConfirmer && confirmedBy && (
            <p>
              <span className="font-medium text-gray-700">Người xác nhận:</span>{" "}
              <span className="font-semibold text-green-600">
                {confirmedBy}
              </span>
            </p>
          )}
        </div>

        <div className="text-sm text-gray-600 mt-5 flex items-center">
          <span className="font-semibold">Trạng thái:</span>
          <span
            className={`ml-3 inline-flex items-center px-3 py-2 rounded-full text-white text-sm font-medium ${color} ${anim}`}
          >
            {icon}
            <span>{status}</span>
          </span>
        </div>
      </div>

      <div className="mt-6">
        <Button
          fullWidth
          variant="contained"
          onClick={(e) => onOpen(device, e)}
          sx={{
            borderRadius: "9999px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
            py: 1,
            boxShadow: "none",
            backgroundColor: "#3b82f6",
            "&:hover": {
              backgroundColor: "#2563eb",
              boxShadow: "none",
            },
          }}
        >
          Chi tiết
        </Button>
      </div>
    </div>
  );
};

export default DeviceCard;
