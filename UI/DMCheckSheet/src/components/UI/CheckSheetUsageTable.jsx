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
  TextField,
  Button,
} from "@mui/material";

import { useState } from "react";

const CheckSheetUsageTable = ({ checkSheetCols }) => {
  const formatViDateTime = (isoString) => {
    const date = new Date(isoString);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const pad = (num) => String(num).padStart(2, "0");

    return `${hour} giờ ${pad(minute)} phút ngày ${pad(day)} tháng ${pad(
      month
    )} năm ${year}`;
  };
  return (
    <Box className="space-y-2">
      <Box className="flex flex-wrap justify-between gap-4 items-center">
        {/* Table với sticky header & scroll */}
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 180,
            overflowY: "auto",
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {[
                  "Thời gian",
                  "Số lượng nhập vào",
                  "Tổng số sau nhập",
                  "Số lượng lấy ra",
                  "Tổng số còn lại",
                  "Người lấy",
                ].map((head) => (
                  <TableCell
                    key={head}
                    sx={{
                      fontWeight: 700,
                      backgroundColor: (theme) =>
                        theme.palette.background.paper,
                      top: 0,
                      position: "sticky",
                      zIndex: 1,
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {checkSheetCols.map((cd, i) => (
                <TableRow key={i} hover>
                  <TableCell>{formatViDateTime(cd.fileTime)}</TableCell>
                  <TableCell>{cd.qtyEnter}</TableCell>
                  <TableCell>{cd.totalEnter}</TableCell>
                  <TableCell>{cd.qtyOut}</TableCell>
                  <TableCell>{cd.totalRemaining}</TableCell>
                  <TableCell>{cd.checkedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CheckSheetUsageTable;
