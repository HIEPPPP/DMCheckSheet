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

const CheckSheetTable = ({ checkSheets, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} className="mt-4">
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
          {(checkSheets ?? []).map((checkSheet, index) => (
            <TableRow key={checkSheet.sheetId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{checkSheet.formNO}</TableCell>
              <TableCell>{checkSheet.sheetCode}</TableCell>
              <TableCell>{checkSheet.sheetName}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(checkSheet)}>
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
  );
};

export default CheckSheetTable;
