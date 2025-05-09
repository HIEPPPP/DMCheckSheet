import {
  CheckRounded,
  HighlightOffRounded,
  Info,
  RotateRightRounded,
  Search,
} from "@mui/icons-material";
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

const ApproveTable = ({
  checkSheetDevice,
  onEdit,
  monthRef,
  setMonthRef,
  onSearch,
}) => {
  const [searchText, setSearchText] = useState("");

  // Lọc
  const filtered = checkSheetDevice.filter((cd) =>
    `${cd.deviceCode} ${cd.deviceName} ${cd.sheetName} ${cd.sheetCode}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <Box className="space-y-2">
      {/* Search & filter */}
      <Box className="flex flex-wrap justify-between gap-4 items-center">
        <TextField
          label="Tìm kiếm"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div className="flex gap-4 items-center">
          <TextField
            type="month"
            label="Tháng"
            size="small"
            value={monthRef}
            onChange={(e) => setMonthRef(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            variant="outlined"
            size="medium"
            onClick={onSearch}
            startIcon={<Search />}
            className="h-10"
          >
            Lọc
          </Button>
        </div>
      </Box>

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
                "STT",
                "Tên Check Sheet",
                "Tên Thiết Bị",
                "Mã Check Sheet",
                "Mã Thiết bị",
                "Phê duyệt",
                "Xác nhận",
                "Hành động",
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    fontWeight: 700,
                    backgroundColor: (theme) => theme.palette.background.paper,
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
            {filtered.map((cd, i) => (
              <TableRow key={cd.sheetCode + cd.deviceCode + i} hover>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{cd.sheetName}</TableCell>
                <TableCell>{cd.deviceName}</TableCell>
                <TableCell>{cd.sheetCode}</TableCell>
                <TableCell>{cd.deviceCode}</TableCell>
                <TableCell>
                  {cd.isApproved ? (
                    <CheckRounded className="text-green-600 animate-pulse" />
                  ) : (
                    <RotateRightRounded className="text-red-500 animate-spin" />
                  )}
                </TableCell>
                <TableCell>
                  {cd.isConfirmedMonth ? (
                    <CheckRounded className="text-green-600 animate-pulse" />
                  ) : (
                    <RotateRightRounded className="text-red-500 animate-spin" />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(cd)}>
                    <Info className="text-blue-400" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ApproveTable;
