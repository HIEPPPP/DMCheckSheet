import { Delete, Edit } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Pagination,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const DeviceTable = ({ devices = [], onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  // Lọc theo deviceCode hoặc deviceName
  const filteredDevices = devices.filter((device) =>
    `${device.deviceCode} ${device.deviceName}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  // Dữ liệu sau phân trang
  const paginatedDevices = filteredDevices.slice(
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
          sx={{ width: 120 }}
        >
          {[5, 10, 20, 50].map((option) => (
            <MenuItem key={option} value={option}>
              {option} dòng
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Bảng thiết bị */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell sx={{ fontWeight: 700 }}>STT</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Mã thiết bị</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tên Thiết Bị</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tần suất</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Vị trí</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDevices.map((device, index) => (
              <TableRow key={device.deviceId} className="hover:bg-gray-100">
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{device.deviceCode}</TableCell>
                <TableCell>{device.deviceName}</TableCell>
                <TableCell>{device.frequency}</TableCell>
                <TableCell>{device.location}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(device)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(device.deviceId)}
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
          count={Math.ceil(filteredDevices.length / rowsPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default DeviceTable;
