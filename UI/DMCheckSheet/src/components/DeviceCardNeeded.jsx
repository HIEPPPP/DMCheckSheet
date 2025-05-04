import React from "react";

import { Button } from "@mui/material";
import { FcMultipleDevices } from "react-icons/fc";

const DeviceCardNeeded = ({ device, onOpen }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 w-72 border border-gray-200 flex flex-col transition-transform hover:scale-[1.02] hover:shadow-xl duration-200">
      <div className="flex-grow">
        <h2 className="text-xl font-bold text-gray-800">{device.sheetName}</h2>
        <h2 className="text-base font-bold text-gray-500 mt-2 flex gap-2">
          <span>
            <FcMultipleDevices size={20} />
          </span>{" "}
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
          Check now
        </Button>
      </div>
    </div>
  );
};

export default DeviceCardNeeded;
