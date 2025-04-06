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

const DeviceTable = ({ devices, onEdit, onDelete }) => (
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

export default DeviceTable;
