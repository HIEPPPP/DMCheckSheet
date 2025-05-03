// DeviceDetail.jsx
import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const DeviceDetail = ({ device }) => (
  <Box className="bg-white rounded-xl shadow-lg p-6 w-80">
    {/* Header */}
    <Box className="flex items-center mb-2">
      <Box className="flex-grow">
        <Typography variant="h6" className="font-bold text-gray-900">
          {device.formNO || device.deviceName}
        </Typography>
      </Box>
    </Box>

    {/* Divider */}
    <Divider className="border-gray-200 mb-2" />

    {/* Info Grid */}
    <Box className="grid grid-cols-2 gap-y-3 gap-x-4 mt-3">
      <Typography variant="subtitle2" className="text-gray-500">
        Mã thiết bị:
      </Typography>
      <Typography variant="body2" className="text-gray-800 font-medium">
        {device.deviceCode || "-"}
      </Typography>

      <Typography variant="subtitle2" className="text-gray-500">
        Tên thiết bị:
      </Typography>
      <Typography variant="body2" className="text-gray-800 font-medium">
        {device.deviceName || "-"}
      </Typography>

      <Typography variant="subtitle2" className="text-gray-500">
        Mã CheckSheet:
      </Typography>
      <Typography variant="body2" className="text-gray-800 font-medium">
        {device.sheetCode || "-"}
      </Typography>

      <Typography variant="subtitle2" className="text-gray-500">
        Tên CheckSheet:
      </Typography>
      <Typography variant="body2" className="text-gray-800 font-medium">
        {device.sheetName || "-"}
      </Typography>

      <Typography variant="subtitle2" className="text-gray-500">
        Vị trí:
      </Typography>
      <Typography variant="body2" className="text-gray-800 font-medium">
        {device.location || "-"}
      </Typography>

      <Typography variant="subtitle2" className="text-gray-500">
        Người kiểm tra:
      </Typography>
      <Typography variant="body2" className="text-gray-800 font-medium">
        {device.checkedBy || "-"}
      </Typography>

      <Typography variant="subtitle2" className="text-gray-500">
        Người xác nhận:
      </Typography>
      <Typography variant="body2" className="text-gray-800 font-medium">
        {device.confirmedBy || "-"}
      </Typography>
    </Box>
  </Box>
);

export default DeviceDetail;
