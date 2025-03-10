import React from "react";

const DeviceCard = ({ device }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-50 border border-gray-200">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800">{device.name}</h2>
      <p className="text-sm text-gray-500">Mã thiết bị: {device.code}</p>

      <div className="mt-3">
        <p className="text-sm font-medium text-gray-600">
          Số Form:{" "}
          <span className="font-semibold text-blue-600">{device.form}</span>
        </p>
      </div>

      <div className="mt-4 flex justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          FDF
        </button>
      </div>
    </div>
  );
};

export default DeviceCard;
