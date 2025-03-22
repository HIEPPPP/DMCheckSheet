import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import {
  getListDevice,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../../services/deviceServices";
import { getListDeviceType } from "../../services/deviceTypeServices";

import DeviceTable from "./DeviceTable";
import DeviceFormDialog from "./DeviceFormDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";

const DeviceMST = () => {
  const [devices, setDevices] = useState([]);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    getListDevice().then(setDevices);
    getListDeviceType().then(setDeviceTypes);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Danh Sách Thiết Bị</h1>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        Thêm Thiết Bị
      </Button>

      <DeviceTable
        devices={devices}
        onEdit={setOpen}
        onDelete={setConfirmDelete}
      />
      <DeviceFormDialog
        open={open}
        onClose={() => setOpen(false)}
        deviceTypes={deviceTypes}
      />
      <ConfirmDialog
        open={Boolean(confirmDelete)}
        onConfirm={() => deleteDevice(confirmDelete)}
      />
      <Notification
        {...snackbar}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
};

export default DeviceMST;
