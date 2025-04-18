import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

const TableNG = ({ rows }) => {
  return (
    <TableContainer component={Paper} className="mt-6">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={4} align="center">
              Chưa đạt
            </TableCell>
            <TableCell colSpan={2} align="center">
              Khắc phục
            </TableCell>
            <TableCell colSpan={3} align="center">
              Kiểm tra lại
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Ngày</TableCell>
            <TableCell>Số mục</TableCell>
            <TableCell>Nội dung chưa đạt</TableCell>
            <TableCell>Khắc phục</TableCell>
            <TableCell>Ngày</TableCell>
            <TableCell>Người kiểm tra</TableCell>
            <TableCell>Ngày</TableCell>
            <TableCell>Ghi chú</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((result, index) => (
            <TableRow key={result.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{result.date}</TableCell>
              <TableCell>{result.item}</TableCell>
              <TableCell>{result.content}</TableCell>

              {/* Các ô cho người dùng điền thông tin */}
              <TableCell>
                <TextField variant="standard" fullWidth />
              </TableCell>
              <TableCell>
                <TextField type="date" variant="standard" fullWidth />
              </TableCell>
              <TableCell>
                <TextField variant="standard" fullWidth />
              </TableCell>
              <TableCell>
                <TextField type="date" variant="standard" fullWidth />
              </TableCell>
              <TableCell>
                <TextField variant="standard" fullWidth />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableNG;
