import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckSheetDeviceTable from "../components/UI/CheckSheetDeviceTable";
import {
  createCheckSheetDevice,
  deleteCheckSheetDevice,
  getListCheckSheetDevices,
  updateCheckSheetDevice,
} from "../services/checkSheetDeviceServices";
import CheckSheetDeviceFormDialog from "../components/UI/CheckSheetDeviceFormDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import Notification from "../components/Notification";

const DeviceCheckSheetMST = () => {
  const [checkSheetDevices, setCheckSheetDevices] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    checkSheetId: "",
    deviceId: "",
  });
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    var fetchData = async () => {
      const response = await getListCheckSheetDevices();
      response && setCheckSheetDevices(response);
    };

    fetchData();
  }, []);

  const handleButtonAddClick = () => {
    setFormData({
      id: 0,
      checkSheetId: "",
      deviceId: "",
    });
    setOpen(true);
  };

  const handleOpenForm = (checkSheetDevice) => {
    setFormData(checkSheetDevice);
    setOpen(true);
  };

  const handleSave = async () => {
    if (formData.id) {
      // Update
      const res = await updateCheckSheetDevice(formData.id, formData);
      res != null
        ? setSnackbar({ open: true, message: "Cập nhật thành công" })
        : setSnackbar({
            open: true,
            message: "Cập nhật thất bại",
            severity: "error",
          });
    } else {
      const res = await createCheckSheetDevice(formData);
      res != null
        ? setSnackbar({ open: true, message: "Thêm mới thành công" })
        : setSnackbar({
            open: true,
            message: "Thêm mới thất bại",
            severity: "error",
          });
    }
    setOpen(false);
    const response = await getListCheckSheetDevices();
    setCheckSheetDevices(response);
  };

  const handleDelete = async (checkSheetDeviceId) => {
    const res = await deleteCheckSheetDevice(checkSheetDeviceId);
    res != null
      ? setSnackbar({ open: true, message: "Xóa thành công" })
      : setSnackbar({ open: true, message: "Xóa thất bại", severity: "error" });
    setConfirmDelete(null);
    const response = await getListCheckSheetDevices();
    response != null && setCheckSheetDevices(response);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Danh sách</h1>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleButtonAddClick()}
      >
        Thêm mới
      </Button>

      <CheckSheetDeviceTable
        checkSheetDevices={checkSheetDevices}
        onEdit={handleOpenForm}
        onDelete={setConfirmDelete}
      />

      <CheckSheetDeviceFormDialog
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
        title={"Xác nhận xóa"}
        content={`Bạn có chắc chắn muốn xóa dữ liệu này không?`}
      />

      <Notification
        {...snackbar}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
};

export default DeviceCheckSheetMST;
