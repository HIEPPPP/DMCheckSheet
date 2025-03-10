import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const DeviceMaster = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: "Laptop Dell", type: "Laptop", serial: "DL123456" },
    { id: 2, name: "Printer HP", type: "Printer", serial: "HP987654" },
  ]);

  const [open, setOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [formData, setFormData] = useState({ name: "", type: "", serial: "" });

  const handleOpen = (device = null) => {
    setEditingDevice(device);
    setFormData(device || { name: "", type: "", serial: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDevice(null);
    setFormData({ name: "", type: "", serial: "" });
  };

  const handleSave = () => {
    if (editingDevice) {
      setDevices((prev) =>
        prev.map((d) => (d.id === editingDevice.id ? { ...d, ...formData } : d))
      );
    } else {
      setDevices([...devices, { id: Date.now(), ...formData }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setDevices(devices.filter((d) => d.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Danh Sách Thiết Bị</h1>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
      >
        Thêm Thiết Bị
      </Button>

      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên Thiết Bị</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Số Serial</TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell>{device.name}</TableCell>
                <TableCell>{device.type}</TableCell>
                <TableCell>{device.serial}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(device)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(device.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingDevice ? "Cập Nhật Thiết Bị" : "Thêm Thiết Bị"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Tên Thiết Bị"
            fullWidth
            margin="dense"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Loại"
            fullWidth
            margin="dense"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          />
          <TextField
            label="Số Serial"
            fullWidth
            margin="dense"
            value={formData.serial}
            onChange={(e) =>
              setFormData({ ...formData, serial: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSave} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeviceMaster;
