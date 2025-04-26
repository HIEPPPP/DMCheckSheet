import React, { useState } from "react";
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
  Button,
} from "@mui/material";

const ActionTable = ({ resultAction = [], onEdit }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  // Format helper
  const formatDate = (d) => {
    if (!d) return null;
    if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
    const dt = new Date(d);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const filterActions = resultAction.filter((action) =>
    `${action.deviceCode} ${action.deviceName} ${action.sheetCode} ${action.sheetName} ${action.checkedBy}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  // Dữ liệu sau phân trang
  const paginatedActions = filterActions.slice(
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
    <div>
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

        {/* Bảng thiết bị */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-200">
                <TableCell sx={{ fontWeight: 700 }}>STT</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Mã CheckSheet</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tên CheckSheet</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Mã thiết bị</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tên thiết bị</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Ngày Check</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Nội dung</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Người Check</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  Nội dung khắc phục
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Ngày khắc phục</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Người xác nhận</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Ngày xác nhận</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Ghi chú</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Giá trị</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedActions.map((action, index) => (
                <TableRow key={action.actionId}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{action.sheetCode}</TableCell>
                  <TableCell>{action.sheetName}</TableCell>
                  <TableCell>{action.deviceCode}</TableCell>
                  <TableCell>{action.deviceName}</TableCell>
                  <TableCell>{formatDate(action.checkedDate)}</TableCell>
                  <TableCell>{action.content}</TableCell>
                  <TableCell>{action.checkedBy}</TableCell>
                  <TableCell>{action.actionTaken}</TableCell>
                  <TableCell>{formatDate(action.actionDate)}</TableCell>
                  <TableCell>{action.confirmedBy}</TableCell>
                  <TableCell>{formatDate(action.confirmedDate)}</TableCell>
                  <TableCell>{action.note}</TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "red",
                      animation: "blinker 1s linear infinite",
                      "@keyframes blinker": {
                        "50%": { opacity: 0 },
                      },
                    }}
                  >
                    {action.value}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="success"
                      variant="outlined"
                      onClick={() => onEdit(action)}
                    >
                      <Edit fontSize="small" />
                      <span className="ml-1">Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Phân trang */}
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(filterActions.length / rowsPerPage)}
            page={page + 1}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Box>
    </div>
  );
};

export default ActionTable;
