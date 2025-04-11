import { Delete, Edit, Info } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const CheckSheetDeviceTable = ({ checkSheetDevices, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} className="mt-4">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-200">
            <TableCell sx={{ fontWeight: 700 }}>STT</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Mã Check Sheet</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Tên Check Sheet</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Mã thiết bị</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Tên thiết bị</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(checkSheetDevices ?? []).map((checkSheetDevice, index) => (
            <TableRow key={checkSheetDevice.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{checkSheetDevice.sheetCode}</TableCell>
              <TableCell>{checkSheetDevice.sheetName}</TableCell>
              <TableCell>{checkSheetDevice.deviceCode}</TableCell>
              <TableCell>{checkSheetDevice.deviceName}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => onEdit(checkSheetDevice)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDelete(checkSheetDevice.id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CheckSheetDeviceTable;
