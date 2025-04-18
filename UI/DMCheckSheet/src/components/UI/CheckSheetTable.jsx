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

const CheckSheetTable = ({ checkSheets, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  const filteerCheckSheets = checkSheets.filter((checkSheet) =>
    `${checkSheet.sheetCode} ${checkSheet.sheetName}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const paginatedCheckSheets = filteerCheckSheets.slice(
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
      <TableContainer component={Paper} className="mt-4">
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
            {[5, 10, 25].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Table>
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell sx={{ fontWeight: 700 }}>STT</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Form NO.</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Mã</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tên</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCheckSheets.map((checkSheet, index) => (
              <TableRow key={checkSheet.sheetId}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{checkSheet.formNO}</TableCell>
                <TableCell>{checkSheet.sheetCode}</TableCell>
                <TableCell>{checkSheet.sheetName}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(checkSheet)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(checkSheet.sheetId)}
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
          count={Math.ceil(filteerCheckSheets.length / rowsPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CheckSheetTable;
