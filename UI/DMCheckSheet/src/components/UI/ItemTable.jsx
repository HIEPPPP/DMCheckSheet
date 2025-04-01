import {
  Paper,
  TableContainer,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { AddCircle, Delete, Edit } from "@mui/icons-material";

import React from "react";

const ItemTable = ({ items, onEdit, onDelete, onAddChild }) => {
  return (
    <TableContainer component={Paper} className="mt-4">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-200">
            <TableCell>STT</TableCell>
            <TableCell>Sheet ID</TableCell>
            <TableCell>Mã Sheet</TableCell>
            <TableCell>Tên Sheet</TableCell>
            <TableCell>Form NO.</TableCell>
            <TableCell>Item ID</TableCell>
            <TableCell>Parent ID</TableCell>
            <TableCell>Nội dung</TableCell>
            <TableCell>Vị trí</TableCell>
            <TableCell>Kiểu dữ liệu</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(items ?? []).map((item, index) => (
            <TableRow key={item.itemId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.sheetId}</TableCell>
              <TableCell>{item.sheetCode}</TableCell>
              <TableCell>{item.sheetName}</TableCell>
              <TableCell>{item.formNO}</TableCell>
              <TableCell>{item.itemId}</TableCell>
              <TableCell>{item.parentId}</TableCell>
              <TableCell>{item.content}</TableCell>
              <TableCell>{item.orderNumber}</TableCell>
              <TableCell>{item.dataType}</TableCell>
              <TableCell className="w-42">
                <IconButton color="primary" onClick={() => onEdit(item)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(item.itemId)}>
                  <Delete />
                </IconButton>
                <IconButton color="success" onClick={() => onAddChild(item)}>
                  <AddCircle />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemTable;
