import { Delete, Edit, Info } from "@mui/icons-material";
import {
  Box,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
const CheckSheetDeviceTable = ({ checkSheetDevices, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  const filteredCheckSheetDevices = checkSheetDevices.filter(
    (checkSheetDevice) =>
      `${checkSheetDevice.sheetCode} ${checkSheetDevice.sheetName} ${checkSheetDevice.deviceCode} ${checkSheetDevice.deviceName}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );

  const paginatedCheckSheetDevices = filteredCheckSheetDevices.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      {/* Thanh tìm kiếm và chọn số dòng */}
      <Box className="flex justify-between flex-wrap gap-2 my-4">
        <TextField
          label="Tìm kiếm"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <TextField
          label="Số dòng/trang"
          select
          size="small"
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          sx={{ width: 150 }}
        >
          {[5, 10, 20, 50].map((option) => (
            <MenuItem key={option} value={option}>
              {option} dòng
            </MenuItem>
          ))}
        </TextField>
      </Box>
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
            {paginatedCheckSheetDevices.map((checkSheetDevice, index) => (
              <TableRow key={checkSheetDevice.id} className="hover:bg-gray-100">
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
      {/* Phân trang */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredCheckSheetDevices.length / rowsPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CheckSheetDeviceTable;
