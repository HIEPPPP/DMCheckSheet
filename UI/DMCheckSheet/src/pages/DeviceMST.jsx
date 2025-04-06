import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import {
  getListDevice,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../services/deviceServices";

import DeviceTable from "../components/UI/DeviceTable";
import DeviceFormDialog from "../components/UI/DeviceFormDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import Notification from "../components/Notification";

const DeviceMST = () => {
  const [devices, setDevices] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    deviceId: null,
    deviceCode: "",
    deviceName: "",
    frequency: "",
    location: "",
  });

  useEffect(() => {
    var fetchData = async () => {
      const response = await getListDevice();
      response && setDevices(response);
    };

    fetchData();
  }, []);

  const handleOpenForm = (device = null) => {
    if (device) {
      setFormData(device); // Gán dữ liệu khi sửa
    } else {
      setFormData({
        deviceId: null,
        deviceCode: "",
        deviceName: "",
        frequency: "",
        location: "",
      });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    if (formData.deviceId) {
      const res = await updateDevice(formData.deviceId, formData);
      res != null
        ? setSnackbar({ open: true, message: "Cập nhật thành công" })
        : setSnackbar({
            open: true,
            message: "Cập nhật thất bại",
            severity: "error",
          });
    } else {
      const res = await createDevice(formData);
      res != null
        ? setSnackbar({ open: true, message: "Thêm mới thành công" })
        : setSnackbar({
            open: true,
            message: "Thêm mới thất bại",
            severity: "error",
          });
    }
    setOpen(false);
    const response = await getListDevice();
    setDevices(response);
  };

  const handleDelete = async (deviceId) => {
    var res = await deleteDevice(deviceId);
    res != null
      ? setSnackbar({ open: true, message: "Xóa thành công" })
      : setSnackbar({ open: true, message: "Xóa thất bại", severity: "error" });
    setConfirmDelete(null);
    const response = await getListDevice();
    response != null && setDevices(response);
  };

  const handleButtonAddClick = () => {
    setFormData({
      deviceId: null,
      deviceCode: "",
      deviceName: "",
      frequency: "",
      location: "",
    });
    setOpen(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Danh Sách Thiết Bị</h1>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleButtonAddClick()}
      >
        Thêm Thiết Bị
      </Button>

      <DeviceTable
        devices={devices}
        onEdit={handleOpenForm}
        onDelete={setConfirmDelete}
      />
      <DeviceFormDialog
        open={open}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onClose={() => setOpen(false)}
      />
      <ConfirmDialog
        open={Boolean(confirmDelete)}
        onConfirm={() => handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
        title={"Xác nhận xóa thiết bị"}
        content={`Bạn có chắc chắn muốn xóa thiết bị này không?`}
      />
      <Notification
        {...snackbar}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
};

export default DeviceMST;
