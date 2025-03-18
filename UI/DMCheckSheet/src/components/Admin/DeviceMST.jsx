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
  FormControl,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Edit, Delete, Info } from "@mui/icons-material";

import {
  createDevice,
  getListDevice,
  updateDevice,
  deleteDevice,
  getDeviceById,
} from "../../services/deviceServices";

import { getListDeviceType } from "../../services/deviceTypeServices";

const DeviceMST = () => {
  const [devices, setDevices] = useState([]);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [formData, setFormData] = useState({
    deviceId: "",
    deviceName: "",
    deviceCode: "",
    formNO: "",
    typeId: "",
    typeName: "",
    frequency: "",
    location: "",
    createBy: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListDevice();
      if (res) setDevices(res);
    };

    const fetchDeviceTypes = async () => {
      const res = await getListDeviceType();
      if (res) setDeviceTypes(res);
    };

    fetchData();
    fetchDeviceTypes();
  }, []);

  const handleOpen = (device = null) => {
    setEditingDevice(device);
    setFormData(
      device ?? {
        deviceName: "",
        deviceCode: "",
        checkSheetName: "",
        formNO: "",
        typeId: "",
        typeName: "",
        frequency: "",
        location: "",
      }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDevice(null);
    setFormData({
      deviceName: "",
      deviceCode: "",
      checkSheetName: "",
      formNO: "",
      typeId: "",
      typeName: "",
      frequency: "",
      location: "",
    });
  };

  const handleSave = async () => {
    if (editingDevice) {
      const updatedDevice = await updateDevice(
        editingDevice.deviceId,
        formData
      );
      if (updatedDevice) {
        setDevices((prev) =>
          prev.map((d) =>
            d.deviceId === editingDevice.deviceId ? updatedDevice : d
          )
        );
        setSnackbar({
          open: true,
          message: "Cập nhật thành công!",
          severity: "success",
        });
      }
    } else {
      const newDevice = await createDevice(formData);
      if (newDevice) {
        setDevices([...devices, newDevice]);
        setSnackbar({
          open: true,
          message: "Thêm thành công!",
          severity: "success",
        });
      }
    }
    // Cập nhật lại danh sách thiết bị
    const updatedDevices = await getListDevice();
    if (updatedDevices) setDevices(updatedDevices);
    handleClose();
  };

  const handleDelete = async (id) => {
    try {
      const isDeleted = await deleteDevice(id);
      if (isDeleted) {
        setDevices(devices.filter((d) => d.deviceId !== id));
        setSnackbar({
          open: true,
          message: "Xóa thành công!",
          severity: "success",
        });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Lỗi khi xóa!", severity: "error" });
    }
    setConfirmDelete(null);
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
              <TableCell>STT</TableCell>
              <TableCell>Số Form</TableCell>
              <TableCell>Mã thiết bị</TableCell>
              <TableCell>Tên Thiết Bị</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Tần suất</TableCell>
              <TableCell>Vị trí</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device, index) => (
              <TableRow key={device.deviceId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{device.formNO}</TableCell>
                <TableCell>{device.deviceCode}</TableCell>
                <TableCell>{device.deviceName}</TableCell>
                <TableCell>{device.typeName}</TableCell>
                <TableCell>{device.frequency}</TableCell>
                <TableCell>{device.location}</TableCell>
                <TableCell className="flex items-center space-x-2 w-[200px]">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(device)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => setConfirmDelete(device.deviceId)}
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingDevice ? "Cập Nhật Thiết Bị" : "Thêm Thiết Bị"}
        </DialogTitle>
        <DialogContent>
          {/* Select Box cho Loại thiết bị */}
          <FormControl fullWidth margin="dense">
            <label htmlFor="" className="mb-2">
              Loại thiết bị
            </label>
            <Select
              labelId="device-type-label"
              id="device-type-select"
              value={formData.typeId}
              onChange={(e) =>
                setFormData({ ...formData, typeId: e.target.value })
              }
            >
              {deviceTypes.map((type) => (
                <MenuItem key={type.typeId} value={type.typeId}>
                  {type.typeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Số Form"
            fullWidth
            margin="dense"
            value={formData.formNO ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, formNO: e.target.value })
            }
          />
          <TextField
            label="Mã thiết bị"
            fullWidth
            margin="dense"
            value={formData.deviceCode ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, deviceCode: e.target.value })
            }
          />
          <TextField
            label="Tên thiết bị"
            fullWidth
            margin="dense"
            value={formData.deviceName ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, deviceName: e.target.value })
            }
          />
          <TextField
            label="Tần suất"
            fullWidth
            margin="dense"
            value={formData.frequency ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, frequency: e.target.value })
            }
          />
          <TextField
            label="Vị trí"
            fullWidth
            margin="dense"
            value={formData.location ?? ""}
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

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={Boolean(confirmDelete)}
        onClose={() => setConfirmDelete(null)}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>Bạn có chắc muốn xóa linh kiện này không?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Hủy</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => handleDelete(confirmDelete)}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DeviceMST;
