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

import React from "react";

const UsersTable = ({ users = [], onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  const filteredUsers = users.filter((user) =>
    `${user.normalizedUserName} ${user.userName}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
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
          onChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          sx={{ width: 120 }}
        >
          {[10, 25, 50].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>STT</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Mã nhân viên</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Họ và tên</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Quyền</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(user.id)}>
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
          count={Math.ceil(filteredUsers.length / rowsPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default UsersTable;
