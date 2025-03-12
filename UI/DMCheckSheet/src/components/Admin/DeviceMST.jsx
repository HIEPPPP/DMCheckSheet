import React, { useEffect, useState } from "react";
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
import { getListDevice } from "../../services/deviceServices";

const DeviceMaster = () => {
  const [devices, setDevices] = useState([]);

  const [open, setOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListDevice();
      console.log(res);

      if (res !== null) {
        setDevices(res);
      }
    };
    fetchData();
  }, []);

  const handleOpen = (device = null) => {
    setEditingDevice(device);
    setFormData(device || { deviceName: "", deviceCode: "", formNO: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDevice(null);
    setFormData({ deviceName: "", deviceCode: "", formNO: "" });
  };

  const handleSave = () => {
    if (editingDevice) {
      setDevices((prev) =>
        prev.map((d) =>
          d.deviceId === editingDevice.id ? { ...d, ...formData } : d
        )
      );
    } else {
      setDevices([...devices, { deviceId: Date.now(), ...formData }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setDevices(devices.filter((d) => d.deviceId !== id));
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
              <TableCell>Số Form</TableCell>
              <TableCell>Mã thiết bị</TableCell>
              <TableCell>Tên Thiết Bị</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Tần suất</TableCell>
              <TableCell>Vị trí</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.formNO}>
                <TableCell>{device.deviceCode}</TableCell>
                <TableCell>{device.deviceName}</TableCell>
                <TableCell>{device.deviceType}</TableCell>
                <TableCell>{device.frequency}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(device)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(device.deviceId)}
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
            value={formData.deviceType}
            onChange={(e) =>
              setFormData({ ...formData, deviceType: e.target.value })
            }
          />
          <TextField
            label="Tên Thiết Bị"
            fullWidth
            margin="dense"
            value={formData.formNO}
            onChange={(e) =>
              setFormData({ ...formData, formNO: e.target.value })
            }
          />
          <TextField
            label="Loại"
            fullWidth
            margin="dense"
            value={formData.formNO}
            onChange={(e) =>
              setFormData({ ...formData, formNO: e.target.value })
            }
          />
          <TextField
            label="Số Serial"
            fullWidth
            margin="dense"
            value={formData.formNO}
            onChange={(e) =>
              setFormData({ ...formData, deviceName: e.target.value })
            }
          />
          <TextField
            label="Loại"
            fullWidth
            margin="dense"
            value={formData.frequency}
            onChange={(e) =>
              setFormData({ ...formData, frequency: e.target.value })
            }
          />
          <TextField
            label="Số Serial"
            fullWidth
            margin="dense"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
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
