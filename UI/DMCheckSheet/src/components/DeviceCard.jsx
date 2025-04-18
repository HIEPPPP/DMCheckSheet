import { Button } from "@mui/material";
import React from "react";

const DeviceCard = ({ device, onOpen }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-50 border border-gray-200 flex flex-col">
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
        <div className="text-sm text-gray-500 mt-4">
          Trạng thái:
          <span className="p-2 bg-amber-500 rounded-2xl ml-3">Pending</span>
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
