import {
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
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Form NO.</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkSheets?.map((checkSheet, index) => (
            <TableRow key={checkSheet.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{checkSheet.formNo}</TableCell>
              <TableCell>{checkSheet.name}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(checkSheet)}>
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDelete(checkSheet.id)}
                >
                  <Delete />
                </IconButton>
                <IconButton color="info">
                  <Info />
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
