import { Delete, Edit, Info } from "@mui/icons-material";
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

const DeviceTable = ({ devices, onEdit, onDelete }) => {
  const [flatRows, setFlatRows] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  // Lọc dữ liệu theo tìm kiếm
  const filteredRows = flatRows.filter((row) =>
    row.deviceCode.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Sự kiện phân trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1); // Pagination bắt đầu từ 1
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box>
      {/* Thanh tìm kiếm + chọn số dòng */}
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
              <TableCell sx={{ fontWeight: 700 }}>Mã thiết bị</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tên Thiết Bị</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tần suất</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Vị trí</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices?.map((device, index) => (
              <TableRow key={device.deviceId}>
                <TableCell>{index + 1}</TableCell>
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
                  {/* <IconButton color="info">
                  <Info />
                </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Phân trang số */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredRows.length / rowsPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default DeviceTable;
