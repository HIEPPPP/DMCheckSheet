import React from "react";

const DeviceCard = ({ device }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-50 border border-gray-200 flex flex-col">
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">
          {device.deviceName}
        </h2>
        <p className="text-sm text-gray-500">
          Mã thiết bị: {device.deviceCode}
        </p>

        <div className="mt-3">
          <p className="text-sm font-medium text-gray-600">
            Số Form:{" "}
            <span className="font-semibold text-blue-600">{device.formNO}</span>
          </p>
        </div>
      </div>

      <div className="mt-4">
        <button className="bg-blue-500 text-[14px] text-white rounded-xl w-full p-2 hover:bg-blue-600 transition">
          Check now
        </button>
      </div>
    </div>
  );
};

export default DeviceCard;
